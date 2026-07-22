'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit, Trash2, X, Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { educationService } from '@/services/educationService'
import type { Education } from '@/types/database'

function EduForm({ item, onClose, onSave }: { item?: Education | null; onClose: () => void; onSave: () => void }) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: {
      institute: item?.institute ?? '',
      degree: item?.degree ?? '',
      cgpa: item?.cgpa ?? '',
      start_year: item?.start_year ?? new Date().getFullYear(),
      end_year: item?.end_year ?? '',
      description: item?.description ?? '',
    },
  })

  const onSubmit = async (data: Record<string, unknown>) => {
    const payload = { ...data, start_year: Number(data.start_year), end_year: data.end_year ? Number(data.end_year) : null }
    let ok = false
    if (item) ok = !!(await educationService.update(item.id, payload as Partial<Education>))
    else ok = !!(await educationService.create(payload as Omit<Education, 'id' | 'created_at'>))
    if (ok) { toast.success('Saved!'); onSave(); onClose() } else toast.error('Failed')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto" onClick={onClose}>
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="glass-card p-4 sm:p-8 w-full max-w-lg my-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6 pb-3 border-b border-white/[0.08]">
          <h2 className="font-display font-bold text-xl sm:text-2xl text-white">{item ? 'Edit Education' : 'Add Education'}</h2>
          <button onClick={onClose} className="p-2 rounded-xl glass text-white/60 hover:text-white"><X size={16} /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div><label className="text-xs font-semibold text-slate-300 mb-1.5 block">Institute *</label>
            <input {...register('institute', { required: true })} className="input-glass" placeholder="CHARUSAT University" /></div>
          <div><label className="text-xs font-semibold text-slate-300 mb-1.5 block">Degree *</label>
            <input {...register('degree', { required: true })} className="input-glass" placeholder="MSc Information Technology" /></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div><label className="text-xs font-semibold text-slate-300 mb-1.5 block">CGPA</label>
              <input {...register('cgpa')} className="input-glass" placeholder="7.00" /></div>
            <div><label className="text-xs font-semibold text-slate-300 mb-1.5 block">Start Year</label>
              <input {...register('start_year')} type="number" className="input-glass" /></div>
            <div><label className="text-xs font-semibold text-slate-300 mb-1.5 block">End Year</label>
              <input {...register('end_year')} type="number" className="input-glass" placeholder="Ongoing" /></div>
          </div>
          <div><label className="text-xs font-semibold text-slate-300 mb-1.5 block">Description</label>
            <textarea {...register('description')} rows={3} className="input-glass resize-none" /></div>
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

export default function AdminEducationPage() {
  const [items, setItems] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Education | null>(null)

  const load = async () => { setItems(await educationService.getAll()); setLoading(false) }
  useEffect(() => { load() }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete?')) return
    const ok = await educationService.delete(id)
    if (ok) { toast.success('Deleted'); load() } else toast.error('Failed')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="font-display font-black text-2xl sm:text-3xl text-white mb-1">Education</h1>
          <p className="text-white/50 text-xs sm:text-sm">{items.length} entries</p></div>
        <button onClick={() => { setEditing(null); setShowForm(true) }} className="btn-primary text-xs sm:text-sm"><Plus size={16} /> Add</button>
      </div>
      {loading ? <div className="flex items-center justify-center h-40"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div> : (
        <div className="space-y-3">
          {items.map((edu, i) => (
            <motion.div key={edu.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="glass-card p-4 sm:p-5 flex items-center justify-between gap-3 sm:gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white text-sm sm:text-base truncate">{edu.degree}</h3>
                <p className="text-xs sm:text-sm text-primary/70 truncate">{edu.institute}</p>
                <p className="text-xs text-white/40">{edu.start_year} — {edu.end_year ?? 'Present'} {edu.cgpa && `· CGPA: ${edu.cgpa}`}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => { setEditing(edu); setShowForm(true) }} className="p-2 rounded-xl glass text-white/60 hover:text-white"><Edit size={14} /></button>
                <button onClick={() => handleDelete(edu.id)} className="p-2 rounded-xl glass text-red-400/60 hover:text-red-400"><Trash2 size={14} /></button>
              </div>
            </motion.div>
          ))}
          {items.length === 0 && <div className="text-center py-12 glass-card"><p className="text-white/40 mb-3">No education entries</p><button onClick={() => setShowForm(true)} className="btn-primary text-sm"><Plus size={14} /> Add</button></div>}
        </div>
      )}
      <AnimatePresence>
        {showForm && <EduForm item={editing} onClose={() => { setShowForm(false); setEditing(null) }} onSave={load} />}
      </AnimatePresence>
    </div>
  )
}
