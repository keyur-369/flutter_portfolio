'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit, Trash2, X, Save, Upload, Sparkles } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { skillsService } from '@/services/skillsService'
import { SkillIcon, getOfficialLogoUrl } from '@/components/skills/SkillIcon'
import type { Skill } from '@/types/database'

function SkillForm({ skill, onClose, onSave }: { skill?: Skill | null; onClose: () => void; onSave: () => void }) {
  const { register, handleSubmit, watch, setValue, formState: { isSubmitting } } = useForm({
    defaultValues: {
      name: skill?.name ?? '',
      category: skill?.category ?? '',
      percentage: skill?.percentage ?? 80,
      icon: skill?.icon ?? '',
    },
  })

  const skillName = watch('name')
  const iconValue = watch('icon')
  const detectedLogo = getOfficialLogoUrl(skillName)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const base64Url = event.target?.result as string
      setValue('icon', base64Url)
      toast.success('Skill icon uploaded!')
    }
    reader.readAsDataURL(file)
  }

  const onSubmit = async (data: Record<string, unknown>) => {
    const payload = { ...data, percentage: Number(data.percentage) }
    if (skill) {
      const res = await skillsService.update(skill.id, payload as Partial<Skill>)
      if (res.error) toast.error(`Failed to update: ${res.error}`)
      else { toast.success('Skill updated!'); onSave(); onClose() }
    } else {
      const res = await skillsService.create(payload as Omit<Skill, 'id' | 'created_at'>)
      if (res.error) toast.error(`Failed to create: ${res.error}`)
      else { toast.success('Skill saved!'); onSave(); onClose() }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card p-8 w-full max-w-md my-4 border border-white/10 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
          <h2 className="font-display font-bold text-2xl text-white">{skill ? 'Edit Skill' : 'Add Skill'}</h2>
          <button onClick={onClose} className="p-2 rounded-xl glass text-white/60 hover:text-white"><X size={16} /></button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Skill Name *</label>
            <input {...register('name', { required: true })} className="input-glass" placeholder="Flutter, PHP, Supabase, React..." />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Category</label>
            <input {...register('category')} className="input-glass" placeholder="Mobile Development, Backend, Frontend..." />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Proficiency (%)</label>
            <input {...register('percentage')} type="number" min="0" max="100" className="input-glass" />
          </div>

          {/* Official Icon Auto-Detection & Live Preview */}
          <div className="glass-card p-4 rounded-2xl border border-white/10 bg-white/[0.02]">
            <label className="text-xs font-semibold text-slate-200 mb-2 block flex items-center justify-between">
              <span>Official Brand Icon</span>
              <span className="text-[10px] text-primary/70 font-normal flex items-center gap-1">
                <Sparkles size={10} /> Auto-Detects Logo
              </span>
            </label>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/15 flex items-center justify-center p-2 flex-shrink-0">
                <SkillIcon name={skillName} icon={iconValue} size={28} />
              </div>
              <div className="flex-1 min-w-0 text-xs">
                <p className="text-slate-200 font-medium truncate">{skillName || 'Enter skill name'}</p>
                <p className="text-slate-400 text-[11px] truncate">
                  {iconValue ? 'Custom icon set' : detectedLogo ? 'Official Vector Logo Found' : 'Emoji or Default'}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <input
                {...register('icon')}
                className="input-glass text-xs py-2"
                placeholder="Or paste direct image URL / emoji (optional)"
              />
              <div className="flex items-center justify-between pt-1">
                <label className="text-[11px] text-primary/70 hover:text-primary cursor-pointer flex items-center gap-1 font-medium">
                  <Upload size={12} /> Upload Custom Icon File
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
                {iconValue && (
                  <button type="button" onClick={() => setValue('icon', '')} className="text-[11px] text-slate-500 hover:text-slate-300">
                    Use Auto Logo
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-3 border-t border-white/[0.08]">
            <button type="button" onClick={onClose} className="btn-ghost flex-1 justify-center">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="btn-primary flex-1 justify-center disabled:opacity-60">
              {isSubmitting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save size={14} /> Save Skill</>}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)

  const load = async () => { setSkills(await skillsService.getAll()); setLoading(false) }
  useEffect(() => { load() }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this skill?')) return
    const ok = await skillsService.delete(id)
    if (ok) { toast.success('Deleted'); load() } else toast.error('Failed')
  }

  const grouped = skills.reduce((acc, s) => {
    const cat = s.category ?? 'Other'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(s)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-black text-3xl text-white mb-1">Skills</h1>
          <p className="text-slate-400 text-sm">{skills.length} skills listed with official brand logos</p>
        </div>
        <button onClick={() => { setEditingSkill(null); setShowForm(true) }} className="btn-primary">
          <Plus size={16} /> Add Skill
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      ) : (
        Object.entries(grouped).map(([category, categorySkills]) => (
          <div key={category} className="mb-8">
            <h2 className="font-semibold text-slate-300 text-xs uppercase tracking-wider mb-3">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {categorySkills.map((skill, i) => (
                <motion.div key={skill.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="glass-card p-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-slate-900/80 border border-white/10 flex items-center justify-center p-1.5 flex-shrink-0">
                      <SkillIcon name={skill.name} icon={skill.icon} size={22} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm text-white truncate">{skill.name}</p>
                      <div className="skill-bar mt-1 w-24">
                        <div className="skill-bar-fill" style={{ width: `${skill.percentage ?? 80}%` }} />
                      </div>
                    </div>
                    <span className="text-xs font-bold text-primary/70 flex-shrink-0">{skill.percentage ?? 80}%</span>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button onClick={() => { setEditingSkill(skill); setShowForm(true) }} className="p-1.5 rounded-lg glass text-slate-400 hover:text-white"><Edit size={12} /></button>
                    <button onClick={() => handleDelete(skill.id)} className="p-1.5 rounded-lg glass text-red-400/60 hover:text-red-400"><Trash2 size={12} /></button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))
      )}

      {!loading && skills.length === 0 && (
        <div className="text-center py-16 glass-card">
          <p className="text-slate-400 mb-4">No skills added yet</p>
          <button onClick={() => setShowForm(true)} className="btn-primary"><Plus size={14} /> Add First Skill</button>
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <SkillForm skill={editingSkill} onClose={() => { setShowForm(false); setEditingSkill(null) }} onSave={load} />
        )}
      </AnimatePresence>
    </div>
  )
}
