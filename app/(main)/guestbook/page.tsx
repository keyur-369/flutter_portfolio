import type { Metadata } from 'next'
import { guestbookService } from '@/services/guestbookService'
import { GuestbookForm } from '@/components/guestbook/GuestbookForm'
import { User, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Guestbook',
  description: 'Leave a message for Keyur Mistry.',
}

// Disable caching for this route so entries show up immediately
export const dynamic = 'force-dynamic'

export default async function GuestbookPage() {
  const entries = await guestbookService.getAll()

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container-custom max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Guestbook
            </span>
          </h1>
          <p className="text-gray-400">
            Leave a message for future visitors.
          </p>
        </div>

        <GuestbookForm />

        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <User className="mr-2 h-5 w-5 text-primary" />
            Previous Messages ({entries.length})
          </h3>
          
          {entries.length === 0 ? (
            <p className="text-gray-500 text-center py-12 border border-[rgba(255,255,255,0.05)] rounded-2xl border-dashed">
              No entries yet. Be the first to sign!
            </p>
          ) : (
            entries.map((entry) => (
              <div 
                key={entry.id} 
                className="p-6 rounded-2xl border border-[rgba(255,255,255,0.05)] bg-[rgba(8,8,8,0.2)] backdrop-blur-sm transition-colors hover:bg-[rgba(8,8,8,0.4)]"
              >
                <p className="text-gray-200 mb-4 whitespace-pre-wrap">{entry.message}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-300">{entry.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <Calendar size={12} />
                    {entry.created_at ? new Date(entry.created_at).toLocaleDateString() : 'Unknown date'}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
