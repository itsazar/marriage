import { traditions } from '../data/content'
import { Reveal } from './ui/Reveal'
import { Kolam } from './decor/Kolam'

/** Kolam-style motif (Hindu) — concentric dotted mandala. */
function KolamMotif() {
  return (
    <svg viewBox="0 0 120 120" className="h-20 w-20 text-maroon" fill="none" stroke="currentColor">
      <g strokeWidth="1.6">
        <circle cx="60" cy="60" r="7" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * Math.PI) / 4
          return <circle key={i} cx={60 + Math.cos(a) * 30} cy={60 + Math.sin(a) * 30} r="8" opacity="0.85" />
        })}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * Math.PI) / 4 + Math.PI / 8
          return <circle key={i} cx={60 + Math.cos(a) * 46} cy={60 + Math.sin(a) * 46} r="3.5" opacity="0.7" />
        })}
        <circle cx="60" cy="60" r="52" strokeDasharray="2 6" opacity="0.6" />
      </g>
    </svg>
  )
}

/** Arabesque / eight-point star motif (Muslim). */
function ArabesqueMotif() {
  const star = (rot: number) =>
    Array.from({ length: 4 })
      .map((_, i) => {
        const a = (i * Math.PI) / 2 + rot
        return `${60 + Math.cos(a) * 46},${60 + Math.sin(a) * 46}`
      })
      .join(' ')
  return (
    <svg viewBox="0 0 120 120" className="h-20 w-20 text-ocean-600" fill="none" stroke="currentColor">
      <g strokeWidth="1.6" strokeLinejoin="round">
        <polygon points={star(0)} opacity="0.9" />
        <polygon points={star(Math.PI / 4)} opacity="0.9" />
        <circle cx="60" cy="60" r="20" />
        <circle cx="60" cy="60" r="10" opacity="0.7" />
        <circle cx="60" cy="60" r="52" strokeDasharray="1 6" opacity="0.6" />
      </g>
    </svg>
  )
}

export function Traditions() {
  return (
    <section id="traditions" className="section-pad relative overflow-hidden bg-sand-100">
      <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_80%_10%,_rgba(201,162,75,0.18),_transparent_45%)]" />
      <div className="container-narrow relative">
        <Reveal className="text-center">
          <p className="eyebrow">Our Cultures</p>
          <h2 className="heading-display mt-3">Two Traditions, One Love</h2>
          <p className="mx-auto mt-5 max-w-2xl font-serif text-lg italic text-ink/70">
            {traditions.intro}
          </p>
          <Kolam className="mt-6" />
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {traditions.items.map((t, i) => (
            <Reveal key={t.id} delay={i + 1}>
              <article className="group relative flex h-full flex-col items-center overflow-hidden rounded-3xl border border-sand-200 bg-white/70 p-8 text-center shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
                <div className="transition-transform duration-700 group-hover:rotate-45">
                  {t.motif === 'kolam' ? <KolamMotif /> : <ArabesqueMotif />}
                </div>
                <h3 className="mt-5 font-display text-3xl font-medium text-ink">{t.title}</h3>
                <p className="mt-2 font-body text-xs uppercase tracking-[0.22em] text-sunset-500">
                  {t.subtitle}
                </p>
                <div className="mt-5 space-y-3">
                  {t.lines.map((line) => (
                    <p key={line} className="font-serif text-base leading-relaxed text-ink/75">
                      {line}
                    </p>
                  ))}
                </div>
                <p className="mt-6 rounded-xl bg-sand-100 px-4 py-3 font-body text-sm italic text-ink/70">
                  {t.note}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Two motifs meeting in the middle — a symbol of the union. */}
        <Reveal delay={2} className="mt-12 flex items-center justify-center gap-4 text-gold">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/70" />
          <span className="font-display text-2xl text-maroon">ॐ</span>
          <span className="animate-heartbeat text-2xl text-coral">❤</span>
          <span className="font-display text-2xl text-ocean-600">☪</span>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/70" />
        </Reveal>
      </div>
    </section>
  )
}
