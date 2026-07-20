'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit, Trash2, Store, Github, Star, X, Save, Upload, ExternalLink, Image as ImageIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { projectService } from '@/services/projectService'
import { slugify } from '@/lib/utils'
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
  const [previewUrl, setPreviewUrl] = useState<string | null>(project?.image ?? null)

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
    },
  })

  const title = watch('title')
  const imageUrl = watch('image')

  useEffect(() => {
    if (!project && title) setValue('slug', slugify(title))
  }, [title, project, setValue])

  useEffect(() => {
    if (imageUrl) setPreviewUrl(imageUrl)
  }, [imageUrl])

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
      }).catch(() => {})
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
        className="glass-card p-8 w-full max-w-2xl my-4 border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
          <h2 className="font-display font-bold text-2xl text-white">
            {project ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-xl glass text-slate-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              <ImageIcon size={14} className="text-indigo-400" />
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
              <label className="text-xs font-semibold text-slate-300 mb-1.5 block">GitHub URL</label>
              <input {...register('github_url')} className="input-glass" placeholder="https://github.com/..." />
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

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Status</label>
              <select {...register('status')} className="input-glass">
                <option value="Completed" className="bg-[#0f0f23]">Completed</option>
                <option value="Published" className="bg-[#0f0f23]">Published</option>
                <option value="In Progress" className="bg-[#0f0f23]">In Progress</option>
              </select>
            </div>
            <div className="flex items-end pb-2">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" {...register('featured')} className="w-4 h-4 accent-indigo-500 rounded" />
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

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-black text-3xl text-white mb-1">Projects</h1>
          <p className="text-slate-400 text-sm">{projects.length} project{projects.length === 1 ? '' : 's'} managed in Supabase</p>
        </div>
        <button onClick={() => { setEditingProject(null); setShowForm(true) }} className="btn-primary">
          <Plus size={16} /> Add Project
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="glass-card p-5 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {project.image ? (
                  <img src={project.image} alt={project.title} className="w-12 h-12 rounded-xl object-cover border border-white/10 flex-shrink-0" />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0 text-xl font-bold text-indigo-300">
                    {project.title.charAt(0)}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white truncate">{project.title}</h3>
                    {project.featured && <span className="badge badge-purple text-[10px]"><Star size={8} /> Featured</span>}
                    <span className="badge badge-blue text-[10px]">{project.status}</span>
                  </div>
                  <p className="text-xs text-slate-400 truncate">{project.description}</p>
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {(project.tech_stack ?? []).slice(0, 5).map((t) => (
                      <span key={t} className="tech-chip text-[10px] px-1.5 py-0.5">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {project.playstore_url && <a href={project.playstore_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl glass text-emerald-400 hover:text-emerald-300"><Store size={14} /></a>}
                {project.github_url && <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl glass text-slate-400 hover:text-white"><Github size={14} /></a>}
                {project.live_url && <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl glass text-indigo-400 hover:text-indigo-300"><ExternalLink size={14} /></a>}
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
            </motion.div>
          ))}

          {projects.length === 0 && (
            <div className="text-center py-16 glass-card">
              <p className="text-slate-400 mb-4">No projects in database yet</p>
              <button onClick={() => setShowForm(true)} className="btn-primary text-sm">
                <Plus size={14} /> Add Your First Project
              </button>
            </div>
          )}
        </div>
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
