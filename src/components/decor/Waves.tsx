/** Animated layered SVG waves — used as a section transition/footer flourish. */
export function Waves({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  return (
    <div
      className={`pointer-events-none w-full leading-[0] ${flip ? 'rotate-180' : ''} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 140"
        preserveAspectRatio="none"
        className="h-[70px] w-full sm:h-[110px]"
      >
        <path fill="#1aa39d" fillOpacity="0.35">
          <animate
            attributeName="d"
            dur="9s"
            repeatCount="indefinite"
            values="
              M0,64 C240,110 480,20 720,54 C960,88 1200,30 1440,60 L1440,140 L0,140 Z;
              M0,54 C240,20 480,100 720,66 C960,32 1200,96 1440,50 L1440,140 L0,140 Z;
              M0,64 C240,110 480,20 720,54 C960,88 1200,30 1440,60 L1440,140 L0,140 Z"
          />
        </path>
        <path fill="#0e807b" fillOpacity="0.6">
          <animate
            attributeName="d"
            dur="7s"
            repeatCount="indefinite"
            values="
              M0,84 C240,50 480,120 720,88 C960,56 1200,116 1440,84 L1440,140 L0,140 Z;
              M0,90 C240,120 480,60 720,96 C960,128 1200,70 1440,100 L1440,140 L0,140 Z;
              M0,84 C240,50 480,120 720,88 C960,56 1200,116 1440,84 L1440,140 L0,140 Z"
          />
        </path>
        <path fill="#0a504d">
          <animate
            attributeName="d"
            dur="11s"
            repeatCount="indefinite"
            values="
              M0,110 C240,90 480,130 720,112 C960,94 1200,128 1440,108 L1440,140 L0,140 Z;
              M0,112 C240,132 480,96 720,118 C960,134 1200,98 1440,120 L1440,140 L0,140 Z;
              M0,110 C240,90 480,130 720,112 C960,94 1200,128 1440,108 L1440,140 L0,140 Z"
          />
        </path>
      </svg>
    </div>
  )
}
