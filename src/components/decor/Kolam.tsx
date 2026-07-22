/** A small ornamental kolam / mandala motif used as a section divider. */
export function Kolam({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`} aria-hidden="true">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/70" />
      <svg width="54" height="54" viewBox="0 0 100 100" className="mx-3 text-gold">
        <g fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="50" cy="50" r="6" />
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * Math.PI) / 4
            const x = 50 + Math.cos(angle) * 26
            const y = 50 + Math.sin(angle) * 26
            return <circle key={i} cx={x} cy={y} r="7" opacity="0.9" />
          })}
          <circle cx="50" cy="50" r="34" strokeDasharray="2 5" opacity="0.7" />
        </g>
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/70" />
    </div>
  )
}
