import { supabase } from '@/lib/supabase'
import type { Blog } from '@/types/database'
import { triggerRevalidate } from '@/lib/utils'

let blogCache: { data: Blog[]; timestamp: number } | null = null
const CACHE_TTL = 300000 // 5 minutes

export const blogService = {
  clearCache() {
    blogCache = null
  },

  async getAll(publishedOnly = true): Promise<Blog[]> {
    const now = Date.now()
    if (blogCache && now - blogCache.timestamp < CACHE_TTL) {
      return publishedOnly ? blogCache.data.filter((b) => b.published) : blogCache.data
    }

    try {
      const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false })
      if (error) {
        console.error('blogService.getAll error:', error.message)
        return (blogCache?.data ?? []).filter((b) => !publishedOnly || b.published)
      }
      const result = data ?? []
      blogCache = { data: result, timestamp: now }
      return publishedOnly ? result.filter((b) => b.published) : result
    } catch {
      return (blogCache?.data ?? []).filter((b) => !publishedOnly || b.published)
    }
  },

  async getBySlug(slug: string): Promise<Blog | null> {
    const all = await this.getAll(false)
    const found = all.find((b) => b.slug === slug)
    if (found) return found

    try {
      const { data } = await supabase.from('blogs').select('*').eq('slug', slug).maybeSingle()
      return data
    } catch {
      return null
    }
  },

  async create(blog: Omit<Blog, 'id' | 'created_at'>): Promise<{ data: Blog | null; error: string | null }> {
    this.clearCache()
    const sanitized = {
      ...blog,
      description: blog.description || null,
      content: blog.content || null,
      cover_image: blog.cover_image || null,
      published: Boolean(blog.published),
    }
    const { data, error } = await supabase.from('blogs').insert(sanitized).select().maybeSingle()
    if (error) {
      console.error('blogService.create error:', error.message)
      return { data: null, error: error.message }
    }
    triggerRevalidate()
    return { data, error: null }
  },

  async update(id: string, updates: Partial<Blog>): Promise<{ data: Blog | null; error: string | null }> {
    this.clearCache()
    const { data, error } = await supabase.from('blogs').update(updates).eq('id', id).select().maybeSingle()
    if (error) {
      console.error('blogService.update error:', error.message)
      return { data: null, error: error.message }
    }
    triggerRevalidate()
    return { data, error: null }
  },

  async togglePublish(id: string, published: boolean): Promise<boolean> {
    this.clearCache()
    const { error } = await supabase.from('blogs').update({ published }).eq('id', id)
    if (error) { console.error('blogService.togglePublish error:', error.message); return false }
    triggerRevalidate()
    return true
  },

  async delete(id: string): Promise<boolean> {
    this.clearCache()
    const { error } = await supabase.from('blogs').delete().eq('id', id)
    if (error) { console.error('blogService.delete error:', error.message); return false }
    triggerRevalidate()
    return true
  },

  async uploadCoverImage(file: File): Promise<string | null> {
    try {
      const fileName = `blog-${Date.now()}.${file.name.split('.').pop()}`
      const { error } = await supabase.storage.from('blog-images').upload(fileName, file, { upsert: true })
      if (error) return null
      return supabase.storage.from('blog-images').getPublicUrl(fileName).data.publicUrl
    } catch {
      return null
    }
  },
}
