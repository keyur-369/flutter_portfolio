'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit, Trash2, X, Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { testimonialService } from '@/services/testimonialService'
import type { Testimonial } from '@/types/database'

function TestimonialForm({ item, onClose, onSave }: { item?: Testimonial | null; onClose: () => void; onSave: () => void }) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: { client_name: item?.client_name ?? '', designation: item?.designation ?? '', company: item?.company ?? '', review: item?.review ?? '' },
  })

  const onSubmit = async (data: Record<string, unknown>) => {
    let ok = false
    if (item) ok = !!(await testimonialService.update(item.id, data as Partial<Testimonial>))
    else ok = !!(await testimonialService.create(data as Omit<Testimonial, 'id' | 'created_at'>))
    if (ok) { toast.success('Saved!'); onSave(); onClose() } else toast.error('Failed')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="glass-card p-8 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between mb-6">
          <h2 className="font-display font-bold text-2xl text-white">{item ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
          <button onClick={onClose} className="p-2 rounded-xl glass text-white/60 hover:text-white"><X size={16} /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div><label className="text-sm text-white/60 mb-1 block">Client Name *</label><input {...register('client_name', { required: true })} className="input-glass" placeholder="John Doe" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm text-white/60 mb-1 block">Designation</label><input {...register('designation')} className="input-glass" placeholder="Product Manager" /></div>
            <div><label className="text-sm text-white/60 mb-1 block">Company</label><input {...register('company')} className="input-glass" placeholder="Acme Inc." /></div>
          </div>
          <div><label className="text-sm text-white/60 mb-1 block">Review *</label><textarea {...register('review', { required: true })} rows={4} className="input-glass resize-none" placeholder="Write their review..." /></div>
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

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Testimonial | null>(null)

  const load = async () => { setItems(await testimonialService.getAll()); setLoading(false) }
  useEffect(() => { load() }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete?')) return
    const ok = await testimonialService.delete(id)
    if (ok) { toast.success('Deleted'); load() } else toast.error('Failed')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="font-display font-black text-3xl text-white mb-1">Testimonials</h1>
          <p className="text-white/50 text-sm">{items.length} total</p></div>
        <button onClick={() => { setEditing(null); setShowForm(true) }} className="btn-primary"><Plus size={16} /> Add</button>
      </div>
      {loading ? <div className="flex items-center justify-center h-40"><div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" /></div> : (
        <div className="space-y-3">
          {items.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="glass-card p-5 flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="font-semibold text-white mb-1">{t.client_name}</p>
                <p className="text-xs text-indigo-400 mb-2">{t.designation}{t.company ? ` · ${t.company}` : ''}</p>
                <p className="text-sm text-white/55 italic line-clamp-2">"{t.review}"</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => { setEditing(t); setShowForm(true) }} className="p-2 rounded-xl glass text-white/60 hover:text-white"><Edit size={14} /></button>
                <button onClick={() => handleDelete(t.id)} className="p-2 rounded-xl glass text-red-400/60 hover:text-red-400"><Trash2 size={14} /></button>
              </div>
            </motion.div>
          ))}
          {items.length === 0 && <div className="text-center py-12 glass-card"><p className="text-white/40 mb-3">No testimonials yet</p><button onClick={() => setShowForm(true)} className="btn-primary text-sm"><Plus size={14} /> Add</button></div>}
        </div>
      )}
      <AnimatePresence>
        {showForm && <TestimonialForm item={editing} onClose={() => { setShowForm(false); setEditing(null) }} onSave={load} />}
      </AnimatePresence>
    </div>
  )
}
