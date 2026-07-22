'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  id: number
  top: number
  left: number
  size: number
  duration: number
  delay: number
  glowColor: string
}

export function GlobalParticlesBackground() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    // Generate 32 ambient glowing particle dots distributed across the whole screen
    const generated: Particle[] = Array.from({ length: 32 }).map((_, i) => ({
      id: i,
      top: Math.floor(Math.random() * 96) + 2,
      left: Math.floor(Math.random() * 96) + 2,
      size: Math.random() > 0.75 ? 4 : 3,
      duration: 5 + (i % 5) + Math.random() * 3,
      delay: (i * 0.3) % 4,
      glowColor: i % 4 === 0 ? '#FF9E59' : i % 3 === 0 ? '#22D3EE' : '#FE7F2D',
    }))
    setParticles(generated)
  }, [])

  if (particles.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.glowColor,
            boxShadow: `0 0 ${p.size * 3}px ${p.glowColor}, 0 0 ${p.size * 6}px ${p.glowColor}`,
          }}
          animate={{
            y: [0, -35, 0],
            x: [0, p.id % 2 === 0 ? 12 : -12, 0],
            opacity: [0.15, 0.8, 0.15],
            scale: [0.8, 1.4, 0.8],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}
    </div>
  )
}
