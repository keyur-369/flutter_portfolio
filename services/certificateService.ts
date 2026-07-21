import { supabase } from '@/lib/supabase'
import type { Certificate } from '@/types/database'
import { triggerRevalidate } from '@/lib/utils'

let certsCache: { data: Certificate[]; timestamp: number } | null = null
const CACHE_TTL = 300000 // 5 minutes

export const certificateService = {
  clearCache() {
    certsCache = null
  },

  async getAll(): Promise<Certificate[]> {
    const now = Date.now()
    if (certsCache && now - certsCache.timestamp < CACHE_TTL) {
      return certsCache.data
    }

    try {
      const { data, error } = await supabase.from('certificates').select('*').order('issue_date', { ascending: false })
      if (error) {
        console.error('certificateService.getAll error:', error.message)
        return certsCache?.data ?? []
      }
      const result = data ?? []
      certsCache = { data: result, timestamp: now }
      return result
    } catch {
      return certsCache?.data ?? []
    }
  },

  async create(cert: Omit<Certificate, 'id' | 'created_at'>): Promise<{ data: Certificate | null; error: string | null }> {
    this.clearCache()
    try {
      const sanitized = {
        ...cert,
        issuer: cert.issuer || null,
        issue_date: cert.issue_date || null,
        certificate_url: cert.certificate_url || null,
        image: cert.image || null,
      }
      const { data, error } = await supabase.from('certificates').insert(sanitized).select().maybeSingle()
      if (error) {
        console.error('certificateService.create error:', error.message)
        return { data: null, error: error.message }
      }
      triggerRevalidate()
      return { data, error: null }
    } catch (err: any) {
      return { data: null, error: err?.message || 'Network error' }
    }
  },

  async update(id: string, updates: Partial<Certificate>): Promise<{ data: Certificate | null; error: string | null }> {
    this.clearCache()
    try {
      const { data, error } = await supabase.from('certificates').update(updates).eq('id', id).select().maybeSingle()
      if (error) {
        console.error('certificateService.update error:', error.message)
        return { data: null, error: error.message }
      }
      triggerRevalidate()
      return { data, error: null }
    } catch (err: any) {
      return { data: null, error: err?.message || 'Network error' }
    }
  },

  async delete(id: string): Promise<boolean> {
    this.clearCache()
    try {
      const { error } = await supabase.from('certificates').delete().eq('id', id)
      if (error) { console.error('certificateService.delete error:', error.message); return false }
      triggerRevalidate()
      return true
    } catch {
      return false
    }
  },

  async uploadImage(file: File): Promise<string | null> {
    try {
      const fileName = `cert-${Date.now()}.${file.name.split('.').pop()}`
      const { error } = await supabase.storage.from('certificates').upload(fileName, file, { upsert: true })
      if (error) return null
      return supabase.storage.from('certificates').getPublicUrl(fileName).data.publicUrl
    } catch {
      return null
    }
  },
}
