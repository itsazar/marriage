import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { gallery } from '../data/content'
import { Reveal } from './ui/Reveal'
import { Kolam } from './decor/Kolam'

// Gradient fallbacks so the layout looks intentional before real photos are added.
const fallbackGradients = [
  'from-ocean-500 to-sunset-400',
  'from-sunset-500 to-coral',
  'from-ocean-700 to-ocean-400',
  'from-coral to-gold',
  'from-ocean-400 to-sand-300',
  'from-maroon to-sunset-500',
]

export function Gallery() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section id="gallery" className="section-pad relative bg-sand-100">
      <div className="container-narrow">
        <Reveal className="text-center">
          <p className="eyebrow">Memories</p>
          <h2 className="heading-display mt-3">Moments We Cherish</h2>
          <Kolam className="mt-6" />
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3">
          {gallery.map((photo, i) => (
            <Reveal
              key={i}
              delay={i * 0.5}
              className={i % 5 === 0 ? 'col-span-2 row-span-2 md:col-span-1 md:row-span-2' : ''}
            >
              <button
                type="button"
                onClick={() => setActive(i)}
                className="group relative block h-full min-h-[150px] w-full overflow-hidden rounded-2xl shadow-sm"
              >
                {photo.src ? (
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div
                    className={`flex h-full min-h-[150px] w-full items-center justify-center bg-gradient-to-br ${
                      fallbackGradients[i % fallbackGradients.length]
                    } transition-transform duration-700 group-hover:scale-110`}
                  >
                    <svg viewBox="0 0 24 24" className="h-8 w-8 text-white/70" fill="currentColor">
                      <path d="M21 5H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1zM8.5 9a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM5 17l4-5 3 4 3-3 4 4H5z" />
                    </svg>
                  </div>
                )}
                <span className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/60 to-transparent p-3 text-left font-serif text-sm text-white transition-transform duration-300 group-hover:translate-y-0">
                  {photo.caption}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[80vh] w-full max-w-2xl overflow-hidden rounded-2xl"
            >
              {gallery[active].src ? (
                <img
                  src={gallery[active].src}
                  alt={gallery[active].caption}
                  className="h-full w-full object-contain"
                />
              ) : (
                <div
                  className={`flex aspect-[4/3] w-full items-center justify-center bg-gradient-to-br ${
                    fallbackGradients[active % fallbackGradients.length]
                  }`}
                >
                  <p className="font-display text-3xl text-white/90">{gallery[active].caption}</p>
                </div>
              )}
            </motion.div>
            <button
              type="button"
              aria-label="Close"
              onClick={() => setActive(null)}
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white backdrop-blur-md transition hover:bg-white/20"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
