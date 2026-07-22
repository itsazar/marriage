import { motion, useScroll, useTransform } from 'framer-motion'
import { couple, heroTagline } from '../data/content'
import { Petals } from './decor/Petals'
import { Waves } from './decor/Waves'
import { HeroBeach } from './decor/HeroBeach'
import { SkyDecor } from './decor/SkyDecor'
import { Countdown } from './Countdown'

export function Hero() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.25], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      {/* Background: layered coastal gradient (drop-in a photo/video later) */}
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-700 via-ocean-500 to-sunset-400" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.25),_transparent_60%)]" />
        {/* Sun — kept high so it never sits behind the names */}
        <div className="absolute left-1/2 top-[4%] h-32 w-32 -translate-x-1/2 rounded-full bg-gradient-to-b from-[#ffe9b0] to-[#f2a65a] blur-[2px] animate-floaty sm:top-[5%] sm:h-36 sm:w-36" />
      </motion.div>

      <SkyDecor />
      <Petals />

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
          <span className="mx-3 font-serif text-4xl align-middle text-sand-100 sm:text-5xl">&amp;</span>
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

        <motion.a
          href="#story"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-12 inline-flex flex-col items-center gap-2 text-sand-100/90"
        >
          <span className="font-body text-xs uppercase tracking-[0.3em]">Scroll</span>
          <span className="flex h-9 w-5 items-start justify-center rounded-full border border-sand-100/60 p-1">
            <span className="h-2 w-1 animate-bounce rounded-full bg-sand-100" />
          </span>
        </motion.a>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 z-10">
        <Waves />
      </div>

      <HeroBeach />
    </section>
  )
}
