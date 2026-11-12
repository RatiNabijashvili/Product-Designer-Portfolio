import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';

async function filesIn(directory) {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = `${directory}/${entry.name}`;
    result.push(...(entry.isDirectory() ? await filesIn(file) : [file]));
  }
  return result;
}

const publicFiles = new Set(await filesIn('public'));
const sourceFiles = await filesIn('src');
let tracked = [];
let untracked = [];
let hasGit = true;
try {
  const options = { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] };
  tracked = execFileSync('git', ['ls-files', '-z'], options).split('\0').filter(Boolean);
  untracked = execFileSync('git', ['ls-files', '--others', '--exclude-standard', '-z'], options).split('\0').filter(Boolean);
} catch {
  // Some deployment platforms provide a source archive without .git. Exact
  // filesystem spelling still protects case-sensitive production paths there.
  hasGit = false;
}
const published = new Set(hasGit ? [...tracked, ...untracked] : [...publicFiles, ...sourceFiles]);
const references = new Set();

function check(reference, owner) {
  if (!reference || /^(?:https?:|data:|#|\/\/)/.test(reference)) return;
  const clean = decodeURIComponent(reference.split(/[?#]/)[0]);
  const file = clean.startsWith('/') ? `public${clean}` : path.posix.normalize(path.posix.join(path.posix.dirname(owner), clean));
  assert.ok(published.has(file), `${owner}: missing or incorrectly cased Git path: ${reference}`);
  if (file.startsWith('public/')) assert.ok(publicFiles.has(file), `${owner}: Git/file-system casing mismatch: ${reference}`);
  references.add(file);
}

// Compare actual disk spelling with Git, not only existsSync(), which can mask
// mistakes on a case-insensitive workstation.
const diskByLowerCase = new Map([...publicFiles].map(file => [file.toLowerCase(), file]));
for (const file of tracked.filter(file => file.startsWith('public/'))) {
  const actual = diskByLowerCase.get(file.toLowerCase());
  if (actual !== undefined) assert.equal(actual, file, `Git/file-system filename mismatch: ${file}`);
}

const mediaExtension = /\.(?:svg|png|webp|jpe?g|gif|avif|ico|woff2?|webm|mp4)$/i;
for (const file of sourceFiles.filter(file => /\.(?:tsx?|json|css)$/.test(file))) {
  const source = await readFile(file, 'utf8');
  // Plain paths include metadata images, posters, card data and local fonts.
  const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, file.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  function walk(node) {
    if (ts.isStringLiteralLike(node)) {
      const text = node.text;
      const isPathComparison = ts.isCallExpression(node.parent) && ts.isPropertyAccessExpression(node.parent.expression) && ['endsWith', 'startsWith', 'includes'].includes(node.parent.expression.name.text);
      if (!isPathComparison && /^(?:\/|\.\.?\/)/.test(text) && mediaExtension.test(text)) check(text, file);
    }
    if (ts.isJsxAttribute(node) && node.name.getText(tree) === 'name' && node.initializer && ts.isStringLiteral(node.initializer)) {
      const tag = node.parent.parent.tagName?.getText(tree);
      if (['Icon', 'AssetIcon', 'ChallengeIcon'].includes(tag)) check(`/${node.initializer.text}.svg`, file);
    }
    if (ts.isPropertyAssignment(node) && node.name.getText(tree) === 'icon' && ts.isStringLiteralLike(node.initializer) && /^[a-z0-9-]+$/.test(node.initializer.text)) {
      check(`/${node.initializer.text}.svg`, file);
    }
    if (source.includes('src={`/${name}.svg`}') && ts.isArrayLiteralExpression(node) && node.elements.length === 2 && ts.isStringLiteralLike(node.elements[0]) && ts.isStringLiteralLike(node.elements[1]) && /^[a-z0-9-]+$/.test(node.elements[0].text)) {
      check(`/${node.elements[0].text}.svg`, file);
    }
    ts.forEachChild(node, walk);
  }
  if (!file.endsWith('.css')) walk(tree);
  for (const [, url] of source.matchAll(/url\(\s*['"]?([^)'"\s]+)['"]?\s*\)/g)) {
    if (mediaExtension.test(url)) check(url, file);
  }
}

// The manifest also covers dynamically constructed case-study URLs and all
// generated responsive files, including views mounted only after a tab switch.
const manifest = JSON.parse(await readFile('src/lib/project-image-manifest.json', 'utf8'));
for (const [source, entry] of Object.entries(manifest)) {
  check(source, 'src/lib/project-image-manifest.json');
  for (const variant of entry.variants) check(variant.src, 'src/lib/project-image-manifest.json');
}

for (const file of [...publicFiles].filter(file => file.endsWith('.svg'))) {
  const source = await readFile(file, 'utf8');
  for (const [, reference] of source.matchAll(/(?:href|xlink:href)=["']([^"']+)["']/g)) {
    if (!/^(?:https?:|data:|#|\/\/)/.test(reference) && mediaExtension.test(reference)) {
      const url = reference.startsWith('/') ? reference : `/${path.posix.normalize(path.posix.join(path.posix.dirname(file.slice('public/'.length)), reference))}`;
      check(url, file);
    }
  }
}
console.log(`Verified ${references.size} unique local asset references${hasGit ? ` and exact Git casing for ${tracked.filter(file => file.startsWith('public/')).length} tracked public files` : ' against exact filesystem spelling (Git metadata unavailable)'}.`);
