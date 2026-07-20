'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Save, Settings } from 'lucide-react'
import { settingsService } from '@/services/settingsService'
import type { WebsiteSettings } from '@/types/database'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<WebsiteSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<Partial<WebsiteSettings>>()

  useEffect(() => {
    settingsService.get().then((s) => {
      setSettings(s)
      if (s) reset(s)
      setLoading(false)
    })
  }, [reset])

  const onSubmit = async (data: Partial<WebsiteSettings>) => {
    let ok = false
    if (settings) {
      const updated = await settingsService.update(settings.id, data)
      ok = !!updated
      if (updated) setSettings(updated)
    } else {
      const created = await settingsService.create(data as Omit<WebsiteSettings, 'id' | 'created_at'>)
      ok = !!created
      if (created) setSettings(created)
    }
    if (ok) toast.success('Settings saved!')
    else toast.error('Failed to save settings')
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" /></div>

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display font-black text-3xl text-white mb-1">Settings</h1>
        <p className="text-white/50 text-sm">Configure your portfolio website settings</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="glass-card p-8 space-y-6">
        <div>
          <h2 className="font-semibold text-white mb-4 pb-2 border-b border-white/[0.06]">Site Information</h2>
          <div className="space-y-4">
            <div><label className="text-sm text-white/60 mb-1 block">Site Name</label><input {...register('site_name')} className="input-glass" placeholder="Keyur Mistry Portfolio" /></div>
            <div><label className="text-sm text-white/60 mb-1 block">Site Description</label><textarea {...register('site_description')} rows={3} className="input-glass resize-none" placeholder="Flutter Developer building cross-platform apps..." /></div>
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-white mb-4 pb-2 border-b border-white/[0.06]">SEO</h2>
          <div className="space-y-4">
            <div><label className="text-sm text-white/60 mb-1 block">SEO Keywords</label><input {...register('seo_keywords')} className="input-glass" placeholder="Flutter, Dart, Firebase, Mobile Developer" /></div>
            <div><label className="text-sm text-white/60 mb-1 block">Google Analytics ID</label><input {...register('google_analytics')} className="input-glass" placeholder="G-XXXXXXXXXX" /></div>
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-white mb-4 pb-2 border-b border-white/[0.06]">Colors</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm text-white/60 mb-1 block">Primary Color</label><input {...register('primary_color')} className="input-glass" placeholder="#3B82F6" /></div>
            <div><label className="text-sm text-white/60 mb-1 block">Secondary Color</label><input {...register('secondary_color')} className="input-glass" placeholder="#8B5CF6" /></div>
          </div>
        </div>
        <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center disabled:opacity-60">
          {isSubmitting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save size={16} /> Save Settings</>}
        </button>
      </form>
    </div>
  )
}
