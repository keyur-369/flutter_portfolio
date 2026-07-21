'use client'

import { FadeIn } from '@/components/ui/FadeIn'
import { TiltCard } from '@/components/ui/TiltCard'
import { Quote, Star, MessageSquare, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { Testimonial } from '@/types/database'

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (!testimonials || testimonials.length === 0) {
    return null; // Don't show the section on home page if there are no testimonials
  }

  return (
    <section className="section py-24 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <FadeIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-secondary/30 text-xs font-semibold text-secondary/90 uppercase tracking-widest mb-4">
            <MessageSquare size={10} />
            Client Reviews
          </div>
          <h2 className="section-title text-white mb-4">
            What People <span className="gradient-text">Say</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Feedback from clients and collaborators I've had the privilege to work with.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((t, i) => (
            <FadeIn key={t.id} delay={i * 0.1}>
              <TiltCard className="h-full">
                <div className="glass-card p-6 h-full flex flex-col hover:border-primary/30 transition-colors duration-300">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <Quote size={24} className="text-primary/40 mb-3" />
                  <p className="text-white/70 text-sm leading-relaxed italic flex-1 mb-6">
                    &ldquo;{t.review}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-lg">
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

        {testimonials.length > 3 && (
          <FadeIn delay={0.4} className="mt-12 text-center">
            <Link 
              href="/testimonials" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/10 hover:border-primary/40 hover:bg-white/5 transition-all text-sm font-medium text-white group"
            >
              Read All Reviews
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-primary" />
            </Link>
          </FadeIn>
        )}
      </div>
    </section>
  )
}
