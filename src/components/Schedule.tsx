import { events, venue } from '../data/content'
import { Reveal } from './ui/Reveal'
import { Kolam } from './decor/Kolam'
import { downloadEventIcs, type IcsTime } from '../utils/ics'

function EventIcon({ name }: { name: string }) {
  if (name === 'rings') {
    return (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="18" cy="30" r="10" />
        <circle cx="30" cy="30" r="10" />
        <path d="M24 8l4 6h-8l4-6z" fill="currentColor" stroke="none" />
      </svg>
    )
  }
  // sparkles
  return (
    <svg viewBox="0 0 48 48" className="h-9 w-9" fill="currentColor">
      <path d="M24 4l3 9 9 3-9 3-3 9-3-9-9-3 9-3 3-9z" />
      <path d="M38 26l1.6 4.4L44 32l-4.4 1.6L38 38l-1.6-4.4L32 32l4.4-1.6L38 26z" opacity="0.8" />
      <path d="M11 28l1.3 3.7L16 33l-3.7 1.3L11 38l-1.3-3.7L6 33l3.7-1.3L11 28z" opacity="0.6" />
    </svg>
  )
}

export function Schedule() {
  return (
    <section id="events" className="section-pad relative overflow-hidden bg-ocean-700 text-sand-50">
      <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(232,130,78,0.25),_transparent_45%)]" />
      <div className="container-narrow relative">
        <Reveal className="text-center">
          <p className="eyebrow !text-sunset-400">Save the Dates</p>
          <h2 className="heading-display mt-3 !text-sand-50">Wedding Events</h2>
          <Kolam className="mt-6" />
        </Reveal>

        <div className="relative mx-auto mt-14 max-w-3xl">
          {/* Timeline spine */}
          <span
            className="pointer-events-none absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-gold/60 via-sand-100/25 to-transparent md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          />

          <div className="space-y-10 md:space-y-16">
            {events.map((ev, i) => {
              const alignRight = i % 2 === 1
              return (
                <Reveal key={ev.id} delay={i + 1}>
                  <div
                    className={`relative pl-16 md:pl-0 md:flex ${
                      alignRight ? 'md:justify-start' : 'md:justify-end'
                    }`}
                  >
                    {/* Node marker */}
                    <span className="absolute left-6 top-6 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full bg-gold ring-4 ring-ocean-700 md:left-1/2" />

                    <article
                      className={`group relative overflow-hidden rounded-3xl border border-sand-100/20 bg-white/5 p-8 backdrop-blur-md transition-all duration-500 hover:border-gold/50 hover:bg-white/10 md:w-[calc(50%-2.5rem)]`}
                    >
                      <div className="mb-5 flex items-center gap-4 text-gold">
                        <EventIcon name={ev.icon} />
                        <span className="font-serif text-lg text-sand-100/80">{ev.tamilName}</span>
                      </div>
                      <h3 className="font-display text-3xl font-medium">{ev.name}</h3>
                      <p className="mt-3 font-body text-sm uppercase tracking-[0.2em] text-sunset-400">
                        {ev.date}
                      </p>
                      <p className="mt-1 font-serif text-2xl text-sand-50">{ev.time}</p>
                      <p className="mt-4 font-body text-sm leading-relaxed text-sand-100/70">{ev.blurb}</p>

                      {/* Add to calendar */}
                      <button
                        type="button"
                        onClick={() =>
                          downloadEventIcs({
                            title: `${ev.name} — Lavanya & Azar`,
                            start: ev.start as IcsTime,
                            end: ev.end as IcsTime,
                            description: ev.blurb,
                            location: `${venue.name}, ${venue.area}, ${venue.city}`,
                            fileName: `${ev.id}-lavanya-azar.ics`,
                          })
                        }
                        className="relative z-10 mt-6 inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-5 py-2.5 font-body text-xs font-semibold uppercase tracking-[0.15em] text-gold transition hover:bg-gold/20"
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="17" rx="2" />
                          <path d="M3 9h18M8 2v4M16 2v4" />
                        </svg>
                        Add to Calendar
                      </button>

                      <span className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold/10 transition-transform duration-500 group-hover:scale-150" />
                    </article>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
