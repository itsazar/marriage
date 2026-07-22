import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { couple, heroTagline } from '../data/content'
import { Petals } from './decor/Petals'
import { Waves } from './decor/Waves'
import { HeroBeach } from './decor/HeroBeach'
import { SkyDecor } from './decor/SkyDecor'
import { Countdown } from './Countdown'
import { downloadWeddingIcs } from '../utils/ics'

type Burst = { id: number; x: number; y: number; emoji: string }

const BURST_EMOJIS = ['❤️', '💜', '🌸', '🌺', '✨', '🐚']

function PullScrollCue() {
  return (
    <div className="relative flex h-20 w-16 flex-col items-center" aria-hidden="true">
      {/* Rope that stretches as the anchor tugs the page down */}
      <motion.span
        animate={{ scaleY: [1, 1.35, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="h-6 w-[2px] origin-top rounded-full bg-sand-100/70"
      />

      {/* Anchor bobbing + swaying like it's pulling downward */}
      <motion.div
        animate={{ y: [0, 10, 0], rotate: [-6, 6, -6] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="origin-top"
      >
        <svg viewBox="0 0 40 48" className="h-11 w-auto drop-shadow-md">
          {/* Ring */}
          <circle cx="20" cy="6" r="4" fill="none" stroke="#f6ece0" strokeWidth="3" />
          {/* Shaft */}
          <path d="M20 10 V40" stroke="#f6ece0" strokeWidth="3" strokeLinecap="round" />
          {/* Stock (crossbar) */}
          <path d="M11 17 H29" stroke="#f6ece0" strokeWidth="3" strokeLinecap="round" />
          {/* Flukes / arms */}
          <path
            d="M20 40 C10 40 5 33 5 25 M5 25 L2 30 M5 25 L10 28"
            fill="none"
            stroke="#f6ece0"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 40 C30 40 35 33 35 25 M35 25 L38 30 M35 25 L30 28"
            fill="none"
            stroke="#f6ece0"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </div>
  )
}

export function Hero() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.25], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  const sectionRef = useRef<HTMLElement>(null)
  const [bursts, setBursts] = useState<Burst[]>([])
  const idRef = useRef(0)

  const spawnBurst = (e: React.PointerEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const next: Burst[] = Array.from({ length: 6 }).map(() => ({
      id: idRef.current++,
      x,
      y,
      emoji: BURST_EMOJIS[Math.floor(Math.random() * BURST_EMOJIS.length)],
    }))
    setBursts((prev) => [...prev, ...next])
    // Clean up after the animation.
    const ids = new Set(next.map((b) => b.id))
    window.setTimeout(() => {
      setBursts((prev) => prev.filter((b) => !ids.has(b.id)))
    }, 1300)
  }

  return (
    <section
      ref={sectionRef}
      id="top"
      onPointerDown={spawnBurst}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* Background: layered coastal gradient (drop-in a photo/video later) */}
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-700 via-ocean-500 to-sunset-400" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.25),_transparent_60%)]" />
        {/* Sun — kept high so it never sits behind the names */}
        <div className="absolute left-1/2 top-[4%] h-32 w-32 -translate-x-1/2 rounded-full bg-gradient-to-b from-[#ffe9b0] to-[#f2a65a] blur-[2px] animate-floaty sm:top-[5%] sm:h-36 sm:w-36" />
      </motion.div>

      <SkyDecor />
      <Petals />

      {/* Tap-to-release bursts of hearts & petals */}
      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
        <AnimatePresence>
          {bursts.map((b) => (
            <motion.span
              key={b.id}
              className="absolute select-none text-xl"
              style={{ left: b.x, top: b.y }}
              initial={{ opacity: 1, scale: 0.4, x: 0, y: 0 }}
              animate={{
                opacity: 0,
                scale: 1,
                x: (Math.random() - 0.5) * 120,
                y: -60 - Math.random() * 90,
                rotate: (Math.random() - 0.5) * 80,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              {b.emoji}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      <motion.div
        style={{ opacity }}
        className="container-narrow relative z-10 px-6 text-center text-sand-50"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="eyebrow !text-sand-100"
        >
          Together with their families
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display text-6xl font-medium leading-none drop-shadow-sm sm:text-7xl md:text-8xl"
        >
          <span className="text-shimmer">{couple.displayA}</span>
          <span className="mx-3 inline-block animate-heartbeat align-middle text-4xl text-[#9b51e0] sm:text-5xl">
            ❤
          </span>
          <span className="text-shimmer">{couple.displayB}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mx-auto mt-6 max-w-xl font-serif text-lg italic tracking-wide text-sand-100 sm:text-xl"
        >
          {heroTagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.8 }}
          className="mt-10"
        >
          <Countdown />
        </motion.div>

        <div className="mt-8 flex flex-col items-center">
          <motion.button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              downloadWeddingIcs()
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 rounded-full border border-sand-100/50 bg-white/10 px-6 py-3 font-body text-sm font-medium tracking-wide text-sand-50 backdrop-blur-md transition hover:bg-white/20"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="17" rx="2" />
              <path d="M3 9h18M8 2v4M16 2v4" />
              <path d="M12 13v4M10 15h4" />
            </svg>
            Save the Date
          </motion.button>

          <motion.a
            href="#story"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="mt-4 inline-flex items-end text-sand-100/90"
          >
            <PullScrollCue />
          </motion.a>
        </div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 z-10">
        <Waves />
      </div>

      <HeroBeach />
    </section>
  )
}
