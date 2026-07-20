'use client'

import { motion } from 'framer-motion'
import { FadeIn } from '@/components/ui/FadeIn'
import { SkillIcon } from '@/components/skills/SkillIcon'
import type { Skill } from '@/types/database'

interface TechStackProps {
  skills: Skill[]
}

export function TechStack({ skills }: TechStackProps) {
  if (!skills || skills.length === 0) return null

  const techs = skills.map((s) => ({ name: s.name, icon: s.icon }))
  const doubled = [...techs, ...techs]

  return (
    <section className="section py-20 overflow-hidden">
      <div className="container-custom mb-12">
        <FadeIn className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-2" style={{ color: '#FE7F2D' }}>
            Technology Stack
          </p>
          <h2 className="section-title text-white">
            Tools I <span className="gradient-text">master</span>
          </h2>
        </FadeIn>
      </div>

      {/* Marquee row 1 */}
      <div className="marquee-wrapper mb-4">
        <div className="marquee-inner">
          {doubled.map((tech, i) => (
            <motion.div
              key={`${tech.name}-${i}`}
              className="flex items-center gap-3 px-5 py-3 glass-card rounded-2xl border border-white/[0.08] whitespace-nowrap flex-shrink-0"
              whileHover={{ scale: 1.05, borderColor: 'rgba(99,102,241,0.4)' }}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <SkillIcon name={tech.name} icon={tech.icon} size={20} />
              </div>
              <span className="font-medium text-sm text-slate-200">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marquee row 2 (reverse) */}
      <div className="marquee-wrapper">
        <div
          className="marquee-inner"
          style={{ animationDirection: 'reverse', animationDuration: '35s' }}
        >
          {[...doubled].reverse().map((tech, i) => (
            <motion.div
              key={`rev-${tech.name}-${i}`}
              className="flex items-center gap-3 px-5 py-3 glass-card rounded-2xl border border-white/[0.08] whitespace-nowrap flex-shrink-0"
              whileHover={{ scale: 1.05, borderColor: 'rgba(139,92,246,0.4)' }}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <SkillIcon name={tech.name} icon={tech.icon} size={20} />
              </div>
              <span className="font-medium text-sm text-slate-200">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
