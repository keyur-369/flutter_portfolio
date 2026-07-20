import { supabase } from '@/lib/supabase'
import type { Experience } from '@/types/database'

let expCache: { data: Experience[]; timestamp: number } | null = null
const CACHE_TTL = 300000 // 5 minutes

export const experienceService = {
  clearCache() {
    expCache = null
  },

  async getAll(): Promise<Experience[]> {
    const now = Date.now()
    if (expCache && now - expCache.timestamp < CACHE_TTL) {
      return expCache.data
    }

    try {
      const { data, error } = await supabase
        .from('experience')
        .select('*')
        .order('start_date', { ascending: false })

      if (error) {
        console.error('experienceService.getAll error:', error.message)
        return expCache?.data ?? []
      }

      const result = data ?? []
      expCache = { data: result, timestamp: now }
      return result
    } catch {
      return expCache?.data ?? []
    }
  },

  async getById(id: string): Promise<Experience | null> {
    const all = await this.getAll()
    const found = all.find((x) => x.id === id)
    if (found) return found

    try {
      const { data } = await supabase.from('experience').select('*').eq('id', id).maybeSingle()
      return data
    } catch {
      return null
    }
  },

  async create(exp: Omit<Experience, 'id' | 'created_at'>): Promise<Experience | null> {
    this.clearCache()
    const { data, error } = await supabase.from('experience').insert(exp).select().maybeSingle()
    if (error) { console.error('experienceService.create error:', error.message); return null }
    return data
  },

  async update(id: string, updates: Partial<Experience>): Promise<Experience | null> {
    this.clearCache()
    const { data, error } = await supabase.from('experience').update(updates).eq('id', id).select().maybeSingle()
    if (error) { console.error('experienceService.update error:', error.message); return null }
    return data
  },

  async delete(id: string): Promise<boolean> {
    this.clearCache()
    const { error } = await supabase.from('experience').delete().eq('id', id)
    if (error) { console.error('experienceService.delete error:', error.message); return false }
    return true
  },
}
