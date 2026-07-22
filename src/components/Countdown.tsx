import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { countdownTarget } from '../data/content'
import { Confetti } from './decor/Confetti'

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number }

function getTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now())
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function Unit({ value, label }: { value: number; label: string }) {
  const padded = String(value).padStart(2, '0')
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border border-sand-100/30 bg-white/10 backdrop-blur-md sm:h-20 sm:w-20">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={padded}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="absolute font-display text-3xl font-semibold tabular-nums sm:text-4xl"
          >
            {padded}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 font-body text-[0.65rem] uppercase tracking-[0.25em] text-sand-100/90">
        {label}
      </span>
    </div>
  )
}

export function Countdown() {
  const [time, setTime] = useState<TimeLeft>(() => getTimeLeft(countdownTarget))

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(countdownTarget)), 1000)
    return () => clearInterval(id)
  }, [])

  const done = time.days === 0 && time.hours === 0 && time.minutes === 0 && time.seconds === 0

  if (done) {
    return (
      <>
        <Confetti />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-2"
        >
          <span className="animate-heartbeat text-4xl">🎉</span>
          <p className="font-display text-3xl font-semibold text-sand-50 sm:text-4xl">
            Today's the day!
          </p>
          <p className="font-serif text-lg italic text-sand-100/90">
            Thank you for celebrating with us by the sea.
          </p>
        </motion.div>
      </>
    )
  }

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-5">
      <Unit value={time.days} label="Days" />
      <Unit value={time.hours} label="Hours" />
      <Unit value={time.minutes} label="Mins" />
      <Unit value={time.seconds} label="Secs" />
    </div>
  )
}
