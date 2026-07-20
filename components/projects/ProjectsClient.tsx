'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Github, ExternalLink, Store, Star, Layers, ArrowRight, FolderOpen, Code2 } from 'lucide-react'
import Link from 'next/link'
import { FadeIn } from '@/components/ui/FadeIn'
import { TiltCard } from '@/components/ui/TiltCard'
import { ProjectDetailModal } from '@/components/projects/ProjectDetailModal'
import { cn } from '@/lib/utils'
import type { Project } from '@/types/database'

interface ProjectsClientProps {
  initialProjects: Project[]
}

export function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const statuses = ['All', ...Array.from(new Set(initialProjects.map((p) => p.status)))]

  const filtered = useMemo(() => {
    return initialProjects.filter((p) => {
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        (p.description ?? '').toLowerCase().includes(search.toLowerCase())
      const matchesFilter = filter === 'All' || p.status === filter
      return matchesSearch && matchesFilter
    })
  }, [initialProjects, search, filter])

  return (
    <>
      <section className="section py-24">
        <div className="container-custom">
          <FadeIn className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-violet-500/30 text-xs font-semibold text-violet-300 uppercase tracking-widest mb-4">
              <Layers size={10} />
              Portfolio
            </div>
            <h1 className="section-title text-white mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h1>
            <p className="section-subtitle mx-auto">
              Applications built and managed live from Supabase Admin panel.
            </p>
          </FadeIn>

          {/* Search & Filter */}
          {initialProjects.length > 0 && (
            <FadeIn delay={0.2} className="flex flex-col sm:flex-row gap-4 mb-12">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search projects by name or technology..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-glass pl-11 w-full"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={cn(
                      'px-4 py-2 rounded-xl text-sm font-medium transition-all',
                      filter === status
                        ? 'bg-gradient-to-r from-blue-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25'
                        : 'glass border border-white/10 text-slate-400 hover:text-white'
                    )}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </FadeIn>
          )}

          {/* Projects Grid */}
          {initialProjects.length === 0 ? (
            <div className="glass-card p-16 text-center max-w-md mx-auto">
              <FolderOpen size={40} className="text-indigo-400 mx-auto mb-4 opacity-60" />
              <h3 className="font-display font-bold text-xl text-white mb-2">No Projects Added Yet</h3>
              <p className="text-slate-400 text-sm mb-6">
                Go to your Admin Panel to add your projects to Supabase.
              </p>
              <Link href="/admin/projects" className="btn-primary inline-flex text-sm py-2">
                Go to Admin Projects
              </Link>
            </div>
          ) : (
            <AnimatePresence>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((project, i) => (
                  <FadeIn key={project.id} delay={i * 0.08} direction="up">
                    <TiltCard className="h-full">
                      <div
                        onClick={() => setSelectedProject(project)}
                        className="glass-card h-full flex flex-col overflow-hidden border border-white/10 rounded-3xl transition-all duration-300 hover:border-violet-500/40 hover:shadow-2xl hover:shadow-indigo-500/10 cursor-pointer group"
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
                                background: `linear-gradient(135deg, hsl(${200 + i * 30}, 80%, 35%), hsl(${240 + i * 30}, 80%, 40%))`,
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
                              <a
                                href={project.playstore_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-xl glass-strong text-slate-300 hover:text-emerald-400 transition-colors shadow-lg"
                                aria-label="Play Store"
                              >
                                <Store size={14} />
                              </a>
                            )}
                            {project.github_url && (
                              <a
                                href={project.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-xl glass-strong text-slate-300 hover:text-white transition-colors shadow-lg"
                                aria-label="GitHub"
                              >
                                <Github size={14} />
                              </a>
                            )}
                            {project.live_url && (
                              <a
                                href={project.live_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-xl glass-strong text-slate-300 hover:text-white transition-colors shadow-lg"
                                aria-label="Live Demo"
                              >
                                <ExternalLink size={14} />
                              </a>
                            )}
                          </div>

                          {/* Badges Overlay */}
                          <div className="absolute bottom-3 left-3 z-10 flex gap-1.5">
                            {project.featured && (
                              <span className="badge badge-purple text-[10px] backdrop-blur-md">
                                <Star size={8} /> Featured
                              </span>
                            )}
                            {project.status === 'Published' && (
                              <span className="badge badge-green text-[10px] backdrop-blur-md">
                                ✦ Play Store
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Body Content */}
                        <div className="p-6 flex flex-col flex-1">
                          <h2 className="font-display font-bold text-2xl text-white mb-2 group-hover:gradient-text transition-all">
                            {project.title}
                          </h2>

                          {project.description && (
                            <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-1 font-normal">
                              {project.description}
                            </p>
                          )}

                          {/* Tech Stack Chips */}
                          <div className="flex flex-wrap gap-1.5 mb-6">
                            {(project.tech_stack ?? []).slice(0, 5).map((tech) => (
                              <span key={tech} className="tech-chip text-[11px] px-2.5 py-1">
                                {tech}
                              </span>
                            ))}
                          </div>

                          {/* Bottom CTA */}
                          <div className="flex items-center justify-between text-sm font-semibold transition-colors pt-4 border-t border-white/[0.08] mt-auto" style={{ color: 'rgba(254,127,45,0.8)' }}>
                            <span>View Details & Case Study</span>
                            <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  </FadeIn>
                ))}
              </div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* Instant 0ms Case Study Detail Modal */}
      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  )
}
