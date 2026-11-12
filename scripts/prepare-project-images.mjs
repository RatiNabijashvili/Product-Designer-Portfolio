import sharp from 'sharp';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const projects = ['Happtic', 'Noxtton-Wallet', 'White-Square', 'UX-Challenges'];
const manifest = {};
let sourceBytes = 0;
let mobileBytes = 0;
for (const project of projects) {
  const directory = path.join('public', 'Projects', project);
  await mkdir(path.join(directory, 'responsive'), { recursive: true });
  for (const file of (await readdir(directory)).filter(file => file.endsWith('.webp')).sort()) {
    const input = path.join(directory, file);
    const source = await readFile(input);
    const { width, height } = await sharp(source).metadata();
    const widths = [...new Set([768, 1440, 2400].map(size => Math.min(size, width)))];
    const variants = [];
    for (const targetWidth of widths) {
      const filename = `${path.parse(file).name}-${targetWidth}.webp`;
      const output = await sharp(source).resize({ width: targetWidth, withoutEnlargement: true }).webp({ quality: 90, effort: 4 }).toBuffer();
      await writeFile(path.join(directory, 'responsive', filename), output);
      variants.push({ width: targetWidth, src: `/Projects/${project}/responsive/${filename}` });
      if (targetWidth === widths[0]) mobileBytes += output.length;
    }
    const blur = await sharp(source).resize({ width: 24 }).webp({ quality: 40 }).toBuffer();
    manifest[`/Projects/${project}/${file}`] = { width, height, variants, blurDataURL: `data:image/webp;base64,${blur.toString('base64')}` };
    sourceBytes += source.length;
  }
  console.log(`Prepared responsive images for ${project}`);
}
await writeFile('src/lib/project-image-manifest.json', `${JSON.stringify(manifest, null, 2)}\n`);
console.log(JSON.stringify({ images: Object.keys(manifest).length, sourceBytes, mobileBytes }));
