import { useMemo } from 'react'

/**
 * Gentle falling flower petals for a Tamil-wedding feel.
 * Purely decorative, pointer-events disabled, respects reduced-motion via CSS.
 */
export function Petals({ count = 14 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const size = 10 + Math.random() * 16
        return {
          id: i,
          left: `${Math.random() * 100}%`,
          size,
          duration: 9 + Math.random() * 9,
          delay: Math.random() * 10,
          hue: Math.random() > 0.5 ? '#e8824e' : '#e07a5f',
          opacity: 0.35 + Math.random() * 0.4,
        }
      }),
    [count],
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute top-0 block"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animation: `fall ${p.duration}s linear ${p.delay}s infinite`,
          }}
        >
          <svg viewBox="0 0 24 24" width="100%" height="100%">
            <path
              d="M12 2C13.5 7 17 8.5 22 12c-5 3.5-8.5 5-10 10-1.5-5-5-6.5-10-10 5-3.5 8.5-5 10-10z"
              fill={p.hue}
            />
          </svg>
        </span>
      ))}
    </div>
  )
}
