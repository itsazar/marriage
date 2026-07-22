type IconProps = { className?: string }

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

/** School days — an open book */
function Book({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 6.5C10.5 5 8 4.3 4.5 4.5V18c3.5-.2 6 .5 7.5 2 1.5-1.5 4-2.2 7.5-2V4.5C16 4.3 13.5 5 12 6.5z" />
      <path d="M12 6.5V20" />
    </svg>
  )
}

/** Rivalry — two arrows clashing head-on */
function Clash({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M3 12h6" />
      <path d="M6 9l3 3-3 3" />
      <path d="M21 12h-6" />
      <path d="M18 9l-3 3 3 3" />
    </svg>
  )
}

/** Friendship — two people side by side */
function Friends({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="8" cy="8" r="2.6" />
      <path d="M3.2 19c0-2.8 2.1-4.8 4.8-4.8S12.8 16.2 12.8 19" />
      <circle cx="16.5" cy="9" r="2.2" />
      <path d="M13 19c0-2.4 1.6-4 3.5-4s3.5 1.6 3.5 4" />
    </svg>
  )
}

/** Love — a heart */
function Heart({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 20S3.5 15 3.5 9.2C3.5 6.3 5.7 4.5 8 4.5c1.7 0 3.2 1 4 2.4.8-1.4 2.3-2.4 4-2.4 2.3 0 4.5 1.8 4.5 4.7C20.5 15 12 20 12 20z" />
    </svg>
  )
}

/** The long wait — an hourglass */
function Hourglass({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M6 3h12M6 21h12" />
      <path d="M7 3c0 5 5 6 5 9s-5 4-5 9" />
      <path d="M17 3c0 5-5 6-5 9s5 4 5 9" />
    </svg>
  )
}

/** Families said yes — a party popper with confetti */
function Celebrate({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4 20l3.5-9 5.5 5.5L4 20z" />
      <path d="M9 13.5l4-4" />
      <path d="M15 4.5v2M19.5 6.5l-1.4 1.4M20 12h-2" />
      <circle cx="14.5" cy="12" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="9.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

/** Forever — a diamond ring */
function Ring({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="12" cy="15" r="5.2" />
      <path d="M8.5 8l3.5-4 3.5 4-3.5 3-3.5-3z" />
    </svg>
  )
}

const ICONS = {
  book: Book,
  clash: Clash,
  friends: Friends,
  heart: Heart,
  hourglass: Hourglass,
  celebrate: Celebrate,
  ring: Ring,
}

export type StoryIconName = keyof typeof ICONS

export function StoryIcon({ name, className }: { name: StoryIconName; className?: string }) {
  const Cmp = ICONS[name]
  return <Cmp className={className} />
}
