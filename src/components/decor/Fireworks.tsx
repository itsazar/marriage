import { useEffect, useRef, useState } from 'react'

const COLORS = ['#e8824e', '#c9a24b', '#e07a5f', '#0e807b', '#c77dff', '#f2a65a', '#ffd6a5', '#ff8fab']

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  color: string
  size: number
}

interface Rocket {
  x: number
  y: number
  vx: number
  vy: number
  targetY: number
  color: string
  trail: { x: number; y: number }[]
}

/**
 * A short, celebratory fireworks show rendered on a canvas. It starts after
 * `startDelay` ms (meant to fire once the intro curtain has parted) and runs
 * for `duration` ms before fading out. Skipped for reduced-motion users.
 */
export function Fireworks({
  startDelay = 4200,
  duration = 6500,
}: {
  startDelay?: number
  duration?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const start = window.setTimeout(() => setActive(true), startDelay)
    const stop = window.setTimeout(() => setActive(false), startDelay + duration)
    return () => {
      window.clearTimeout(start)
      window.clearTimeout(stop)
    }
  }, [startDelay, duration])

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const particles: Particle[] = []
    const rockets: Rocket[] = []

    const burst = (x: number, y: number, baseColor?: string) => {
      const color = baseColor ?? COLORS[Math.floor(Math.random() * COLORS.length)]
      const count = 60 + Math.floor(Math.random() * 40)
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.2
        const speed = 1.5 + Math.random() * 3.5
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 60 + Math.random() * 40,
          color: Math.random() > 0.15 ? color : COLORS[Math.floor(Math.random() * COLORS.length)],
          size: 1.5 + Math.random() * 2,
        })
      }
    }

    // Launch a rocket up from the "sand" area at the bottom of the screen.
    const launchRocket = () => {
      const x = w * (0.1 + Math.random() * 0.8)
      const targetY = h * (0.15 + Math.random() * 0.3)
      rockets.push({
        x,
        y: h + 10,
        vx: (Math.random() - 0.5) * 1.2,
        vy: -(7 + Math.random() * 2.5),
        targetY,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        trail: [],
      })
    }

    let raf = 0
    let stopped = false
    const launchStop = window.setTimeout(() => {
      stopped = true // stop launching new fireworks, let existing ones fade
    }, duration - 1200)

    const launch = () => {
      if (stopped) return
      // Alternate between an aerial burst and a rocket streaking up.
      if (Math.random() > 0.4) {
        launchRocket()
      } else {
        const x = w * (0.15 + Math.random() * 0.7)
        const y = h * (0.15 + Math.random() * 0.35)
        burst(x, y)
      }
      window.setTimeout(launch, 450 + Math.random() * 550)
    }
    // A celebratory opening: two rockets + a pair of aerial bursts.
    launchRocket()
    launchRocket()
    burst(w * 0.35, h * 0.28)
    burst(w * 0.65, h * 0.24)
    launch()

    const gravity = 0.03
    const render = () => {
      ctx.clearRect(0, 0, w, h)

      // Rockets: rise, trail sparks, then burst at their apex.
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i]
        r.x += r.vx
        r.y += r.vy
        r.vy += 0.08 // slight deceleration as it climbs
        r.trail.push({ x: r.x, y: r.y })
        if (r.trail.length > 16) r.trail.shift()

        // Draw the glowing comet trail as a tapered, fading streak.
        ctx.lineCap = 'round'
        ctx.shadowColor = r.color
        ctx.shadowBlur = 8
        for (let t = 1; t < r.trail.length; t++) {
          const a = r.trail[t - 1]
          const b = r.trail[t]
          const f = t / r.trail.length
          ctx.globalAlpha = f * 0.9
          ctx.strokeStyle = r.color
          ctx.lineWidth = f * 3.2
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
        // Flickering spark embers falling off the trail.
        if (r.trail.length > 2 && Math.random() > 0.4) {
          const sp = r.trail[0]
          ctx.globalAlpha = 0.6
          ctx.fillStyle = '#ffd6a5'
          ctx.beginPath()
          ctx.arc(sp.x + (Math.random() - 0.5) * 3, sp.y, 0.8, 0, Math.PI * 2)
          ctx.fill()
        }
        // Bright glowing rocket head.
        ctx.globalAlpha = 1
        ctx.shadowBlur = 14
        ctx.shadowColor = '#fff7e6'
        ctx.fillStyle = '#fff7e6'
        ctx.beginPath()
        ctx.arc(r.x, r.y, 2.4, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0

        // Burst when it reaches its target height or starts falling.
        if (r.y <= r.targetY || r.vy >= 0) {
          burst(r.x, r.y, r.color)
          rockets.splice(i, 1)
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life += 1
        p.vy += gravity
        p.vx *= 0.99
        p.vy *= 0.99
        p.x += p.vx
        p.y += p.vy
        const t = p.life / p.maxLife
        if (t >= 1) {
          particles.splice(i, 1)
          continue
        }
        ctx.globalAlpha = 1 - t
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(launchStop)
      window.removeEventListener('resize', resize)
    }
  }, [active, duration])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[90]"
      aria-hidden="true"
    />
  )
}
