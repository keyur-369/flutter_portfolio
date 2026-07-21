'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Trash2, MessageSquare } from 'lucide-react'
import { toast } from 'sonner'
import { guestbookService } from '@/services/guestbookService'
import { formatDate } from '@/lib/utils'
import type { GuestbookEntry } from '@/types/database'

export default function AdminGuestbookPage() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setEntries(await guestbookService.getAll())
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this guestbook entry?')) return
    const ok = await guestbookService.deleteEntry(id)
    if (ok) {
      toast.success('Guestbook entry deleted')
      load()
    } else {
      toast.error('Failed to delete entry')
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 flex items-center gap-3">
        <MessageSquare className="text-primary w-8 h-8" />
        <div>
          <h1 className="font-display font-black text-3xl text-white mb-1">Guestbook</h1>
          <p className="text-white/50 text-sm">Manage public messages left on your portfolio</p>
        </div>
      </div>

      <div className="glass-card p-6">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : entries.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/40 text-sm">No guestbook entries yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-5 relative group transition-colors hover:border-primary/30"
              >
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="absolute top-4 right-4 p-2 rounded-xl glass text-red-400/60 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Delete Entry"
                >
                  <Trash2 size={16} />
                </button>
                <div className="flex items-start justify-between gap-2 mb-2 pr-12">
                  <div>
                    <p className="font-semibold text-white">{entry.name}</p>
                    {entry.email && (
                      <p className="text-xs text-primary/70">{entry.email}</p>
                    )}
                  </div>
                  <span className="text-xs text-white/40 bg-white/[0.03] px-2 py-1 rounded-md">
                    {formatDate(entry.created_at)}
                  </span>
                </div>
                <p className="text-sm text-white/70 whitespace-pre-wrap">{entry.message}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
