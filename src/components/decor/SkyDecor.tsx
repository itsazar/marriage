import { motion } from 'framer-motion'

/** A gliding seagull with filled wings and a little body. */
function Seagull({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 24" className={className} aria-hidden="true">
      {/* Left wing */}
      <path
        d="M24 13 C17 4 10 3 2 7 C9 8 13 11 18 15 C20 12 22 12 24 13 Z"
        fill="#fbfdff"
        stroke="#d7e3ec"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      {/* Right wing */}
      <path
        d="M24 13 C31 4 38 3 46 7 C39 8 35 11 30 15 C28 12 26 12 24 13 Z"
        fill="#eef4f9"
        stroke="#d7e3ec"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      {/* Body */}
      <ellipse cx="24" cy="14" rx="3.4" ry="2.4" fill="#fbfdff" />
      {/* Beak */}
      <path d="M24 15 L26 18 L23 17 Z" fill="#f2a65a" />
    </svg>
  )
}

/** A small sailboat. */
function Sailboat({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden="true">
      <path d="M30 42 V8" stroke="#7c4f26" strokeWidth="2" strokeLinecap="round" />
      <path d="M31 10 L49 40 H31 Z" fill="#f6ece0" />
      <path d="M29 15 L14 40 H29 Z" fill="#efe0cc" />
      <path d="M9 42 H51 L45 52 H15 Z" fill="#9a6533" />
    </svg>
  )
}

function DriftingGull({
  top,
  from,
  to,
  duration,
  delay = 0,
  size,
}: {
  top: string
  from: string
  to: string
  duration: number
  delay?: number
  size: string
}) {
  return (
    <motion.div
      className="absolute"
      style={{ top }}
      initial={{ x: from }}
      animate={{ x: to }}
      transition={{ duration, repeat: Infinity, ease: 'linear', delay }}
    >
      <motion.div
        animate={{ y: [0, -8, 0], scaleY: [1, 0.82, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Seagull className={size} />
      </motion.div>
    </motion.div>
  )
}

/** Sky decorations for the hero: drifting seagulls and a sailboat on the sea. */
export function SkyDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <DriftingGull top="16%" from="-6vw" to="106vw" duration={34} size="h-6 w-auto sm:h-7" />
      <DriftingGull top="22%" from="-14vw" to="106vw" duration={40} delay={6} size="h-5 w-auto sm:h-6" />
      <DriftingGull top="12%" from="-24vw" to="106vw" duration={46} delay={12} size="h-7 w-auto sm:h-8" />

      {/* Sailboat drifting along the sea with a gentle bob */}
      <motion.div
        className="absolute top-[52%]"
        initial={{ x: '-12vw' }}
        animate={{ x: '112vw' }}
        transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
      >
        <motion.div
          animate={{ y: [0, -6, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Sailboat className="h-12 w-auto opacity-90 drop-shadow-sm sm:h-16" />
        </motion.div>
      </motion.div>
    </div>
  )
}
