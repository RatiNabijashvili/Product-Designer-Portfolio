import { readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const publicDirectory = path.resolve('public');

async function findPngFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const fullPath = path.join(directory, entry.name);
      return entry.isDirectory()
        ? findPngFiles(fullPath)
        : entry.name.toLowerCase().endsWith('.png')
          ? [fullPath]
          : [];
    }),
  );

  return files.flat();
}

const pngFiles = await findPngFiles(publicDirectory);

for (const pngPath of pngFiles) {
  const webpPath = pngPath.replace(/\.png$/i, '.webp');
  await sharp(pngPath)
    .webp({ lossless: true, effort: 6 })
    .toFile(webpPath);
  console.log(path.relative(publicDirectory, webpPath));
}

console.log(`Converted ${pngFiles.length} PNG files to lossless WebP.`);
