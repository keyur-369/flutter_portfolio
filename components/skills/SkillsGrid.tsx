'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeIn } from '@/components/ui/FadeIn'
import { Code2 } from 'lucide-react'
import { SkillIcon } from '@/components/skills/SkillIcon'
import type { Skill } from '@/types/database'

// All category icon colors updated to orange/teal theme — NO purple
const CATEGORY_COLORS: Record<string, { bg: string; shadow: string }> = {
  'Mobile Development':      { bg: 'linear-gradient(135deg, #FE7F2D, #e06520)', shadow: 'rgba(254,127,45,0.3)' },
  'Backend & Database':      { bg: 'linear-gradient(135deg, #233D4D, #2d5468)', shadow: 'rgba(35,61,77,0.5)' },
  'Tools & DevOps':          { bg: 'linear-gradient(135deg, #10b981, #059669)', shadow: 'rgba(16,185,129,0.3)' },
  'Programming Languages':   { bg: 'linear-gradient(135deg, #FE7F2D, #233D4D)', shadow: 'rgba(254,127,45,0.25)' },
  'Tools & Technologies':    { bg: 'linear-gradient(135deg, #233D4D, #FE7F2D)', shadow: 'rgba(254,127,45,0.2)' },
  'Deployment':              { bg: 'linear-gradient(135deg, #10b981, #233D4D)', shadow: 'rgba(16,185,129,0.25)' },
  'Database':                { bg: 'linear-gradient(135deg, #233D4D, #FE7F2D)', shadow: 'rgba(35,61,77,0.4)' },
}

const DEFAULT_COLOR = { bg: 'linear-gradient(135deg, #FE7F2D, #233D4D)', shadow: 'rgba(254,127,45,0.2)' }

interface SkillsGridProps {
  groupedSkills: Record<string, Skill[]>
}

interface SkillBarProps {
  skill: Skill
  index: number
}

function SkillBar({ skill, index }: SkillBarProps) {
  const [animated, setAnimated] = useState(false)

  return (
    <motion.div
      className="glass-card p-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      onViewportEnter={() => setAnimated(true)}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl border border-white/10 flex items-center justify-center p-1.5 flex-shrink-0"
            style={{ background: 'rgba(254,127,45,0.06)' }}
          >
            <SkillIcon name={skill.name} icon={skill.icon} size={20} />
          </div>
          <span className="font-semibold text-sm text-slate-200">{skill.name}</span>
        </div>
        <span className="text-xs font-bold" style={{ color: '#FE7F2D' }}>{skill.percentage ?? 80}%</span>
      </div>
      <div className="skill-bar">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: animated ? `${skill.percentage ?? 80}%` : 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
        />
      </div>
    </motion.div>
  )
}

export function SkillsGrid({ groupedSkills }: SkillsGridProps) {
  const categories = Object.keys(groupedSkills)
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredSkills = activeCategory === 'All'
    ? groupedSkills
    : { [activeCategory]: groupedSkills[activeCategory] ?? [] }

  return (
    <section className="section py-24">
      <div className="container-custom">
        <FadeIn className="mb-12 text-center">
          {/* Section badge — orange */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ border: '1px solid rgba(254,127,45,0.25)', color: '#FE7F2D' }}
          >
            <Code2 size={10} />
            Technical Skills
          </div>
          <h1 className="section-title text-white mb-4">
            My <span className="gradient-text">Expertise</span>
          </h1>
          <p className="section-subtitle mx-auto">
            Technologies, frameworks, and tools pulled live from database.
          </p>
        </FadeIn>

        {/* Category filter — orange active state */}
        {categories.length > 0 && (
          <FadeIn delay={0.2} className="flex flex-wrap justify-center gap-2 mb-12">
            {['All', ...categories].map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                style={activeCategory === cat ? {
                  background: 'linear-gradient(135deg, #FE7F2D 0%, #e06520 100%)',
                  color: '#000',
                  boxShadow: '0 4px 16px rgba(254,127,45,0.3)',
                } : {
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(234,236,240,0.6)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                {cat}
              </motion.button>
            ))}
          </FadeIn>
        )}

        {/* Skills grid */}
        {categories.length === 0 ? (
          <div className="glass-card p-12 text-center max-w-md mx-auto">
            <Code2 size={36} className="mx-auto mb-3 opacity-60" style={{ color: '#FE7F2D' }} />
            <p className="text-slate-400 text-sm">No skills added yet.</p>
            <p className="text-slate-500 text-xs mt-1">Add your skills from the Admin Panel to display them here.</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              {Object.entries(filteredSkills).map(([category, categorySkills]) => {
                const color = CATEGORY_COLORS[category] ?? DEFAULT_COLOR
                return (
                  <div key={category}>
                    <FadeIn className="flex items-center gap-3 mb-6">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: color.bg, boxShadow: `0 4px 12px ${color.shadow}` }}
                      >
                        <Code2 size={14} className="text-white" />
                      </div>
                      <h2 className="font-display font-bold text-xl text-white">{category}</h2>
                      <div className="flex-1 h-px bg-white/[0.06]" />
                    </FadeIn>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {categorySkills.map((skill, i) => (
                        <SkillBar key={skill.id} skill={skill} index={i} />
                      ))}
                    </div>
                  </div>
                )
              })}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  )
}
