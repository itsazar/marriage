// Album image optimizer.
//
// Drop ALL your photos (any names, any format) into the `raw-photos/` folder at
// the project root, then run:  npm run album
//
// It will:
//   1. Read each photo's EXIF "date taken" (falls back to file mtime, then name)
//   2. Sort them chronologically, oldest first
//   3. Rename them sequentially (1, 2, 3, ...)
//   4. Create a small thumbnail  -> src/assets/album/thumb/N.webp  (fast mosaic load)
//   5. Create a sharp full image  -> src/assets/album/full/N.webp   (for the lightbox)
//   6. Write src/assets/album/manifest.json with the taken-date for each photo
//
// WebP keeps the clarity while being a fraction of the original size, so the page
// stays fast even with hundreds of photos.

import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { extname, join, resolve } from 'node:path'
import sharp from 'sharp'
import heicConvert from 'heic-convert'
import exifr from 'exifr'

// Keep memory flat across a large batch: no operation cache, one image at a time.
sharp.cache(false)
sharp.concurrency(1)

const ROOT = resolve(process.cwd())
const RAW_DIR = join(ROOT, 'raw-photos')
const ALBUM_DIR = join(ROOT, 'src', 'assets', 'album')
const THUMB_DIR = join(ALBUM_DIR, 'thumb')
const FULL_DIR = join(ALBUM_DIR, 'full')
const MANIFEST_PATH = join(ALBUM_DIR, 'manifest.json')

const VALID = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tiff', '.gif', '.heic', '.heif'])

// Tunables ------------------------------------------------------------------
const THUMB_SIZE = 300 // px longest edge for the little rounds
const THUMB_QUALITY = 65
const FULL_SIZE = 1500 // px longest edge for the full lightbox view
const FULL_QUALITY = 78
// ---------------------------------------------------------------------------

function naturalSort(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
}

// Read the "date taken" from EXIF (DateTimeOriginal / CreateDate). Falls back to
// the file's mtime, then to null so a stable filename sort can take over.
async function readTakenAt(path) {
  try {
    const tags = await exifr.parse(path, {
      pick: ['DateTimeOriginal', 'CreateDate', 'ModifyDate'],
    })
    const d = tags?.DateTimeOriginal || tags?.CreateDate || tags?.ModifyDate
    if (d instanceof Date && !Number.isNaN(d.getTime())) return d
  } catch {
    // exifr can't parse some formats — that's fine, we fall through.
  }
  try {
    const s = statSync(path)
    if (s.mtime instanceof Date && !Number.isNaN(s.mtime.getTime())) return s.mtime
  } catch {
    // ignore
  }
  return null
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

  const rawFiles = readdirSync(RAW_DIR)
    .filter((f) => VALID.has(extname(f).toLowerCase()))
    .sort(naturalSort)

  if (rawFiles.length === 0) {
    console.log('\n⚠️  No images found in "raw-photos/". Add some and run again.\n')
    return
  }

  // Read the taken-date for each file, then sort chronologically (oldest first).
  // Files without any date info drift to the end but keep a stable filename order.
  console.log(`\n🕒 Reading dates from ${rawFiles.length} image(s)...`)
  const withDates = await Promise.all(
    rawFiles.map(async (name) => ({
      name,
      takenAt: await readTakenAt(join(RAW_DIR, name)),
    })),
  )
  withDates.sort((a, b) => {
    if (a.takenAt && b.takenAt) return a.takenAt - b.takenAt
    if (a.takenAt) return -1
    if (b.takenAt) return 1
    return naturalSort(a.name, b.name)
  })
  const files = withDates.map((f) => f.name)

  // Fresh output each run so old/removed photos don't linger.
  rmSync(THUMB_DIR, { recursive: true, force: true })
  rmSync(FULL_DIR, { recursive: true, force: true })
  mkdirSync(THUMB_DIR, { recursive: true })
  mkdirSync(FULL_DIR, { recursive: true })

  console.log(`\n🖼️  Optimizing ${files.length} image(s)...\n`)

  const manifest = []
  let i = 1
  for (const file of files) {
    const input = join(RAW_DIR, file)
    const name = `${i}.webp`
    const ext = extname(file).toLowerCase()
    const takenAt = withDates.find((f) => f.name === file)?.takenAt ?? null

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

      manifest.push({
        n: i,
        takenAt: takenAt ? takenAt.toISOString() : null,
      })
      const stamp = takenAt ? takenAt.toISOString().slice(0, 10) : 'no-date'
      console.log(`  ✓ ${file}  →  ${name}   (${stamp})`)
      i++
    } catch (err) {
      console.warn(`  ✗ Skipped ${file}: ${err.message}`)
    }
  }

  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n')

  console.log(`\n✅ Done. ${i - 1} photo(s) ready in src/assets/album/. They now appear on the album page.\n`)
}

run()
