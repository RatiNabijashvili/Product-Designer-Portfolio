import sharp from 'sharp';
import { readdir, stat, unlink } from 'node:fs/promises';
import path from 'node:path';

const directory = path.resolve('public/Projects/Happtic');
const files = (await readdir(directory)).filter(file => file.endsWith(' Full Case.png'));
let before = 0;
let after = 0;
const tiles = [];
for (const [index, file] of files.entries()) {
  const source = path.join(directory, file);
  const target = source.replace(/\.png$/, '.webp');
  await sharp(source).webp({ lossless: true, effort: 6 }).toFile(target);
  const original = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const converted = await sharp(target).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let pixel = 0; pixel < original.data.length; pixel += 4) {
    if (original.data[pixel + 3] === 0 && converted.data[pixel + 3] === 0) {
      original.data.fill(0, pixel, pixel + 3);
      converted.data.fill(0, pixel, pixel + 3);
    }
  }
  if (original.info.width !== converted.info.width || original.info.height !== converted.info.height || !original.data.equals(converted.data)) throw new Error(`Conversion mismatch: ${file}`);
  before += (await stat(source)).size;
  after += (await stat(target)).size;
  tiles.push({ input: await sharp(target).resize(320, 180, { fit: 'contain', background: 'white' }).png().toBuffer(), left: index % 3 * 320, top: Math.floor(index / 3) * 210 });
  tiles.push({ input: Buffer.from(`<svg width="320" height="30"><text x="4" y="20" font-size="14">${file}</text></svg>`), left: index % 3 * 320, top: Math.floor(index / 3) * 210 + 180 });
  await unlink(source);
  console.log(`Verified and converted ${file}`);
}
if (files.length) await sharp({ create: { width: 960, height: Math.ceil(files.length / 3) * 210, channels: 3, background: 'white' } }).composite(tiles).png().toFile('hapttic-contact.png');
console.log(JSON.stringify({ files: files.length, before, after }));
