import { Reveal } from './ui/Reveal'

// Pull the same optimized thumbs the album page uses. Vite dedupes the modules.
const thumbModules = import.meta.glob('../assets/album/thumb/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const thumbs = Object.keys(thumbModules)
  .sort((a, b) => {
    const na = a.match(/(\d+)\.\w+$/)
    const nb = b.match(/(\d+)\.\w+$/)
    if (na && nb) return Number(na[1]) - Number(nb[1])
    return a.localeCompare(b)
  })
  .map((k) => thumbModules[k])

// Two curated rows. We pick every-other photo for a bit of variety per row and
// duplicate the array so the CSS marquee can loop seamlessly.
const rowA = thumbs.filter((_, i) => i % 2 === 0)
const rowB = thumbs.filter((_, i) => i % 2 === 1)

function openAlbum() {
  window.location.hash = '#/album'
}

function Row({
  photos,
  reverse,
}: {
  photos: string[]
  reverse?: boolean
}) {
  const doubled = [...photos, ...photos]
  return (
    <div className="group/row relative overflow-hidden">
      {/* Soft edge fades so the strip doesn't feel cut off */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ocean-700 to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ocean-700 to-transparent sm:w-24" />

      <div
        className={`flex w-max gap-3 sm:gap-4 ${
          reverse ? 'animate-marquee-slow-rev' : 'animate-marquee-slow'
        } group-hover/row:[animation-play-state:paused]`}
      >
        {doubled.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={openAlbum}
            aria-label="Open the album"
            className="relative h-20 w-20 flex-none overflow-hidden rounded-full border border-white/80 shadow-md ring-1 ring-white/30 transition-transform duration-300 hover:scale-110 sm:h-24 sm:w-24"
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export function AlbumTeaser() {
  if (thumbs.length === 0) return null

  return (
    <section
      id="album"
      className="section-pad relative overflow-hidden bg-gradient-to-b from-ocean-700 via-ocean-600 to-ocean-700 text-sand-50"
    >
      {/* Warm glow behind the marquee */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sunset-500/15 blur-3xl" />

      <div className="container-narrow relative">
        <Reveal className="text-center">
          <p className="eyebrow !text-gold">The Album</p>
          <h2 className="heading-display mt-3 !text-sand-50">
            <span className="bg-gradient-to-r from-gold via-sunset-400 to-coral bg-clip-text italic text-transparent">
              Frozen in Time
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-body text-sm text-sand-100/80 sm:text-base">
            A little peek at years of quiet moments, small smiles and everything in between.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-col gap-3 sm:mt-14 sm:gap-4">
          <Row photos={rowA} />
          <Row photos={rowB} reverse />
        </div>

        <Reveal className="mt-10 flex justify-center sm:mt-14">
          <button
            type="button"
            onClick={openAlbum}
            className="group inline-flex items-center gap-3 rounded-full border border-gold/60 bg-gold/10 px-7 py-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-gold shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-gold hover:text-ocean-700"
          >
            Open the Album
            <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </Reveal>
      </div>
    </section>
  )
}
