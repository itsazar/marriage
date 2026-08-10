// Finds duplicate / near-duplicate photos in `raw-photos/` and moves the extras
// into `raw-photos/_duplicates/` (so nothing is permanently deleted).
//
// Two passes:
//   1. Exact match — SHA-256 of the raw file bytes.
//   2. Visual match — 64-bit dHash (difference hash) of a 9x8 grayscale
//      thumbnail; images within Hamming distance THRESHOLD are considered the
//      "same photo".
//
// The lowest-numbered filename in each group is kept; the rest are moved.
//
// Run:  npm run album:dedupe

import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync } from 'node:fs'
import { extname, join, resolve } from 'node:path'
import sharp from 'sharp'
import heicConvert from 'heic-convert'

sharp.cache(false)
sharp.concurrency(1)

const RAW_DIR = resolve(process.cwd(), 'raw-photos')
const DUP_DIR = join(RAW_DIR, '_duplicates')
const VALID = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tiff', '.gif', '.heic', '.heif'])
const THRESHOLD = 6 // Hamming distance cutoff — 0 is identical, ~10 is loosely similar.

function naturalSort(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
}

async function decodeSource(path, ext) {
  if (ext === '.heic' || ext === '.heif') {
    try {
      await sharp(path, { failOn: 'none' }).metadata()
      return path
    } catch {
      const buf = await heicConvert({
        buffer: readFileSync(path),
        format: 'JPEG',
        quality: 0.9,
      })
      return Buffer.from(buf)
    }
  }
  return path
}

// dHash: 8 bytes / 64 bits. Bit is 1 when the left pixel is brighter than its
// right neighbour on a 9x8 grayscale thumbnail.
async function dHash(path) {
  const ext = extname(path).toLowerCase()
  try {
    const source = await decodeSource(path, ext)
    const { data } = await sharp(source, { failOn: 'none' })
      .rotate()
      .resize(9, 8, { fit: 'fill' })
      .grayscale()
      .raw()
      .toBuffer({ resolveWithObject: true })
    const bytes = new Uint8Array(8)
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        const left = data[y * 9 + x]
        const right = data[y * 9 + x + 1]
        if (left > right) bytes[y] |= 1 << (7 - x)
      }
    }
    return bytes
  } catch (err) {
    console.warn(`   ✗ Couldn't hash ${path}: ${err.message}`)
    return null
  }
}

function hamming(a, b) {
  let count = 0
  for (let i = 0; i < 8; i++) {
    let x = a[i] ^ b[i]
    while (x) {
      count += x & 1
      x >>= 1
    }
  }
  return count
}

function moveToDup(name) {
  mkdirSync(DUP_DIR, { recursive: true })
  let target = join(DUP_DIR, name)
  // Avoid collisions in the duplicates folder just in case.
  let n = 1
  while (existsSync(target)) {
    const base = name.replace(/\.[^.]+$/, '')
    const ext = extname(name)
    target = join(DUP_DIR, `${base}__${n}${ext}`)
    n++
  }
  renameSync(join(RAW_DIR, name), target)
}

async function run() {
  if (!existsSync(RAW_DIR)) {
    console.log('\n📂 No "raw-photos/" folder found.\n')
    return
  }

  const files = readdirSync(RAW_DIR)
    .filter((f) => VALID.has(extname(f).toLowerCase()))
    .sort(naturalSort)

  if (files.length === 0) {
    console.log('\n⚠️  raw-photos/ is empty.\n')
    return
  }

  console.log(`\n🔍 Scanning ${files.length} raw photo(s) for duplicates...\n`)

  // Pass 1 — exact byte-level duplicates.
  const bySha = new Map()
  for (const f of files) {
    const sha = createHash('sha256').update(readFileSync(join(RAW_DIR, f))).digest('hex')
    if (!bySha.has(sha)) bySha.set(sha, [])
    bySha.get(sha).push(f)
  }

  const exactRemoved = []
  const remaining = []
  for (const group of bySha.values()) {
    remaining.push(group[0])
    for (const dup of group.slice(1)) {
      moveToDup(dup)
      exactRemoved.push({ dup, kept: group[0] })
    }
  }
  if (exactRemoved.length) {
    console.log(`♻️  Exact duplicates moved (${exactRemoved.length}):`)
    for (const e of exactRemoved) console.log(`     ${e.dup.padEnd(40)} → kept ${e.kept}`)
    console.log()
  }

  // Pass 2 — perceptual near-duplicates on what's left.
  console.log(`🧠 Computing perceptual hashes for ${remaining.length} file(s)...`)
  const hashes = new Map()
  for (const f of remaining) {
    const h = await dHash(join(RAW_DIR, f))
    if (h) hashes.set(f, h)
  }

  const perceptualRemoved = []
  const dropped = new Set()
  for (let i = 0; i < remaining.length; i++) {
    const a = remaining[i]
    if (dropped.has(a)) continue
    const ha = hashes.get(a)
    if (!ha) continue
    for (let j = i + 1; j < remaining.length; j++) {
      const b = remaining[j]
      if (dropped.has(b)) continue
      const hb = hashes.get(b)
      if (!hb) continue
      if (hamming(ha, hb) <= THRESHOLD) {
        moveToDup(b)
        perceptualRemoved.push({ dup: b, kept: a })
        dropped.add(b)
      }
    }
  }

  if (perceptualRemoved.length) {
    console.log(`\n👀 Visually-similar duplicates moved (${perceptualRemoved.length}):`)
    for (const e of perceptualRemoved) console.log(`     ${e.dup.padEnd(40)} → kept ${e.kept}`)
  }

  const totalRemoved = exactRemoved.length + perceptualRemoved.length
  if (totalRemoved === 0) {
    console.log('\n✨ No duplicates found. All photos are unique.\n')
  } else {
    console.log(
      `\n✅ Done. Moved ${totalRemoved} duplicate(s) to raw-photos/_duplicates/.\n   Kept ${remaining.length - perceptualRemoved.length} unique photo(s).`,
    )
    console.log('   Next: run  npm run album  to regenerate the album.\n')
  }
}

run()
