import { supabase } from '@/lib/supabase'
import type { Skill } from '@/types/database'
import { triggerRevalidate } from '@/lib/utils'

let skillsCache: { data: Skill[]; timestamp: number } | null = null
const CACHE_TTL = 300000 // 5 minutes

export const skillsService = {
  clearCache() {
    skillsCache = null
  },

  async getAll(): Promise<Skill[]> {
    const now = Date.now()
    if (skillsCache && now - skillsCache.timestamp < CACHE_TTL) {
      return skillsCache.data
    }

    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('percentage', { ascending: false })

      if (error) {
        console.error('skillsService.getAll error:', error.message)
        return skillsCache?.data ?? []
      }

      const result = data ?? []
      skillsCache = { data: result, timestamp: now }
      return result
    } catch {
      return skillsCache?.data ?? []
    }
  },

  async getGrouped(): Promise<Record<string, Skill[]>> {
    const skills = await this.getAll()
    return skills.reduce((acc, skill) => {
      const category = skill.category || 'Other'
      if (!acc[category]) acc[category] = []
      acc[category].push(skill)
      return acc
    }, {} as Record<string, Skill[]>)
  },

  async create(skill: Omit<Skill, 'id' | 'created_at'>): Promise<{ data: Skill | null; error: string | null }> {
    this.clearCache()
    const sanitized = {
      ...skill,
      category: skill.category || 'Other',
      icon: skill.icon || '⚡',
      percentage: Number(skill.percentage) || 80,
    }
    const { data, error } = await supabase.from('skills').insert(sanitized).select().maybeSingle()
    if (error) {
      console.error('skillsService.create error:', error.message)
      return { data: null, error: error.message }
    }
    triggerRevalidate()
    return { data, error: null }
  },

  async update(id: string, updates: Partial<Skill>): Promise<{ data: Skill | null; error: string | null }> {
    this.clearCache()
    const { data, error } = await supabase.from('skills').update(updates).eq('id', id).select().maybeSingle()
    if (error) {
      console.error('skillsService.update error:', error.message)
      return { data: null, error: error.message }
    }
    triggerRevalidate()
    return { data, error: null }
  },

  async delete(id: string): Promise<boolean> {
    this.clearCache()
    const { error } = await supabase.from('skills').delete().eq('id', id)
    if (error) { console.error('skillsService.delete error:', error.message); return false }
    triggerRevalidate()
    return true
  },
}
