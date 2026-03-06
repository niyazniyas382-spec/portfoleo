import { useEffect, useRef } from 'react'

export default function CursorRipple() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    const ripples = []
    const trail = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    class Ripple {
      constructor(x, y) {
        this.x = x
        this.y = y
        this.radius = 2
        this.maxRadius = 60 + Math.random() * 40
        this.opacity = 0.35
        this.speed = 1.5 + Math.random() * 1
        this.hue = 260 + Math.random() * 60 // purple to cyan range
      }
      update() {
        this.radius += this.speed
        this.opacity *= 0.97
        return this.opacity > 0.01 && this.radius < this.maxRadius
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `hsla(${this.hue}, 80%, 65%, ${this.opacity})`
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Inner glow
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius * 0.6, 0, Math.PI * 2)
        ctx.strokeStyle = `hsla(${this.hue}, 90%, 75%, ${this.opacity * 0.4})`
        ctx.lineWidth = 0.8
        ctx.stroke()
      }
    }

    class TrailDot {
      constructor(x, y) {
        this.x = x
        this.y = y
        this.size = 3 + Math.random() * 2
        this.opacity = 0.5
        this.vx = (Math.random() - 0.5) * 2
        this.vy = (Math.random() - 0.5) * 2 + 1 // slight downward drift like water
        this.life = 1
        this.hue = 260 + Math.random() * 60
      }
      update() {
        this.x += this.vx
        this.y += this.vy
        this.vy += 0.03 // gravity
        this.vx *= 0.99
        this.life -= 0.015
        this.opacity = this.life * 0.4
        this.size *= 0.995
        return this.life > 0
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${this.hue}, 80%, 70%, ${this.opacity})`
        ctx.fill()
      }
    }

    let lastX = 0, lastY = 0
    let frameCount = 0
    let lastRippleTime = 0

    const handleMouseMove = (e) => {
      const x = e.clientX
      const y = e.clientY
      const dx = x - lastX
      const dy = y - lastY
      const speed = Math.sqrt(dx * dx + dy * dy)

      // Trail dots on every move
      if (speed > 2) {
        const count = Math.min(3, Math.floor(speed / 8))
        for (let i = 0; i < count; i++) {
          trail.push(new TrailDot(
            x + (Math.random() - 0.5) * 10,
            y + (Math.random() - 0.5) * 10
          ))
        }
      }

      // Ripples at intervals based on movement
      const now = Date.now()
      if (speed > 5 && now - lastRippleTime > 120) {
        ripples.push(new Ripple(x, y))
        lastRippleTime = now
      }

      lastX = x
      lastY = y
    }

    const handleClick = (e) => {
      // Big ripple splash on click
      for (let i = 0; i < 3; i++) {
        const r = new Ripple(e.clientX, e.clientY)
        r.maxRadius = 80 + i * 30
        r.speed = 2 + i * 0.5
        r.opacity = 0.5
        ripples.push(r)
      }
      // Splash dots
      for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 2 * i) / 12
        const dot = new TrailDot(e.clientX, e.clientY)
        dot.vx = Math.cos(angle) * (3 + Math.random() * 2)
        dot.vy = Math.sin(angle) * (3 + Math.random() * 2)
        dot.size = 2 + Math.random() * 3
        trail.push(dot)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('click', handleClick)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frameCount++

      // Update and draw ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        if (!ripples[i].update()) {
          ripples.splice(i, 1)
        } else {
          ripples[i].draw()
        }
      }

      // Update and draw trail
      for (let i = trail.length - 1; i >= 0; i--) {
        if (!trail[i].update()) {
          trail.splice(i, 1)
        } else {
          trail[i].draw()
        }
      }

      // Cap arrays to prevent memory issues
      if (ripples.length > 30) ripples.splice(0, ripples.length - 30)
      if (trail.length > 150) trail.splice(0, trail.length - 150)

      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
