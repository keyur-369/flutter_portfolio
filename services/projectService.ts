import { supabase } from '@/lib/supabase'
import type { Project } from '@/types/database'
import { triggerRevalidate } from '@/lib/utils'

let projectsCache: { data: Project[]; timestamp: number } | null = null
const CACHE_TTL = 300000 // 5 minutes

export const projectService = {
  clearCache() {
    projectsCache = null
  },

  async getAll(): Promise<Project[]> {
    const now = Date.now()
    if (projectsCache && now - projectsCache.timestamp < CACHE_TTL) {
      return projectsCache.data
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('projectService.getAll error:', error.message)
        return projectsCache?.data ?? []
      }

      const result = data ?? []
      projectsCache = { data: result, timestamp: now }
      return result
    } catch {
      return projectsCache?.data ?? []
    }
  },

  async getFeatured(): Promise<Project[]> {
    const all = await this.getAll()
    return all.filter((p) => p.featured)
  },

  async getBySlug(slug: string): Promise<Project | null> {
    const all = await this.getAll()
    const found = all.find((p) => p.slug === slug)
    if (found) return found

    try {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .maybeSingle()
      return data
    } catch {
      return null
    }
  },

  async getById(id: string): Promise<Project | null> {
    const all = await this.getAll()
    const found = all.find((p) => p.id === id)
    if (found) return found

    try {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .maybeSingle()
      return data
    } catch {
      return null
    }
  },

  async search(query: string): Promise<Project[]> {
    const all = await this.getAll()
    const q = query.toLowerCase()
    return all.filter((p) => p.title?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q))
  },

  async create(project: Omit<Project, 'id' | 'created_at'>): Promise<{ data: Project | null; error: string | null }> {
    this.clearCache()
    const sanitized = {
      ...project,
      slug: project.slug || undefined,
      description: project.description || null,
      long_description: project.long_description || null,
      github_url: project.github_url || null,
      live_url: project.live_url || null,
      playstore_url: project.playstore_url || null,
      image: project.image || null,
    }

    const { data, error } = await supabase
      .from('projects')
      .insert(sanitized)
      .select()
      .maybeSingle()

    if (error) {
      console.error('projectService.create error:', error.message)
      return { data: null, error: error.message }
    }
    triggerRevalidate()
    return { data, error: null }
  },

  async update(id: string, updates: Partial<Project>): Promise<{ data: Project | null; error: string | null }> {
    this.clearCache()
    const sanitized = {
      ...updates,
      github_url: updates.github_url === '' ? null : updates.github_url,
      live_url: updates.live_url === '' ? null : updates.live_url,
      playstore_url: updates.playstore_url === '' ? null : updates.playstore_url,
    }

    const { data, error } = await supabase
      .from('projects')
      .update(sanitized)
      .eq('id', id)
      .select()
      .maybeSingle()

    if (error) {
      console.error('projectService.update error:', error.message)
      return { data: null, error: error.message }
    }
    triggerRevalidate()
    return { data, error: null }
  },

  async delete(id: string): Promise<boolean> {
    this.clearCache()
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) { console.error('projectService.delete error:', error.message); return false }
    triggerRevalidate()
    return true
  },

  async uploadImage(file: File): Promise<string | null> {
    try {
      const fileName = `project-${Date.now()}.${file.name.split('.').pop()}`
      const { error } = await supabase.storage.from('project-images').upload(fileName, file, { upsert: true })
      if (error) return null
      return supabase.storage.from('project-images').getPublicUrl(fileName).data.publicUrl
    } catch {
      return null
    }
  },

  async uploadGalleryImage(file: File): Promise<string | null> {
    try {
      const fileName = `gallery-${Date.now()}.${file.name.split('.').pop()}`
      const { error } = await supabase.storage.from('project-gallery').upload(fileName, file, { upsert: true })
      if (error) return null
      return supabase.storage.from('project-gallery').getPublicUrl(fileName).data.publicUrl
    } catch {
      return null
    }
  },

  async getPaginated(page: number, limit: number): Promise<{ data: Project[]; count: number }> {
    const all = await this.getAll()
    const from = (page - 1) * limit
    const to = from + limit
    return { data: all.slice(from, to), count: all.length }
  },
}
