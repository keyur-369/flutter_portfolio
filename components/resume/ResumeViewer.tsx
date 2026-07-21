'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, FileText, Eye, ZoomIn, ZoomOut, Maximize2, Sparkles, CheckCircle2 } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'
import type { Profile } from '@/types/database'

interface ResumeViewerProps {
  resumeUrl: string | null
  profile: Profile | null
}

export function ResumeViewer({ resumeUrl, profile }: ResumeViewerProps) {
  const [zoomLevel, setZoomLevel] = useState(100)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 15, 150))
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 15, 80))

  return (
    <section className="section py-20 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-primary/10 via-primary/15 to-secondary/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="container-custom max-w-5xl lg:max-w-6xl relative z-10">
        <FadeIn className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-primary/30 text-xs font-semibold text-primary/90 uppercase tracking-widest mb-4 shadow-lg shadow-primary/10">
            <FileText size={12} className="text-primary/70" />
            Curriculum Vitae
          </div>
          <h1 className="section-title text-white mb-4">
            My <span className="gradient-text">Resume</span>
          </h1>
          <p className="section-subtitle mx-auto max-w-xl text-slate-300">
            Download or inspect my complete resume — covering education, technical stack, experience, and projects.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="glass-card p-6 sm:p-8 border border-white/10 rounded-3xl shadow-2xl bg-[#080916]/90">
            {resumeUrl ? (
              <div className="space-y-6">
                {/* Control Action Toolbar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                  <div className="flex flex-wrap items-center gap-3">
                    <motion.a
                      href={resumeUrl}
                      download
                      className="btn-primary text-xs py-2.5 px-5 bg-gradient-to-r from-primary to-secondary font-bold border-none"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Download size={15} />
                      Download PDF
                    </motion.a>
                    <motion.a
                      href={resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost text-xs py-2.5 px-4"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Eye size={15} />
                      Open in New Tab
                    </motion.a>
                  </div>

                  {/* Zoom & Fullscreen Toolbar Controls */}
                  <div className="flex items-center gap-2 glass px-3 py-1.5 rounded-xl border border-white/10 text-xs text-slate-300">
                    <button
                      onClick={handleZoomOut}
                      className="p-1 hover:text-white transition-colors"
                      title="Zoom Out"
                    >
                      <ZoomOut size={15} />
                    </button>
                    <span className="font-semibold text-primary/70 min-w-[42px] text-center">
                      {zoomLevel}%
                    </span>
                    <button
                      onClick={handleZoomIn}
                      className="p-1 hover:text-white transition-colors"
                      title="Zoom In"
                    >
                      <ZoomIn size={15} />
                    </button>
                    <div className="w-[1px] h-4 bg-white/15 mx-1" />
                    <button
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="p-1 hover:text-white transition-colors"
                      title="Toggle Fullscreen Width"
                    >
                      <Maximize2 size={15} />
                    </button>
                  </div>
                </div>

                {/* PDF Viewer Container */}
                <div
                  className={`w-full transition-all duration-300 rounded-2xl overflow-hidden border border-white/15 bg-slate-950 shadow-2xl relative ${
                    isFullscreen
                      ? 'min-h-[85vh] lg:min-h-[1050px]'
                      : 'min-h-[650px] sm:min-h-[750px] lg:min-h-[900px]'
                  }`}
                >
                  <div
                    className="w-full h-full transition-transform duration-200 origin-top"
                    style={{ transform: `scale(${zoomLevel / 100})` }}
                  >
                    <iframe
                      src={`${resumeUrl}#toolbar=0&view=FitH`}
                      className="w-full min-h-[650px] sm:min-h-[750px] lg:min-h-[900px] h-[80vh] border-none"
                      title="Keyur Mistry Resume PDF"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/20">
                  <FileText size={36} className="text-white" />
                </div>
                <h3 className="font-display font-bold text-2xl text-white mb-3">
                  Resume File Ready
                </h3>
                <p className="text-slate-400 mb-8 max-w-md mx-auto text-sm leading-relaxed">
                  Upload your latest resume PDF from the Admin Profile editor to display your interactive PDF viewer here.
                </p>
                <motion.a
                  href="/contact"
                  className="btn-primary inline-flex text-xs py-2.5 px-6"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Contact Keyur Mistry
                </motion.a>
              </div>
            )}
          </div>
        </FadeIn>

        {/* Highlights Cards */}
        <FadeIn delay={0.25}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">
            {[
              {
                label: 'Education',
                value: 'MSc IT — CHARUSAT\nBCA — VNSGU',
                icon: CheckCircle2,
              },
              {
                label: 'Work Experience',
                value: 'Flutter Developer Intern\nat Patrixel',
                icon: Sparkles,
              },
              {
                label: 'Key Tech Stack',
                value: 'Flutter • Firebase\nSupabase • REST APIs',
                icon: FileText,
              },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="glass-card p-6 border border-white/10 rounded-2xl text-center hover:border-primary/30 transition-colors">
                <Icon size={16} className="text-primary/70 mx-auto mb-2" />
                <p className="text-xs text-primary/70 uppercase tracking-widest font-semibold mb-2">{label}</p>
                <p className="text-sm text-slate-200 font-medium whitespace-pre-line leading-relaxed">{value}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
