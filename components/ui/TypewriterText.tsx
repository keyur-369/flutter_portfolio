'use client'

import { useEffect, useState, useRef } from 'react'

interface TypewriterTextProps {
  roles?: string[]
  className?: string
  cursorClassName?: string
  loop?: boolean
  speed?: number
}

const DEFAULT_ROLES = ['Flutter Developer']

export function TypewriterText({
  roles = DEFAULT_ROLES,
  className = 'gradient-text font-display font-bold',
  cursorClassName = 'animate-pulse text-[#22D3EE] ml-1 font-sans',
  loop = false,
  speed = 75,
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (isFinished) return

    const currentRole = roles[currentIndex % roles.length] || 'Flutter Developer'

    const type = () => {
      if (isPaused) {
        if (!loop && currentIndex === roles.length - 1) {
          setIsFinished(true)
          return
        }
        timeoutRef.current = setTimeout(() => {
          setIsPaused(false)
          setIsDeleting(true)
        }, 2200)
        return
      }

      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1))
          timeoutRef.current = setTimeout(type, speed)
        } else {
          if (!loop && roles.length === 1) {
            setIsFinished(true)
            return
          }
          setIsPaused(true)
          timeoutRef.current = setTimeout(type, 50)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
          timeoutRef.current = setTimeout(type, 45)
        } else {
          setIsDeleting(false)
          setCurrentIndex((prev) => (prev + 1) % roles.length)
        }
      }
    }

    timeoutRef.current = setTimeout(type, 80)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [displayText, currentIndex, isDeleting, isPaused, roles, loop, speed, isFinished])

  return (
    <span className={className}>
      {displayText}
      {!isFinished && <span className={cursorClassName}>|</span>}
    </span>
  )
}

export function OneShotTypewriter({
  text = 'I build cross-platform mobile apps with Flutter, Firebase and Supabase — from published Play Store apps to full-stack platforms with clean architecture and interfaces people enjoy using.',
  boldTarget = 'cross-platform mobile apps',
  speed = 38,
  className = '',
}: {
  text?: string
  boldTarget?: string
  speed?: number
  className?: string
}) {
  const [typedIndex, setTypedIndex] = useState(0)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    setTypedIndex(0)
    setIsDone(false)

    if (!text) {
      setIsDone(true)
      return
    }

    const interval = setInterval(() => {
      setTypedIndex((prev) => {
        if (prev >= text.length) {
          clearInterval(interval)
          setIsDone(true)
          return text.length
        }
        return prev + 1
      })
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  const boldIndex = text.indexOf(boldTarget)

  let beforeBold = ''
  let boldTyped = ''
  let afterBold = ''

  if (boldIndex === -1) {
    beforeBold = text.slice(0, typedIndex)
  } else if (typedIndex <= boldIndex) {
    beforeBold = text.slice(0, typedIndex)
  } else if (typedIndex <= boldIndex + boldTarget.length) {
    beforeBold = text.slice(0, boldIndex)
    boldTyped = text.slice(boldIndex, typedIndex)
  } else {
    beforeBold = text.slice(0, boldIndex)
    boldTyped = boldTarget
    afterBold = text.slice(boldIndex + boldTarget.length, typedIndex)
  }

  return (
    <span className={className}>
      {beforeBold}
      {boldTyped && <strong className="font-semibold text-white">{boldTyped}</strong>}
      {afterBold}
      {!isDone && (
        <span className="inline-block w-1.5 h-4 ml-0.5 bg-orange-400 animate-pulse align-middle" />
      )}
    </span>
  )
}
