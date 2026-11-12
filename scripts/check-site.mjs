import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

const origin = process.env.SITE_CHECK_URL || 'http://localhost:9003';
const routes = ['/', '/projects/hapttic', '/projects/noxtton-wallet', '/projects/white-square', '/projects/ux-challenges'];
const assets = new Set();
for (const route of routes) {
  const response = await fetch(new URL(route, origin));
  assert.equal(response.status, 200, route);
  const html = await response.text();
  // A display:contents picture can expose its source/img children to a parent
  // grid, creating empty cells and stacking side-by-side comparisons.
  assert.doesNotMatch(html, /<picture\b[^>]*class="[^"]*\bcontents\b/i, `${route}: picture must retain its layout box`);
  let pictureDepth = 0;
  for (const [tag] of html.matchAll(/<\/?picture\b[^>]*>/gi)) {
    pictureDepth += tag.startsWith('</') ? -1 : 1;
    assert.ok(pictureDepth >= 0 && pictureDepth <= 1, `${route}: invalid nested picture markup`);
  }
  assert.equal(pictureDepth, 0, `${route}: unclosed picture markup`);
  assert.match(html, /<h1\b/, `${route}: missing page heading`);
  assert.match(html, /rel="canonical"/, `${route}: missing canonical URL`);
  if (route.startsWith('/projects/')) {
    assert.match(html, /data-project-text-reveal|data-challenge-copy/, `${route}: missing text-reveal hooks`);
    assert.match(html, /<noscript><style>/, `${route}: missing readable no-JavaScript fallback`);
  }
  for (const [, value] of html.matchAll(/(?:src|poster)="([^"]+)"/g)) {
    if (value.startsWith('/')) assets.add(value.replaceAll('&amp;', '&'));
  }
  for (const [, value] of html.matchAll(/srcset="([^"]+)"/gi)) {
    for (const candidate of value.split(',')) {
      const url = candidate.trim().split(/\s+/)[0];
      if (url.startsWith('/')) assets.add(url.replaceAll('&amp;', '&'));
    }
  }
  for (const [, value] of html.matchAll(/aria-controls="([^"]+)"/g)) {
    assert.ok(html.includes(`id="${value}"`), `${route}: aria-controls target ${value} is missing`);
  }
  if (route === '/projects/ux-challenges') {
    assert.match(html, /property="og:image:type" content="image\/webp"/);
    assert.match(html, /property="og:image:width" content="2400"/);
  }
  console.log(`OK ${route}`);
}
for (const asset of assets) {
  const response = await fetch(new URL(asset, origin), { method: asset.startsWith('/_next/image?') ? 'GET' : 'HEAD' });
  assert.equal(response.status, 200, `Missing asset: ${asset}`);
  await response.body?.cancel();
}
assert.equal((await fetch(new URL('/audit-missing-page', origin))).status, 404);
for (const route of ['/robots.txt', '/sitemap.xml']) {
  assert.equal((await fetch(new URL(route, origin))).status, 200, route);
}
console.log(`Verified ${routes.length} pages, ${assets.size} rendered assets, metadata, tab references, 404, robots and sitemap.`);

// Full-case views mount client-side, so also check their authored image paths.
let caseImages = 0;
for (const [file, directory] of [
  ['src/components/projects/hapttic-case-content.tsx', 'Happtic'],
  ['src/components/projects/noxtton-full-case.tsx', 'Noxtton-Wallet'],
  ['src/components/projects/white-square-project-page.tsx', 'White-Square'],
  ['src/app/projects/ux-challenges/page.tsx', 'UX-Challenges'],
]) {
  const source = await readFile(file, 'utf8');
  const names = await readdir(`public/Projects/${directory}`);
  for (const [, name, attributes] of source.matchAll(/<(?:Visual|ComparisonStep) file="([^"]+)"([^>]+)/g)) {
    const fullCase = ['Happtic', 'Noxtton-Wallet'].includes(directory) && !attributes.includes('original');
    const image = directory === 'White-Square' && name === 'Second' ? 'Second image.webp' : `${name} Image${fullCase ? ' Full Case' : ''}.webp`;
    assert.ok(names.includes(image), `${file}: missing asset or filename case mismatch: ${image}`);
    caseImages += 1;
  }
}
console.log(`Verified ${caseImages} authored case-study image paths.`);

// Check Git's spelling too: Windows can hide case-only filename differences
// that cause 404s after a Linux deployment.
const tracked = new Set(execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' }).split('\0'));
const manifest = JSON.parse(await readFile('src/lib/project-image-manifest.json', 'utf8'));
let variants = 0;
for (const [source, entry] of Object.entries(manifest)) {
  assert.ok(tracked.has(`public${source}`), `Source filename casing differs from Git: ${source}`);
  for (const variant of entry.variants) {
    const metadata = await sharp(`public${variant.src}`).metadata();
    assert.equal(metadata.width, variant.width, variant.src);
    const response = await fetch(new URL(encodeURI(variant.src), origin), { method: 'HEAD' });
    assert.equal(response.status, 200, variant.src);
    variants += 1;
  }
}
console.log(`Verified ${Object.keys(manifest).length} Git source paths and ${variants} responsive image files.`);
