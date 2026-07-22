import { motion } from 'framer-motion'
import { Reveal } from './ui/Reveal'
import { DoodleDraw } from './decor/DoodleDraw'
import { sunDoodle, arrowRightDoodle, arrowLeftDoodle } from '../data/doodles'

const CARICATURE = '/caricature.png'

const ARROW_RED = '#e23b3b'

export function MeetCouple() {
  return (
    <section
      id="couple"
      className="section-pad relative overflow-hidden bg-gradient-to-b from-sand-100 to-sand-50"
    >
      <div className="container-narrow relative">
        <Reveal className="text-center">
          <p className="eyebrow">Say Hello</p>
          <h2 className="heading-display mt-3">Meet the Couple</h2>
        </Reveal>

        {/* Caricature split-reveal stage */}
        <div className="relative mt-12 flex justify-center">
          {/* Self-drawing sun behind the couple */}
          <DoodleDraw
            viewBox={sunDoodle.viewBox}
            paths={sunDoodle.paths}
            color="#e8a24e"
            strokeWidth={3}
            duration={1.4}
            className="pointer-events-none absolute top-1/2 left-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 opacity-60 sm:h-[520px] sm:w-[520px]"
          />
          {/* Warm glow */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sunset-400/30 blur-3xl sm:h-80 sm:w-80" />

          {/* The split image: two clipped halves that meet in the center */}
          <div className="relative animate-floaty">
            {/* Invisible base image establishes exact dimensions */}
            <img
              src={CARICATURE}
              alt=""
              aria-hidden="true"
              className="block h-80 w-auto opacity-0 sm:h-[26rem]"
            />

            {/* Left half — slides in from the left */}
            <motion.div
              initial={{ x: -90, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 left-0 w-1/2 overflow-hidden"
            >
              <img
                src={CARICATURE}
                alt="Lavanya"
                className="absolute inset-y-0 left-0 h-full w-auto max-w-none drop-shadow-2xl"
              />
            </motion.div>

            {/* Right half — slides in from the right */}
            <motion.div
              initial={{ x: 90, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 right-0 w-1/2 overflow-hidden"
            >
              <img
                src={CARICATURE}
                alt="Azar"
                className="absolute inset-y-0 right-0 h-full w-auto max-w-none drop-shadow-2xl"
              />
            </motion.div>

            {/* Shimmer glint sweeping across the figures (masked to the caricature) */}
            <motion.div
              aria-hidden="true"
              initial={{ x: '-130%' }}
              whileInView={{ x: '130%' }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 2.4, delay: 1, ease: 'easeInOut', repeat: Infinity, repeatDelay: 3 }}
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(105deg, transparent 42%, rgba(255,255,255,0.7) 50%, transparent 58%)',
                mixBlendMode: 'screen',
                WebkitMaskImage: `url(${CARICATURE})`,
                maskImage: `url(${CARICATURE})`,
                WebkitMaskSize: '100% 100%',
                maskSize: '100% 100%',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
              }}
            />
          </div>

          {/* Funny animated arrow callouts */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: -12 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 1.1, type: 'spring', stiffness: 200, damping: 14 }}
            className="pointer-events-none absolute left-2 top-[6%] z-20 w-36 text-center sm:left-[19%] sm:w-48"
          >
            <p className="-rotate-6 font-hand text-2xl font-bold leading-tight text-[#e23b3b] sm:text-3xl">
              Undefeated in every argument 😎
            </p>
            <motion.div
              animate={{ rotate: [0, -4, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              className="mt-1 flex justify-end pr-0"
            >
              <DoodleDraw
                viewBox={arrowRightDoodle.viewBox}
                paths={arrowRightDoodle.paths}
                color={ARROW_RED}
                strokeWidth={4}
                duration={0.9}
                delay={1.3}
                className="h-14 w-24"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: -12 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 1.35, type: 'spring', stiffness: 200, damping: 14 }}
            className="pointer-events-none absolute right-2 top-0 z-20 w-36 text-center sm:right-[19%] sm:w-48"
          >
            <p className="rotate-6 font-hand text-2xl font-bold leading-tight text-[#e23b3b] sm:text-3xl">
              Lost every debate, won her heart 🏆
            </p>
            <motion.div
              animate={{ rotate: [0, 4, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              className="mt-1 flex justify-start pl-0"
            >
              <DoodleDraw
                viewBox={arrowLeftDoodle.viewBox}
                paths={arrowLeftDoodle.paths}
                color={ARROW_RED}
                strokeWidth={4}
                duration={0.9}
                delay={1.55}
                className="h-14 w-24"
              />
            </motion.div>
          </motion.div>
        </div>

        <Reveal delay={1} className="mx-auto mt-10 max-w-xl text-center">
          <p className="font-serif text-xl italic text-ink/80">
            Two very different worlds, one unmistakable connection — turning up to forever in
            style.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
