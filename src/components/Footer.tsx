import { couple } from '../data/content'
import { Waves } from './decor/Waves'
import { Kolam } from './decor/Kolam'

export function Footer() {
  return (
    <footer className="relative bg-ocean-700 text-sand-50">
      <Waves flip className="text-sand-100" />
      <div className="container-narrow px-6 pb-14 pt-6 text-center">
        <Kolam className="mb-6" />
        <p className="font-display text-4xl">
          <span className="text-shimmer">{couple.displayA}</span>
          <span className="mx-2 font-serif text-2xl text-sand-100">&amp;</span>
          <span className="text-shimmer">{couple.displayB}</span>
        </p>
        <p className="mt-4 font-serif text-lg italic text-sand-100/80">
          With love &amp; gratitude, we can't wait to see you by the sea.
        </p>
        <p className="mt-8 font-body text-xs uppercase tracking-[0.3em] text-sand-100/60">
          Made with love · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
