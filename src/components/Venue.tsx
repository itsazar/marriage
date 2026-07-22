import { venue } from '../data/content'
import { Reveal } from './ui/Reveal'
import { Kolam } from './decor/Kolam'

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
              <svg viewBox="0 0 24 24" className="h-10 w-10 text-ocean-500" fill="currentColor">
                <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
              </svg>
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
      </div>
    </section>
  )
}
