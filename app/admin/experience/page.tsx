'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit, Trash2, X, Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { experienceService } from '@/services/experienceService'
import { formatDate } from '@/lib/utils'
import type { Experience } from '@/types/database'

function ExpForm({ item, onClose, onSave }: { item?: Experience | null; onClose: () => void; onSave: () => void }) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: {
      company: item?.company ?? '',
      role: item?.role ?? '',
      employment_type: item?.employment_type ?? 'Internship',
      location: item?.location ?? '',
      start_date: item?.start_date ?? '',
      end_date: item?.end_date ?? '',
      currently_working: item?.currently_working ?? false,
      description: item?.description ?? '',
    },
  })

  const onSubmit = async (data: Record<string, unknown>) => {
    const payload = { ...data, currently_working: Boolean(data.currently_working), end_date: data.currently_working ? null : data.end_date || null }
    let ok = false
    if (item) ok = !!(await experienceService.update(item.id, payload as Partial<Experience>))
    else ok = !!(await experienceService.create(payload as Omit<Experience, 'id' | 'created_at'>))
    if (ok) { toast.success('Saved!'); onSave(); onClose() } else toast.error('Failed')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-10 sm:pt-16 bg-black/70 backdrop-blur-sm overflow-y-auto" onClick={onClose}>
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="glass-card p-4 sm:p-8 w-full max-w-lg my-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6 pb-3 border-b border-white/[0.08]">
          <h2 className="font-display font-bold text-xl sm:text-2xl text-white">{item ? 'Edit Experience' : 'Add Experience'}</h2>
          <button onClick={onClose} className="p-2 rounded-xl glass text-white/60 hover:text-white"><X size={16} /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="text-xs font-semibold text-slate-300 mb-1.5 block">Company *</label>
              <input {...register('company', { required: true })} className="input-glass" placeholder="Patrixel" /></div>
            <div><label className="text-xs font-semibold text-slate-300 mb-1.5 block">Role *</label>
              <input {...register('role', { required: true })} className="input-glass" placeholder="Flutter Developer Intern" /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="text-xs font-semibold text-slate-300 mb-1.5 block">Employment Type</label>
              <select {...register('employment_type')} className="input-glass">
                <option>Internship</option><option>Full-time</option><option>Part-time</option><option>Freelance</option>
              </select></div>
            <div><label className="text-xs font-semibold text-slate-300 mb-1.5 block">Location</label>
              <input {...register('location')} className="input-glass" placeholder="Gujarat, India" /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="text-xs font-semibold text-slate-300 mb-1.5 block">Start Date</label>
              <input {...register('start_date')} type="date" className="input-glass" /></div>
            <div><label className="text-xs font-semibold text-slate-300 mb-1.5 block">End Date</label>
              <input {...register('end_date')} type="date" className="input-glass" /></div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" {...register('currently_working')} className="w-4 h-4 accent-primary" />
            <span className="text-xs sm:text-sm text-white/70">Currently working here</span>
          </label>
          <div><label className="text-xs font-semibold text-slate-300 mb-1.5 block">Description</label>
            <textarea {...register('description')} rows={4} className="input-glass resize-none" placeholder="Describe your responsibilities..." /></div>
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

export default function AdminExperiencePage() {
  const [items, setItems] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Experience | null>(null)

  const load = async () => { setItems(await experienceService.getAll()); setLoading(false) }
  useEffect(() => { load() }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete?')) return
    const ok = await experienceService.delete(id)
    if (ok) { toast.success('Deleted'); load() } else toast.error('Failed')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="font-display font-black text-2xl sm:text-3xl text-white mb-1">Experience</h1>
          <p className="text-white/50 text-xs sm:text-sm">{items.length} entries</p></div>
        <button onClick={() => { setEditing(null); setShowForm(true) }} className="btn-primary text-xs sm:text-sm"><Plus size={16} /> Add</button>
      </div>
      {loading ? <div className="flex items-center justify-center h-40"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div> : (
        <div className="space-y-3">
          {items.map((exp, i) => (
            <motion.div key={exp.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="glass-card p-4 sm:p-5 flex items-center justify-between gap-3 sm:gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-semibold text-white text-sm sm:text-base truncate">{exp.role}</h3>
                  {exp.currently_working && <span className="badge badge-green text-[10px]">● Current</span>}
                </div>
                <p className="text-xs sm:text-sm text-primary/70 truncate">{exp.company}</p>
                <p className="text-xs text-white/40">
                  {formatDate(exp.start_date ?? null)} — {exp.currently_working ? 'Present' : formatDate(exp.end_date ?? null)}
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => { setEditing(exp); setShowForm(true) }} className="p-2 rounded-xl glass text-white/60 hover:text-white"><Edit size={14} /></button>
                <button onClick={() => handleDelete(exp.id)} className="p-2 rounded-xl glass text-red-400/60 hover:text-red-400"><Trash2 size={14} /></button>
              </div>
            </motion.div>
          ))}
          {items.length === 0 && <div className="text-center py-12 glass-card"><p className="text-white/40 mb-3 text-sm">No experience entries</p><button onClick={() => setShowForm(true)} className="btn-primary text-sm"><Plus size={14} /> Add</button></div>}
        </div>
      )}
      <AnimatePresence>
        {showForm && <ExpForm item={editing} onClose={() => { setShowForm(false); setEditing(null) }} onSave={load} />}
      </AnimatePresence>
    </div>
  )
}
