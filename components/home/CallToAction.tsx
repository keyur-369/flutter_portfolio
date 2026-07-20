'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Mail, User } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'
import type { Profile } from '@/types/database'

interface CallToActionProps {
  profile?: Profile | null
}

export function CallToAction({ profile }: CallToActionProps) {
  const avatar = profile?.profile_image
  const name = profile?.full_name ?? 'Keyur Mistry'

  return (
    <section className="section py-32">
      <div className="container-custom">
        <FadeIn>
          <div className="relative overflow-hidden gradient-border rounded-3xl p-[1px]">
            <div className="relative bg-[#0a0a1a] rounded-3xl p-12 md:p-20 text-center overflow-hidden">
              {/* Background glow */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[100px]" style={{ background: 'rgba(254,127,45,0.12)' }} />
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="relative z-10 flex flex-col items-center"
              >
                {/* Personal Avatar Badge */}
                <div className="flex items-center gap-3 glass px-4 py-2 rounded-full border border-white/10 mb-8 shadow-xl">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0" style={{ border: '1px solid rgba(254,127,45,0.4)', background: 'rgba(0,0,0,0.5)' }}>
                    {avatar ? (
                      <img src={avatar} alt={name} className="w-full h-full object-cover" />
                    ) : (
                      <User size={16} style={{ color: '#FE7F2D' }} />
                    )}
                  </div>
                  <span className="text-xs font-semibold text-slate-200">
                    {name} <span className="text-emerald-400 font-normal ml-1">🟢 Open for Work</span>
                  </span>
                </div>

                <h2 className="section-title text-white mb-6">
                  Have a project in mind?
                  <br />
                  <span className="gradient-text">Let&apos;s build it together.</span>
                </h2>

                <p className="text-white/70 text-lg max-w-xl mx-auto mb-10 leading-relaxed font-normal">
                  I&apos;m currently available for freelance projects and full-time engineering roles. 
                  Whether it&apos;s a cross-platform Flutter app or scalable full-stack web platform — let me help you build it.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                    <Link href="/contact" className="btn-primary">
                      Get In Touch <ArrowRight size={16} />
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                    <Link href="/projects" className="btn-ghost">
                      View My Work
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
