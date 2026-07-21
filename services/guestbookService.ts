import { supabase } from '@/lib/supabase'
import type { GuestbookEntry } from '@/types/database'

export const guestbookService = {
  async getAll(): Promise<GuestbookEntry[]> {
    try {
      const { data, error } = await supabase
        .from('guestbook_entries')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Supabase error fetching guestbook entries:', error)
        return []
      }
      return data || []
    } catch (error) {
      console.error('Error fetching guestbook entries:', error)
      return []
    }
  },

  async addEntry(entry: Omit<GuestbookEntry, 'id' | 'created_at'>): Promise<GuestbookEntry | null> {
    try {
      const { data, error } = await supabase
        .from('guestbook_entries')
        .insert([entry])
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error adding guestbook entry:', error)
      return null
    }
  },

  async deleteEntry(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('guestbook_entries')
        .delete()
        .eq('id', id)

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error deleting guestbook entry:', error)
      return false
    }
  }
}
