'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export function AnimatedCursor() {
  const [mounted, setMounted] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const springX = useSpring(0, { stiffness: 400, damping: 35 })
  const springY = useSpring(0, { stiffness: 400, damping: 35 })

  const dotSpringX = useSpring(0, { stiffness: 700, damping: 45 })
  const dotSpringY = useSpring(0, { stiffness: 700, damping: 45 })

  useEffect(() => {
    setMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      springX.set(e.clientX)
      springY.set(e.clientY)
      dotSpringX.set(e.clientX)
      dotSpringY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('data-cursor-hover')
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [isVisible, springX, springY, dotSpringX, dotSpringY])

  if (!mounted) return null

  // Touch devices check
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="custom-cursor pointer-events-none fixed z-[99999]"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 48 : 32,
            height: isHovering ? 48 : 32,
            opacity: isVisible ? 1 : 0,
            borderColor: isHovering ? 'rgba(254,127,45,1)' : 'rgba(254,127,45,0.55)',
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="rounded-full border-2"
          style={{ background: 'transparent' }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="custom-cursor pointer-events-none fixed z-[99999]"
        style={{
          x: dotSpringX,
          y: dotSpringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 6 : 8,
            height: isHovering ? 6 : 8,
            opacity: isVisible ? 1 : 0,
            background: isHovering
              ? 'rgba(254,127,45,1)'
              : 'rgba(254,127,45,0.9)',
          }}
          className="rounded-full"
        />
      </motion.div>
    </>
  )
}
