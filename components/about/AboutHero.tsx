'use client'

import { motion } from 'framer-motion'
import { MapPin, Mail, Phone, User, Sparkles, Code2, Cpu, Layers, ShieldCheck, CheckCircle2 } from 'lucide-react'
import type { Profile } from '@/types/database'

interface AboutHeroProps {
  profile: Profile | null
}

export function AboutHero({ profile }: AboutHeroProps) {
  const name = profile?.full_name ?? 'Keyur Mistry'
  const title = profile?.title ?? 'Flutter & Full Stack Developer'
  const location = profile?.location ?? 'Anand, Gujarat, India'
  const email = profile?.email ?? 'keyurmistry334@gmail.com'
  const phone = profile?.phone ?? '+91 8866517763'
  const about =
    profile?.about ??
    'I build high-performance, cross-platform mobile applications with Flutter, Firebase and Supabase. Focused on clean architecture, smooth UI interactions, and scalable full-stack web and app platforms that users love.'

  return (
    <section className="relative pt-12 sm:pt-16 pb-16 overflow-hidden text-white">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px] bg-orange-500/10 pointer-events-none z-0" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] rounded-full blur-[130px] bg-cyan-500/10 pointer-events-none z-0" />

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ── LEFT COLUMN: TITLE & BIO ── */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest backdrop-blur-xl mb-5"
              style={{
                background: 'rgba(254, 127, 45, 0.08)',
                border: '1px solid rgba(254, 127, 45, 0.25)',
                color: '#FF9E59',
                boxShadow: '0 0 20px rgba(254, 127, 45, 0.15)',
              }}
            >
              <User size={12} />
              <span>About My Journey</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-syne font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] text-white mb-6"
            >
              Crafting <span className="drop-shadow-[0_10px_35px_rgba(254,127,45,0.4)]" style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, #FF9E59 50%, hsl(var(--primary)) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Digital Experiences</span> with Code
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg leading-relaxed text-slate-300 font-normal text-justify max-w-2xl mb-8 space-y-4"
            >
              <p>
                {about.includes('cross-platform') ? (
                  <>
                    {about.split('cross-platform')[0]}
                    <strong className="font-semibold text-white">cross-platform mobile apps</strong>
                    {about.split('cross-platform')[1]}
                  </>
                ) : (
                  about
                )}
              </p>
            </motion.div>

            {/* Quick Contact Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-3.5 w-full"
            >
              {location && (
                <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl glass border border-white/10 text-slate-300 text-sm hover:border-orange-500/40 hover:text-white transition-all">
                  <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-orange-500/15 text-orange-400">
                    <MapPin size={14} />
                  </div>
                  <span className="font-medium text-xs sm:text-sm">{location}</span>
                </div>
              )}

              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2.5 px-4 py-2 rounded-xl glass border border-white/10 text-slate-300 text-sm hover:border-orange-500/40 hover:text-orange-400 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-orange-500/15 text-orange-400">
                    <Mail size={14} />
                  </div>
                  <span className="font-medium text-xs sm:text-sm">{email}</span>
                </a>
              )}

              {phone && (
                <a
                  href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2 rounded-xl glass border border-white/10 text-slate-300 text-sm hover:border-emerald-500/40 hover:text-emerald-400 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-400">
                    <Phone size={14} />
                  </div>
                  <span className="font-medium text-xs sm:text-sm">{phone}</span>
                </a>
              )}
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: CYBERPUNK PROFILE HUD CARD ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[460px]">
              {/* Outer Neon Glow */}
              <div
                className="relative rounded-3xl p-1 backdrop-blur-2xl"
                style={{
                  background: 'linear-gradient(145deg, rgba(254, 127, 45, 0.8) 0%, rgba(255, 158, 89, 0.2) 50%, rgba(254, 127, 45, 0.7) 100%)',
                  boxShadow: '0 0 40px rgba(254, 127, 45, 0.25), inset 0 0 15px rgba(254, 127, 45, 0.2)',
                }}
              >
                <div className="relative rounded-[22px] bg-black/90 p-6 sm:p-7 overflow-hidden">
                  
                  {/* HUD Corner Tech Brackets */}
                  <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-orange-400 rounded-tl-sm pointer-events-none" />
                  <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-orange-400 rounded-tr-sm pointer-events-none" />
                  <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-orange-400/60 rounded-bl-sm pointer-events-none" />
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-orange-400/60 rounded-br-sm pointer-events-none" />

                  {/* Header Profile Info */}
                  <div className="flex items-center gap-4 mb-6 pb-5 border-b border-white/10">
                    <div className="relative">
                      {profile?.profile_image ? (
                        <img
                          src={profile.profile_image}
                          alt={name}
                          className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-orange-500/40 shadow-xl"
                        />
                      ) : (
                        <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-3xl font-bold text-white font-syne">
                          {name.charAt(0)}
                        </div>
                      )}
                      <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-black" />
                      </span>
                    </div>

                    <div>
                      <h2 className="font-playwrite font-bold text-xl sm:text-2xl text-white leading-tight">
                        {name}
                      </h2>
                      <p className="text-orange-400 text-xs sm:text-sm font-semibold tracking-wide mt-0.5">
                        {title}
                      </p>
                    </div>
                  </div>

                  {/* Profile Key Details Table */}
                  <div className="space-y-3.5 text-xs sm:text-sm">
                    <div className="flex items-center justify-between py-2 border-b border-white/[0.06]">
                      <span className="text-slate-400 font-medium flex items-center gap-2">
                        <Code2 size={14} className="text-orange-400" /> Focus Area
                      </span>
                      <span className="font-semibold text-white">Mobile & Full Stack</span>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-white/[0.06]">
                      <span className="text-slate-400 font-medium flex items-center gap-2">
                        <Layers size={14} className="text-orange-400" /> Primary Framework
                      </span>
                      <span className="font-semibold text-cyan-400">Flutter & Dart</span>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-white/[0.06]">
                      <span className="text-slate-400 font-medium flex items-center gap-2">
                        <Cpu size={14} className="text-orange-400" /> Cloud & Backend
                      </span>
                      <span className="font-semibold text-amber-400">Firebase & Supabase</span>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-white/[0.06]">
                      <span className="text-slate-400 font-medium flex items-center gap-2">
                        <ShieldCheck size={14} className="text-orange-400" /> Availability
                      </span>
                      <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Open to Opportunities
                      </span>
                    </div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap gap-2">
                    {['Flutter', 'Firebase', 'Supabase', 'Dart', 'Node.js', 'REST APIs'].map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/10 text-[11px] font-semibold text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
