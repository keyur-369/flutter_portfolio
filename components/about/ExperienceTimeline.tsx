'use client'

import { motion } from 'framer-motion'
import { Briefcase, Calendar, MapPin, Building2, CheckCircle2 } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Experience } from '@/types/database'

interface ExperienceTimelineProps {
  experience: Experience[]
}

export function ExperienceTimeline({ experience }: ExperienceTimelineProps) {
  if (!experience || experience.length === 0) return null

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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-orange-500/30 text-xs font-semibold uppercase tracking-widest text-orange-400 mb-3">
            <Briefcase size={12} />
            <span>Career Journey</span>
          </div>
          <h2 className="font-syne font-black text-3xl sm:text-4xl text-white">
            Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">Experience</span>
          </h2>
        </motion.div>

        {/* Timeline Line */}
        <div className="relative border-l-2 border-orange-500/25 ml-4 sm:ml-6 space-y-10 pl-6 sm:pl-10">
          {experience.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative group"
            >
              {/* Glowing Icon Bullet */}
              <div className="absolute -left-[41px] sm:-left-[61px] top-6 w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-black border-2 border-orange-500 flex items-center justify-center text-orange-400 shadow-[0_0_15px_rgba(254,127,45,0.4)] group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-black transition-all duration-300 z-10">
                <Briefcase size={16} />
              </div>

              {/* Card Container */}
              <div className="p-6 sm:p-8 rounded-3xl glass border border-white/10 hover:border-orange-500/40 transition-all duration-300 shadow-xl hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4 pb-4 border-b border-white/10">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="font-syne font-bold text-xl sm:text-2xl text-white">
                        {exp.role}
                      </h3>
                      {exp.currently_working && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                          Currently Working
                        </span>
                      )}
                    </div>

                    <p className="font-semibold text-sm sm:text-base text-orange-400 flex items-center gap-2">
                      <Building2 size={15} />
                      {exp.company}
                      {exp.employment_type && (
                        <span className="text-xs text-slate-400 font-normal">
                          ({exp.employment_type})
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Dates & Location */}
                  <div className="flex flex-col sm:items-end gap-1.5 text-xs sm:text-sm text-slate-400">
                    <div className="flex items-center gap-2 font-medium text-slate-200">
                      <Calendar size={14} className="text-orange-400" />
                      {formatDate(exp.start_date)} — {exp.currently_working ? 'Present' : formatDate(exp.end_date)}
                    </div>
                    {exp.location && (
                      <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                        <MapPin size={13} className="text-slate-400" />
                        {exp.location}
                      </div>
                    )}
                  </div>
                </div>

                {exp.description && (
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal text-justify">
                    {exp.description}
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
