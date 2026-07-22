import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { guestbookSeed } from '../data/content'
import { Reveal } from './ui/Reveal'

type Wish = { name: string; message: string; id: string }

const STORAGE_KEY = 'lavanya-azar-guestbook'

const CARD_TINTS = [
  'from-sand-100 to-white',
  'from-[#f7ede2] to-white',
  'from-[#eef6f5] to-white',
  'from-[#f9eef0] to-white',
]

export function Guestbook() {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [justAdded, setJustAdded] = useState(false)

  // Load saved wishes (or seed) on mount.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setWishes(JSON.parse(saved))
        return
      }
    } catch {
      /* ignore */
    }
    setWishes(guestbookSeed.map((w, i) => ({ ...w, id: `seed-${i}` })))
  }, [])

  const persist = (next: Wish[]) => {
    setWishes(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      /* ignore */
    }
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const n = name.trim()
    const m = message.trim()
    if (!n || !m) return
    const next: Wish[] = [{ name: n, message: m, id: `${Date.now()}` }, ...wishes]
    persist(next)
    setName('')
    setMessage('')
    setJustAdded(true)
    window.setTimeout(() => setJustAdded(false), 2500)
  }

  return (
    <section id="guestbook" className="section-pad relative overflow-hidden bg-sand-100">
      <div className="container-narrow">
        <Reveal className="text-center">
          <p className="eyebrow">Leave a note</p>
          <h2 className="heading-display mt-3">Guestbook</h2>
          <p className="mx-auto mt-4 max-w-md font-serif text-lg italic text-ink/60">
            Share a wish, a memory, or a little love — we'll treasure every word.
          </p>
        </Reveal>

        {/* Form */}
        <Reveal delay={0.5} className="mx-auto mt-10 max-w-xl">
          <form
            onSubmit={submit}
            className="rounded-3xl border border-sand-200 bg-white/80 p-6 shadow-sm sm:p-8"
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              maxLength={40}
              className="w-full rounded-xl border border-sand-200 bg-sand-50 px-4 py-3 font-body text-sm text-ink outline-none transition focus:border-ocean-400 focus:ring-2 focus:ring-ocean-400/30"
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your wish for the couple…"
              rows={3}
              maxLength={280}
              className="mt-3 w-full resize-none rounded-xl border border-sand-200 bg-sand-50 px-4 py-3 font-body text-sm text-ink outline-none transition focus:border-ocean-400 focus:ring-2 focus:ring-ocean-400/30"
            />
            <div className="mt-4 flex items-center justify-between">
              <AnimatePresence>
                {justAdded && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="font-hand text-lg text-ocean-600"
                  >
                    Thank you! 💜
                  </motion.span>
                )}
              </AnimatePresence>
              <button
                type="submit"
                className="ml-auto inline-flex items-center gap-2 rounded-full bg-ocean-500 px-6 py-2.5 font-body text-sm font-semibold tracking-wide text-sand-50 transition hover:bg-ocean-600 disabled:opacity-40"
                disabled={!name.trim() || !message.trim()}
              >
                Sign the Guestbook
              </button>
            </div>
            <p className="mt-3 font-body text-xs text-ink/40">
              Notes are saved on your device so you can revisit them.
            </p>
          </form>
        </Reveal>

        {/* Wall */}
        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          <AnimatePresence initial={false}>
            {wishes.map((w, i) => (
              <motion.div
                key={w.id}
                layout
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`break-inside-avoid rounded-2xl bg-gradient-to-br ${
                  CARD_TINTS[i % CARD_TINTS.length]
                } p-5 shadow-sm ring-1 ring-sand-200`}
              >
                <p className="font-serif text-lg leading-relaxed text-ink/80">"{w.message}"</p>
                <p className="mt-3 font-hand text-xl text-ocean-600">— {w.name}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
