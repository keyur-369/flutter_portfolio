'use client'

import { FadeIn } from '@/components/ui/FadeIn'
import { TiltCard } from '@/components/ui/TiltCard'
import { Quote, Star, MessageSquare } from 'lucide-react'
import type { Testimonial } from '@/types/database'

interface TestimonialsClientProps {
  testimonials: Testimonial[]
}

export function TestimonialsClient({ testimonials }: TestimonialsClientProps) {
  return (
    <section className="section py-24">
      <div className="container-custom">
        <FadeIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-pink-500/30 text-xs font-semibold text-pink-300 uppercase tracking-widest mb-4">
            <MessageSquare size={10} />
            Testimonials
          </div>
          <h1 className="section-title text-white mb-4">
            What People <span className="gradient-text">Say</span>
          </h1>
          <p className="section-subtitle mx-auto">
            Feedback from clients and collaborators I&apos;ve had the privilege to work with.
          </p>
        </FadeIn>

        {testimonials.length === 0 ? (
          <div className="text-center py-20 glass-card max-w-lg mx-auto p-12">
            <div className="text-5xl mb-4">⭐</div>
            <h3 className="font-display font-bold text-2xl text-white mb-3">Testimonials Coming Soon</h3>
            <p className="text-white/50">
              I&apos;m building my portfolio of work. Client testimonials will appear here as I complete more projects.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <FadeIn key={t.id} delay={i * 0.1}>
                <TiltCard className="h-full">
                  <div className="glass-card p-6 h-full flex flex-col">
                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <Quote size={24} className="text-indigo-400/40 mb-3" />
                    <p className="text-white/70 text-sm leading-relaxed italic flex-1 mb-6">
                      &ldquo;{t.review}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {t.client_name?.charAt(0) ?? '?'}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-white">{t.client_name}</p>
                        {(t.designation || t.company) && (
                          <p className="text-xs text-white/40">
                            {t.designation}{t.designation && t.company ? ' at ' : ''}{t.company}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
