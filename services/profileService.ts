import { supabase } from '@/lib/supabase'
import type { Profile } from '@/types/database'
import { triggerRevalidate } from '@/lib/utils'

export const profileService = {
  async get(): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profile')
      .select('*')
      .maybeSingle()
    if (error) {
      console.error('profileService.get error:', error)
      return null
    }
    return data
  },

  async update(id: string, updates: Partial<Profile>): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profile')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .maybeSingle()
    if (error) {
      console.error('profileService.update error:', error)
      return null
    }
    triggerRevalidate()
    return data
  },

  async create(profile: Omit<Profile, 'id' | 'created_at' | 'updated_at'>): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profile')
      .insert(profile)
      .select()
      .single()
    if (error) {
      console.error('profileService.create error:', error)
      return null
    }
    triggerRevalidate()
    return data
  },

  async uploadProfileImage(file: File): Promise<string | null> {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `profile-${Date.now()}.${fileExt}`
      const { error } = await supabase.storage
        .from('profile-images')
        .upload(fileName, file, { upsert: true })
      if (error) return null
      const { data } = supabase.storage
        .from('profile-images')
        .getPublicUrl(fileName)
      return data.publicUrl
    } catch {
      return null
    }
  },

  async uploadResume(file: File): Promise<string | null> {
    try {
      const fileName = `resume-${Date.now()}.pdf`
      const { error } = await supabase.storage
        .from('resume')
        .upload(fileName, file, { upsert: true })
      if (error) return null
      const { data } = supabase.storage
        .from('resume')
        .getPublicUrl(fileName)
      return data.publicUrl
    } catch {
      return null
    }
  },
}
