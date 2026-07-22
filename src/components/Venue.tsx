import { venue } from '../data/content'
import { Reveal } from './ui/Reveal'
import { Kolam } from './decor/Kolam'

function TravelIcon({ name }: { name: string }) {
  const common = { className: 'h-6 w-6', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8 }
  if (name === 'plane')
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M2 14l20-7-7 20-3-8-8-3z" />
      </svg>
    )
  if (name === 'car')
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M3 13l2-5a3 3 0 0 1 3-2h8a3 3 0 0 1 3 2l2 5" />
        <path d="M3 13h18v4H3z" />
        <circle cx="7" cy="18" r="1.6" />
        <circle cx="17" cy="18" r="1.6" />
      </svg>
    )
  if (name === 'parking')
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M9 16V8h4a2.5 2.5 0 0 1 0 5H9" />
      </svg>
    )
  // bed
  return (
    <svg viewBox="0 0 24 24" {...common}>
      <path d="M3 18v-6h18v6" />
      <path d="M3 12V7h9v5" />
      <path d="M3 18v2M21 18v2" />
    </svg>
  )
}

export function Venue() {
  const mapEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(
    venue.mapsQuery,
  )}&t=&z=14&ie=UTF8&iwloc=&output=embed`
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    venue.mapsQuery,
  )}`

  return (
    <section id="venue" className="section-pad relative bg-sand-50">
      <div className="container-narrow">
        <Reveal className="text-center">
          <p className="eyebrow">Where</p>
          <h2 className="heading-display mt-3">The Venue</h2>
          <Kolam className="mt-6" />
        </Reveal>

        <div className="mt-14 grid items-stretch gap-8 md:grid-cols-2">
          <Reveal className="flex flex-col justify-center">
            <div className="rounded-3xl border border-sand-200 bg-white/70 p-8 shadow-sm">
              <span className="relative flex h-12 w-12 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-ocean-400/40" />
                <svg viewBox="0 0 24 24" className="relative h-10 w-10 text-ocean-500" fill="currentColor">
                  <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
                </svg>
              </span>
              <h3 className="mt-4 font-display text-3xl font-medium text-ink">{venue.name}</h3>
              <p className="mt-2 font-serif text-lg text-ink/80">{venue.area}</p>
              <p className="font-serif text-lg text-ink/80">{venue.city}</p>

              <p className="mt-5 rounded-xl bg-sand-100 px-4 py-3 font-body text-sm leading-relaxed text-ink/70">
                {venue.note}
              </p>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex items-center gap-2 rounded-full bg-ocean-500 px-6 py-3 font-body text-sm font-medium tracking-wide text-sand-50 transition-all duration-300 hover:bg-ocean-600 hover:shadow-lg"
              >
                Get Directions
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="h-full min-h-[320px] overflow-hidden rounded-3xl border border-sand-200 shadow-sm">
              <iframe
                title={`Map to ${venue.name}`}
                src={mapEmbed}
                className="h-full w-full"
                style={{ minHeight: 320, border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>

        {/* Getting there */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {venue.gettingThere.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.5}>
              <div className="h-full rounded-2xl border border-sand-200 bg-white/70 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ocean-500/10 text-ocean-600">
                  <TravelIcon name={g.icon} />
                </span>
                <h4 className="mt-4 font-serif text-xl text-ink">{g.title}</h4>
                <p className="mt-1 font-body text-sm leading-relaxed text-ink/60">{g.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
