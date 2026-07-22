// ---------------------------------------------------------------------------
//  Your hand-drawn doodles live here as SVG path data.
//
//  To add YOUR doodle:
//   1. Export it as an SVG (single colour outline works best — no fill).
//   2. Open the .svg file in a text editor.
//   3. Copy each  <path d="....">  value into a `paths` array below.
//   4. Set the matching `viewBox` (find it at the top of your .svg file).
//
//  These placeholders let you preview the "self-drawing" effect right now.
//  Swap them out one by one as your real doodles arrive.
// ---------------------------------------------------------------------------

export type Doodle = {
  viewBox: string
  paths: string[]
}

// Placeholder: a heart with a little sparkle
export const heartDoodle: Doodle = {
  viewBox: '0 0 100 92',
  paths: [
    'M50 82 C18 58 6 36 22 22 C35 11 48 20 50 32 C52 20 65 11 78 22 C94 36 82 58 50 82 Z',
    'M84 14 l3 6 6 3 -6 3 -3 6 -3 -6 -6 -3 6 -3 z',
  ],
}

// Placeholder: a hand-drawn wavy underline
export const waveUnderlineDoodle: Doodle = {
  viewBox: '0 0 220 24',
  paths: ['M6 14 C30 2 52 24 76 13 C100 2 122 24 146 13 C170 2 192 24 214 12'],
}

// Placeholder: a simple palm tree
export const palmDoodle: Doodle = {
  viewBox: '0 0 120 140',
  paths: [
    'M60 130 C58 100 56 70 60 46',
    'M60 46 C40 30 18 30 6 44 C26 40 44 44 60 52',
    'M60 46 C80 30 102 30 114 44 C94 40 76 44 60 52',
    'M60 46 C50 24 30 12 14 14 C34 20 48 34 60 52',
    'M60 46 C70 24 90 12 106 14 C86 20 72 34 60 52',
  ],
}

// A radiant sun — circle first, then eight rays draw outward
export const sunDoodle: Doodle = {
  viewBox: '0 0 200 200',
  paths: [
    'M100 68 a32 32 0 1 0 0.01 0',
    'M142 100 H158',
    'M130 70 L141 59',
    'M100 58 V42',
    'M70 70 L59 59',
    'M58 100 H42',
    'M70 130 L59 141',
    'M100 142 V158',
    'M130 130 L141 141',
  ],
}

// Hand-drawn arrow curving in from the left, pointing down-right
export const arrowRightDoodle: Doodle = {
  viewBox: '0 0 120 80',
  paths: ['M6 18 C40 6 72 16 98 42', 'M78 34 L99 44 L86 22'],
}

// Hand-drawn arrow curving in from the right, pointing down-left
export const arrowLeftDoodle: Doodle = {
  viewBox: '0 0 120 80',
  paths: ['M114 18 C80 6 48 16 22 42', 'M42 34 L21 44 L34 22'],
}
