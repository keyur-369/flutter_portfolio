import { supabase } from '@/lib/supabase'
import type { Visitor } from '@/types/database'

export const visitorService = {
  async log(visitor: Omit<Visitor, 'id' | 'visited_at'>): Promise<boolean> {
    const { error } = await supabase.from('visitors').insert(visitor)
    if (error) { console.error(error); return false }
    return true
  },

  async getAll(): Promise<Visitor[]> {
    const { data, error } = await supabase
      .from('visitors')
      .select('*')
      .order('visited_at', { ascending: false })
      .limit(1000)
    if (error) { console.error(error); return [] }
    return data ?? []
  },

  async getCount(): Promise<number> {
    const { count, error } = await supabase
      .from('visitors')
      .select('*', { count: 'exact', head: true })
    if (error) { console.error(error); return 0 }
    return count ?? 0
  },

  async getByCountry(): Promise<{ country: string; count: number }[]> {
    const { data, error } = await supabase
      .from('visitors')
      .select('country')
    if (error) { console.error(error); return [] }
    const grouped = (data ?? []).reduce((acc, v) => {
      const c = v.country ?? 'Unknown'
      acc[c] = (acc[c] ?? 0) + 1
      return acc
    }, {} as Record<string, number>)
    return Object.entries(grouped).map(([country, count]) => ({ country, count })).sort((a, b) => b.count - a.count)
  },

  async getRecentDays(days: number): Promise<{ date: string; count: number }[]> {
    const since = new Date()
    since.setDate(since.getDate() - days)
    const { data, error } = await supabase
      .from('visitors')
      .select('visited_at')
      .gte('visited_at', since.toISOString())
    if (error) { console.error(error); return [] }
    const grouped = (data ?? []).reduce((acc, v) => {
      if (!v.visited_at) return acc
      const date = new Date(v.visited_at).toLocaleDateString()
      acc[date] = (acc[date] ?? 0) + 1
      return acc
    }, {} as Record<string, number>)
    return Object.entries(grouped).map(([date, count]) => ({ date, count }))
  },
}
