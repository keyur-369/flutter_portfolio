import { supabase } from '@/lib/supabase'
import type { ContactMessage } from '@/types/database'

export const contactService = {
  async submit(message: Omit<ContactMessage, 'id' | 'created_at' | 'is_read'>): Promise<boolean> {
    const { error } = await supabase.from('contact_messages').insert({ ...message, is_read: false })
    if (error) { console.error(error); return false }
    return true
  },

  async getAll(): Promise<ContactMessage[]> {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) { console.error(error); return [] }
    return data ?? []
  },

  async getUnread(): Promise<ContactMessage[]> {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .eq('is_read', false)
      .order('created_at', { ascending: false })
    if (error) { console.error(error); return [] }
    return data ?? []
  },

  async markRead(id: string): Promise<boolean> {
    const { error } = await supabase.from('contact_messages').update({ is_read: true }).eq('id', id)
    if (error) { console.error(error); return false }
    return true
  },

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase.from('contact_messages').delete().eq('id', id)
    if (error) { console.error(error); return false }
    return true
  },

  async getCount(): Promise<{ total: number; unread: number }> {
    const { count: total } = await supabase.from('contact_messages').select('*', { count: 'exact', head: true })
    const { count: unread } = await supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('is_read', false)
    return { total: total ?? 0, unread: unread ?? 0 }
  },
}
