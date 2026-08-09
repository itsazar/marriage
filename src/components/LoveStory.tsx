import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useScroll, useTransform } from 'framer-motion'
import { loveStory } from '../data/content'
import { Reveal } from './ui/Reveal'
import { DoodleDraw } from './decor/DoodleDraw'
import { StoryIcon, type StoryIconName } from './decor/StoryIcons'
import { heartDoodle } from '../data/doodles'

export function LoveStory() {
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState(1)
  const [touring, setTouring] = useState(false)
  const [progress, setProgress] = useState(0)
  const startedRef = useRef(false)
  const n = loveStory.length

  const DWELL = 6000 // ms each chapter stays on screen during the tour

  // Scroll-scrubbed "journey" line that draws as the section moves through view.
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { amount: 0.4 })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.85', 'end 0.35'],
  })
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])
  const markerOffset = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  // Auto-start the guided tour the first time the section comes into view.
  useEffect(() => {
    if (inView && !startedRef.current) {
      startedRef.current = true
      setTouring(true)
    }
  }, [inView])

  // The guided tour: dwell on each chapter, then advance to the next.
  useEffect(() => {
    if (!touring || !inView) return
    setProgress(0)
    const step = 50
    const id = setInterval(() => {
      setProgress((p) => {
        const next = p + step / DWELL
        if (next >= 1) {
          setActive((prev) => {
            if (prev >= n - 1) {
              setTouring(false)
              return prev
            }
            setDir(1)
            return prev + 1
          })
          return 0
        }
        return next
      })
    }, step)
    return () => clearInterval(id)
  }, [touring, inView, active, n])

  const go = (i: number) => {
    setTouring(false) // any manual interaction pauses the tour
    setProgress(0)
    setDir(i > active ? 1 : -1)
    setActive(Math.max(0, Math.min(n - 1, i)))
  }

  const toggleTour = () => {
    if (active >= n - 1 && !touring) {
      // Finished — replay from the beginning.
      setDir(1)
      setActive(0)
      setProgress(0)
      setTouring(true)
      return
    }
    setProgress(0)
    setTouring((t) => !t)
  }

  // Keyboard arrow navigation while the section is in view.
  useEffect(() => {
    if (!inView) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') go(active - 1)
      else if (e.key === 'ArrowRight') go(active + 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, active])

  const finished = active >= n - 1 && !touring
  const item = loveStory[active]
  const inset = 100 / n / 2 // half a column, so the line meets node centres
  const fillWidth = `calc((100% - ${100 / n}%) * ${n > 1 ? active / (n - 1) : 0})`

  // Pointer-based swipe (works for touch + mouse) on the story panel.
  const swipeStart = useRef<{ x: number; y: number } | null>(null)
  const onPointerDown = (e: React.PointerEvent) => {
    swipeStart.current = { x: e.clientX, y: e.clientY }
  }
  const onPointerUp = (e: React.PointerEvent) => {
    const start = swipeStart.current
    swipeStart.current = null
    if (!start) return
    const dx = e.clientX - start.x
    const dy = e.clientY - start.y
    // Only treat as a swipe when it's mostly horizontal and long enough.
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) go(active + 1)
      else go(active - 1)
    }
  }

  return (
    <section ref={sectionRef} id="story" className="section-pad relative overflow-hidden bg-sand-50">
      {/* Scroll-drawn journey line meandering down the section */}
      <div className="pointer-events-none absolute inset-0 flex justify-center" aria-hidden="true">
        <svg
          viewBox="0 0 200 1000"
          preserveAspectRatio="none"
          className="h-full w-[min(90%,900px)] opacity-[0.5]"
        >
          <motion.path
            d="M100 10 C30 130 170 240 100 360 C30 480 170 600 100 720 C40 830 150 920 100 990"
            fill="none"
            stroke="#e4cbab"
            strokeWidth="3"
            strokeDasharray="1 12"
            strokeLinecap="round"
            style={{ pathLength }}
          />
        </svg>
        {/* Little heart travelling down the path */}
        <motion.div
          className="absolute left-1/2 top-0 -translate-x-1/2 text-lg"
          style={{ top: markerOffset }}
        >
          💜
        </motion.div>
      </div>

      <div className="container-narrow relative">
        <Reveal className="text-center">
          <p className="eyebrow">Our Journey</p>
          <h2 className="heading-display mt-3">Our Love Story</h2>
          <DoodleDraw
            viewBox={heartDoodle.viewBox}
            paths={heartDoodle.paths}
            color="#e07a5f"
            className="mx-auto mt-6 h-16 w-16"
          />
          <p className="mx-auto mt-4 max-w-md font-serif text-lg italic text-ink/60">
            From classroom rivals to forever — here's how it all went down.
          </p>
        </Reveal>

        {/* Horizontal node timeline */}
        <div className="relative mt-14">
          {/* Track */}
          <span
            className="absolute top-5 h-[3px] rounded-full bg-sand-200"
            style={{ left: `${inset}%`, right: `${inset}%` }}
          />
          {/* Animated fill up to the active node */}
          <motion.span
            className="absolute top-5 h-[3px] origin-left rounded-full bg-gradient-to-r from-gold via-sunset-500 to-coral"
            style={{ left: `${inset}%` }}
            animate={{ width: fillWidth }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />

          <ol className="relative grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
            {loveStory.map((c, i) => {
              const done = i <= active
              const isActive = i === active
              return (
                <li key={c.chapter} className="flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`${c.chapter}: ${c.title}`}
                    aria-current={isActive}
                    className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full ring-4 ring-sand-50 transition-all duration-300 sm:h-12 sm:w-12 ${
                      isActive
                        ? 'scale-125 bg-gradient-to-br from-sunset-500 to-coral text-white shadow-lg shadow-sunset-500/40'
                        : done
                          ? 'scale-100 bg-white text-ocean-600 shadow-md'
                          : 'scale-90 bg-sand-100 text-ink/40 opacity-70'
                    }`}
                  >
                    <StoryIcon name={c.icon as StoryIconName} className="h-5 w-5 sm:h-6 sm:w-6" />
                    {isActive && (
                      <>
                        {/* Pulsing glow ring around the active chapter */}
                        <motion.span
                          className="absolute -inset-2 rounded-full ring-2 ring-gold"
                          animate={{ opacity: [0.7, 0.2, 0.7], scale: [1, 1.15, 1] }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                        />
                        <motion.span
                          layoutId="node-halo"
                          className="absolute inset-0 rounded-full ring-[3px] ring-gold"
                        />
                      </>
                    )}
                  </button>
                  <span
                    className={`mt-2 hidden text-center font-body text-[0.65rem] uppercase tracking-[0.15em] transition-all sm:block ${
                      isActive
                        ? 'scale-110 font-bold text-sunset-500'
                        : done
                          ? 'text-ocean-600'
                          : 'text-ink/40'
                    }`}
                  >
                    {c.chapter.replace('Chapter ', '')}
                  </span>
                </li>
              )
            })}
          </ol>
        </div>

        {/* Single content panel */}
        <div
          className="relative mt-10 min-h-[240px] touch-pan-y sm:min-h-[220px]"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * 60 }),
                center: { opacity: 1, x: 0 },
                exit: (d: number) => ({ opacity: 0, x: d * -60 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto max-w-2xl select-none rounded-3xl border border-sand-200 bg-white/85 p-8 text-center shadow-md backdrop-blur-sm sm:p-10"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sand-100 text-sunset-500 shadow-inner ring-1 ring-sand-200">
                <StoryIcon name={item.icon as StoryIconName} className="h-7 w-7" />
              </div>
              <span className="font-body text-xs uppercase tracking-[0.3em] text-sunset-500">
                {item.chapter}
              </span>
              <h3 className="mt-1 font-serif text-3xl text-ink">{item.title}</h3>
              <div className="mt-4 space-y-2">
                {item.lines.map((line, li) => (
                  <p key={li} className="font-body text-base leading-relaxed text-ink/70">
                    {line}
                  </p>
                ))}
              </div>
              {item.finale && (
                <div className="mt-6 border-t border-sand-200 pt-5">
                  <p className="font-serif text-lg text-ocean-600">{item.finale.date}</p>
                  <p className="mt-1 font-display text-3xl font-semibold text-maroon">
                    {item.finale.names}
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Guided-tour progress bar for the current chapter */}
        <div className="mx-auto mt-6 h-1 max-w-xs overflow-hidden rounded-full bg-sand-200">
          <motion.span
            className="block h-full rounded-full bg-gradient-to-r from-gold via-sunset-500 to-coral"
            animate={{ width: touring ? `${progress * 100}%` : finished ? '100%' : '0%' }}
            transition={{ duration: 0.05, ease: 'linear' }}
          />
        </div>

        {/* Prev / tour / next controls */}
        <div className="mt-6 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => go(active - 1)}
            disabled={active === 0}
            aria-label="Previous chapter"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-sand-200 bg-white text-ink transition hover:bg-sand-100 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>

          {/* Guided tour play / pause / replay */}
          <button
            type="button"
            onClick={toggleTour}
            aria-label={touring ? 'Pause the tour' : finished ? 'Replay the tour' : 'Start the guided tour'}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-sunset-500 to-coral text-white shadow-lg ring-4 ring-sand-50 transition hover:scale-105"
          >
            {touring ? (
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
                <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
              </svg>
            ) : finished ? (
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M3 12a9 9 0 1 0 3-6.7" />
                <path d="M3 4v4h4" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="ml-0.5 h-6 w-6" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={() => go(active + 1)}
            disabled={active === n - 1}
            aria-label="Next chapter"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-sand-200 bg-white text-ink transition hover:bg-sand-100 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>

        {/* Counter + hint */}
        <div className="mt-4 flex flex-col items-center font-body text-sm tabular-nums text-ink/50">
          <span>{active + 1} / {n}</span>
          <span className="mt-0.5 text-[0.6rem] uppercase tracking-[0.15em] text-ink/30">
            {touring ? 'Guided tour playing…' : finished ? 'Tap replay to watch again' : 'Play the tour · swipe · ← →'}
          </span>
        </div>
      </div>
    </section>
  )
}
