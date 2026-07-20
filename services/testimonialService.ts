import { supabase } from '@/lib/supabase'
import type { Testimonial } from '@/types/database'

export const testimonialService = {
  async getAll(): Promise<Testimonial[]> {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) { console.error(error); return [] }
    return data ?? []
  },

  async getById(id: string): Promise<Testimonial | null> {
    const { data, error } = await supabase.from('testimonials').select('*').eq('id', id).single()
    if (error) { console.error(error); return null }
    return data
  },

  async create(t: Omit<Testimonial, 'id' | 'created_at'>): Promise<Testimonial | null> {
    const { data, error } = await supabase.from('testimonials').insert(t).select().single()
    if (error) { console.error(error); return null }
    return data
  },

  async update(id: string, updates: Partial<Testimonial>): Promise<Testimonial | null> {
    const { data, error } = await supabase.from('testimonials').update(updates).eq('id', id).select().single()
    if (error) { console.error(error); return null }
    return data
  },

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase.from('testimonials').delete().eq('id', id)
    if (error) { console.error(error); return false }
    return true
  },
}
