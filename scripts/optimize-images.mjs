// Turns raw-assets/images/* into small and large WebP variants in public/images (transparency kept) and records their
// sizes in src/lib/image-manifest.json. Also writes the logo, the favicon and the social share image.
import { readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

import sharp from 'sharp';

const SRC = 'raw-assets/images';
const OUT = 'public/images';
const WIDTHS = [720, 1280];

const manifest = {};
const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png|avif|webp)$/i.test(f)).sort();

for (const file of files) {
    const name = path.parse(file).name;
    const input = sharp(path.join(SRC, file)).rotate();
    const { width, height } = await input.metadata();
    const variants = [];
    for (const [i, target] of WIDTHS.entries()) {
        const w = Math.min(target, width);
        if (i > 0 && w <= variants[variants.length - 1].w) continue;
        const out = `${name}-${i === 0 ? 'sm' : 'lg'}.webp`;
        await input.clone().resize({ width: w }).webp({ quality: 80, alphaQuality: 90 }).toFile(path.join(OUT, out));
        variants.push({ src: `/images/${out}`, w });
    }
    manifest[name] = { w: width, h: height, variants };
    console.log(name, `${width}x${height}`, variants.map((v) => v.w).join(', '));
}
await writeFile('src/lib/image-manifest.json', JSON.stringify(manifest, null, 1) + '\n');

// Logo: trimmed, gold arch with white wordmark, for the green ground.
const logo = sharp('raw-assets/logo.png').trim();
await logo.clone().resize({ width: 520 }).webp({ quality: 90 }).toFile('public/images/logo.webp');
const meta = await sharp(await logo.clone().resize({ width: 520 }).png().toBuffer()).metadata();
console.log('logo', `${meta.width}x${meta.height}`);

// Favicon: the arch only (top part of the logo).
const trimmed = await logo.clone().png().toBuffer();
const tm = await sharp(trimmed).metadata();
const archH = Math.round(tm.height * 0.62);
await sharp(trimmed).extract({ left: 0, top: 0, width: tm.width, height: archH }).resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile('src/app/apple-icon.png');
await sharp(trimmed).extract({ left: 0, top: 0, width: tm.width, height: archH }).resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile('src/app/icon.png');

// Social share image: the Prestige basket on the forest green.
const basket = await sharp(path.join(SRC, 'l-arte-di-regalare.png')).resize({ height: 560 }).png().toBuffer();
const logoSmall = await logo.clone().resize({ width: 220 }).png().toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#263522' } })
    .composite([
        { input: basket, left: 600, top: 40 },
        { input: logoSmall, left: 160, top: 200 }
    ])
    .jpeg({ quality: 84 })
    .toFile('public/og.jpg');
