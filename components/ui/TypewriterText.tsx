'use client'

import { useEffect, useState, useRef } from 'react'

const ROLES = [
  'Flutter Developer',
  'Full Stack Developer',
  'Mobile App Developer',
  'Firebase Expert',
  'UI Craftsman',
]

export function TypewriterText() {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const currentRole = ROLES[currentIndex]

    const type = () => {
      if (isPaused) {
        timeoutRef.current = setTimeout(() => {
          setIsPaused(false)
          setIsDeleting(true)
        }, 2000)
        return
      }

      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1))
          timeoutRef.current = setTimeout(type, 80)
        } else {
          setIsPaused(true)
          timeoutRef.current = setTimeout(type, 50)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
          timeoutRef.current = setTimeout(type, 50)
        } else {
          setIsDeleting(false)
          setCurrentIndex((prev) => (prev + 1) % ROLES.length)
        }
      }
    }

    timeoutRef.current = setTimeout(type, 100)
    return () => clearTimeout(timeoutRef.current)
  }, [displayText, currentIndex, isDeleting, isPaused])

  return (
    <span className="gradient-text font-display font-bold">
      {displayText}
      <span className="animate-pulse" style={{ color: '#FE7F2D' }}>|</span>
    </span>
  )
}
