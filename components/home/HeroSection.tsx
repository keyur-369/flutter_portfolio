'use client'

import React, { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowUpRight,
  Download,
  User,
  Code2,
  CheckCircle2,
  Github,
  Linkedin,
  Mail,
  Briefcase,
  FolderGit2,
  Cpu,
  Award,
  Sparkles,
} from 'lucide-react'
import type { Profile } from '@/types/database'
import { TypewriterText, OneShotTypewriter } from '@/components/ui/TypewriterText'

// ── HIGH PRECISION BRAND TECH ICONS ──
function FlutterIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-current text-[#54C5F8]`}>
      <path d="M14.314 0L2.3 12 6 15.7 21.714 0h-7.4zm0 9.871L8.3 15.886l6.014 6.014h7.4L15.7 15.886l6.014-6.015h-7.4z" />
    </svg>
  )
}

function ReactIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} stroke-current text-[#61DAFB] fill-none`} strokeWidth="1.6">
      <ellipse cx="12" cy="12" rx="9" ry="3.5" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.5" className="fill-[#61DAFB]" />
    </svg>
  )
}

function FirebaseIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-current text-[#FFA611]`}>
      <path d="M3.89 15.672L6.529 1.135a.656.656 0 011.231-.132l2.673 5.093-10.543 9.576zm16.586.347L17.7 3.593a.656.656 0 00-1.189-.133l-2.738 5.216 6.703 7.343zM13.626 9.88l-2.023-3.856a.656.656 0 00-1.157 0l-7.915 15.08 10.37-5.753a1.442 1.442 0 00.725-1.282v-4.189zM12 15.895l-8.528 4.73 8.012 2.684a1.442 1.442 0 001.032 0l8.012-2.684L12 15.895z" />
    </svg>
  )
}

function AwsIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-[#FF9900]`}>
      <path d="M18.75 14.15c-2.45 1.75-6 2.65-9.05 2.65-4.25 0-8.05-1.55-10.9-4.15l-.85 1.1c3.2 2.9 7.45 4.65 12.2 4.65 3.4 0 7.35-1 10.05-2.95l-1.45-1.3z" />
      <path d="M19.75 12.85c.35-.45.95-2.15 1.15-2.75.2-.6.05-.85-.45-.65-.5.2-1.9.8-2.65 1.15-.75.35-.45 1 .05.95.5-.05 1.3-.15 1.9-.15l-.05 1.45z" />
      <path d="M7.15 10.3c0 .35.05.6.2.8.15.2.35.3.6.3.2 0 .4-.05.6-.15.2-.1.35-.25.5-.45v.65h1.45V7.1H9.05v1.9c-.15-.2-.35-.35-.5-.45-.2-.1-.4-.15-.65-.15-.55 0-1 .2-1.3.6-.3.4-.45.9-.45 1.6v-.3zm1.5-.1c0-.35.05-.6.2-.8.15-.2.35-.3.6-.3.3 0 .5.1.65.3v1.6c-.15.2-.35.3-.65.3-.25 0-.45-.1-.6-.3-.15-.2-.2-.45-.2-.8v.3zm3.75 1.25h1.5l1.1-3.8h.05l1.1 3.8h1.45l1.6-5H18.2l-.95 3.6h-.05l-1.1-3.6h-1.3l-1.1 3.6h-.05l-.95-3.6h-1.45l1.6 5zm9.35-3.55c-.75-.25-1.55-.4-2.35-.45-.3 0-.6.05-.85.15-.25.1-.45.25-.6.45-.15.2-.25.45-.25.75 0 .3.05.55.2.75.15.2.35.35.65.45.3.1.65.2 1.05.3.4.1.75.25 1.05.4.3.15.5.35.65.55.15.2.2.5.2.85 0 .5-.2.95-.6 1.3-.4.35-1 .55-1.75.55-.5 0-1.05-.1-1.6-.25s-1.05-.4-1.55-.65l.55-1.2c.45.25.9.45 1.35.6.45.15.9.2 1.3.2.35 0 .65-.05.85-.2.2-.15.3-.35.3-.6 0-.25-.05-.45-.2-.6-.15-.15-.35-.25-.65-.35-.3-.1-.65-.2-1.05-.3-.4-.1-.75-.25-1.05-.4-.3-.15-.5-.35-.65-.55-.15-.2-.25-.5-.25-.85 0-.5.2-.95.6-1.3.4-.35.95-.55 1.7-.55.5 0 1 .05 1.5.2s.95.35 1.4.55l-.5 1.2z" />
    </svg>
  )
}

function GitIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-current text-[#F05032]`}>
      <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.44.516.515.655 1.258.428 1.9l2.647 2.648c.642-.228 1.385-.088 1.9.427.71.71.71 1.861 0 2.571-.71.71-1.862.71-2.572 0-.54-.54-.678-1.327-.417-1.986l-2.463-2.464V15.7c.188.087.362.21.507.355.71.71.71 1.862 0 2.572-.71.71-1.862.71-2.572 0-.71-.71-.71-1.862 0-2.572.176-.176.38-.303.6-.381V9.58c-.22-.078-.424-.205-.6-.381-.546-.546-.682-1.339-.413-2.002L7.266 4.07 1.454 9.882c-.604.604-.604 1.582 0 2.188l10.48 10.478c.604.604 1.582.604 2.187 0l9.425-9.425c.604-.604.604-1.582 0-2.193z" />
    </svg>
  )
}

function SupabaseIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-current text-[#3ECF8E]`}>
      <path d="M13.359 1.107c-.636-.838-1.947-.393-1.947.662v10.15H1.674c-1.164 0-1.78 1.383-.997 2.235l9.564 10.42c.636.837 1.947.392 1.947-.663V13.763h9.738c1.164 0 1.78-1.384.997-2.236l-9.564-10.42z" />
    </svg>
  )
}

function NodeIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-current text-[#68A063]`}>
      <path d="M12 2L2.5 7.5v11L12 24l9.5-5.5v-11L12 2zm0 2.31l7.5 4.33v8.66L12 21.63l-7.5-4.33V8.64L12 4.31zM11 9v2h2V9h-2zm0 4v6h2v-6h-2z" />
    </svg>
  )
}

function WhatsAppIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-current text-emerald-400`}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
    </svg>
  )
}

interface HeroSectionProps {
  profile: Profile | null
  statsCounts?: {
    projectsCount?: number
    skillsCount?: number
    certsCount?: number
    experienceCount?: number
  }
}

export function HeroSection({ profile, statsCounts }: HeroSectionProps) {
  const name = profile?.full_name ?? 'Keyur Mistry'
  const firstName = name.split(' ')[0] ?? 'Keyur'
  const lastName = name.split(' ')[1] ?? 'Mistry'
  const title = profile?.title || 'Flutter Developer'

  const defaultAbout =
    'I build cross-platform mobile apps with Flutter, Firebase and Supabase — from published Play Store apps to full-stack platforms with clean architecture and interfaces people enjoy using.'

  const about = profile?.about && profile.about.trim().length > 0 ? profile.about : defaultAbout

  // Parallax Spring Motion
  const rawMouseX = useMotionValue(0)
  const rawMouseY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 120 }
  const parallaxX = useSpring(rawMouseX, springConfig)
  const parallaxY = useSpring(rawMouseY, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window
    const x = (clientX / innerWidth - 0.5) * 24
    const y = (clientY / innerHeight - 0.5) * 24
    rawMouseX.set(x)
    rawMouseY.set(y)
  }

  // Dynamic Statistics from Database
  const stats = [
    {
      label: 'Years Experience',
      value: statsCounts?.experienceCount && statsCounts.experienceCount > 0 ? `${statsCounts.experienceCount}+` : '1+',
      icon: Briefcase,
      color: 'text-orange-400',
    },
    {
      label: 'Projects Completed',
      value: statsCounts?.projectsCount && statsCounts.projectsCount > 0 ? `${statsCounts.projectsCount}+` : '10+',
      icon: FolderGit2,
      color: 'text-amber-400',
    },
    {
      label: 'Technologies Mastered',
      value: statsCounts?.skillsCount && statsCounts.skillsCount > 0 ? `${statsCounts.skillsCount}+` : '5+',
      icon: Cpu,
      color: 'text-emerald-400',
    },
    {
      label: 'Client Satisfaction',
      value: '100%',
      icon: Award,
      color: 'text-cyan-400',
    },
  ]

  const techLogos = [
    { name: 'Flutter', Icon: FlutterIcon },
    { name: 'Firebase', Icon: FirebaseIcon },
    { name: 'React', Icon: ReactIcon },
    { name: 'Node.js', Icon: NodeIcon },
    { name: 'Supabase', Icon: SupabaseIcon },
    { name: 'Git', Icon: GitIcon },
    { name: 'AWS', Icon: AwsIcon },
  ]

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-start overflow-x-hidden text-white pt-0 pb-4"
    >
      {/* Dynamic 3D Spatial Keyframes Injection */}
      <style jsx global>{`
        @keyframes orbitRotateCw {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes orbitRotateCcw {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        @keyframes counterTransform3dCw {
          0% { transform: rotate(0deg) rotateY(22deg) rotateX(-72deg); }
          100% { transform: rotate(-360deg) rotateY(22deg) rotateX(-72deg); }
        }
        @keyframes counterTransform3dCcw {
          0% { transform: rotate(0deg) rotateY(-22deg) rotateX(-66deg); }
          100% { transform: rotate(360deg) rotateY(-22deg) rotateX(-66deg); }
        }
        @keyframes cardScanline {
          0% { top: 0%; opacity: 0; }
          30% { opacity: 0.8; }
          70% { opacity: 0.8; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.75; transform: scale(1.06); }
        }
      `}</style>

      {/* ── BACKGROUND LAYER ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Deep ambient dark gradient */}
        <div className="absolute inset-0 bg-radial from-slate-950/80 via-black to-black" />

        {/* Futuristic Subtle Grid Overlay */}
        <div className="hero-grid-pattern opacity-60" />

        {/* Noise overlay */}
        <div className="noise-overlay opacity-20" />

        {/* Top-left subtle orange ambient glow */}
        <div
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[140px] opacity-40"
          style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.18) 0%, transparent 70%)' }}
        />

        {/* Right-center primary radial glow behind photo */}
        <div
          className="absolute top-1/3 right-10 lg:right-24 w-[650px] h-[650px] rounded-full blur-[130px]"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.22) 0%, hsl(var(--primary) / 0.05) 50%, transparent 75%)',
            animation: 'pulseGlow 8s ease-in-out infinite',
          }}
        />

        {/* Ambient floating background particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-orange-400/50 shadow-[0_0_8px_#FE7F2D]"
            style={{
              top: `${(i * 19) % 90 + 5}%`,
              left: `${(i * 23) % 90 + 5}%`,
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.4, 0.8],
            }}
            transition={{
              duration: 4 + (i % 5),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      {/* ── MAIN CONTENT CONTAINER (NO SPACE NO PADDING AT TOP) ── */}
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 pt-0 sm:pt-1 lg:pt-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

          {/* ── LEFT COLUMN (TEXT & STATS - FULL LEFT ALIGNED) ── */}
          <div className="lg:col-span-6 flex flex-col justify-center items-start gap-4 sm:gap-5 text-left order-2 lg:order-1">

            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-start"
            >
              <div
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide backdrop-blur-xl transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(16, 185, 129, 0.06)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  boxShadow: '0 0 20px rgba(16, 185, 129, 0.1)',
                }}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-emerald-400">Available for freelance & full-time roles</span>
              </div>
            </motion.div>

            {/* Name Heading & Handwritten Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="select-none text-left"
            >
              <span className="block text-base sm:text-lg font-medium tracking-wide text-slate-400 mb-0.5">
                Hi, I'm
              </span>
              <h1 className="font-display font-black uppercase tracking-tight leading-[0.88] text-left">
                <span className="block text-white" style={{ fontSize: 'clamp(3rem, 6.5vw, 5.8rem)' }}>
                  {firstName}
                </span>
                <span
                  className="block drop-shadow-[0_10px_35px_rgba(254,127,45,0.25)]"
                  style={{
                    fontSize: 'clamp(3rem, 6.5vw, 5.8rem)',
                    background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, #FF9E59 50%, hsl(var(--primary)) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {lastName}
                </span>
              </h1>

              {/* Handwritten role accent text — Cyan / Teal with Typing Animation */}
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="font-cursive text-3xl sm:text-4xl lg:text-5xl font-bold mt-1.5 ml-1 text-[#22D3EE] drop-shadow-[0_4px_20px_rgba(34,211,238,0.5)] text-left min-h-[50px] sm:min-h-[60px]"
              >
                <TypewriterText
                  roles={[
                    title || 'Flutter Developer',
                    'Cross-Platform Engineer',
                    'Firebase & Supabase Expert',
                    'Full Stack App Developer',
                    'Mobile UI Craftsman',
                  ]}
                  className="inline-block"
                  cursorClassName="animate-pulse text-[#22D3EE] ml-1 font-sans"
                />
              </motion.div>
            </motion.div>

            {/* Short Bio — One-Time Typewriter Typing Animation on Page Load / Reload / Navigation */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-sm sm:text-base leading-relaxed max-w-xl text-justify text-slate-400 font-normal min-h-[72px]"
            >
              <OneShotTypewriter
                text={about}
                boldTarget="cross-platform mobile apps"
                speed={38}
              />
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-start gap-3.5 w-full sm:w-auto"
            >
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm text-black transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, #FF9E59 100%)',
                  boxShadow: '0 8px 30px rgba(254, 127, 45, 0.4)',
                }}
              >
                <span>Hire Me</span>
                <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <a
                href={profile?.resume_url ?? '/resume'}
                target={profile?.resume_url ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm text-slate-200 transition-all duration-300 glass border border-white/10 hover:border-orange-500/40 hover:text-orange-400 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xl"
              >
                <Download size={18} className="text-orange-400" />
                <span>Download Resume</span>
              </a>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center justify-start gap-3 pt-0.5"
            >
              {[
                { icon: Github, href: profile?.github ?? 'https://github.com', label: 'GitHub' },
                { icon: Linkedin, href: profile?.linkedin ?? 'https://linkedin.com', label: 'LinkedIn' },
                { icon: Mail, href: `mailto:${profile?.email ?? 'keyurmistry334@gmail.com'}`, label: 'Email' },
                { icon: WhatsAppIcon, href: 'https://wa.me/?text=Hi%20Keyur', label: 'WhatsApp', isCustomSvg: true },
              ].map(({ icon: Icon, href, label, isCustomSvg }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-10 h-10 rounded-xl glass border border-white/10 text-slate-400 hover:text-orange-400 hover:border-orange-500/40 transition-all duration-300 shadow-lg backdrop-blur-xl"
                  whileHover={{ scale: 1.15, rotate: 6 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isCustomSvg ? <Icon /> : <Icon size={17} />}
                </motion.a>
              ))}
            </motion.div>

            {/* ── STATISTICS CARDS GRID ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-white/10 w-full"
            >
              {stats.map(({ label, value, icon: StatIcon, color }) => (
                <div
                  key={label}
                  className="group flex flex-col p-3 rounded-2xl glass border border-white/5 hover:border-orange-500/30 hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
                >
                  <div className="flex items-center gap-2 mb-0.5">
                    <StatIcon size={15} className={color} />
                    <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white group-hover:text-orange-400 transition-colors">
                      {value}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium leading-tight text-left">
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>

          </div>

          {/* ── RIGHT COLUMN (TRUE 3D SPATIAL ORBITING HERO WITH TRUSTED BY TECHNOLOGIES DIRECTLY BELOW PHOTO) ── */}
          <div className="lg:col-span-6 flex flex-col justify-center items-center lg:items-end order-1 lg:order-2 relative py-2 overflow-visible">
            <motion.div
              style={{
                x: parallaxX,
                y: parallaxY,
                perspective: '1200px',
                transformStyle: 'preserve-3d',
              }}
              className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] flex justify-center lg:justify-end items-center overflow-visible"
            >
              {/* ── 3D ORBIT RINGS & FLOATING TECH ICONS ── */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ transformStyle: 'preserve-3d' }}
              >

                {/* Outer 3D Orbit Ring 1 (Tilted Clockwise - Icons Orbit Across Front) */}
                <div
                  className="absolute rounded-full border-2 border-orange-500/30 shadow-[0_0_35px_rgba(254,127,45,0.2)] pointer-events-none"
                  style={{
                    width: 'clamp(360px, 75vw, 490px)',
                    height: 'clamp(360px, 75vw, 490px)',
                    transform: 'rotateX(72deg) rotateY(-22deg)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Orbiting Rotating Container */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      animation: 'orbitRotateCw 26s linear infinite',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {/* Glowing Particle on Ring 1 */}
                    <div
                      className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-orange-400 shadow-[0_0_20px_#FE7F2D] animate-pulse"
                      style={{ transformStyle: 'preserve-3d' }}
                    />

                    {/* Orbit Icons (Counter-rotated in 3D so they STAY 100% UPRIGHT & FRONT-FACING) */}
                    {[
                      { Icon: FlutterIcon, label: 'Flutter', pos: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2' },
                      { Icon: ReactIcon, label: 'React', pos: 'top-1/2 right-0 translate-x-1/3 -translate-y-1/2' },
                      { Icon: AwsIcon, label: 'AWS', pos: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2' },
                      { Icon: GitIcon, label: 'Git', pos: 'top-1/2 left-0 -translate-x-1/3 -translate-y-1/2' },
                    ].map(({ Icon, label, pos }) => (
                      <div key={label} className={`absolute ${pos} pointer-events-auto`} style={{ transformStyle: 'preserve-3d' }}>
                        <div style={{ animation: 'counterTransform3dCw 26s linear infinite', transformStyle: 'preserve-3d' }}>
                          <div className="group relative flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-black/95 border-2 border-orange-500/50 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(254,127,45,0.35)] hover:border-orange-400 hover:scale-125 transition-all duration-300 cursor-pointer">
                            <div className="absolute inset-0 rounded-2xl bg-orange-500/15 opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
                            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />

                            {/* Tooltip Label */}
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-lg bg-black/90 border border-orange-500/40 text-[10px] font-bold text-orange-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none">
                              {label}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inner 3D Orbit Ring 2 (Tilted Counter-Clockwise) */}
                <div
                  className="absolute rounded-full border-2 border-orange-500/25 shadow-[0_0_25px_rgba(254,127,45,0.15)] pointer-events-none"
                  style={{
                    width: 'clamp(280px, 60vw, 380px)',
                    height: 'clamp(280px, 60vw, 380px)',
                    transform: 'rotateX(66deg) rotateY(22deg)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      animation: 'orbitRotateCcw 20s linear infinite',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {/* Glowing Particle on Ring 2 */}
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_15px_#FFB703] animate-pulse"
                      style={{ transformStyle: 'preserve-3d' }}
                    />

                    {/* Orbit Icons (Counter-rotated in 3D so they STAY UPRIGHT) */}
                    {[
                      { Icon: FirebaseIcon, label: 'Firebase', pos: 'top-1/4 right-0 translate-x-1/3' },
                      { Icon: NodeIcon, label: 'Node.js', pos: 'bottom-1/4 left-0 -translate-x-1/3' },
                      { Icon: SupabaseIcon, label: 'Supabase', pos: 'top-3/4 right-1/4' },
                    ].map(({ Icon, label, pos }) => (
                      <div key={label} className={`absolute ${pos} pointer-events-auto`} style={{ transformStyle: 'preserve-3d' }}>
                        <div style={{ animation: 'counterTransform3dCcw 20s linear infinite', transformStyle: 'preserve-3d' }}>
                          <div className="group relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-black/95 border-2 border-orange-500/50 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(254,127,45,0.35)] hover:border-orange-400 hover:scale-125 transition-all duration-300 cursor-pointer">
                            <div className="absolute inset-0 rounded-2xl bg-orange-500/15 opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
                            <Icon className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5" />

                            {/* Tooltip Label */}
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-lg bg-black/90 border border-orange-500/40 text-[10px] font-bold text-orange-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none">
                              {label}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* ── PHOTO CARD FRAME WITH VERTICAL FLOAT ── */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[390px]"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'translateZ(0px)',
                }}
              >
                {/* Intense neon orange glowing border box */}
                <div
                  className="relative rounded-3xl overflow-hidden p-1 backdrop-blur-2xl"
                  style={{
                    background: 'linear-gradient(145deg, rgba(254, 127, 45, 0.9) 0%, rgba(255, 158, 89, 0.3) 50%, rgba(254, 127, 45, 0.8) 100%)',
                    boxShadow: '0 0 45px rgba(254, 127, 45, 0.35), inset 0 0 15px rgba(254, 127, 45, 0.25)',
                  }}
                >
                  <div className="relative rounded-[22px] overflow-hidden bg-black/90">

                    {/* HUD Corner Tech Brackets */}
                    <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-orange-400 rounded-tl-sm z-30 pointer-events-none" />
                    <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-orange-400 rounded-tr-sm z-30 pointer-events-none" />
                    <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-orange-400/60 rounded-bl-sm z-30 pointer-events-none" />
                    <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-orange-400/60 rounded-br-sm z-30 pointer-events-none" />

                    {/* Laser Scanline Effect */}
                    <div
                      className="absolute left-0 right-0 h-[2px] z-30 pointer-events-none"
                      style={{
                        background: 'linear-gradient(to right, transparent, #FE7F2D, transparent)',
                        animation: 'cardScanline 4s linear infinite',
                      }}
                    />

                    {/* Portrait Photo Container */}
                    <div className="relative w-full h-[370px] sm:h-[400px] lg:h-[420px] overflow-hidden flex items-end justify-center">
                      {profile?.profile_image ? (
                        <img
                          src={profile.profile_image}
                          alt={name}
                          className="h-full w-auto max-w-[115%] object-contain object-bottom transition-transform duration-500 hover:scale-105"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full px-6 text-center">
                          <User size={80} className="text-orange-500/30 mb-4 animate-pulse" />
                          <p className="text-xs text-slate-400">Upload photo in Admin Panel</p>
                        </div>
                      )}

                      {/* Bottom Gradient Fade */}
                      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10" />

                      {/* ── FLOATING BADGE AT CARD BOTTOM ── */}
                      <div className="absolute bottom-3 left-3 right-3 z-20">
                        <div className="flex items-center justify-between p-2.5 rounded-2xl bg-black/80 border border-white/10 backdrop-blur-xl shadow-2xl">
                          <div className="flex items-center gap-2.5">
                            <div className="flex items-center justify-center w-7 h-7 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-400">
                              <Code2 size={15} />
                            </div>
                            <div>
                              <p className="font-bold text-xs text-white leading-tight">Flutter Specialist</p>
                              <p className="text-[10px] text-slate-400">Cross-Platform Expert</p>
                            </div>
                          </div>
                          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* ── FLOATING RIGHT STAT BADGE ── */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute top-1/2 -right-8 -translate-y-1/2 hidden xl:flex flex-col items-center justify-center px-3.5 py-2.5 rounded-2xl bg-black/90 border border-orange-500/30 backdrop-blur-2xl shadow-2xl z-30"
                >
                  <span className="text-xl font-black text-orange-400">1+</span>
                  <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest leading-tight text-center">
                    Year<br />Exp.
                  </span>
                </motion.div>
              </motion.div>

            </motion.div>

            {/* ── TRUSTED BY TECHNOLOGIES (PLACED DIRECTLY UNDER THE PHOTO CARD FRAME) ── */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="w-full max-w-[420px] mt-3 pt-3 border-t border-white/10 flex flex-col items-center justify-center z-20"
            >
              <p className="text-center text-[10px] font-bold tracking-[0.25em] text-slate-400 uppercase mb-2">
                Trusted By Technologies
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 opacity-90">
                {techLogos.map(({ name: techName, Icon }) => (
                  <div
                    key={techName}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 text-slate-300 hover:text-white hover:border-orange-500/40 transition-all duration-300 hover:scale-105 cursor-default backdrop-blur-md shadow-md"
                  >
                    <Icon className="w-4 h-4 text-orange-400" />
                    <span className="text-[11px] font-semibold tracking-wide">{techName}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  )
}
