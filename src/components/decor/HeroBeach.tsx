import { motion } from 'framer-motion'

/** A stylised coconut palm tree in the wedding palette. */
function PalmTree({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 160 220"
      className={`${className} ${flip ? '-scale-x-100' : ''}`}
      aria-hidden="true"
    >
      {/* Trunk */}
      <path
        d="M74 214 C68 156 68 112 80 70 L92 70 C82 112 82 156 90 214 Z"
        fill="#9a6533"
      />
      <path d="M78 200 h8 M77 176 h9 M77 150 h10 M78 124 h9 M79 98 h9" stroke="#7c4f26" strokeWidth="2" />
      {/* Fronds */}
      <g fill="#0e807b">
        <path d="M82 66 C44 62 20 80 4 102 C30 87 56 80 82 74 Z" />
        <path d="M82 66 C48 43 28 33 12 29 C36 40 60 52 82 72 Z" />
        <path d="M82 66 C71 33 67 17 67 3 C79 20 85 42 86 70 Z" />
        <path d="M82 66 C93 33 99 17 101 3 C91 22 85 44 84 70 Z" />
        <path d="M82 66 C116 43 136 33 152 29 C128 40 104 52 82 72 Z" />
        <path d="M82 66 C120 62 144 80 160 102 C134 87 108 80 82 74 Z" />
      </g>
      <g fill="#0b6763">
        <path d="M82 66 C60 50 40 48 24 52 C48 56 66 62 82 70 Z" />
        <path d="M82 66 C104 50 124 48 140 52 C116 56 98 62 82 70 Z" />
      </g>
      {/* Coconuts */}
      <circle cx="74" cy="72" r="5" fill="#6f4420" />
      <circle cx="90" cy="72" r="5" fill="#6f4420" />
      <circle cx="82" cy="80" r="5" fill="#6f4420" />
    </svg>
  )
}

/** A little crab. */
function Crab({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 30" className={className} aria-hidden="true">
      {/* Legs */}
      <g stroke="#c14d34" strokeWidth="2" strokeLinecap="round">
        <path d="M13 20 L4 23" />
        <path d="M14 22 L7 27" />
        <path d="M31 20 L40 23" />
        <path d="M30 22 L37 27" />
      </g>
      {/* Claws */}
      <g fill="#e07a5f">
        <circle cx="7" cy="14" r="4" />
        <circle cx="37" cy="14" r="4" />
      </g>
      <g stroke="#e07a5f" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M10 15 L15 17" />
        <path d="M34 15 L29 17" />
      </g>
      {/* Body */}
      <ellipse cx="22" cy="17" rx="11" ry="7" fill="#e07a5f" />
      {/* Eyes */}
      <line x1="18" y1="11" x2="17" y2="5" stroke="#c14d34" strokeWidth="1.5" />
      <line x1="26" y1="11" x2="27" y2="5" stroke="#c14d34" strokeWidth="1.5" />
      <circle cx="17" cy="4" r="2.2" fill="#2c2320" />
      <circle cx="27" cy="4" r="2.2" fill="#2c2320" />
    </svg>
  )
}

/** A plump five-arm starfish. */
function Starfish({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      {/* Chunky rounded arms */}
      <path
        d="M24 3
           C27 12 29 15 33 17
           C40 15 44 17 45 21
           C42 25 39 27 38 31
           C41 39 39 43 35 44
           C30 41 27 40 24 40
           C21 40 18 41 13 44
           C9 43 7 39 10 31
           C9 27 6 25 3 21
           C4 17 8 15 15 17
           C19 15 21 12 24 3 Z"
        fill="#f08a4e"
        stroke="#d9663f"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* Texture bumps */}
      <g fill="#fbe3c8" opacity="0.85">
        <circle cx="24" cy="22" r="2" />
        <circle cx="24" cy="12" r="1.3" />
        <circle cx="32" cy="24" r="1.3" />
        <circle cx="16" cy="24" r="1.3" />
        <circle cx="20" cy="32" r="1.2" />
        <circle cx="28" cy="32" r="1.2" />
      </g>
    </svg>
  )
}

/** A ridged scallop seashell. */
function Seashell({ className = '', hue = '#f2a65a' }: { className?: string; hue?: string }) {
  return (
    <svg viewBox="0 0 44 42" className={className} aria-hidden="true">
      {/* Fan body */}
      <path
        d="M22 40
           C10 40 3 28 4 17
           C4 14 7 13 9 15
           C9 11 13 10 15 13
           C16 9 20 8 22 12
           C24 8 28 9 29 13
           C31 10 35 11 35 15
           C37 13 40 14 40 17
           C41 28 34 40 22 40 Z"
        fill={hue}
        stroke="#c9552f"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {/* Little hinge at the base */}
      <ellipse cx="22" cy="39" rx="4" ry="2.4" fill="#c9552f" />
      {/* Ribs fanning out */}
      <g stroke="#c9552f" strokeWidth="1.1" opacity="0.55" fill="none" strokeLinecap="round">
        <path d="M22 38 L22 14" />
        <path d="M22 38 L13 18" />
        <path d="M22 38 L31 18" />
        <path d="M22 38 L8 22" />
        <path d="M22 38 L36 22" />
      </g>
    </svg>
  )
}

/** A single crab that scuttles across the sand. */
function ScuttlingCrab({
  from,
  to,
  duration,
  delay = 0,
  bottom,
  size,
  flip = false,
}: {
  from: string
  to: string
  duration: number
  delay?: number
  bottom: string
  size: string
  flip?: boolean
}) {
  return (
    <motion.div
      className="absolute"
      style={{ bottom }}
      initial={{ x: from }}
      animate={{ x: to }}
      transition={{ duration, repeat: Infinity, ease: 'linear', delay, repeatDelay: 2 }}
    >
      <motion.div
        animate={{ y: [0, -3, 0], rotate: [-4, 4, -4] }}
        transition={{ duration: 0.35, repeat: Infinity, ease: 'easeInOut' }}
        className={flip ? '-scale-x-100' : ''}
      >
        <Crab className={size} />
      </motion.div>
    </motion.div>
  )
}

/** Beach foreground for the hero: sand, palms and scuttling crabs. */
export function HeroBeach() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10" aria-hidden="true">
      {/* Sand shoreline */}
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-20 w-full sm:h-28"
      >
        <path
          d="M0 46 C300 14 520 64 720 44 C960 20 1160 64 1440 40 L1440 120 L0 120 Z"
          fill="#e4cbab"
        />
        <path
          d="M0 46 C300 14 520 64 720 44 C960 20 1160 64 1440 40"
          fill="none"
          stroke="#d9b892"
          strokeWidth="3"
        />
      </svg>

      {/* Palms in the corners */}
      <PalmTree className="absolute bottom-6 left-1 h-40 w-auto drop-shadow-md sm:bottom-8 sm:left-6 sm:h-56" />
      <PalmTree
        flip
        className="absolute bottom-6 right-1 h-36 w-auto drop-shadow-md sm:bottom-8 sm:right-6 sm:h-52"
      />

      {/* Seashells & starfish scattered on the sand */}
      <Starfish className="absolute bottom-2 left-[24%] h-7 w-auto -rotate-12 animate-floaty sm:h-9" />
      <Seashell className="absolute bottom-4 left-[38%] h-6 w-auto rotate-6 sm:h-7" hue="#f2a65a" />
      <Seashell
        className="absolute bottom-2 left-[58%] h-5 w-auto -rotate-6 sm:h-6"
        hue="#e07a5f"
      />
      <Starfish className="absolute bottom-5 right-[30%] h-6 w-auto rotate-12 sm:h-7" />
      <Seashell className="absolute bottom-3 right-[16%] h-5 w-auto rotate-3 sm:h-6" hue="#f4d98a" />

      {/* Crabs scuttling on the sand */}
      <ScuttlingCrab from="-8vw" to="108vw" duration={16} bottom="0.75rem" size="h-6 w-auto sm:h-7" />
      <ScuttlingCrab
        from="108vw"
        to="-8vw"
        duration={22}
        delay={4}
        bottom="1.75rem"
        size="h-5 w-auto sm:h-6"
        flip
      />
    </div>
  )
}
