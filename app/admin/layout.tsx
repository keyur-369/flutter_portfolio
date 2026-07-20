'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { AdminSidebar } from '@/components/admin/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)
  const [authed, setAuthed] = useState(false)

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

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080811]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-9 h-9 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
          <span className="text-xs text-slate-400 font-medium">Verifying Admin Session...</span>
        </div>
      </div>
    )
  }

  if (!authed) return null

  return (
    <div className="min-h-screen flex bg-[#080811] text-slate-100">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8 overflow-y-auto min-h-screen relative z-10">
        {children}
      </main>
    </div>
  )
}
