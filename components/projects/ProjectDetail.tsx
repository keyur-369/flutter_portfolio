'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Github, ExternalLink, Store, Star } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'
import type { Project } from '@/types/database'

interface ProjectDetailProps {
  project: Project
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <section className="section py-24">
      <div className="container-custom max-w-4xl">
        <FadeIn className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Back to Projects
          </Link>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="glass-card p-8 md:p-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
              <div>
                <div className="flex gap-2 mb-3">
                  {project.featured && (
                    <span className="badge badge-purple">
                      <Star size={8} /> Featured
                    </span>
                  )}
                  {project.status && (
                    <span className="badge badge-blue">{project.status}</span>
                  )}
                </div>
                <h1 className="font-display font-black text-4xl md:text-5xl text-white mb-3">
                  {project.title}
                </h1>
                <p className="text-white/60 text-lg leading-relaxed">{project.description}</p>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                {project.playstore_url && (
                  <a href={project.playstore_url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-medium hover:bg-green-500/30 transition-colors">
                    <Store size={14} /> Play Store
                  </a>
                )}
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-white/10 text-white/70 text-sm font-medium hover:text-white transition-colors">
                    <Github size={14} /> GitHub
                  </a>
                )}
                {project.live_url && (
                  <a href={project.live_url} target="_blank" rel="noopener noreferrer"
                    className="btn-primary text-sm py-2">
                    <ExternalLink size={14} /> Live Demo
                  </a>
                )}
              </div>
            </div>

            <div className="h-px bg-white/[0.06] mb-8" />

            {/* Tech Stack */}
            <div className="mb-8">
              <h2 className="font-semibold text-white mb-4">Technology Stack</h2>
              <div className="flex flex-wrap gap-2">
                {(project.tech_stack ?? []).map((tech) => (
                  <span key={tech} className="tech-chip">{tech}</span>
                ))}
              </div>
            </div>

            {/* Long description */}
            {project.long_description && (
              <div className="mb-8">
                <h2 className="font-semibold text-white mb-4">About This Project</h2>
                <p className="text-white/60 leading-relaxed">{project.long_description}</p>
              </div>
            )}

            {/* Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <div>
                <h2 className="font-semibold text-white mb-4">Screenshots</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.gallery.map((img, i) => (
                    <motion.img
                      key={i}
                      src={img}
                      alt={`${project.title} screenshot ${i + 1}`}
                      className="rounded-xl object-cover aspect-video w-full"
                      whileHover={{ scale: 1.03 }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
