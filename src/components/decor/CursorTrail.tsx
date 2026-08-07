import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type Speck = { id: number; x: number; y: number; emoji: string }

const TRAIL_EMOJIS = ['🌸', '🌺', '❤️', '✨', '🐚']

/**
 * A gentle trail of petals & hearts that follows the cursor.
 * Disabled on touch devices and when the user prefers reduced motion.
 */
export function CursorTrail() {
  const [specks, setSpecks] = useState<Speck[]>([])
  const idRef = useRef(0)
  const lastRef = useRef(0)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reduced) return

    const onMove = (e: MouseEvent) => {
      const now = performance.now()
      // Throttle so we drop a petal at most every ~90ms.
      if (now - lastRef.current < 90) return
      lastRef.current = now

      const speck: Speck = {
        id: idRef.current++,
        x: e.clientX,
        y: e.clientY,
        emoji: TRAIL_EMOJIS[Math.floor(Math.random() * TRAIL_EMOJIS.length)],
      }
      setSpecks((prev) => [...prev.slice(-18), speck])
      window.setTimeout(() => {
        setSpecks((prev) => prev.filter((s) => s.id !== speck.id))
      }, 1100)
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      <AnimatePresence>
        {specks.map((s) => (
          <motion.span
            key={s.id}
            className="absolute select-none text-sm"
            style={{ left: s.x, top: s.y }}
            initial={{ opacity: 0.9, scale: 0.5, x: '-50%', y: '-50%' }}
            animate={{ opacity: 0, scale: 1, y: '20%', rotate: (Math.random() - 0.5) * 90 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            {s.emoji}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}
