import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { couple } from '../data/content'

/**
 * A one-time cinematic intro: two sand-toned panels part like curtains to
 * reveal the site, with the couple's names + heart fading up in the centre.
 */
export function IntroCurtain() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    // Respect reduced motion — skip the reveal entirely.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const t = setTimeout(() => setShow(false), reduce ? 0 : 3800)
    return () => clearTimeout(t)
  }, [])

  // Lock scroll while the curtain is up.
  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, delay: 0.5 } }}
          aria-hidden="true"
        >
          {/* Left panel */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-br from-ocean-700 to-ocean-600"
            initial={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1], delay: 0.6 }}
          />
          {/* Right panel */}
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-bl from-sunset-400 to-sunset-500"
            initial={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1], delay: 0.6 }}
          />

          {/* Centre monogram */}
          <motion.div
            className="relative z-10 text-center text-sand-50"
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, transition: { duration: 0.4 } }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <p className="font-body text-[0.7rem] uppercase tracking-[0.4em] text-sand-100/80">
              The wedding of
            </p>
            <p className="mt-4 font-display text-5xl font-medium leading-none sm:text-7xl">
              {couple.displayA[0]}
              <motion.span
                className="mx-2 inline-block text-[#c77dff]"
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
              >
                ❤
              </motion.span>
              {couple.displayB[0]}
            </p>
            <motion.p
              className="mt-4 font-hand text-2xl text-sand-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              {couple.displayA} &amp; {couple.displayB}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
