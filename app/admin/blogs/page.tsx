'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit, Trash2, X, Save, ToggleLeft, ToggleRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { blogService } from '@/services/blogService'
import { slugify, formatDate } from '@/lib/utils'
import type { Blog } from '@/types/database'

function BlogForm({ item, onClose, onSave }: { item?: Blog | null; onClose: () => void; onSave: () => void }) {
  const { register, handleSubmit, setValue, watch, formState: { isSubmitting } } = useForm({
    defaultValues: {
      title: item?.title ?? '',
      slug: item?.slug ?? '',
      description: item?.description ?? '',
      content: item?.content ?? '',
      published: item?.published ?? true,
    },
  })
  const title = watch('title')
  useEffect(() => { if (!item && title) setValue('slug', slugify(title)) }, [title, item, setValue])

  const onSubmit = async (data: Record<string, unknown>) => {
    const payload = { ...data, published: Boolean(data.published) }
    let ok = false
    if (item) ok = !!(await blogService.update(item.id, payload as Partial<Blog>))
    else ok = !!(await blogService.create(payload as Omit<Blog, 'id' | 'created_at'>))
    if (ok) { toast.success('Saved!'); onSave(); onClose() } else toast.error('Failed')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-8 bg-black/70 backdrop-blur-sm overflow-y-auto" onClick={onClose}>
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="glass-card p-4 sm:p-8 w-full max-w-2xl my-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6 pb-3 border-b border-white/[0.08]">
          <h2 className="font-display font-bold text-xl sm:text-2xl text-white">{item ? 'Edit Post' : 'New Post'}</h2>
          <button onClick={onClose} className="p-2 rounded-xl glass text-white/60 hover:text-white"><X size={16} /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div><label className="text-xs font-semibold text-slate-300 mb-1.5 block">Title *</label><input {...register('title', { required: true })} className="input-glass" placeholder="Blog post title" /></div>
          <div><label className="text-xs font-semibold text-slate-300 mb-1.5 block">Slug</label><input {...register('slug')} className="input-glass" placeholder="blog-post-slug" /></div>
          <div><label className="text-xs font-semibold text-slate-300 mb-1.5 block">Description</label><textarea {...register('description')} rows={2} className="input-glass resize-none" placeholder="Brief description..." /></div>
          <div><label className="text-xs font-semibold text-slate-300 mb-1.5 block">Content (Markdown)</label><textarea {...register('content')} rows={10} className="input-glass resize-none font-mono text-sm" placeholder="# Your blog post content in Markdown..." /></div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" {...register('published')} className="w-4 h-4 accent-primary" />
            <span className="text-xs sm:text-sm text-white/70">Publish immediately</span>
          </label>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-ghost flex-1">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="btn-primary flex-1 justify-center disabled:opacity-60">
              {isSubmitting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save size={14} /> Save</>}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default function AdminBlogsPage() {
  const [items, setItems] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Blog | null>(null)

  const load = async () => { setItems(await blogService.getAll(false)); setLoading(false) }
  useEffect(() => { load() }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete?')) return
    const ok = await blogService.delete(id)
    if (ok) { toast.success('Deleted'); load() } else toast.error('Failed')
  }

  const handleToggle = async (blog: Blog) => {
    await blogService.togglePublish(blog.id, !blog.published)
    toast.success(blog.published ? 'Unpublished' : 'Published!')
    load()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="font-display font-black text-2xl sm:text-3xl text-white mb-1">Blogs</h1>
          <p className="text-white/50 text-xs sm:text-sm">{items.length} posts</p></div>
        <button onClick={() => { setEditing(null); setShowForm(true) }} className="btn-primary text-xs sm:text-sm"><Plus size={16} /> New Post</button>
      </div>
      {loading ? <div className="flex items-center justify-center h-40"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div> : (
        <div className="space-y-3">
          {items.map((blog, i) => (
            <motion.div key={blog.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="glass-card p-4 sm:p-5 flex items-center justify-between gap-3 sm:gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-semibold text-white text-sm sm:text-base truncate">{blog.title}</h3>
                  <span className={`badge text-[10px] ${blog.published ? 'badge-green' : 'badge-blue'}`}>{blog.published ? '● Live' : 'Draft'}</span>
                </div>
                <p className="text-xs text-white/40 truncate">
                  {formatDate(blog.created_at ?? null)} · /blogs/{blog.slug}
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => handleToggle(blog)} className={`p-2 rounded-xl glass ${blog.published ? 'text-green-400' : 'text-white/40'}`}>
                  {blog.published ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                </button>
                <button onClick={() => { setEditing(blog); setShowForm(true) }} className="p-2 rounded-xl glass text-white/60 hover:text-white"><Edit size={14} /></button>
                <button onClick={() => handleDelete(blog.id)} className="p-2 rounded-xl glass text-red-400/60 hover:text-red-400"><Trash2 size={14} /></button>
              </div>
            </motion.div>
          ))}
          {items.length === 0 && <div className="text-center py-12 glass-card"><p className="text-white/40 mb-3">No posts yet</p><button onClick={() => setShowForm(true)} className="btn-primary text-sm"><Plus size={14} /> New Post</button></div>}
        </div>
      )}
      <AnimatePresence>
        {showForm && <BlogForm item={editing} onClose={() => { setShowForm(false); setEditing(null) }} onSave={load} />}
      </AnimatePresence>
    </div>
  )
}
