'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Save, Settings, RefreshCcw } from 'lucide-react'
import { settingsService } from '@/services/settingsService'
import { hexToHsl } from '@/lib/utils'
import type { WebsiteSettings } from '@/types/database'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<WebsiteSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const { register, handleSubmit, reset, setValue, formState: { isSubmitting } } = useForm<Partial<WebsiteSettings>>()

  useEffect(() => {
    settingsService.get().then((s) => {
      setSettings(s)
      if (s) reset(s)
      setLoading(false)
    })
  }, [reset])

  const onSubmit = async (data: Partial<WebsiteSettings>) => {
    let ok = false
    // Temporarily strip background_color since it's not in the database schema yet
    const { background_color, ...dbData } = data
    
    if (settings) {
      const updated = await settingsService.update(settings.id, dbData)
      ok = !!updated
      if (updated) setSettings({ ...updated, background_color }) // Keep background_color in local state
    } else {
      const created = await settingsService.create(dbData as Omit<WebsiteSettings, 'id' | 'created_at'>)
      ok = !!created
      if (created) setSettings({ ...created, background_color })
    }
    if (ok) {
      toast.success('Settings saved!')
      if (data.primary_color) {
        document.documentElement.style.setProperty('--primary', hexToHsl(data.primary_color))
        document.documentElement.style.setProperty('--accent', hexToHsl(data.primary_color))
        document.documentElement.style.setProperty('--ring', hexToHsl(data.primary_color))
      }
      if (data.secondary_color) {
        document.documentElement.style.setProperty('--secondary', hexToHsl(data.secondary_color))
      }
      if (data.background_color) {
        document.documentElement.style.setProperty('--bg-color', data.background_color)
      }
    }
    else toast.error('Failed to save settings')
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div>

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <h1 className="font-display font-black text-2xl sm:text-3xl text-white mb-1">Settings</h1>
        <p className="text-white/50 text-xs sm:text-sm">Configure your portfolio website settings</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="glass-card p-4 sm:p-8 space-y-6">
        <div>
          <h2 className="font-semibold text-white mb-4 pb-2 border-b border-white/[0.06]">Site Information</h2>
          <div className="space-y-4">
            <div><label className="text-xs font-semibold text-slate-300 mb-1.5 block">Site Name</label><input {...register('site_name')} className="input-glass" placeholder="Keyur Mistry Portfolio" /></div>
            <div><label className="text-xs font-semibold text-slate-300 mb-1.5 block">Site Description</label><textarea {...register('site_description')} rows={3} className="input-glass resize-none" placeholder="Flutter Developer building cross-platform apps..." /></div>
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-white mb-4 pb-2 border-b border-white/[0.06]">SEO</h2>
          <div className="space-y-4">
            <div><label className="text-xs font-semibold text-slate-300 mb-1.5 block">SEO Keywords</label><input {...register('seo_keywords')} className="input-glass" placeholder="Flutter, Dart, Firebase, Mobile Developer" /></div>
            <div><label className="text-xs font-semibold text-slate-300 mb-1.5 block">Google Analytics ID</label><input {...register('google_analytics')} className="input-glass" placeholder="G-XXXXXXXXXX" /></div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/[0.06]">
            <h2 className="font-semibold text-white">Colors</h2>
            <button
              type="button"
              onClick={() => {
                setValue('primary_color', '#FE7F2D', { shouldDirty: true })
                setValue('secondary_color', '#233D4D', { shouldDirty: true })
                setValue('background_color', '#000000', { shouldDirty: true })
                toast.success('Colors reset to defaults (click Save to apply)')
              }}
              className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
            >
              <RefreshCcw size={12} />
              Reset Colors
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Primary Color</label>
              <div className="flex gap-2 items-center">
                <input type="color" {...register('primary_color')} className="w-10 h-10 rounded cursor-pointer bg-transparent border-0 p-0" />
                <input type="text" {...register('primary_color')} className="input-glass flex-1 font-mono text-sm" placeholder="#FE7F2D" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Secondary Color</label>
              <div className="flex gap-2 items-center">
                <input type="color" {...register('secondary_color')} className="w-10 h-10 rounded cursor-pointer bg-transparent border-0 p-0" />
                <input type="text" {...register('secondary_color')} className="input-glass flex-1 font-mono text-sm" placeholder="#233D4D" />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Background Color</label>
            <div className="flex gap-2 items-center max-w-full sm:max-w-[50%]">
              <input type="color" {...register('background_color')} className="w-10 h-10 rounded cursor-pointer bg-transparent border-0 p-0" />
              <input type="text" {...register('background_color')} className="input-glass flex-1 font-mono text-sm" placeholder="#000000" />
            </div>
          </div>
        </div>
        <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center disabled:opacity-60 text-sm py-2.5">
          {isSubmitting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save size={16} /> Save Settings</>}
        </button>
      </form>
    </div>
  )
}
