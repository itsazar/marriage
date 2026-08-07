import { travelStay } from '../data/content'
import { Reveal } from './ui/Reveal'
import { Kolam } from './decor/Kolam'

function CityIcon({ name }: { name: string }) {
  const common = { className: 'h-7 w-7', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7 }
  if (name === 'palm')
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M12 22V10" />
        <path d="M12 10c-2-3-6-4-9-2 3-2 7-1 9 2z" />
        <path d="M12 10c2-3 6-4 9-2-3-2-7-1-9 2z" />
        <path d="M12 10c0-3-2-6-5-7 3 0 5 3 5 7z" />
        <path d="M12 10c0-3 2-6 5-7-3 0-5 3-5 7z" />
      </svg>
    )
  // beach umbrella
  return (
    <svg viewBox="0 0 24 24" {...common}>
      <path d="M12 3v18" />
      <path d="M3 12a9 9 0 0 1 18 0z" />
      <path d="M12 21h5" />
    </svg>
  )
}

export function TravelStay() {
  return (
    <section id="travel" className="section-pad relative bg-sand-50">
      <div className="container-narrow">
        <Reveal className="text-center">
          <p className="eyebrow">Getting There</p>
          <h2 className="heading-display mt-3">Travel &amp; Stay</h2>
          <p className="mx-auto mt-5 max-w-2xl font-serif text-lg italic text-ink/70">
            Our celebrations span two cities — here&apos;s a little help to plan your trip.
          </p>
          <Kolam className="mt-6" />
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {travelStay.map((place, i) => (
            <Reveal key={place.id} delay={i + 1}>
              <article className="flex h-full flex-col rounded-3xl border border-sand-200 bg-white/70 p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
                <div className="flex items-center gap-4 text-ocean-500">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ocean-500/10">
                    <CityIcon name={place.icon} />
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-medium text-ink">{place.city}</h3>
                    <p className="font-body text-xs uppercase tracking-[0.18em] text-sunset-500">
                      {place.forEvents}
                    </p>
                  </div>
                </div>
                <ul className="mt-6 space-y-3">
                  {place.tips.map((tip) => (
                    <li key={tip} className="flex items-start gap-3 font-body text-sm leading-relaxed text-ink/75">
                      <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 flex-none text-gold" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {tip}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
