import { supabase } from '@/lib/supabase'
import type { SocialLink } from '@/types/database'
import { triggerRevalidate } from '@/lib/utils'

export const socialService = {
  async getAll(): Promise<SocialLink[]> {
    const { data, error } = await supabase.from('social_links').select('*')
    if (error) { console.error(error); return [] }
    return data ?? []
  },

  async create(link: Omit<SocialLink, 'id'>): Promise<SocialLink | null> {
    const { data, error } = await supabase.from('social_links').insert(link).select().single()
    if (error) { console.error(error); return null }
    triggerRevalidate()
    return data
  },

  async update(id: string, updates: Partial<SocialLink>): Promise<SocialLink | null> {
    const { data, error } = await supabase.from('social_links').update(updates).eq('id', id).select().single()
    if (error) { console.error(error); return null }
    triggerRevalidate()
    return data
  },

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase.from('social_links').delete().eq('id', id)
    if (error) { console.error(error); return false }
    triggerRevalidate()
    return true
  },
}
