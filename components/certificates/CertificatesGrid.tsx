'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeIn } from '@/components/ui/FadeIn'
import { TiltCard } from '@/components/ui/TiltCard'
import { Award, ExternalLink, Calendar, X, Sparkles, Eye, CheckCircle2 } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Certificate } from '@/types/database'

function isImageUrl(url: string | null | undefined): boolean {
  if (!url) return false
  if (url.startsWith('data:image/')) return true
  const lower = url.toLowerCase()
  return (
    lower.endsWith('.jpg') ||
    lower.endsWith('.jpeg') ||
    lower.endsWith('.png') ||
    lower.endsWith('.webp') ||
    lower.endsWith('.gif') ||
    lower.endsWith('.svg') ||
    lower.includes('unsplash.com') ||
    lower.includes('supabase.co/storage')
  )
}

function getIssuerBrand(issuer: string | null | undefined, url: string | null | undefined) {
  const text = `${issuer ?? ''} ${url ?? ''}`.toLowerCase()
  if (text.includes('udemy') || text.includes('ude.my')) {
    return { name: 'Udemy', color: 'from-purple-600 to-pink-600', logo: 'https://cdn.simpleicons.org/udemy' }
  }
  if (text.includes('coursera')) {
    return { name: 'Coursera', color: 'from-blue-600 to-cyan-600', logo: 'https://cdn.simpleicons.org/coursera' }
  }
  if (text.includes('google')) {
    return { name: 'Google', color: 'from-amber-500 to-rose-500', logo: 'https://cdn.simpleicons.org/google' }
  }
  if (text.includes('linkedin')) {
    return { name: 'LinkedIn', color: 'from-blue-700 to-indigo-700', logo: 'https://cdn.simpleicons.org/linkedin' }
  }
  return { name: issuer || 'Verified', color: 'from-indigo-600 to-violet-600', logo: null }
}

interface CertificatesGridProps {
  certificates: Certificate[]
}

export function CertificatesGrid({ certificates }: CertificatesGridProps) {
  const [lightbox, setLightbox] = useState<Certificate | null>(null)
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [lightbox])

  const handleImgError = (id: string) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }))
  }

  return (
    <section className="section py-24">
      <div className="container-custom">
        <FadeIn className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-amber-500/30 text-xs font-semibold text-amber-300 uppercase tracking-widest mb-4">
            <Award size={10} />
            Achievements
          </div>
          <h1 className="section-title text-white mb-4">
            My <span className="gradient-text">Certificates</span>
          </h1>
          <p className="section-subtitle mx-auto">
            Verified certifications and credentials fetched live from database.
          </p>
        </FadeIn>

        {certificates.length === 0 ? (
          <div className="glass-card p-12 text-center max-w-md mx-auto">
            <Award size={36} className="text-amber-400 mx-auto mb-3 opacity-60" />
            <p className="text-slate-400 text-sm">No certificates added yet.</p>
            <p className="text-slate-500 text-xs mt-1">Add certificates from your Admin Panel to showcase them here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, i) => {
              const hasValidImage = isImageUrl(cert.image) && !imgErrors[cert.id]
              const targetUrl = cert.certificate_url || (cert.image && !isImageUrl(cert.image) ? cert.image : null)
              const brand = getIssuerBrand(cert.issuer, targetUrl)

              return (
                <FadeIn key={cert.id} delay={i * 0.08} direction="up">
                  <TiltCard className="h-full">
                    <div
                      className="glass-card p-5 h-full flex flex-col cursor-pointer border border-white/10 rounded-2xl group hover:border-amber-500/40 transition-all duration-300"
                      onClick={() => setLightbox(cert)}
                    >
                      {/* Banner / Badge Header */}
                      <div className="w-full aspect-video rounded-xl bg-slate-900 overflow-hidden border border-white/10 mb-4 relative flex items-center justify-center">
                        {hasValidImage ? (
                          <img
                            src={cert.image!}
                            alt={cert.title ?? 'Certificate'}
                            onError={() => handleImgError(cert.id)}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className={`w-full h-full bg-gradient-to-br ${brand.color} p-6 flex flex-col items-center justify-center text-center relative`}>
                            {brand.logo ? (
                              <img src={brand.logo} alt={brand.name} className="w-12 h-12 object-contain mb-2 filter drop-shadow-md brightness-0 invert" />
                            ) : (
                              <Award size={40} className="text-white/90 mb-2" />
                            )}
                            <span className="text-xs font-bold text-white uppercase tracking-wider bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                              {brand.name} Certified
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e1c]/80 via-transparent to-transparent opacity-60" />
                      </div>

                      <h3 className="font-display font-bold text-lg text-white mb-1.5 leading-snug group-hover:text-amber-300 transition-colors">
                        {cert.title || 'Certificate'}
                      </h3>

                      {cert.issuer && (
                        <p className="text-amber-400/90 text-xs font-semibold mb-3">{cert.issuer}</p>
                      )}

                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/[0.08]">
                        {cert.issue_date && (
                          <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                            <Calendar size={12} />
                            {formatDate(cert.issue_date)}
                          </div>
                        )}
                        {targetUrl && (
                          <span className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-medium transition-colors ml-auto">
                            Verify Certificate <Eye size={11} />
                          </span>
                        )}
                      </div>
                    </div>
                  </TiltCard>
                </FadeIn>
              )
            })}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox && (() => {
          const targetUrl = lightbox.certificate_url || (lightbox.image && !isImageUrl(lightbox.image) ? lightbox.image : null)
          const brand = getIssuerBrand(lightbox.issuer, targetUrl)
          const hasValidImage = isImageUrl(lightbox.image) && !imgErrors[lightbox.id]

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl overflow-y-auto"
              onClick={() => setLightbox(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="glass-card p-6 sm:p-8 max-w-3xl w-full border border-white/20 shadow-2xl rounded-3xl relative bg-[#090a18]/95 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 z-20 p-2.5 rounded-full glass-strong text-slate-300 hover:text-white shadow-lg"
                  onClick={() => setLightbox(null)}
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>

                <div className="space-y-6">
                  {/* Image or Brand Banner */}
                  {hasValidImage ? (
                    <div className="w-full aspect-[16/10] max-h-[380px] rounded-2xl overflow-hidden border border-white/15 bg-slate-950 shadow-2xl">
                      <img src={lightbox.image!} alt={lightbox.title || 'Certificate'} className="w-full h-full object-contain bg-slate-950" />
                    </div>
                  ) : (
                    <div className={`w-full aspect-video max-h-[260px] rounded-2xl bg-gradient-to-br ${brand.color} p-8 flex flex-col items-center justify-center text-center relative shadow-2xl`}>
                      {brand.logo ? (
                        <img src={brand.logo} alt={brand.name} className="w-16 h-16 object-contain mb-3 filter drop-shadow-lg brightness-0 invert" />
                      ) : (
                        <Award size={64} className="mb-3 text-white/90" />
                      )}
                      <span className="text-sm font-extrabold text-white uppercase tracking-widest bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-md">
                        {brand.name} Verified Certificate
                      </span>
                    </div>
                  )}

                  <div>
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-2">{lightbox.title}</h3>
                    {lightbox.issuer && (
                      <p className="text-amber-400 font-semibold text-sm flex items-center gap-1.5">
                        <Sparkles size={13} /> Issued by {lightbox.issuer}
                      </p>
                    )}
                    {lightbox.issue_date && (
                      <p className="text-slate-400 text-xs mt-1">Issued on {formatDate(lightbox.issue_date)}</p>
                    )}
                  </div>

                  {targetUrl && (
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <a
                        href={targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary inline-flex text-xs py-2.5 px-6 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold border-none shadow-lg"
                      >
                        Open Official Verification Link <ExternalLink size={14} />
                      </a>
                      <button onClick={() => setLightbox(null)} className="btn-ghost text-xs py-2 px-4">
                        Close
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )
        })()}
      </AnimatePresence>
    </section>
  )
}
