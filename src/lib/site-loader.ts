export const SITE_READY_EVENT = 'rati:site-ready';
export const SITE_REVEAL_EVENT = 'rati:site-reveal';
export const SITE_LOADER_SESSION_KEY = 'rati:portfolio-visited';
export const SITE_LOADER_FADE_MS = 650;
export const SITE_LOADER_COMPLETE_MS = 220;
export const SITE_LOADER_MIN_MS = 1630;
export const SITE_LOADER_MAX_MS = 3500;

// Runs in the document head before the first paint. Repeat visits skip the
// overlay without waiting for React; the timeout also handles failed hydration.
export const siteLoaderBootstrap = `(function(){
  var root=document.documentElement;
  var seen=false;
  try{seen=sessionStorage.getItem(${JSON.stringify(SITE_LOADER_SESSION_KEY)})==='1';}catch(e){}
  root.dataset.siteLoader=seen?'ready':'loading';
  if(!seen)window.setTimeout(function(){
    if(root.dataset.siteLoader==='ready')return;
    window.dispatchEvent(new Event(${JSON.stringify(SITE_REVEAL_EVENT)}));
    root.dataset.siteLoader='ready';
    var content=document.getElementById('site-content');
    if(content){content.inert=false;content.removeAttribute('aria-busy');}
    try{sessionStorage.setItem(${JSON.stringify(SITE_LOADER_SESSION_KEY)},'1');}catch(e){}
    window.dispatchEvent(new Event(${JSON.stringify(SITE_READY_EVENT)}));
  },Math.max(0,${SITE_LOADER_MAX_MS}-performance.now()));
})();`;

export function finishSiteLoader() {
  document.documentElement.dataset.siteLoader = 'ready';
  try { sessionStorage.setItem(SITE_LOADER_SESSION_KEY, '1'); } catch { /* Storage may be disabled. */ }
  window.dispatchEvent(new Event(SITE_READY_EVENT));
}

// Prepare entrance animations while the cover is still opaque. Their starting
// styles must be applied before the fade exposes any of the page.
export function beginSiteReveal() {
  window.dispatchEvent(new Event(SITE_REVEAL_EVENT));
  document.documentElement.dataset.siteLoader = 'leaving';
}

export function whenSiteReveal(setup: () => void | (() => void)) {
  let disposed = false;
  let cleanup: void | (() => void);
  const start = () => {
    if (disposed) return;
    window.removeEventListener(SITE_REVEAL_EVENT, start);
    cleanup = setup();
  };
  const state = document.documentElement?.dataset.siteLoader;
  if (state === 'loading') {
    window.addEventListener(SITE_REVEAL_EVENT, start, { once: true });
  } else {
    start();
  }
  return () => {
    if (disposed) return;
    disposed = true;
    window.removeEventListener(SITE_REVEAL_EVENT, start);
    cleanup?.();
  };
}
