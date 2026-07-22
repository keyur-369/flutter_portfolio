'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Calendar, Award, Building2 } from 'lucide-react'
import type { Education } from '@/types/database'

interface EducationTimelineProps {
  education: Education[]
}

export function EducationTimeline({ education }: EducationTimelineProps) {
  if (!education || education.length === 0) return null

  return (
    <section className="py-16 relative text-white">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-left"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-cyan-500/30 text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-3">
            <GraduationCap size={12} />
            <span>Academic Background</span>
          </div>
          <h2 className="font-syne font-black text-3xl sm:text-4xl text-white">
            Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">Journey</span>
          </h2>
        </motion.div>

        {/* Timeline Line */}
        <div className="relative border-l-2 border-cyan-500/25 ml-4 sm:ml-6 space-y-10 pl-6 sm:pl-10">
          {education.map((edu, i) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative group"
            >
              {/* Glowing Icon Bullet */}
              <div className="absolute -left-[41px] sm:-left-[61px] top-6 w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-black border-2 border-cyan-500 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)] group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-black transition-all duration-300 z-10">
                <GraduationCap size={16} />
              </div>

              {/* Card Container */}
              <div className="p-6 sm:p-8 rounded-3xl glass border border-white/10 hover:border-cyan-500/40 transition-all duration-300 shadow-xl hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4 pb-4 border-b border-white/10">
                  <div className="space-y-1.5">
                    <h3 className="font-syne font-bold text-xl sm:text-2xl text-white">
                      {edu.degree}
                    </h3>
                    <p className="font-semibold text-sm sm:text-base text-cyan-400 flex items-center gap-2">
                      <Building2 size={15} />
                      {edu.institute}
                    </p>
                  </div>

                  {/* Dates & CGPA */}
                  <div className="flex flex-col sm:items-end gap-2 text-xs sm:text-sm text-slate-400">
                    <div className="flex items-center gap-2 font-medium text-slate-200">
                      <Calendar size={14} className="text-cyan-400" />
                      {edu.start_year} — {edu.end_year ?? 'Present'}
                    </div>
                    {edu.cgpa && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 font-bold text-xs">
                        <Award size={11} />
                        CGPA: {edu.cgpa}
                      </span>
                    )}
                  </div>
                </div>

                {edu.description && (
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal text-justify">
                    {edu.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
