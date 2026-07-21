import { supabase } from '@/lib/supabase'
import type { WebsiteSettings } from '@/types/database'
import { triggerRevalidate } from '@/lib/utils'

export const settingsService = {
  async get(): Promise<WebsiteSettings | null> {
    const { data, error } = await supabase.from('website_settings').select('*').maybeSingle()
    if (error) {
      console.error('settingsService.get error:', error)
      return null
    }
    return data
  },

  async update(id: string, updates: Partial<WebsiteSettings>): Promise<WebsiteSettings | null> {
    const { data, error } = await supabase.from('website_settings').update(updates).eq('id', id).select().maybeSingle()
    if (error) { console.error(error); return null }
    triggerRevalidate()
    return data
  },

  async create(settings: Omit<WebsiteSettings, 'id' | 'created_at'>): Promise<WebsiteSettings | null> {
    const { data, error } = await supabase.from('website_settings').insert(settings).select().single()
    if (error) { console.error(error); return null }
    triggerRevalidate()
    return data
  },
}
