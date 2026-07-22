import { useState } from 'react'
import { couple, rsvpFormUrl, rsvpDeadline } from '../data/content'
import { Reveal } from './ui/Reveal'
import { Petals } from './decor/Petals'
import { Confetti } from './decor/Confetti'

export function Rsvp() {
  const [celebrate, setCelebrate] = useState(false)

  const cheer = () => {
    setCelebrate(true)
    window.setTimeout(() => setCelebrate(false), 4500)
  }

  return (
    <section
      id="rsvp"
      className="section-pad relative overflow-hidden bg-gradient-to-br from-sunset-500 via-coral to-maroon text-sand-50"
    >
      {celebrate && <Confetti count={110} />}
      <Petals count={10} />
      <div className="container-narrow relative text-center">
        <Reveal>
          <p className="eyebrow !text-sand-100">Will you join us?</p>
          <h2 className="heading-display mt-3 !text-sand-50">RSVP</h2>
          <p className="mx-auto mt-6 max-w-xl font-serif text-lg italic text-sand-100">
            Your presence is the greatest blessing. Kindly let us know if you'll be celebrating
            with us so we can make it perfect.
          </p>

          <a
            href={rsvpFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={cheer}
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-sand-50 px-9 py-4 font-body text-sm font-semibold uppercase tracking-[0.2em] text-maroon shadow-xl transition-all duration-300 hover:scale-105 hover:bg-white"
          >
            Respond Now
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>

          <p className="mt-6 font-body text-sm tracking-wide text-sand-100/80">{rsvpDeadline}</p>
          <p className="mt-10 font-display text-2xl text-shimmer">{couple.hashtag}</p>
        </Reveal>
      </div>
    </section>
  )
}
