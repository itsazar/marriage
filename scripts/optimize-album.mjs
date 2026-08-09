// Album image optimizer.
//
// Drop ALL your photos (any names, any format) into the `raw-photos/` folder at
// the project root, then run:  npm run album
//
// It will:
//   1. Sort them naturally (IMG_1, IMG_2, ... / 1, 2, 10, ...)
//   2. Rename them sequentially (1, 2, 3, ...)
//   3. Create a small thumbnail  -> src/assets/album/thumb/N.webp  (fast mosaic load)
//   4. Create a sharp full image  -> src/assets/album/full/N.webp   (for the lightbox)
//
// WebP keeps the clarity while being a fraction of the original size, so the page
// stays fast even with hundreds of photos.

import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync } from 'node:fs'
import { extname, join, resolve } from 'node:path'
import sharp from 'sharp'
import heicConvert from 'heic-convert'

// Keep memory flat across a large batch: no operation cache, one image at a time.
sharp.cache(false)
sharp.concurrency(1)

const ROOT = resolve(process.cwd())
const RAW_DIR = join(ROOT, 'raw-photos')
const THUMB_DIR = join(ROOT, 'src', 'assets', 'album', 'thumb')
const FULL_DIR = join(ROOT, 'src', 'assets', 'album', 'full')

const VALID = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tiff', '.gif', '.heic', '.heif'])

// Tunables ------------------------------------------------------------------
const THUMB_SIZE = 400 // px longest edge for the little rounds
const THUMB_QUALITY = 70
const FULL_SIZE = 1800 // px longest edge for the full lightbox view
const FULL_QUALITY = 82
// ---------------------------------------------------------------------------

function naturalSort(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
}

// Returns an image source (a Buffer or file path) that sharp can read. iPhone
// HEICs that trip libheif's native security limit are decoded with a pure-JS
// fallback; everything else is read straight from disk.
async function getSource(input, ext) {
  if (ext === '.heic' || ext === '.heif') {
    try {
      // Probe: if the native decoder can read metadata, use the path directly.
      await sharp(input, { failOn: 'none' }).metadata()
      return input
    } catch {
      const buf = await heicConvert({
        buffer: readFileSync(input),
        format: 'JPEG',
        quality: 0.95,
      })
      return Buffer.from(buf)
    }
  }
  return input
}

async function run() {
  if (!existsSync(RAW_DIR)) {
    mkdirSync(RAW_DIR, { recursive: true })
    console.log(`\n📂 Created "raw-photos/". Drop your images there and run "npm run album" again.\n`)
    return
  }

  const files = readdirSync(RAW_DIR)
    .filter((f) => VALID.has(extname(f).toLowerCase()))
    .sort(naturalSort)

  if (files.length === 0) {
    console.log('\n⚠️  No images found in "raw-photos/". Add some and run again.\n')
    return
  }

  // Fresh output each run so old/removed photos don't linger.
  rmSync(THUMB_DIR, { recursive: true, force: true })
  rmSync(FULL_DIR, { recursive: true, force: true })
  mkdirSync(THUMB_DIR, { recursive: true })
  mkdirSync(FULL_DIR, { recursive: true })

  console.log(`\n🖼️  Optimizing ${files.length} image(s)...\n`)

  let i = 1
  for (const file of files) {
    const input = join(RAW_DIR, file)
    const name = `${i}.webp`
    const ext = extname(file).toLowerCase()

    try {
      const source = await getSource(input, ext)

      await sharp(source, { failOn: 'none' })
        .rotate() // respect EXIF orientation
        .resize(THUMB_SIZE, THUMB_SIZE, { fit: 'cover', position: 'attention' })
        .webp({ quality: THUMB_QUALITY })
        .toFile(join(THUMB_DIR, name))

      await sharp(source, { failOn: 'none' })
        .rotate()
        .resize(FULL_SIZE, FULL_SIZE, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: FULL_QUALITY })
        .toFile(join(FULL_DIR, name))

      console.log(`  ✓ ${file}  →  ${name}`)
      i++
    } catch (err) {
      console.warn(`  ✗ Skipped ${file}: ${err.message}`)
    }
  }

  console.log(`\n✅ Done. ${i - 1} photo(s) ready in src/assets/album/. They now appear on the album page.\n`)
}

run()
