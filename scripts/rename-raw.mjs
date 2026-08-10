// Renames every file in `raw-photos/` to a sequential number in the same
// chronological order the album script uses (EXIF DateTimeOriginal, then file
// mtime, then filename). Extensions are preserved and lower-cased.
//
//   raw-photos/lavazaR engaged.jpg  →  raw-photos/1.jpg
//   raw-photos/IMG_20170218_...jpg  →  raw-photos/2.jpg
//   ...
//
// Run this once. From then on you can drop new photos in and either run it
// again to renumber, or just name them `90.jpg`, `91.jpg`, etc.

import { existsSync, readdirSync, renameSync, statSync } from 'node:fs'
import { extname, join, resolve } from 'node:path'
import exifr from 'exifr'

const RAW_DIR = resolve(process.cwd(), 'raw-photos')
const VALID = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tiff', '.gif', '.heic', '.heif'])

function naturalSort(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
}

async function readTakenAt(path) {
  try {
    const tags = await exifr.parse(path, {
      pick: ['DateTimeOriginal', 'CreateDate', 'ModifyDate'],
    })
    const d = tags?.DateTimeOriginal || tags?.CreateDate || tags?.ModifyDate
    if (d instanceof Date && !Number.isNaN(d.getTime())) return d
  } catch {
    // exifr can't read some formats — fall through to mtime.
  }
  try {
    const s = statSync(path)
    if (s.mtime instanceof Date && !Number.isNaN(s.mtime.getTime())) return s.mtime
  } catch {
    // ignore
  }
  return null
}

async function run() {
  if (!existsSync(RAW_DIR)) {
    console.log('\n📂 No "raw-photos/" folder found.\n')
    return
  }

  const files = readdirSync(RAW_DIR).filter((f) => VALID.has(extname(f).toLowerCase()))
  if (files.length === 0) {
    console.log('\n⚠️  raw-photos/ is empty.\n')
    return
  }

  console.log(`\n🕒 Reading dates from ${files.length} raw file(s)...`)
  const withDates = await Promise.all(
    files.map(async (name) => ({ name, takenAt: await readTakenAt(join(RAW_DIR, name)) })),
  )
  withDates.sort((a, b) => {
    if (a.takenAt && b.takenAt) return a.takenAt - b.takenAt
    if (a.takenAt) return -1
    if (b.takenAt) return 1
    return naturalSort(a.name, b.name)
  })

  // Two-phase rename to avoid overwriting collisions (e.g. `1.jpg` → `2.jpg`
  // while another `2.jpg` is trying to become `1.jpg`).
  const plan = withDates.map((f, i) => ({
    from: f.name,
    temp: `__tmp_${i}${extname(f.name).toLowerCase()}`,
    final: `${i + 1}${extname(f.name).toLowerCase()}`,
  }))

  console.log(`\n📝 Renaming ${plan.length} file(s) in chronological order...\n`)

  for (const item of plan) {
    renameSync(join(RAW_DIR, item.from), join(RAW_DIR, item.temp))
  }
  for (const item of plan) {
    renameSync(join(RAW_DIR, item.temp), join(RAW_DIR, item.final))
    console.log(`  ${item.from.padEnd(50)}  →  ${item.final}`)
  }

  console.log(`\n✅ Done. raw-photos/ is now numbered 1 … ${plan.length}.\n`)
}

run()
