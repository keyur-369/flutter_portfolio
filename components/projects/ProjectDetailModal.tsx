'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Github, Store, Star, CheckCircle2, Code2, Sparkles } from 'lucide-react'
import type { Project } from '@/types/database'

interface ProjectDetailModalProps {
  project: Project | null
  onClose: () => void
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [project])

  if (!project) return null

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card w-full max-w-3xl max-h-[85vh] flex flex-col my-auto overflow-hidden border border-white/20 shadow-2xl rounded-3xl relative bg-[#090a18]/95"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 p-2.5 rounded-full glass-strong text-slate-300 hover:text-white hover:bg-white/20 transition-all shadow-2xl border border-white/20"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          {/* Modal Header Cover Image */}
          <div className="relative aspect-[16/8] w-full overflow-hidden bg-slate-950 flex-shrink-0 border-b border-white/10">
            {project.image ? (
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/60 to-slate-900">
                <Code2 size={56} className="text-white/30" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090a18] via-[#090a18]/40 to-transparent" />

            {/* Badges */}
            <div className="absolute bottom-4 left-6 z-10 flex flex-wrap gap-2">
              {project.featured && (
                <span className="badge badge-purple backdrop-blur-md shadow-lg">
                  <Star size={10} /> Featured Project
                </span>
              )}
              <span className="badge badge-blue backdrop-blur-md shadow-lg">
                {project.status || 'Completed'}
              </span>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-200">
            <div>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white mb-3 gradient-text">
                {project.title}
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                {project.long_description || project.description}
              </p>
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Sparkles size={12} className="text-primary/70" />
                Technologies & Architecture
              </h3>
              <div className="flex flex-wrap gap-2">
                {(project.tech_stack ?? []).map((tech) => (
                  <span key={tech} className="tech-chip text-xs px-3 py-1.5 font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Highlights */}
            <div className="glass-card p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
                Key Features
              </h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                  <span>Cross-Platform Flutter & Clean Architecture</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                  <span>Real-time database sync with Supabase / Firebase</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                  <span>Optimized for performance and responsive user interfaces</span>
                </li>
              </ul>
            </div>

            {/* Gallery Screenshots */}
            {project.gallery && project.gallery.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  App Screenshots
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {project.gallery.map((img, idx) => (
                    <img key={idx} src={img} alt={`Screenshot ${idx + 1}`} className="w-full h-32 object-cover rounded-xl border border-white/10" />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer Actions */}
          <div className="p-4 sm:p-6 bg-[#060712] border-t border-white/10 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
            <div className="flex items-center gap-2">
              {project.playstore_url && (
                <a
                  href={project.playstore_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs py-2 px-4 bg-emerald-600 hover:bg-emerald-500 border-none inline-flex items-center gap-1.5"
                >
                  <Store size={14} /> Play Store
                </a>
              )}
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost text-xs py-2 px-4 inline-flex items-center gap-1.5"
                >
                  <Github size={14} /> Source Code
                </a>
              )}
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost text-xs py-2 px-4 inline-flex items-center gap-1.5"
                >
                  <ExternalLink size={14} /> Live Demo
                </a>
              )}
            </div>

            <button onClick={onClose} className="btn-ghost text-xs py-2 px-4 ml-auto">
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
