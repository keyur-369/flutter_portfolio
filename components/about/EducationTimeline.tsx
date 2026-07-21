'use client'

import { FadeIn } from '@/components/ui/FadeIn'
import { GraduationCap, Calendar, Award, Building2 } from 'lucide-react'
import type { Education } from '@/types/database'

interface EducationTimelineProps {
  education: Education[]
}

export function EducationTimeline({ education }: EducationTimelineProps) {
  if (!education || education.length === 0) return null

  return (
    <section className="section py-20 bg-white/[0.01]">
      <div className="container-custom">
        <FadeIn className="mb-14 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-primary/30 text-xs font-semibold text-primary/90 uppercase tracking-widest mb-4">
            <GraduationCap size={11} />
            Academic Background
          </div>
          <h2 className="section-title text-white">
            Academic <span className="gradient-text">Journey</span>
          </h2>
        </FadeIn>

        <div className="relative border-l-2 border-primary/30 ml-4 sm:ml-6 space-y-8 pl-6 sm:pl-10">
          {education.map((edu, i) => (
            <FadeIn key={edu.id} delay={i * 0.12} direction="left">
              <div className="relative group">
                {/* Timeline Graduation Cap Icon */}
                <div className="absolute -left-[41px] sm:-left-[61px] top-6 w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-primary via-primary/80 to-secondary flex items-center justify-center text-white shadow-lg shadow-primary/30 border-2 border-[#090a18] group-hover:scale-110 transition-transform duration-300 z-10">
                  <GraduationCap size={16} />
                </div>

                {/* Card Container */}
                <div className="glass-card p-6 sm:p-8 border border-white/10 rounded-3xl transition-all duration-300 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4 pb-4 border-b border-white/[0.08]">
                    <div className="space-y-1">
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                        {edu.degree}
                      </h3>
                      <p className="text-secondary-foreground/70 font-semibold text-sm sm:text-base flex items-center gap-1.5">
                        <Building2 size={14} className="text-secondary/70" />
                        {edu.institute}
                      </p>
                    </div>

                    {/* Date & CGPA */}
                    <div className="flex flex-col sm:items-end gap-1.5 flex-shrink-0 text-xs sm:text-sm text-slate-400">
                      <div className="flex items-center gap-1.5 font-medium text-slate-300">
                        <Calendar size={13} className="text-primary/70" />
                        {edu.start_year} — {edu.end_year ?? 'Present'}
                      </div>
                      {edu.cgpa && (
                        <span className="badge badge-purple text-xs font-bold px-2.5 py-0.5 shadow-sm">
                          <Award size={10} className="mr-1 inline" />
                          CGPA: {edu.cgpa}
                        </span>
                      )}
                    </div>
                  </div>

                  {edu.description && (
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                      {edu.description}
                    </p>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
