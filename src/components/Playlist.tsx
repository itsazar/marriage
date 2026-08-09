import { useEffect, useRef, useState } from 'react'
import { playlist } from '../data/content'
import { Reveal } from './ui/Reveal'
import { Kolam } from './decor/Kolam'

const fmt = (s: number) => {
  if (!Number.isFinite(s) || s < 0) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

export function Playlist() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [current, setCurrent] = useState<number | null>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [time, setTime] = useState(0)

  useEffect(() => {
    const audio = new Audio()
    audioRef.current = audio
    const onTime = () => {
      setTime(audio.currentTime)
      setProgress(audio.duration ? audio.currentTime / audio.duration : 0)
    }
    const onMeta = () => setDuration(audio.duration)
    const onEnd = () => {
      setPlaying(false)
      setProgress(0)
      setTime(0)
    }
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('ended', onEnd)
    return () => {
      audio.pause()
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('ended', onEnd)
    }
  }, [])

  const toggle = (i: number) => {
    const audio = audioRef.current
    if (!audio) return
    const song = playlist.songs[i]
    if (current === i) {
      if (audio.paused) {
        void audio.play()
        setPlaying(true)
      } else {
        audio.pause()
        setPlaying(false)
      }
      return
    }
    audio.src = song.src
    audio.currentTime = 0
    setCurrent(i)
    setProgress(0)
    setTime(0)
    setDuration(0)
    void audio.play()
    setPlaying(true)
  }

  return (
    <section id="playlist" className="section-pad relative overflow-hidden bg-ocean-700 text-sand-50">
      <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_15%_80%,_rgba(232,130,78,0.22),_transparent_45%)]" />
      <div className="container-narrow relative">
        <Reveal className="text-center">
          <p className="eyebrow !text-sunset-400">Press Play</p>
          <h2 className="heading-display mt-3 !text-sand-50">Songs of Our Story</h2>
          <p className="mx-auto mt-5 max-w-2xl font-serif text-lg italic text-sand-100/80">
            {playlist.note}
          </p>
          <Kolam className="mt-6" />
        </Reveal>

        <div className="mx-auto mt-14 max-w-2xl space-y-3">
          {playlist.songs.map((song, i) => {
            const isCurrent = current === i
            const isPlaying = isCurrent && playing
            return (
              <Reveal key={song.title} delay={i + 1}>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-label={`${isPlaying ? 'Pause' : 'Play'} ${song.title} by ${song.artist}`}
                  aria-pressed={isPlaying}
                  className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left backdrop-blur-md transition-all duration-300 ${
                    isCurrent
                      ? 'border-gold/50 bg-white/10'
                      : 'border-sand-100/15 bg-white/5 hover:border-gold/40 hover:bg-white/10'
                  }`}
                >
                  {/* Equalizer bars — animate only while this track plays */}
                  <span className="flex h-9 w-9 flex-none items-end justify-center gap-[3px] rounded-full bg-gold/15 p-2 text-gold">
                    {[0, 1, 2].map((b) => (
                      <span
                        key={b}
                        className="w-[3px] rounded-full bg-gold"
                        style={{
                          height: '60%',
                          animation: isPlaying ? `eq 1s ease-in-out ${b * 0.2}s infinite` : 'none',
                        }}
                      />
                    ))}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-serif text-lg text-sand-50">{song.title}</p>
                    <p className="truncate font-body text-xs uppercase tracking-[0.18em] text-sand-100/60">
                      {song.artist}
                    </p>
                    {/* Progress bar for the active track */}
                    {isCurrent && (
                      <span className="mt-2 flex items-center gap-2">
                        <span className="h-1 flex-1 overflow-hidden rounded-full bg-sand-100/15">
                          <span
                            className="block h-full rounded-full bg-gradient-to-r from-gold to-sunset-400"
                            style={{ width: `${progress * 100}%` }}
                          />
                        </span>
                        <span className="flex-none font-body text-[0.65rem] tabular-nums text-sand-100/60">
                          {fmt(time)} / {fmt(duration)}
                        </span>
                      </span>
                    )}
                  </div>

                  <span className="hidden flex-none font-body text-xs italic text-sunset-400 sm:block">
                    {song.mood}
                  </span>

                  {/* Play / pause button */}
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold transition-all duration-300 group-hover:scale-110 group-hover:bg-gold group-hover:text-ocean-700">
                    {isPlaying ? (
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                        <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4" fill="currentColor" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </span>
                </button>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
