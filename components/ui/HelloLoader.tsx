'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'

// iOS Setup inspired multi-language greetings
const GREETINGS = [
  { text: 'Hello', lang: 'English' },
  { text: 'Hola', lang: 'Spanish' },
  { text: 'Bonjour', lang: 'French' },
  { text: 'Namaste', lang: 'Hindi' },
  { text: 'Kem Cho', lang: 'Gujarati' },
  { text: 'こんにちは', lang: 'Japanese' },
  { text: 'Ciao', lang: 'Italian' },
  { text: 'Hallo', lang: 'German' },
  { text: 'Olá', lang: 'Portuguese' },
  { text: '你好', lang: 'Chinese' },
  { text: 'مرحبا', lang: 'Arabic' },
  { text: '안녕하세요', lang: 'Korean' },
  { text: 'Privet', lang: 'Russian' },
]

export function HelloLoader() {
  const [isVisible, setIsVisible] = useState(true)
  const [greetingIndex, setGreetingIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [statusMessage, setStatusMessage] = useState('Initializing experience...')
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Lock body scroll on mount
    document.body.style.overflow = 'hidden'

    let isBackendLoaded = false
    let backendSummary: Record<string, any> | null = null

    // Background Warmup: Pre-fetch ALL backend database tables
    const prefetchData = async () => {
      try {
        const res = await fetch('/api/preload')
        const data = await res.json()
        if (data?.success && data?.dataSummary) {
          backendSummary = data.dataSummary
        }
      } catch (err) {
        // Fallback gracefully on network error
      } finally {
        isBackendLoaded = true
      }
    }
    prefetchData()

    // 1. Fast multi-language greeting text loop timer (240ms per language like iPhone setup)
    const greetingInterval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % GREETINGS.length)
    }, 240)

    // 2. Fast & Smooth Progress Bar Percentage Increment (2.8s total duration)
    const startTime = Date.now()
    const targetDuration = 2800 // Fast loader duration in ms

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      let calculatedProgress = Math.min(Math.floor((elapsed / targetDuration) * 100), 100)

      // Hold at 95% if backend preloading is still finishing up
      if (calculatedProgress > 95 && !isBackendLoaded) {
        calculatedProgress = 95
      }

      setProgress(calculatedProgress)

      // Update status messages dynamically with real preloaded backend counts
      if (calculatedProgress < 20) {
        setStatusMessage('Connecting database streams...')
      } else if (calculatedProgress < 45) {
        if (backendSummary?.projectsCount !== undefined) {
          setStatusMessage(`Preloaded ${backendSummary.projectsCount} projects & ${backendSummary.skillsCount || 0} skills...`)
        } else {
          setStatusMessage('Preloading projects & skills database...')
        }
      } else if (calculatedProgress < 75) {
        if (backendSummary?.testimonialsCount !== undefined) {
          setStatusMessage(`Preloaded ${backendSummary.testimonialsCount} reviews & ${backendSummary.certificatesCount || 0} certs...`)
        } else {
          setStatusMessage('Preloading certificates & experience...')
        }
      } else if (calculatedProgress < 99) {
        setStatusMessage('Optimizing graphics & warm cache...')
      } else {
        setStatusMessage('Database preloaded & ready!')
      }

      if (calculatedProgress >= 100 && isBackendLoaded) {
        clearInterval(progressInterval)
        clearInterval(greetingInterval)

        // Delay briefly at 100% then trigger exit animation
        setTimeout(() => {
          setIsExiting(true)
          setTimeout(() => {
            setIsVisible(false)
            document.body.style.overflow = ''
          }, 600) // matches exit transition duration
        }, 300)
      }
    }, 30)

    return () => {
      clearInterval(greetingInterval)
      clearInterval(progressInterval)
      document.body.style.overflow = ''
    }
  }, [])

  const handleSkip = () => {
    setIsExiting(true)
    setTimeout(() => {
      setIsVisible(false)
      document.body.style.overflow = ''
    }, 400)
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="hello-splash-overlay"
          initial={{ opacity: 1, scale: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: 'blur(12px)',
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-between bg-black text-white select-none overflow-hidden"
          role="dialog"
          aria-label="Initial Loading Screen"
        >
          {/* Background Ambient Glows & Grid matching website theme */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-amber-600/20 via-orange-600/25 to-rose-600/15 rounded-full blur-[140px]" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-[hsl(202,37%,23%)]/30 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/15 rounded-full blur-[120px]" />
            <div className="hero-grid-pattern opacity-40" />
          </div>

          {/* Top Bar: Skip Action */}
          <div className="w-full max-w-5xl px-6 pt-6 flex items-center justify-between z-10">
            <div className="flex items-center gap-2 text-xs font-mono text-orange-400 bg-orange-950/40 border border-orange-500/30 px-3 py-1.5 rounded-full backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 animate-spin text-orange-400" />
              <span>KEYUR MISTRY</span>
            </div>
            <button
              onClick={handleSkip}
              className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-1.5 rounded-full transition-all duration-200 backdrop-blur-md group"
            >
              <span>Skip</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Center Content: iPhone Setup Inspired Multi-Language "Hello" */}
          <div className="relative flex flex-col items-center justify-center my-auto z-10 px-4 text-center">
            <div className="h-32 sm:h-40 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={GREETINGS[greetingIndex].text}
                  initial={{ y: 28, opacity: 0, scale: 0.95 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -28, opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="flex flex-col items-center"
                >
                  <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold font-outfit tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-100 to-orange-100/90 drop-shadow-[0_10px_35px_rgba(254,127,45,0.25)]">
                    {GREETINGS[greetingIndex].text}
                  </h1>
                </motion.div>
              </AnimatePresence>
            </div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-3 text-xs font-mono tracking-widest text-orange-400/90 uppercase"
            >
              {GREETINGS[greetingIndex].lang}
            </motion.span>
          </div>

          {/* Bottom Content: Status Message, Percentage & Progress Bar */}
          <div className="w-full max-w-md px-6 pb-12 sm:pb-16 z-10 flex flex-col items-center gap-3">
            <div className="w-full flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="truncate max-w-[240px] text-orange-300/90 font-medium">
                {statusMessage}
              </span>
              <span className="text-white font-bold tracking-wider">{progress}%</span>
            </div>

            {/* Glowing Percentage Track matching site Orange/Teal palette */}
            <div className="w-full h-2 bg-slate-950 border border-white/10 rounded-full p-0.5 backdrop-blur-md shadow-inner overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-teal-500 rounded-full shadow-[0_0_20px_rgba(254,127,45,0.6)]"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
