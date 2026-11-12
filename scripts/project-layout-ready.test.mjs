import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

const source = await readFile(new URL('../src/lib/project-layout-ready.ts', import.meta.url), 'utf8');
const loaderSource = await readFile(new URL('../src/lib/site-loader.ts', import.meta.url), 'utf8');
const loaderCompiled = ts.transpileModule(loaderSource, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const loaderUrl = `data:text/javascript;base64,${Buffer.from(loaderCompiled).toString('base64')}`;
const { siteLoaderBootstrap, SITE_READY_EVENT, SITE_REVEAL_EVENT, SITE_LOADER_SESSION_KEY, beginSiteReveal, whenSiteReveal } = await import(loaderUrl);
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText.replace(/from ['"]\.\/site-loader['"]/, `from '${loaderUrl}'`);
const { whenProjectLayoutReady } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);

function browserTiming(t, loading = true) {
  const previousWindow = globalThis.window;
  const previousDocument = globalThis.document;
  const frames = new Map();
  let nextFrame = 0;
  let resolveFonts;
  const events = new EventTarget();
  const ready = new Promise(resolve => { resolveFonts = resolve; });
  globalThis.window = {
    requestAnimationFrame(callback) { frames.set(++nextFrame, callback); return nextFrame; },
    cancelAnimationFrame(id) { frames.delete(id); },
    addEventListener: events.addEventListener.bind(events),
    removeEventListener: events.removeEventListener.bind(events),
    dispatchEvent: events.dispatchEvent.bind(events),
  };
  globalThis.document = { documentElement: { dataset: { siteLoader: 'ready' } }, fonts: { status: loading ? 'loading' : 'loaded', ready } };
  t.after(() => {
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
    if (previousDocument === undefined) delete globalThis.document;
    else globalThis.document = previousDocument;
  });
  return {
    frames,
    async loadFonts() { document.fonts.status = 'loaded'; resolveFonts(); await ready; },
    showLoader() { document.documentElement.dataset.siteLoader = 'loading'; },
    revealLoader() { beginSiteReveal(); },
    finishLoader() {
      beginSiteReveal();
      document.documentElement.dataset.siteLoader = 'ready';
      events.dispatchEvent(new Event(SITE_READY_EVENT));
    },
    tick() {
      const current = [...frames.values()];
      frames.clear();
      current.forEach(callback => callback(0));
    },
  };
}

test('waits for fonts and navigation frames before measuring', async t => {
  const clock = browserTiming(t);
  let setups = 0;
  let cleanups = 0;
  const stop = whenProjectLayoutReady(() => { setups++; return () => { cleanups++; }; });
  assert.equal(clock.frames.size, 0);
  assert.equal(setups, 0);
  await clock.loadFonts();
  clock.tick();
  assert.equal(setups, 0);
  clock.tick();
  assert.equal(setups, 1);
  stop();
  stop();
  assert.equal(cleanups, 1);
});

test('a view unmounted during font loading never creates animations', async t => {
  const clock = browserTiming(t);
  let setups = 0;
  const stop = whenProjectLayoutReady(() => { setups++; });
  stop();
  await clock.loadFonts();
  clock.tick();
  clock.tick();
  assert.equal(setups, 0);
  assert.equal(clock.frames.size, 0);
});

test('switching views cancels pending animation-frame setup', t => {
  const clock = browserTiming(t, false);
  let setups = 0;
  const stop = whenProjectLayoutReady(() => { setups++; });
  clock.tick();
  assert.equal(clock.frames.size, 1);
  stop();
  assert.equal(clock.frames.size, 0);
  clock.tick();
  assert.equal(setups, 0);
});

test('page animations prepare during the cover fade', async t => {
  const clock = browserTiming(t);
  clock.showLoader();
  let setups = 0;
  const stop = whenProjectLayoutReady(() => { setups++; });
  await clock.loadFonts();
  assert.equal(clock.frames.size, 0);
  clock.revealLoader();
  clock.tick();
  clock.tick();
  assert.equal(setups, 1);
  assert.equal(document.documentElement.dataset.siteLoader, 'leaving');
  stop();
});

test('entrance starting styles are set before the opaque cover starts fading', t => {
  const clock = browserTiming(t, false);
  clock.showLoader();
  let stateDuringSetup;
  let setups = 0;
  const stop = whenSiteReveal(() => {
    stateDuringSetup = document.documentElement.dataset.siteLoader;
    setups++;
  });
  assert.equal(setups, 0);
  clock.revealLoader();
  assert.equal(stateDuringSetup, 'loading');
  assert.equal(setups, 1);
  assert.equal(document.documentElement.dataset.siteLoader, 'leaving');
  clock.finishLoader();
  assert.equal(setups, 1);
  stop();
});

test('content mounting during the fade prepares immediately', t => {
  const clock = browserTiming(t, false);
  clock.showLoader();
  clock.revealLoader();
  let setups = 0;
  const stop = whenSiteReveal(() => { setups++; });
  assert.equal(setups, 1);
  stop();
});

test('navigating away during the loader cancels the old page setup', t => {
  const clock = browserTiming(t, false);
  clock.showLoader();
  let setups = 0;
  const stop = whenProjectLayoutReady(() => { setups++; });
  stop();
  clock.finishLoader();
  clock.tick();
  clock.tick();
  assert.equal(setups, 0);
});

function runBootstrap({ seen = false, blockedStorage = false, elapsed = 0 } = {}) {
  const root = { dataset: {} };
  const timers = [];
  const events = [];
  const storage = new Map(seen ? [[SITE_LOADER_SESSION_KEY, '1']] : []);
  const content = { inert: true, removeAttribute() {} };
  runInNewContext(siteLoaderBootstrap, {
    document: { documentElement: root, getElementById: () => content },
    sessionStorage: {
      getItem(key) { if (blockedStorage) throw Error('Unavailable'); return storage.get(key); },
      setItem(key, value) { if (blockedStorage) throw Error('Unavailable'); storage.set(key, value); },
    },
    performance: { now: () => elapsed },
    Event,
    window: {
      setTimeout(callback, delay) { timers.push({ callback, delay }); },
      dispatchEvent(event) { events.push(event.type); },
    },
  });
  return { root, timers, events, storage, content };
}

test('returning visits bypass the cover before hydration', () => {
  const result = runBootstrap({ seen: true });
  assert.equal(result.root.dataset.siteLoader, 'ready');
  assert.equal(result.timers.length, 0);
});

test('the bootstrap releases the cover within the navigation deadline if hydration fails', () => {
  const result = runBootstrap({ elapsed: 1200 });
  assert.equal(result.root.dataset.siteLoader, 'loading');
  assert.equal(result.timers[0].delay, 2300);
  result.timers[0].callback();
  assert.equal(result.root.dataset.siteLoader, 'ready');
  assert.equal(result.content.inert, false);
  assert.deepEqual(result.events, [SITE_REVEAL_EVENT, SITE_READY_EVENT]);
  assert.equal(result.storage.get(SITE_LOADER_SESSION_KEY), '1');
});

test('blocked session storage never traps a visitor behind the cover', () => {
  const result = runBootstrap({ blockedStorage: true });
  result.timers[0].callback();
  assert.equal(result.root.dataset.siteLoader, 'ready');
  assert.equal(result.content.inert, false);
});
