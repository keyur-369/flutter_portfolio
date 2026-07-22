'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import { Plus, Edit, Trash2, Store, Github, Star, X, Save, Upload, ExternalLink, Image as ImageIcon, Wand2, Sparkles, RefreshCw, CheckCircle, ArrowUp, ArrowDown, GripVertical } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { projectService } from '@/services/projectService'
import { slugify } from '@/lib/utils'
import { GithubRepoCard, type GithubRepoCardData } from '@/components/projects/GithubRepoCard'
import type { Project } from '@/types/database'

function ProjectForm({
  project,
  onClose,
  onSave,
}: {
  project?: Project | null
  onClose: () => void
  onSave: () => void
}) {
  const [uploading, setUploading] = useState(false)
  const [fetchingGithub, setFetchingGithub] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(project?.image ?? null)
  const [githubData, setGithubData] = useState<GithubRepoCardData | null>(null)

  const { register, handleSubmit, setValue, watch, formState: { isSubmitting } } = useForm({
    defaultValues: {
      title: project?.title ?? '',
      slug: project?.slug ?? '',
      description: project?.description ?? '',
      long_description: project?.long_description ?? '',
      tech_stack: (project?.tech_stack ?? []).join(', '),
      github_url: project?.github_url ?? '',
      live_url: project?.live_url ?? '',
      playstore_url: project?.playstore_url ?? '',
      image: project?.image ?? '',
      featured: project?.featured ?? false,
      status: project?.status ?? 'Completed',
      display_order: project?.display_order ?? undefined,
    },
  })

  const title = watch('title')
  const imageUrl = watch('image')
  const githubUrl = watch('github_url')

  useEffect(() => {
    if (!project && title) setValue('slug', slugify(title))
  }, [title, project, setValue])

  useEffect(() => {
    if (imageUrl) setPreviewUrl(imageUrl)
  }, [imageUrl])

  // Auto Fetch Details from GitHub API
  const fetchGithubDetails = async (urlToFetch?: string) => {
    const targetUrl = urlToFetch || githubUrl
    if (!targetUrl || !targetUrl.trim()) {
      toast.error('Please enter a valid GitHub repository link first!')
      return
    }

    setFetchingGithub(true)
    try {
      const res = await fetch(`/api/github-repo?url=${encodeURIComponent(targetUrl.trim())}`)
      const json = await res.json()

      if (!res.ok || json.error) {
        toast.error(json.error || 'Failed to fetch repository details from GitHub')
        return
      }

      const { data } = json
      setGithubData(data)

      if (data.title) {
        setValue('title', data.title)
        setValue('slug', slugify(data.title))
      }
      if (data.description) {
        setValue('description', data.description)
      }
      if (data.tech_stack && data.tech_stack.length > 0) {
        setValue('tech_stack', data.tech_stack.join(', '))
      }
      if (data.github_url) {
        setValue('github_url', data.github_url)
      }
      if (data.live_url) {
        setValue('live_url', data.live_url)
      }
      if (data.image) {
        setValue('image', data.image)
        setPreviewUrl(data.image)
      }

      toast.success(`✨ LinkedIn-style preview loaded for "${data.title}"!`)
    } catch {
      toast.error('Error connecting to GitHub fetch service')
    } finally {
      setFetchingGithub(false)
    }
  }

  // INSTANT Image Processing (0ms local conversion)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)

    const reader = new FileReader()
    reader.onload = (event) => {
      const base64Url = event.target?.result as string
      setValue('image', base64Url)
      setPreviewUrl(base64Url)
      setUploading(false)
      toast.success('Cover image attached instantly!')

      // Optional background upload to Supabase Storage without blocking UI
      projectService.uploadImage(file).then((storageUrl) => {
        if (storageUrl) {
          setValue('image', storageUrl)
          setPreviewUrl(storageUrl)
        }
      }).catch(() => { })
    }
    reader.onerror = () => {
      setUploading(false)
      toast.error('Failed to read image file')
    }
    reader.readAsDataURL(file)
  }

  const onSubmit = async (data: Record<string, unknown>) => {
    const payload = {
      ...data,
      tech_stack: String(data.tech_stack ?? '').split(',').map((t: string) => t.trim()).filter(Boolean),
      featured: Boolean(data.featured),
      display_order: data.display_order ? Number(data.display_order) : null,
    }

    if (project) {
      const res = await projectService.update(project.id, payload as Partial<Project>)
      if (res.error) {
        toast.error(`Failed to update: ${res.error}`)
      } else {
        toast.success('Project updated successfully!')
        onSave()
        onClose()
      }
    } else {
      const res = await projectService.create(payload as Omit<Project, 'id' | 'created_at'>)
      if (res.error) {
        toast.error(`Failed to create: ${res.error}`)
      } else {
        toast.success('Project created successfully!')
        onSave()
        onClose()
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-8 bg-black/80 backdrop-blur-md overflow-y-auto" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="glass-card p-4 sm:p-8 w-full max-w-2xl my-4 border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
          <h2 className="font-display font-bold text-xl sm:text-2xl text-white">
            {project ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-xl glass text-slate-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Quick GitHub Import Bar */}
          <div className="p-3.5 rounded-2xl border border-purple-500/20 bg-purple-500/[0.06] backdrop-blur-sm space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-purple-300 flex items-center gap-1.5">
                <Sparkles size={14} className="text-purple-400" />
                Auto-fill from GitHub URL
              </span>
              <span className="text-[10px] text-purple-300/70">LinkedIn-style repo card fetch</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Github size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Paste GitHub URL e.g. https://github.com/keyur-369/daily_health_tracker"
                  className="input-glass pl-9 py-2 text-xs w-full"
                  defaultValue={githubUrl}
                  onChange={(e) => setValue('github_url', e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      fetchGithubDetails(e.currentTarget.value)
                    }
                  }}
                />
              </div>
              <button
                type="button"
                onClick={() => fetchGithubDetails()}
                disabled={fetchingGithub}
                className="btn-primary py-2 px-3 text-xs flex items-center gap-1.5 flex-shrink-0 disabled:opacity-60 bg-purple-600 hover:bg-purple-500 border-purple-500/50"
              >
                {fetchingGithub ? (
                  <RefreshCw size={13} className="animate-spin" />
                ) : (
                  <Wand2 size={13} />
                )}
                <span>{fetchingGithub ? 'Fetching...' : 'Fetch Details'}</span>
              </button>
            </div>

            {/* Live LinkedIn-Style GitHub Repo Card Preview */}
            {githubData && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="pt-2 border-t border-purple-500/20 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-purple-200 flex items-center gap-1">
                    <CheckCircle size={12} className="text-emerald-400" /> Live LinkedIn GitHub Preview Card
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (githubData.image) {
                        setValue('image', githubData.image)
                        setPreviewUrl(githubData.image)
                        toast.success('Applied GitHub Card as Cover Image!')
                      }
                    }}
                    className="text-[10px] text-purple-300 hover:text-white underline font-medium"
                  >
                    Use Card as Cover Image
                  </button>
                </div>
                <GithubRepoCard data={githubData} showOgBanner={true} />
              </motion.div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Title *</label>
              <input {...register('title', { required: true })} className="input-glass" placeholder="Split Expenses" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Slug</label>
              <input {...register('slug')} className="input-glass" placeholder="split-expenses" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Short Description</label>
            <textarea {...register('description')} rows={2} className="input-glass resize-none" placeholder="Brief project summary..." />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Detailed Case Study Description</label>
            <textarea {...register('long_description')} rows={3} className="input-glass resize-none" placeholder="In-depth details about architecture, solutions..." />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Tech Stack (Comma Separated)</label>
            <input {...register('tech_stack')} className="input-glass" placeholder="Flutter, Firebase, Supabase" />
          </div>

          {/* Cover Image Upload & Instant Live Preview Section */}
          <div className="glass-card p-4 rounded-2xl border border-white/10 bg-white/[0.02]">
            <label className="text-xs font-semibold text-slate-200 mb-3 block flex items-center gap-2">
              <ImageIcon size={14} className="text-primary/70" />
              Cover Image & Instant Live Preview
            </label>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Preview Thumbnail */}
              <div className="w-28 h-20 rounded-xl bg-slate-900 border border-white/15 overflow-hidden flex items-center justify-center flex-shrink-0 relative group">
                {previewUrl ? (
                  <img src={previewUrl} alt="Cover Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-2">
                    <ImageIcon size={20} className="text-slate-500 mx-auto mb-1" />
                    <span className="text-[10px] text-slate-500">No Image</span>
                  </div>
                )}
              </div>

              {/* Upload & URL Controls */}
              <div className="flex-1 w-full space-y-2">
                <div className="flex items-center gap-3">
                  <label className="btn-primary text-xs py-2 px-4 cursor-pointer inline-flex items-center gap-2">
                    {uploading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <><Upload size={14} /> Upload Cover File</>
                    )}
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                  </label>
                  {previewUrl && (
                    <button
                      type="button"
                      onClick={() => { setValue('image', ''); setPreviewUrl(null) }}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="relative">
                  <input
                    {...register('image')}
                    onChange={(e) => { setValue('image', e.target.value); setPreviewUrl(e.target.value) }}
                    className="input-glass text-xs py-2"
                    placeholder="Or paste direct image URL (https://...)"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">GitHub URL</label>
                <button
                  type="button"
                  onClick={() => fetchGithubDetails()}
                  disabled={fetchingGithub}
                  className="text-[10px] text-purple-400 hover:text-purple-300 flex items-center gap-1 font-medium"
                >
                  <Wand2 size={10} /> Auto-Fetch
                </button>
              </div>
              <input
                {...register('github_url')}
                className="input-glass"
                placeholder="https://github.com/..."
                onBlur={(e) => {
                  if (e.target.value && !watch('title')) {
                    fetchGithubDetails(e.target.value)
                  }
                }}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Live Demo URL</label>
              <input {...register('live_url')} className="input-glass" placeholder="https://..." />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Play Store URL</label>
              <input {...register('playstore_url')} className="input-glass" placeholder="https://play.google.com/..." />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Status</label>
              <select {...register('status')} className="input-glass">
                <option value="Completed" className="bg-[#0f0f23]">Completed</option>
                <option value="Published" className="bg-[#0f0f23]">Published</option>
                <option value="In Progress" className="bg-[#0f0f23]">In Progress</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Display Position (Order)</label>
              <input
                type="number"
                {...register('display_order')}
                className="input-glass"
                placeholder="1, 2, 3..."
              />
            </div>

            <div className="flex items-end pb-2">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" {...register('featured')} className="w-4 h-4 accent-primary rounded" />
                <span className="text-xs font-semibold text-slate-200">Feature on Home Page</span>
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-white/[0.08]">
            <button type="button" onClick={onClose} className="btn-ghost flex-1 justify-center">Cancel</button>
            <motion.button
              type="submit"
              disabled={isSubmitting || uploading}
              className="btn-primary flex-1 justify-center disabled:opacity-60"
              whileTap={{ scale: 0.97 }}
            >
              {isSubmitting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save size={14} /> Save Project</>}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const load = async () => {
    const data = await projectService.getAll()
    setProjects(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return
    const ok = await projectService.delete(id)
    if (ok) { toast.success('Project deleted'); load() }
    else toast.error('Failed to delete project')
  }

  const handleToggleFeatured = async (p: Project) => {
    const res = await projectService.update(p.id, { featured: !p.featured })
    if (res.error) toast.error(res.error)
    else {
      toast.success(p.featured ? 'Unfeatured' : 'Featured!')
      load()
    }
  }

  const handleReorder = async (newOrder: Project[]) => {
    setProjects(newOrder)
    const ids = newOrder.map((p) => p.id)
    const ok = await projectService.reorderProjects(ids)
    if (ok) {
      toast.success('Project positions reordered!')
    } else {
      toast.error('Failed to save project order')
      load()
    }
  }

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const newProjects = [...projects]
    const targetIndex = direction === 'up' ? index - 1 : index + 1

    if (targetIndex < 0 || targetIndex >= newProjects.length) return

    // Swap position in local state
    const temp = newProjects[index]
    newProjects[index] = newProjects[targetIndex]
    newProjects[targetIndex] = temp

    setProjects(newProjects)

    // Save ordered array IDs
    const ids = newProjects.map((p) => p.id)
    const ok = await projectService.reorderProjects(ids)
    if (ok) {
      toast.success(`Position updated! ${temp.title} moved to position #${targetIndex + 1}`)
    } else {
      toast.error('Failed to save project position')
      load()
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mb-1">Projects</h1>
          <p className="text-slate-400 text-xs sm:text-sm">{projects.length} project{projects.length === 1 ? '' : 's'} managed in Supabase • Drag card or use arrows to change position</p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => { setEditingProject(null); setShowForm(true) }}
            className="px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-2 transition-all shadow-lg shadow-purple-500/5"
          >
            <Github size={16} className="text-purple-400" />
            <Sparkles size={14} className="text-purple-400" />
            <span className="hidden sm:inline">Import from GitHub</span>
            <span className="sm:hidden">Import</span>
          </button>
          <button onClick={() => { setEditingProject(null); setShowForm(true) }} className="btn-primary text-xs sm:text-sm">
            <Plus size={16} /> Add Project
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      ) : (
        <Reorder.Group axis="y" values={projects} onReorder={handleReorder} className="space-y-3">
          {projects.map((project, i) => (
            <Reorder.Item
              key={project.id}
              value={project}
              className="glass-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-grab active:cursor-grabbing border border-white/10 hover:border-purple-500/30 transition-all select-none"
            >
              <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                {/* Drag Handle, Position Badge & Arrow Controls */}
                <div className="flex items-center gap-2 flex-shrink-0 bg-white/[0.04] p-1.5 rounded-xl border border-white/[0.08]">
                  <span title="Drag to reorder position">
                    <GripVertical size={16} className="text-slate-400 hover:text-purple-300 cursor-grab active:cursor-grabbing" />
                  </span>
                  <span className="text-xs font-mono font-bold text-purple-300 px-1.5 py-0.5 rounded bg-purple-500/20">
                    #{i + 1}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleMove(i, 'up') }}
                      disabled={i === 0}
                      className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-20 hover:bg-white/10 transition-colors"
                      title="Move Project Up"
                    >
                      <ArrowUp size={12} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleMove(i, 'down') }}
                      disabled={i === projects.length - 1}
                      className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-20 hover:bg-white/10 transition-colors"
                      title="Move Project Down"
                    >
                      <ArrowDown size={12} />
                    </button>
                  </div>
                </div>

                {project.image ? (
                  <img src={project.image} alt={project.title} className="w-12 h-12 rounded-xl object-cover border border-white/10 flex-shrink-0" />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0 text-xl font-bold text-primary/70">
                    {project.title.charAt(0)}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white truncate text-sm sm:text-base">{project.title}</h3>
                    {project.featured && <span className="badge badge-purple text-[10px]"><Star size={8} /> Featured</span>}
                    <span className="badge badge-blue text-[10px]">{project.status}</span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 sm:truncate">{project.description}</p>
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {(project.tech_stack ?? []).slice(0, 5).map((t) => (
                      <span key={t} className="tech-chip text-[10px] px-1.5 py-0.5">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-white/[0.06] flex-wrap sm:flex-nowrap flex-shrink-0">
                {project.playstore_url && <a href={project.playstore_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl glass text-emerald-400 hover:text-emerald-300"><Store size={14} /></a>}
                {project.github_url && <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl glass text-slate-400 hover:text-white"><Github size={14} /></a>}
                {project.live_url && <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl glass text-primary/70 hover:text-primary"><ExternalLink size={14} /></a>}
                <button onClick={() => handleToggleFeatured(project)} className={`p-2 rounded-xl glass ${project.featured ? 'text-amber-400' : 'text-slate-500'}`} title="Toggle featured">
                  <Star size={14} />
                </button>
                <button onClick={() => { setEditingProject(project); setShowForm(true) }} className="p-2 rounded-xl glass text-slate-400 hover:text-white">
                  <Edit size={14} />
                </button>
                <button onClick={() => handleDelete(project.id)} className="p-2 rounded-xl glass text-red-400/70 hover:text-red-400">
                  <Trash2 size={14} />
                </button>
              </div>
            </Reorder.Item>
          ))}

          {projects.length === 0 && (
            <div className="text-center py-16 glass-card">
              <p className="text-slate-400 mb-4">No projects in database yet</p>
              <button onClick={() => setShowForm(true)} className="btn-primary text-sm">
                <Plus size={14} /> Add Your First Project
              </button>
            </div>
          )}
        </Reorder.Group>
      )}

      <AnimatePresence>
        {showForm && (
          <ProjectForm
            project={editingProject}
            onClose={() => { setShowForm(false); setEditingProject(null) }}
            onSave={load}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
