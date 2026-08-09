import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Auto-collect every image dropped into src/assets/album — scales to hundreds.
const modules = import.meta.glob('../assets/album/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const photos = Object.keys(modules)
  .sort((a, b) => {
    // Natural sort so 2.jpg comes before 10.jpg.
    const na = a.match(/(\d+)\.\w+$/)
    const nb = b.match(/(\d+)\.\w+$/)
    if (na && nb) return Number(na[1]) - Number(nb[1])
    return a.localeCompare(b)
  })
  .map((k) => modules[k])

// Repeat the available photos to fill the whole page for now. Replace by simply
// dropping more images into src/assets/album/ (the tiling shrinks automatically).
const TILE_COUNT = 450
const tiles = photos.length
  ? Array.from({ length: TILE_COUNT }, (_, i) => photos[i % photos.length])
  : []

function goHome() {
  window.location.hash = '#/'
}

export function AlbumPage() {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const n = photos.length

  // Refs + cached centers for the mouse-following magnify (wave) effect.
  const tileRefs = useRef<(HTMLButtonElement | null)[]>([])
  const centers = useRef<{ x: number; y: number }[]>([])
  const rafRef = useRef<number | null>(null)

  const measure = useCallback(() => {
    centers.current = tileRefs.current.map((el) => {
      if (!el) return { x: 0, y: 0 }
      const r = el.getBoundingClientRect()
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
    })
  }, [])

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  const applyWave = useCallback((mx: number, my: number) => {
    const radius = 150 // px area of influence around the cursor
    const maxScale = 2 // zoomed-in tile right under the cursor
    const minScale = 0.82 // everything else gently zooms out
    const els = tileRefs.current
    const cs = centers.current
    for (let i = 0; i < els.length; i++) {
      const el = els[i]
      const c = cs[i]
      if (!el || !c) continue
      const dx = c.x - mx
      const dy = c.y - my
      const dist = Math.hypot(dx, dy)
      const t = Math.max(0, 1 - dist / radius) // 1 at cursor → 0 at edge
      const ease = t * t * (3 - 2 * t) // smoothstep for a soft wave
      const scale = minScale + (maxScale - minScale) * ease
      el.style.transform = `scale(${scale})`
      el.style.zIndex = ease > 0.05 ? String(10 + Math.round(ease * 20)) : '1'
    }
  }, [])

  const resetWave = useCallback(() => {
    for (const el of tileRefs.current) {
      if (!el) continue
      el.style.transform = 'scale(1)'
      el.style.zIndex = '1'
    }
  }, [])

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const mx = e.clientX
      const my = e.clientY
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => applyWave(mx, my))
    },
    [applyWave],
  )

  const prev = useCallback(() => setActive((i) => (i - 1 + n) % n), [n])
  const next = useCallback(() => setActive((i) => (i + 1) % n), [n])

  const open = (i: number) => {
    setActive(i)
    setLightbox(true)
  }

  // Keyboard navigation for the lightbox.
  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'Escape') setLightbox(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, prev, next])

  // Ensure we start at the top of this page.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (n === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-sand-50 px-6 text-center">
        <p className="font-serif text-2xl text-ink">No photos yet</p>
        <p className="max-w-md font-body text-ink/60">
          Drop your images into <code className="rounded bg-sand-200 px-1">src/assets/album/</code> and
          they’ll appear here automatically.
        </p>
        <button
          type="button"
          onClick={goHome}
          className="rounded-full bg-ocean-600 px-6 py-2 font-body text-sm text-sand-50"
        >
          Back home
        </button>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gradient-to-b from-sand-50 to-sand-100">
      {/* Header */}
      <header className="z-30 flex shrink-0 items-center justify-between bg-sand-50/85 px-6 py-3 backdrop-blur-md">
        <button
          type="button"
          onClick={goHome}
          className="flex items-center gap-2 font-body text-sm text-ink/80 transition hover:text-ocean-600"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 6l-6 6 6 6" />
          </svg>
          Back
        </button>
        <h1 className="font-display text-xl font-semibold text-ink sm:text-2xl">Our Album</h1>
        <span className="font-body text-xs tabular-nums text-ink/50">{n} photos</span>
      </header>

      {/* Full-page mosaic of round photos — fills the viewport without scrolling */}
      <div className="min-h-0 w-full flex-1 overflow-hidden px-1.5 py-2 sm:px-3 sm:py-3">
        <div
          onPointerMove={onPointerMove}
          onPointerLeave={resetWave}
          className="grid grid-cols-[repeat(auto-fill,minmax(28px,1fr))] gap-1 sm:grid-cols-[repeat(auto-fill,minmax(38px,1fr))] sm:gap-1.5"
        >
          {tiles.map((src, i) => (
            <button
              key={`${i}-${src}`}
              ref={(el) => {
                tileRefs.current[i] = el
              }}
              type="button"
              onClick={() => open(i % n)}
              aria-label={`Open photo ${(i % n) + 1}`}
              style={{ willChange: 'transform' }}
              className="group relative aspect-square overflow-hidden rounded-full border border-white shadow-sm ring-1 ring-sand-200 transition-transform duration-200 ease-out hover:shadow-lg"
            >
              <img
                src={src}
                alt={`Album photo ${(i % n) + 1}`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <span className="pointer-events-none absolute inset-0 rounded-full bg-sunset-500/0 transition-colors group-hover:bg-sunset-500/10" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
          >
            <button
              type="button"
              onClick={() => setLightbox(false)}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              aria-label="Previous photo"
              className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>

            <motion.img
              key={active}
              src={photos[active]}
              alt={`Album photo ${active + 1}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
            />

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              aria-label="Next photo"
              className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>

            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 font-body text-sm tabular-nums text-white/70">
              {active + 1} / {n}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
