'use client'

import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'

interface RevealTextProps {
  text: string
  className?: string
  delay?: number
  once?: boolean
  type?: 'word' | 'char' | 'line'
}

export function RevealText({
  text,
  className,
  delay = 0,
  once = true,
  type = 'word',
}: RevealTextProps) {
  const controls = useAnimation()
  const [ref, inView] = useInView({ triggerOnce: once, threshold: 0.2 })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  if (type === 'char') {
    const chars = text.split('')
    return (
      <motion.span ref={ref} className={cn('inline-block', className)}>
        {chars.map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0, y: 20, rotateX: -90 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                rotateX: 0,
                transition: {
                  delay: delay + i * 0.03,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.span>
    )
  }

  const words = text.split(' ')
  return (
    <motion.span ref={ref} className={cn('inline', className)}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={controls}
            variants={{
              visible: {
                y: '0%',
                opacity: 1,
                transition: {
                  delay: delay + i * 0.08,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </motion.span>
  )
}
