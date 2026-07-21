'use client'

import { FadeIn } from '@/components/ui/FadeIn'
import { MapPin, Mail, Phone, User } from 'lucide-react'
import type { Profile } from '@/types/database'

interface AboutHeroProps {
  profile: Profile | null
}

export function AboutHero({ profile }: AboutHeroProps) {
  const name = profile?.full_name ?? 'Keyur Mistry'
  const title = profile?.title ?? 'Flutter & Full Stack Developer'
  const about = profile?.about ?? 'Welcome to my portfolio! Add your bio from the Admin Profile editor to customize this text.'

  return (
    <section className="section py-24">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-primary/30 text-xs font-semibold text-primary/90 uppercase tracking-widest mb-6">
                <User size={10} />
                About Me
              </div>
            </FadeIn>

            <h1 className="section-title text-white mb-6">
              Crafting <span className="gradient-text">Experiences</span> with Code
            </h1>

            <FadeIn delay={0.3}>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                {about}
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="space-y-3">
                {profile?.location && (
                  <div className="flex items-center gap-3 text-slate-300">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <MapPin size={14} className="text-primary/70" />
                    </div>
                    <span className="text-sm">{profile.location}</span>
                  </div>
                )}
                {profile?.email && (
                  <div className="flex items-center gap-3 text-slate-300">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Mail size={14} className="text-primary/70" />
                    </div>
                    <span className="text-sm">{profile.email}</span>
                  </div>
                )}
                {profile?.phone && (
                  <div className="flex items-center gap-3 text-slate-300">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Phone size={14} className="text-primary/70" />
                    </div>
                    <span className="text-sm">{profile.phone}</span>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>

          {/* Right — Profile Card */}
          <FadeIn delay={0.3} direction="left">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
              <div className="relative glass-card p-8 rounded-3xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative">
                    {profile?.profile_image ? (
                      <img
                        src={profile.profile_image}
                        alt={name}
                        className="w-20 h-20 rounded-2xl object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl font-bold text-white font-display">
                        {name.charAt(0)}
                      </div>
                    )}
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-[#0F0F23]" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-white">
                      {name}
                    </h3>
                    <p className="text-primary/70 text-sm font-medium">
                      {title}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
                    <span className="text-sm text-slate-400">Focus Area</span>
                    <span className="text-sm font-medium text-slate-200">Mobile & Full Stack</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
                    <span className="text-sm text-slate-400">Framework</span>
                    <span className="text-sm font-medium text-slate-200">Flutter & Dart</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
                    <span className="text-sm text-slate-400">Backend</span>
                    <span className="text-sm font-medium text-slate-200">Firebase & Supabase</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
                    <span className="text-sm text-slate-400">Status</span>
                    <span className="text-sm font-medium text-emerald-400">🟢 Open to Opportunities</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
