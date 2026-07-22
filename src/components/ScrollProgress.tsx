import { motion, useScroll, useSpring } from 'framer-motion'

/** A slim gradient progress bar pinned to the top of the page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[90] h-1 origin-left bg-gradient-to-r from-gold via-sunset-500 to-coral"
      aria-hidden="true"
    />
  )
}
