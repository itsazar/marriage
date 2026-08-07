import { playlist } from '../data/content'
import { Reveal } from './ui/Reveal'
import { Kolam } from './decor/Kolam'

export function Playlist() {
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
          {playlist.songs.map((song, i) => (
            <Reveal key={song.title} delay={i + 1}>
              <div className="group flex items-center gap-4 rounded-2xl border border-sand-100/15 bg-white/5 p-4 backdrop-blur-md transition-all duration-300 hover:border-gold/40 hover:bg-white/10">
                {/* Animated equalizer bars */}
                <span className="flex h-9 w-9 flex-none items-end justify-center gap-[3px] rounded-full bg-gold/15 p-2 text-gold">
                  {[0, 1, 2].map((b) => (
                    <span
                      key={b}
                      className="w-[3px] rounded-full bg-gold"
                      style={{
                        height: '60%',
                        animation: `eq 1s ease-in-out ${b * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-serif text-lg text-sand-50">{song.title}</p>
                  <p className="truncate font-body text-xs uppercase tracking-[0.18em] text-sand-100/60">
                    {song.artist}
                  </p>
                </div>
                <span className="hidden flex-none font-body text-xs italic text-sunset-400 sm:block">
                  {song.mood}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {playlist.spotifyEmbedUrl && (
          <Reveal delay={2} className="mx-auto mt-10 max-w-2xl">
            <iframe
              title="Our wedding playlist"
              src={playlist.spotifyEmbedUrl}
              className="h-40 w-full rounded-2xl border border-sand-100/15"
              loading="lazy"
              allow="encrypted-media"
            />
          </Reveal>
        )}
      </div>
    </section>
  )
}
