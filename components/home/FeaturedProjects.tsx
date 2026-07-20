'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Github, ExternalLink, Store, Star, ArrowRight, FolderOpen, Code2 } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'
import { TiltCard } from '@/components/ui/TiltCard'
import { ProjectDetailModal } from '@/components/projects/ProjectDetailModal'
import type { Project } from '@/types/database'

interface FeaturedProjectsProps {
  projects: Project[]
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  if (!projects || projects.length === 0) {
    return (
      <section className="section py-16">
        <div className="container-custom">
          <FadeIn className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-semibold uppercase tracking-widest mb-4" style={{ border: '1px solid rgba(254,127,45,0.25)', color: '#FE7F2D' }}>
              <Star size={10} />
              Featured Work
            </div>
            <h2 className="section-title text-white mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
          </FadeIn>
          <div className="glass-card p-12 text-center max-w-md mx-auto">
            <FolderOpen size={36} className="mx-auto mb-3 opacity-60" style={{ color: '#FE7F2D' }} />
            <p className="text-slate-400 text-sm">No featured projects added yet.</p>
            <p className="text-slate-500 text-xs mt-1">Add projects from your Admin Panel to showcase them here.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="section py-24">
        <div className="container-custom">
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-violet-500/30 text-xs font-semibold text-violet-300 uppercase tracking-widest mb-4">
              <Star size={10} />
              Featured Work
            </div>
            <h2 className="section-title text-white mb-4">
              Projects that <span className="gradient-text">make impact</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Real-world applications built with Flutter, Firebase, and Supabase — fetched live from database.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project, i) => (
              <FadeIn key={project.id} delay={i * 0.15} direction="up">
                <TiltCard className="h-full">
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="glass-card h-full flex flex-col overflow-hidden border border-white/10 rounded-3xl transition-all duration-300 cursor-pointer group"
                    style={{ transition: 'border-color 0.3s, box-shadow 0.3s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(254,127,45,0.35)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 60px rgba(254,127,45,0.08)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLElement).style.boxShadow = '' }}
                  >
                    {/* Banner Image / Cover */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900 border-b border-white/[0.08]">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center text-4xl font-bold text-white/80"
                          style={{
                            background: `linear-gradient(135deg, hsl(${220 + i * 40}, 80%, 35%), hsl(${260 + i * 40}, 80%, 40%))`,
                          }}
                        >
                          <Code2 size={40} className="text-white/40" />
                        </div>
                      )}

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e1c] via-transparent to-transparent opacity-80" />

                      {/* Action Links Overlay */}
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10" onClick={(e) => e.stopPropagation()}>
                        {project.playstore_url && (
                          <motion.a
                            href={project.playstore_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl glass-strong text-slate-300 hover:text-emerald-400 transition-colors shadow-lg"
                            whileHover={{ scale: 1.1 }}
                            aria-label="Play Store"
                          >
                            <Store size={14} />
                          </motion.a>
                        )}
                        {project.github_url && (
                          <motion.a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl glass-strong text-slate-300 hover:text-white transition-colors shadow-lg"
                            whileHover={{ scale: 1.1 }}
                            aria-label="GitHub"
                          >
                            <Github size={14} />
                          </motion.a>
                        )}
                        {project.live_url && (
                          <motion.a
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl glass-strong text-slate-300 hover:text-white transition-colors shadow-lg"
                            whileHover={{ scale: 1.1 }}
                            aria-label="Live Demo"
                          >
                            <ExternalLink size={14} />
                          </motion.a>
                        )}
                      </div>

                      {/* Status Badge Overlay */}
                      {project.status === 'Published' && (
                        <div className="absolute bottom-3 left-3 z-10">
                          <span className="badge badge-green text-[10px] shadow-md backdrop-blur-md">
                            ✦ Play Store
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Body Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-display font-bold text-2xl text-white mb-2 group-hover:gradient-text transition-all">
                        {project.title}
                      </h3>

                      {project.description && (
                        <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-1 font-normal">
                          {project.description}
                        </p>
                      )}

                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {(project.tech_stack ?? []).slice(0, 4).map((tech) => (
                          <span key={tech} className="tech-chip text-[11px] px-2.5 py-1">
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Bottom CTA */}
                      <div className="flex items-center justify-between text-sm font-semibold transition-colors pt-4 border-t border-white/[0.08] mt-auto" style={{ color: 'rgba(254,127,45,0.8)' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#FE7F2D'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(254,127,45,0.8)'}
                      >
                        <span>View Details & Case Study</span>
                        <ArrowRight
                          size={15}
                          className="group-hover:translate-x-1.5 transition-transform"
                        />
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4} className="text-center mt-14">
            <Link href="/projects" prefetch={true} className="btn-ghost inline-flex">
              <span>View All Projects</span>
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Instant 0ms Case Study Detail Modal */}
      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  )
}
