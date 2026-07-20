'use client'

import { useState, useEffect } from 'react'
import { useScroll, useSpring, motion } from 'framer-motion'

export function ScrollProgress() {
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX }}
    />
  )
}
