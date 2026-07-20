import { supabase } from '@/lib/supabase'
import type { Education } from '@/types/database'

export const educationService = {
  async getAll(): Promise<Education[]> {
    const { data, error } = await supabase
      .from('education')
      .select('*')
      .order('start_year', { ascending: false })
    if (error) { console.error(error); return [] }
    return data ?? []
  },

  async getById(id: string): Promise<Education | null> {
    const { data, error } = await supabase.from('education').select('*').eq('id', id).single()
    if (error) { console.error(error); return null }
    return data
  },

  async create(education: Omit<Education, 'id' | 'created_at'>): Promise<Education | null> {
    const { data, error } = await supabase.from('education').insert(education).select().single()
    if (error) { console.error(error); return null }
    return data
  },

  async update(id: string, updates: Partial<Education>): Promise<Education | null> {
    const { data, error } = await supabase.from('education').update(updates).eq('id', id).select().single()
    if (error) { console.error(error); return null }
    return data
  },

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase.from('education').delete().eq('id', id)
    if (error) { console.error(error); return false }
    return true
  },
}
