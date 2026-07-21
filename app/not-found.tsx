'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Bug, Zap } from 'lucide-react'

// ── Types ────────────────────────────────────────────────────────────────────
interface BugEntity {
  id: number
  x: number
  y: number
  speed: number   // interval in ms
  size: number
  color: string
  points: number
}

interface Particle {
  id: number
  x: number
  y: number
  color: string
}

// ── Constants ────────────────────────────────────────────────────────────────
const BUG_COLORS = ['#ef4444', '#FE7F2D', '#a855f7', '#3b82f6', '#10b981']
const MAX_BUGS   = 5
let   BUG_ID     = 0

function createBug(level: number): BugEntity {
  const speed  = Math.max(400, 1200 - level * 80)
  const tier   = Math.floor(Math.random() * 3) // 0=slow, 1=medium, 2=fast
  return {
    id:     ++BUG_ID,
    x:      Math.random() * 80 + 10,
    y:      Math.random() * 75 + 10,
    speed:  Math.max(300, speed - tier * 120),
    size:   tier === 2 ? 28 : tier === 1 ? 36 : 44,
    color:  BUG_COLORS[tier % BUG_COLORS.length],
    points: tier === 2 ? 5 : tier === 1 ? 2 : 1,
  }
}

// ── Glitch Text ──────────────────────────────────────────────────────────────
function GlitchTitle() {
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    const loop = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 200)
    }, 3500)
    return () => clearInterval(loop)
  }, [])

  return (
    <div className="relative select-none mb-3">
      {/* Glitch layers */}
      {glitch && (
        <>
          <span
            className="absolute inset-0 text-9xl font-black text-red-500 opacity-70"
            style={{ transform: 'translate(-3px, 2px)', clipPath: 'inset(20% 0 40% 0)' }}
          >
            404
          </span>
          <span
            className="absolute inset-0 text-9xl font-black text-cyan-400 opacity-70"
            style={{ transform: 'translate(3px, -2px)', clipPath: 'inset(60% 0 10% 0)' }}
          >
            404
          </span>
        </>
      )}
      <h1
        className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20"
        style={{ filter: glitch ? 'blur(0.5px)' : 'none' }}
      >
        404
      </h1>
    </div>
  )
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function NotFound() {
  const [bugs,      setBugs]      = useState<BugEntity[]>([])
  const [score,     setScore]     = useState(0)
  const [combo,     setCombo]     = useState(0)
  const [bestCombo, setBestCombo] = useState(0)
  const [particles, setParticles] = useState<Particle[]>([])
  const [comboMsg,  setComboMsg]  = useState('')
  const comboTimer  = useRef<ReturnType<typeof setTimeout> | null>(null)
  const comboReset  = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [started,   setStarted]   = useState(false)
  const level  = Math.floor(score / 10)
  // Stable key representing which bugs are alive — used as effect dep
  const bugIds = bugs.map(b => b.id).join(',')

  // ── Spawn bugs on interval ───────────────────────────────────────────────
  useEffect(() => {
    if (!started) return
    const spawn = () => {
      setBugs(prev => {
        if (prev.length >= MAX_BUGS) return prev
        return [...prev, createBug(level)]
      })
    }
    spawn() // immediate first bug
    const id = setInterval(spawn, Math.max(2000, 5000 - level * 300))
    return () => clearInterval(id)
  }, [started, level])

  // ── Move each bug on its own interval ────────────────────────────────────
  useEffect(() => {
    if (!started || bugs.length === 0) return
    const timers = bugs.map(bug =>
      setInterval(() => {
        setBugs(prev =>
          prev.map(b =>
            b.id === bug.id
              ? { ...b, x: Math.random() * 80 + 10, y: Math.random() * 75 + 10 }
              : b
          )
        )
      }, bug.speed)
    )
    return () => timers.forEach(clearInterval)
  // bugIds is a string derived from bug IDs — safe and stable dep key
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, bugIds])

  // ── Catch a bug ──────────────────────────────────────────────────────────
  const catchBug = useCallback((bug: BugEntity) => {
    setBugs(prev => prev.filter(b => b.id !== bug.id))
    setScore(s => s + bug.points)

    // Combo
    setCombo(c => {
      const next = c + 1
      if (next > bestCombo) setBestCombo(next)
      if (next >= 3) {
        const msgs = ['🔥 On Fire!', '⚡ Lightning!', '💥 Unstoppable!', '🎯 Perfect!']
        setComboMsg(msgs[Math.min(Math.floor((next - 3) / 2), msgs.length - 1)])
        if (comboTimer.current) clearTimeout(comboTimer.current)
        comboTimer.current = setTimeout(() => setComboMsg(''), 1200)
      }
      return next
    })

    // Reset combo if no catch within 2s
    if (comboReset.current) clearTimeout(comboReset.current)
    comboReset.current = setTimeout(() => setCombo(0), 2000)

    // Spawn particle burst
    const newParticles: Particle[] = Array.from({ length: 6 }, (_, i) => ({
      id:    Date.now() + i,
      x:     bug.x,
      y:     bug.y,
      color: bug.color,
    }))
    setParticles(prev => [...prev, ...newParticles])
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(n => n.id === p.id)))
    }, 700)
  }, [bestCombo])

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center relative overflow-hidden">

      {/* ── Background ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at center, rgba(254,127,45,0.06) 0%, transparent 65%)' }}
      />
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(254,127,45,0.06) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* ── Main content ── */}
      <div className="z-10 text-center flex flex-col items-center px-4">
        <GlitchTitle />

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Looks like you found a bug!
        </h2>
        <p className="text-white/50 mb-6 max-w-md mx-auto text-sm leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist.
          {!started ? ' Ready to squash some bugs?' : ' Keep squashing!'}
        </p>

        <div className="flex items-center gap-3 mb-8">
          <Link
            href="/"
            className="btn-ghost inline-flex items-center gap-2"
            style={{ padding: '0.65rem 1.5rem', fontSize: '0.875rem' }}
          >
            <ArrowLeft size={14} />
            Return Home
          </Link>

          {!started && (
            <button
              onClick={() => setStarted(true)}
              className="btn-primary inline-flex items-center gap-2"
              style={{ padding: '0.65rem 1.5rem', fontSize: '0.875rem' }}
            >
              <Bug size={14} />
              Start Hunting!
            </button>
          )}
        </div>

        {/* ── Stats ── */}
        {started && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-6 text-sm font-mono"
          >
            <div className="glass px-4 py-2 rounded-xl text-center">
              <div className="text-white/40 text-xs mb-0.5 uppercase tracking-widest">Score</div>
              <div className="text-primary font-black text-xl">{score}</div>
            </div>
            <div className="glass px-4 py-2 rounded-xl text-center">
              <div className="text-white/40 text-xs mb-0.5 uppercase tracking-widest">Combo</div>
              <div className="font-black text-xl" style={{ color: combo >= 3 ? '#FE7F2D' : 'white' }}>
                x{combo}
              </div>
            </div>
            <div className="glass px-4 py-2 rounded-xl text-center">
              <div className="text-white/40 text-xs mb-0.5 uppercase tracking-widest">Best</div>
              <div className="text-white/70 font-black text-xl">x{bestCombo}</div>
            </div>
            <div className="glass px-4 py-2 rounded-xl text-center">
              <div className="text-white/40 text-xs mb-0.5 uppercase tracking-widest">Level</div>
              <div className="text-green-400 font-black text-xl">{level + 1}</div>
            </div>
          </motion.div>
        )}
      </div>

      {/* ── Combo flash message ── */}
      <AnimatePresence>
        {comboMsg && (
          <motion.div
            key={comboMsg + combo}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.4, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <span className="text-3xl font-black text-primary drop-shadow-[0_0_20px_rgba(254,127,45,0.8)]">
              {comboMsg}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bugs ── */}
      <AnimatePresence>
        {bugs.map(bug => (
          <motion.div
            key={bug.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              left: `${bug.x}%`,
              top:  `${bug.y}%`,
            }}
            exit={{ opacity: 0, scale: 2, rotate: 360 }}
            transition={{ type: 'spring', damping: 12, stiffness: 80 }}
            className="absolute cursor-crosshair z-20"
            style={{ padding: '16px' }}
            onClick={() => catchBug(bug)}
            title="Click to catch!"
          >
            <Bug
              style={{
                width:      `${bug.size}px`,
                height:     `${bug.size}px`,
                color:      bug.color,
                filter:     `drop-shadow(0 0 12px ${bug.color}80)`,
                animation:  'spin 2s linear infinite',
              }}
            />
            {/* Points badge */}
            {bug.points > 1 && (
              <span
                className="absolute -top-1 -right-1 text-xs font-black rounded-full w-5 h-5 flex items-center justify-center"
                style={{ background: bug.color, color: '#000' }}
              >
                {bug.points}
              </span>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* ── Particle burst ── */}
      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            animate={{
              opacity: 0,
              scale: 0,
              x: (Math.random() - 0.5) * 120,
              y: (Math.random() - 0.5) * 120,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute z-30 pointer-events-none w-3 h-3 rounded-full"
            style={{
              left:       `${p.x}%`,
              top:        `${p.y}%`,
              background: p.color,
              boxShadow:  `0 0 8px ${p.color}`,
            }}
          />
        ))}
      </AnimatePresence>

      {/* ── Speed indicator ── */}
      {started && level > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 glass px-3 py-2 rounded-xl text-xs"
        >
          <Zap size={12} className="text-yellow-400" />
          <span className="text-white/50">Level {level + 1} — bugs are faster!</span>
        </motion.div>
      )}

      {/* ── Inline keyframe for bug spin ── */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
