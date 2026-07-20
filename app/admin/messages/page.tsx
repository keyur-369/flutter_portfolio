'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit, Trash2, X, Save, CheckCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { contactService } from '@/services/contactService'
import { formatDate } from '@/lib/utils'
import type { ContactMessage } from '@/types/database'

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<ContactMessage | null>(null)

  const load = async () => { setMessages(await contactService.getAll()); setLoading(false) }
  useEffect(() => { load() }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return
    const ok = await contactService.delete(id)
    if (ok) { toast.success('Deleted'); if (selected?.id === id) setSelected(null); load() }
    else toast.error('Failed')
  }

  const handleMarkRead = async (msg: ContactMessage) => {
    await contactService.markRead(msg.id)
    load()
    if (selected?.id === msg.id) setSelected({ ...msg, is_read: true })
  }

  const unread = messages.filter((m) => !m.is_read).length

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display font-black text-3xl text-white mb-1">Messages</h1>
        <p className="text-white/50 text-sm">{messages.length} total · {unread} unread</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* List */}
        <div className="lg:col-span-2 space-y-2">
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <div className="w-6 h-6 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-12 glass-card">
              <p className="text-white/40 text-sm">No messages yet</p>
            </div>
          ) : (
            messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => { setSelected(msg); if (!msg.is_read) handleMarkRead(msg) }}
                className={`glass-card p-4 cursor-pointer transition-all hover:border-indigo-500/30 ${selected?.id === msg.id ? 'border-indigo-500/50 bg-indigo-500/5' : ''}`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="font-semibold text-sm text-white">{msg.name}</p>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {!msg.is_read && <span className="w-2 h-2 rounded-full bg-blue-400" />}
                    <span className="text-xs text-white/30">{formatDate(msg.created_at)}</span>
                  </div>
                </div>
                <p className="text-xs text-white/50 truncate">{msg.subject}</p>
                <p className="text-xs text-white/35 truncate mt-1">{msg.message}</p>
              </motion.div>
            ))
          )}
        </div>

        {/* Detail */}
        <div className="lg:col-span-3">
          {selected ? (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="font-bold text-xl text-white mb-1">{selected.name}</h3>
                  <a href={`mailto:${selected.email}`} className="text-indigo-400 text-sm hover:text-indigo-300">{selected.email}</a>
                </div>
                <div className="flex gap-2">
                  {!selected.is_read && (
                    <button onClick={() => handleMarkRead(selected)} className="flex items-center gap-1 px-3 py-1.5 rounded-xl glass text-green-400 text-xs font-medium">
                      <CheckCircle size={12} /> Mark Read
                    </button>
                  )}
                  <button onClick={() => handleDelete(selected.id)} className="p-2 rounded-xl glass text-red-400/60 hover:text-red-400">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="mb-4 pb-4 border-b border-white/[0.06]">
                <p className="text-xs text-white/40 mb-1">Subject</p>
                <p className="text-white font-medium">{selected.subject}</p>
              </div>
              <div className="mb-6">
                <p className="text-xs text-white/40 mb-2">Message</p>
                <p className="text-white/70 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              </div>
              <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`} className="btn-primary text-sm">
                Reply via Email
              </a>
            </motion.div>
          ) : (
            <div className="glass-card p-12 text-center h-full flex items-center justify-center">
              <p className="text-white/30">Select a message to view</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
