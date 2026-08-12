/**
 * One-off: extract Tamay symbol (gold roof + navy columns only) from official logo
 * and write Next.js App Router icon assets. Not part of the app runtime.
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const toIco = require("to-ico");

const root = process.cwd();
const sourcePath = path.join(root, "public/branding/tamay-logo-source.png");

/** Clean warm off-white brand canvas — readable on light & dark browser chrome. */
const BRAND_BG = { r: 250, g: 248, b: 245, alpha: 255 }; // #FAF8F5


async function findSymbolBounds(rgba, width, height) {
  // Treat near-black as background; keep gold + navy pixels.
  const isContent = (r, g, b, a) => {
    if (a < 20) return false;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    // black / near-black background
    if (max < 40) return false;
    // keep saturated gold / navy (not pure gray)
    return max - min > 8 || max > 50;
  };

  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  let found = false;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const r = rgba[i];
      const g = rgba[i + 1];
      const b = rgba[i + 2];
      const a = rgba[i + 3];
      if (!isContent(r, g, b, a)) continue;
      found = true;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }

  if (!found) throw new Error("No logo content detected");

  // Split text from symbol: content is symbol on top, then gap, then "TAMAY"/"ENTERPRISES".
  // Find a horizontal band of emptiness below the symbol within the content bbox.
  const rowHasContent = (y) => {
    for (let x = minX; x <= maxX; x++) {
      const i = (y * width + x) * 4;
      if (isContent(rgba[i], rgba[i + 1], rgba[i + 2], rgba[i + 3])) return true;
    }
    return false;
  };

  let gapStart = null;
  let gapEnd = null;
  let inGap = false;
  for (let y = minY; y <= maxY; y++) {
    const has = rowHasContent(y);
    if (!has) {
      if (!inGap) {
        inGap = true;
        gapStart = y;
      }
      gapEnd = y;
    } else if (inGap) {
      // require a meaningful gap (text separator)
      if (gapEnd - gapStart >= Math.floor(height * 0.02)) {
        // Symbol ends just before the gap
        maxY = gapStart - 1;
        break;
      }
      inGap = false;
      gapStart = null;
      gapEnd = null;
    }
  }

  // Recompute x bounds for symbol-only rows
  minX = width;
  maxX = 0;
  for (let y = minY; y <= maxY; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      if (!isContent(rgba[i], rgba[i + 1], rgba[i + 2], rgba[i + 3])) continue;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
    }
  }

  // Small padding inside crop so we don't clip antialiasing
  const pad = 4;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(width - 1, maxX + pad);
  maxY = Math.min(height - 1, maxY + pad);

  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

async function makeTransparent(rgba, width, height) {
  for (let i = 0; i < rgba.length; i += 4) {
    const r = rgba[i];
    const g = rgba[i + 1];
    const b = rgba[i + 2];
    const max = Math.max(r, g, b);
    // Knock out black / near-black background
    if (max < 45) {
      rgba[i + 3] = 0;
    }
  }
  return rgba;
}

async function writeSquareIcon(symbolPng, size, outPath, paddingRatio = 0.1) {
  const meta = await sharp(symbolPng).metadata();
  const inner = Math.round(size * (1 - paddingRatio * 2));
  const fitted = await sharp(symbolPng)
    .resize({
      width: inner,
      height: inner,
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: BRAND_BG,
    },
  })
    .composite([{ input: fitted, gravity: "centre" }])
    .png()
    .toFile(outPath);

  console.log(
    `wrote ${outPath} (${size}x${size}, pad=${Math.round(paddingRatio * 100)}%, bg=#FAF8F5, source ${meta.width}x${meta.height})`,
  );
}

async function main() {
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Missing source logo: ${sourcePath}`);
  }

  const { data, info } = await sharp(sourcePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const rgba = Buffer.from(data);
  const bounds = await findSymbolBounds(rgba, info.width, info.height);
  console.log("symbol bounds", bounds);

  await makeTransparent(rgba, info.width, info.height);

  const transparentFull = await sharp(rgba, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toBuffer();

  const symbolPng = await sharp(transparentFull)
    .extract(bounds)
    .png()
    .toBuffer();

  // Keep a transparent symbol extract for reference (not used as favicon).
  const brandingDir = path.join(root, "public/branding");
  await sharp(symbolPng).png().toFile(path.join(brandingDir, "tamay-symbol-only.png"));

  // Branded square icons: warm off-white canvas, symbol ~80% of frame.
  await writeSquareIcon(symbolPng, 512, path.join(brandingDir, "tamay-symbol-512.png"), 0.1);
  await writeSquareIcon(symbolPng, 256, path.join(brandingDir, "tamay-symbol-preview-256.png"), 0.1);

  const appDir = path.join(root, "src/app");
  await writeSquareIcon(symbolPng, 512, path.join(appDir, "icon.png"), 0.1);
  await writeSquareIcon(symbolPng, 180, path.join(appDir, "apple-icon.png"), 0.1);

  // Favicon.ico: larger symbol (~86% of canvas) for 16/32/48 recognition.
  const sizes = [16, 32, 48];
  const pngBuffers = [];
  for (const s of sizes) {
    const pad = 0.07;
    const inner = Math.round(s * (1 - pad * 2));
    const buf = await sharp({
      create: {
        width: s,
        height: s,
        channels: 4,
        background: BRAND_BG,
      },
    })
      .composite([
        {
          input: await sharp(symbolPng)
            .resize({
              width: inner,
              height: inner,
              fit: "contain",
              background: { r: 0, g: 0, b: 0, alpha: 0 },
            })
            .png()
            .toBuffer(),
          gravity: "centre",
        },
      ])
      .png()
      .toBuffer();
    pngBuffers.push(buf);
  }

  const ico = await toIco(pngBuffers);
  const faviconPath = path.join(appDir, "favicon.ico");
  fs.writeFileSync(faviconPath, ico);
  console.log(`wrote ${faviconPath} (16/32/48 on #FAF8F5)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
