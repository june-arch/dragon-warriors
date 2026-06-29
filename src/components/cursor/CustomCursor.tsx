import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
}

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number>(0)
  const isDesktop = useRef(false)

  useEffect(() => {
    isDesktop.current = window.matchMedia('(pointer: fine)').matches
    if (!isDesktop.current) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    const spawnParticle = () => {
      const { x, y } = mouseRef.current
      if (x < 0 || y < 0) return
      particlesRef.current.push({
        x: x + (Math.random() - 0.5) * 4,
        y: y + (Math.random() - 0.5) * 4,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        life: 0,
        maxLife: 40 + Math.random() * 30,
        size: 2 + Math.random() * 3,
      })
      if (particlesRef.current.length > 40) {
        particlesRef.current = particlesRef.current.slice(-40)
      }
    }

    let lastSpawn = 0
    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (time - lastSpawn > 30) {
        spawnParticle()
        lastSpawn = time
      }

      const particles = particlesRef.current
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life++
        p.x += p.vx
        p.y += p.vy
        p.vy -= 0.02

        if (p.life >= p.maxLife) {
          particles.splice(i, 1)
          continue
        }

        const progress = p.life / p.maxLife
        const alpha = 1 - progress
        const size = p.size * (1 - progress * 0.5)

        ctx.beginPath()
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 255, 255, ${alpha * 0.6})`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(p.x, p.y, size * 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 255, 255, ${alpha * 0.2})`
        ctx.fill()
      }

      ctx.beginPath()
      ctx.arc(mouseRef.current.x, mouseRef.current.y, 4, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(0, 255, 255, 0.7)'
      ctx.fill()

      ctx.beginPath()
      ctx.arc(mouseRef.current.x, mouseRef.current.y, 10, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(0, 255, 255, 0.15)'
      ctx.fill()

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  if (!isDesktop.current) return null

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        pointerEvents: 'none',
      }}
    />
  )
}
