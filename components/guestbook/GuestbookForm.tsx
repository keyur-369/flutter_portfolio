'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { toast } from 'sonner'
import { guestbookService } from '@/services/guestbookService'

export function GuestbookForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const message = formData.get('message') as string

    if (!name || !message) {
      toast.error('Name and message are required.')
      setIsSubmitting(false)
      return
    }

    try {
      const entry = await guestbookService.addEntry({ name, email, message })
      if (entry) {
        toast.success('Thanks for signing my guestbook!')
        // Ideally we would invalidate the router cache here or refresh the page
        // to show the new entry, but for a quick setup we'll just reload.
        window.location.reload()
      } else {
        toast.error('Failed to sign guestbook. Please try again.')
      }
    } catch (error) {
      toast.error('Something went wrong.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-4 mb-12 p-6 rounded-2xl border border-[rgba(255,255,255,0.05)] bg-[rgba(8,8,8,0.4)] backdrop-blur-md"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-white"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email (Optional)</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-white"
            placeholder="john@example.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Message *</label>
        <textarea
          id="message"
          name="message"
          required
          rows={3}
          className="w-full px-4 py-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-white resize-none"
          placeholder="Leave a message..."
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center justify-center w-full md:w-auto px-6 py-3 bg-gradient-to-r from-primary to-primary/80 hover:to-primary text-black font-semibold rounded-xl transition-all disabled:opacity-50"
      >
        {isSubmitting ? 'Signing...' : (
          <>
            <Send size={18} className="mr-2" />
            Sign Guestbook
          </>
        )}
      </button>
    </motion.form>
  )
}
