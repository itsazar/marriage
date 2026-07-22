import { useMemo } from 'react'
import { motion } from 'framer-motion'

const COLORS = ['#e8824e', '#c9a24b', '#e07a5f', '#0e807b', '#c77dff', '#7b2d3a', '#f2a65a']

/**
 * A burst of confetti pieces raining down once. Render it conditionally
 * (e.g. when the countdown hits zero or on an RSVP click).
 */
export function Confetti({ count = 90 }: { count?: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        duration: 2.4 + Math.random() * 2,
        size: 6 + Math.random() * 8,
        rotate: Math.random() * 360,
        color: COLORS[i % COLORS.length],
        round: Math.random() > 0.6,
        drift: (Math.random() - 0.5) * 120,
      })),
    [count],
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-[80] overflow-hidden" aria-hidden="true">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-[-5%]"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.round ? p.size : p.size * 0.5,
            backgroundColor: p.color,
            borderRadius: p.round ? '9999px' : '2px',
          }}
          initial={{ y: '-10vh', x: 0, rotate: p.rotate, opacity: 1 }}
          animate={{ y: '110vh', x: p.drift, rotate: p.rotate + 360, opacity: [1, 1, 0.9, 0] }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn', repeat: Infinity }}
        />
      ))}
    </div>
  )
}
