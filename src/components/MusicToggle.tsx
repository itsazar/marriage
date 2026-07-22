import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * A floating music toggle. Drop an audio file at `public/music.mp3`
 * (a soft Tamil instrumental works beautifully). If the file is missing,
 * the button simply does nothing.
 */
export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [available, setAvailable] = useState(true)

  useEffect(() => {
    const audio = new Audio('/music.mp3')
    audio.loop = true
    audio.volume = 0.4
    audio.addEventListener('error', () => setAvailable(false))
    audioRef.current = audio
    return () => {
      audio.pause()
    }
  }, [])

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      try {
        await audio.play()
        setPlaying(true)
      } catch {
        setAvailable(false)
      }
    }
  }

  if (!available) return null

  return (
    <motion.button
      type="button"
      onClick={toggle}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 3 }}
      whileTap={{ scale: 0.9 }}
      aria-label={playing ? 'Pause music' : 'Play music'}
      className="fixed bottom-5 right-5 z-[85] flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-ocean-600/80 text-sand-50 shadow-lg backdrop-blur-md transition hover:bg-ocean-600"
    >
      {/* Equalizer bars animate while playing */}
      <span className="flex items-end gap-[3px]">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1 rounded-full bg-sand-50"
            animate={playing ? { height: [5, 15, 7, 17, 5] } : { height: 6 }}
            transition={
              playing
                ? { duration: 0.9, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }
                : { duration: 0.2 }
            }
            style={{ height: 6 }}
          />
        ))}
      </span>
    </motion.button>
  )
}
