'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, Download, User, Code2, CheckCircle2, Github, Linkedin, Mail } from 'lucide-react'
import type { Profile } from '@/types/database'

interface HeroSectionProps {
  profile: Profile | null
}

export function HeroSection({ profile }: HeroSectionProps) {
  const name = profile?.full_name ?? 'Keyur Mistry'
  const firstName = name.split(' ')[0] ?? 'Keyur'
  const lastName = name.split(' ')[1] ?? 'Mistry'
  const title = profile?.title || 'Flutter Developer'

  const about = profile?.about ??
    'Flutter & Full Stack Developer with practical experience building cross-platform apps using Flutter, Firebase and Supabase. Skilled in REST APIs, scalable architecture and UI development.'

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden text-white">
      {/* Background — pure black with subtle orange/teal glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-[700px] h-[600px] rounded-full blur-[140px]"
          style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.09) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-0 w-[600px] h-[500px] rounded-full blur-[140px]"
          style={{ background: 'radial-gradient(circle, hsl(var(--secondary) / 0.35) 0%, transparent 70%)' }} />
      </div>

      <div className="container-custom relative z-10 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-4 items-center" style={{ minHeight: 'calc(100vh - 96px)' }}>

          {/* ── LEFT: Text & CTAs ── */}
          <div className="flex flex-col justify-center gap-6 lg:gap-7 order-2 lg:order-1">

            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="flex justify-center lg:justify-start"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium"
                style={{
                  border: '1px solid hsl(var(--primary) / 0.25)',
                  background: 'hsl(var(--primary) / 0.06)',
                  color: 'hsl(var(--primary))',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for freelance & full-time roles
              </span>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center lg:text-left select-none"
            >
              <h1 className="font-display font-black uppercase tracking-tight leading-[0.88]">
                <span className="block text-white" style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)' }}>
                  {firstName}
                </span>
                <span
                  className="block"
                  style={{
                    fontSize: 'clamp(3.5rem, 8vw, 7rem)',
                    background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.9) 60%, hsl(var(--primary)) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {lastName}
                </span>
              </h1>

              {/* Handwritten title — orange tint */}
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="font-cursive text-4xl sm:text-5xl lg:text-6xl font-bold mt-1 ml-1 drop-shadow"
                style={{ color: 'hsl(var(--primary) / 0.75)' }}
              >
                {title}
              </motion.p>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="text-sm sm:text-base leading-relaxed max-w-lg text-center lg:text-left"
              style={{ color: 'rgba(234,236,240,0.6)' }}
            >
              {about}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex flex-col sm:flex-row items-center lg:items-start gap-3"
            >
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all hover:scale-[1.03] active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.9) 100%)',
                  color: '#000',
                  boxShadow: '0 4px 20px hsl(var(--primary) / 0.35)',
                }}
              >
                Hire Me <ArrowUpRight size={16} />
              </Link>
              <a
                href={profile?.resume_url ?? '/resume'}
                target={profile?.resume_url ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all hover:scale-[1.03] active:scale-[0.98]"
                style={{
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#EAECF0',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'hsl(var(--primary) / 0.35)'
                  ;(e.currentTarget as HTMLElement).style.color = 'hsl(var(--primary))'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'
                  ;(e.currentTarget as HTMLElement).style.color = '#EAECF0'
                }}
              >
                <Download size={16} style={{ color: 'hsl(var(--primary))' }} /> Download Resume
              </a>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="flex items-center justify-center lg:justify-start gap-3"
            >
              {[
                { icon: Github, href: profile?.github ?? 'https://github.com', label: 'GitHub' },
                { icon: Linkedin, href: profile?.linkedin ?? 'https://linkedin.com', label: 'LinkedIn' },
                { icon: Mail, href: `mailto:${profile?.email ?? 'keyurmistry334@gmail.com'}`, label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-10 h-10 rounded-xl transition-all"
                  style={{
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'rgba(255,255,255,0.03)',
                    color: 'rgba(234,236,240,0.5)',
                  }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Portrait Card ── */}
          <div className="flex justify-center lg:justify-end items-center order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[360px] lg:max-w-[400px]"
            >
              {/* Orange glow behind card */}
              <div className="absolute inset-6 rounded-3xl blur-2xl"
                style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.18) 0%, hsl(var(--secondary) / 0.12) 100%)' }} />

              {/* Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl"
                style={{
                  border: '1px solid hsl(var(--primary) / 0.18)',
                  background: 'linear-gradient(160deg, #0f0f0f 0%, #080808 60%, #000 100%)',
                }}
              >
                {/* ── Decorative corner brackets ── */}
                {/* Top-left */}
                <div className="absolute top-3 left-3 w-6 h-6 z-20 pointer-events-none"
                  style={{ borderTop: '2px solid hsl(var(--primary))', borderLeft: '2px solid hsl(var(--primary))', borderRadius: '4px 0 0 0' }} />
                {/* Top-right */}
                <div className="absolute top-3 right-3 w-6 h-6 z-20 pointer-events-none"
                  style={{ borderTop: '2px solid hsl(var(--primary))', borderRight: '2px solid hsl(var(--primary))', borderRadius: '0 4px 0 0' }} />
                {/* Bottom-left */}
                <div className="absolute bottom-3 left-3 w-6 h-6 z-20 pointer-events-none"
                  style={{ borderBottom: '2px solid hsl(var(--primary) / 0.5)', borderLeft: '2px solid hsl(var(--primary) / 0.5)', borderRadius: '0 0 0 4px' }} />
                {/* Bottom-right */}
                <div className="absolute bottom-3 right-3 w-6 h-6 z-20 pointer-events-none"
                  style={{ borderBottom: '2px solid hsl(var(--primary) / 0.5)', borderRight: '2px solid hsl(var(--primary) / 0.5)', borderRadius: '0 0 4px 0' }} />

                {/* Left accent bar — teal */}
                <div className="absolute left-0 top-12 bottom-12 w-[3px] z-20 rounded-full"
                  style={{ background: 'linear-gradient(to bottom, transparent, hsl(var(--secondary)), hsl(var(--primary) / 0.4), hsl(var(--secondary)), transparent)' }} />

                {/* Animated scan-line */}
                <motion.div
                  className="absolute left-0 right-0 h-[1px] z-20 pointer-events-none"
                  style={{ background: 'linear-gradient(to right, transparent, hsl(var(--primary) / 0.6), transparent)' }}
                  initial={{ top: '10%', opacity: 0 }}
                  animate={{ top: ['10%', '90%', '10%'], opacity: [0, 0.8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
                />

                {/* Fixed height portrait area */}
                <div className="relative w-full" style={{ height: '460px' }}>
                  {profile?.profile_image ? (
                    <img
                      src={profile.profile_image}
                      alt={name}
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        height: '100%',
                        width: 'auto',
                        maxWidth: '110%',
                        objectFit: 'contain',
                        objectPosition: 'bottom center',
                        display: 'block',
                      }}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full px-6 text-center">
                      <User size={72} style={{ color: 'hsl(var(--primary) / 0.2)' }} className="mb-4" />
                      <p className="text-sm" style={{ color: 'rgba(234,236,240,0.4)' }}>Upload your photo in Admin → Profile</p>
                    </div>
                  )}

                  {/* Bottom overlay */}
                  <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-20 z-10"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 100%)' }}
                  >
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="font-bold text-white text-sm leading-tight">{name}</p>
                        <p className="text-[11px] mt-0.5" style={{ color: 'hsl(var(--primary))' }}>{title}</p>
                      </div>
                      <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 uppercase tracking-wider px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        Available
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating top-left badge */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="absolute -top-3 -left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white z-20"
                style={{
                  background: 'rgba(8,8,8,0.97)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid hsl(var(--primary) / 0.3)',
                  boxShadow: '0 4px 12px hsl(var(--primary) / 0.15)',
                }}
              >
                <Code2 size={13} style={{ color: 'hsl(var(--primary))' }} />
                Flutter Specialist
              </motion.div>

              {/* Floating bottom-right badge */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-3 -right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white z-20"
                style={{
                  background: 'rgba(8,8,8,0.97)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid hsl(var(--secondary) / 0.6)',
                }}
              >
                <CheckCircle2 size={13} className="text-emerald-400" />
                Cross-Platform Expert
              </motion.div>

              {/* Experience stat pill — right side */}
              <motion.div
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="absolute top-1/2 -right-14 -translate-y-1/2 flex flex-col items-center gap-0.5 px-3 py-2.5 rounded-2xl z-20 hidden lg:flex"
                style={{
                  background: 'rgba(8,8,8,0.95)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid hsl(var(--primary) / 0.2)',
                }}
              >
                <span className="text-2xl font-black" style={{ color: 'hsl(var(--primary))' }}>1</span>
                <span className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold leading-tight text-center">Year<br/>Exp.</span>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
