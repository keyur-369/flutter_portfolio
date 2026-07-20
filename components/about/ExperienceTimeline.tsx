'use client'

import { FadeIn } from '@/components/ui/FadeIn'
import { Briefcase, Calendar, MapPin, Sparkles, Building2 } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Experience } from '@/types/database'

interface ExperienceTimelineProps {
  experience: Experience[]
}

export function ExperienceTimeline({ experience }: ExperienceTimelineProps) {
  if (!experience || experience.length === 0) return null

  return (
    <section className="section py-20">
      <div className="container-custom">
        <FadeIn className="mb-14 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-semibold uppercase tracking-widest mb-4" style={{ border: '1px solid rgba(254,127,45,0.25)', color: '#FE7F2D' }}>
            <Briefcase size={11} />
            Career Journey
          </div>
          <h2 className="section-title text-white">
            Work <span className="gradient-text">Experience</span>
          </h2>
        </FadeIn>

        <div className="relative ml-4 sm:ml-6 space-y-8 pl-6 sm:pl-10" style={{ borderLeft: '2px solid rgba(254,127,45,0.2)' }}>
          {experience.map((exp, i) => (
            <FadeIn key={exp.id} delay={i * 0.12} direction="left">
              <div className="relative group">
                {/* Timeline Dot Icon */}
                <div className="absolute -left-[41px] sm:-left-[61px] top-6 w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 z-10" style={{ background: 'linear-gradient(135deg, #FE7F2D, #233D4D)', boxShadow: '0 4px 16px rgba(254,127,45,0.3)', border: '2px solid #000' }}>
                  <Briefcase size={16} />
                </div>

                {/* Card Container */}
                <div className="glass-card p-6 sm:p-8 border border-white/10 rounded-3xl transition-all duration-300" onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(254,127,45,0.3)'}} onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,0.1)'}}>
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4 pb-4 border-b border-white/[0.08]">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                          {exp.role}
                        </h3>
                        {exp.currently_working && (
                          <span className="badge badge-green text-[11px] px-2.5 py-0.5">
                            ● Currently Working
                          </span>
                        )}
                      </div>

                      <p className="font-semibold text-sm sm:text-base flex items-center gap-1.5" style={{ color: '#FE7F2D' }}>
                        <Building2 size={14} style={{ color: '#FE7F2D' }} />
                        {exp.company}
                        {exp.employment_type && (
                          <span className="text-xs text-slate-400 font-normal">
                            ({exp.employment_type})
                          </span>
                        )}
                      </p>
                    </div>

                    {/* Date & Location */}
                    <div className="flex flex-col sm:items-end gap-1.5 flex-shrink-0 text-xs sm:text-sm text-slate-400">
                      <div className="flex items-center gap-1.5 font-medium text-slate-300">
                        <Calendar size={13} style={{ color: '#FE7F2D' }} />
                        {formatDate(exp.start_date)} — {exp.currently_working ? 'Present' : formatDate(exp.end_date)}
                      </div>
                      {exp.location && (
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                          <MapPin size={12} className="text-slate-400" />
                          {exp.location}
                        </div>
                      )}
                    </div>
                  </div>

                  {exp.description && (
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                      {exp.description}
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
