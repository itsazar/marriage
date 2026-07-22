import { motion } from 'framer-motion'

type DoodleDrawProps = {
  /** viewBox of your doodle SVG, e.g. "0 0 200 120" */
  viewBox?: string
  /**
   * The `d` string(s) from your doodle's <path> elements.
   * Paste one per stroke — they draw in sequence for a nice hand-sketch feel.
   */
  paths: string[]
  color?: string
  strokeWidth?: number
  /** seconds for each stroke to draw itself */
  duration?: number
  delay?: number
  /** draw every time it scrolls into view, or just once */
  once?: boolean
  className?: string
}

/**
 * Animates hand-drawn SVG doodles "drawing themselves" when scrolled into view.
 *
 * HOW TO USE YOUR DOODLE:
 *  1. Export your doodle as SVG (single colour, outline / no fill works best).
 *  2. Open the .svg in a text editor and copy each <path d="..."> value.
 *  3. Pass them here:  <DoodleDraw viewBox="0 0 300 200" paths={["M10 10 ...", "M40 ..."]} />
 */
export function DoodleDraw({
  viewBox = '0 0 200 120',
  paths,
  color = '#c9a24b',
  strokeWidth = 2.5,
  duration = 2,
  delay = 0.2,
  once = true,
  className = '',
}: DoodleDrawProps) {
  return (
    <motion.svg
      viewBox={viewBox}
      className={className}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.4 }}
    >
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: {
                pathLength: { duration, ease: 'easeInOut', delay: delay + i * (duration * 0.5) },
                opacity: { duration: 0.01, delay: delay + i * (duration * 0.5) },
              },
            },
          }}
        />
      ))}
    </motion.svg>
  )
}
