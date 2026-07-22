'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Menu, Code2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { AdminSidebar } from '@/components/admin/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)
  const [authed, setAuthed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Auth verification runs ONCE on initial load, NOT on every tab switch
  useEffect(() => {
    let isMounted = true

    if (pathname === '/admin/login') {
      setLoading(false)
      return
    }

    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!isMounted) return

      if (session) {
        setAuthed(true)
      } else {
        setAuthed(false)
        router.push('/admin/login')
      }
      setLoading(false)
    }

    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return
      if (session) {
        setAuthed(true)
      } else if (pathname !== '/admin/login') {
        setAuthed(false)
        router.push('/admin/login')
      }
      setLoading(false)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]) // Ran ONCE on mount, independent of pathname tab switching

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080811]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-9 h-9 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <span className="text-xs text-slate-400 font-medium">Verifying Admin Session...</span>
        </div>
      </div>
    )
  }

  if (!authed) return null

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#080811] text-slate-100">
      {/* Mobile Top Navigation Header */}
      <header className="md:hidden sticky top-0 z-30 glass-strong border-b border-white/[0.08] p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center shadow-md shadow-primary/20">
            <Code2 size={15} className="text-white" />
          </div>
          <div>
            <p className="font-display font-bold text-xs text-white">Keyur Mistry</p>
            <p className="text-[10px] text-primary font-medium">Admin Panel</p>
          </div>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-xl glass text-white/80 hover:text-white"
          aria-label="Toggle mobile menu"
        >
          <Menu size={20} />
        </button>
      </header>

      <AdminSidebar isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <main className="flex-1 ml-0 md:ml-64 p-4 sm:p-6 md:p-8 overflow-y-auto min-h-screen relative z-10">
        {children}
      </main>
    </div>
  )
}
