'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, FolderOpen, Code2, Briefcase, GraduationCap,
  Award, BookOpen, Quote, Mail, Settings, User, LogOut, ChevronRight, MessageSquare, X
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/projects', label: 'Projects', icon: FolderOpen },
  { href: '/admin/skills', label: 'Skills', icon: Code2 },
  { href: '/admin/experience', label: 'Experience', icon: Briefcase },
  { href: '/admin/education', label: 'Education', icon: GraduationCap },
  { href: '/admin/certificates', label: 'Certificates', icon: Award },
  { href: '/admin/blogs', label: 'Blogs', icon: BookOpen },
  { href: '/admin/testimonials', label: 'Testimonials', icon: Quote },
  { href: '/admin/messages', label: 'Messages', icon: Mail },
  { href: '/admin/guestbook', label: 'Guestbook', icon: MessageSquare },
  { href: '/admin/profile', label: 'Profile', icon: User },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

interface AdminSidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  // Pre-warm all admin sub-routes on mount for 0ms instant tab switching
  useEffect(() => {
    navItems.forEach((item) => {
      router.prefetch(item.href)
    })
  }, [router])

  const handleLogout = async () => {
    if (onClose) onClose()
    await supabase.auth.signOut()
    toast.success('Signed out')
    router.push('/admin/login')
  }

  const handleNavClick = (href: string) => {
    if (onClose) onClose()
    router.push(href)
  }

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-screen w-64 glass-strong border-r border-white/[0.08] flex flex-col z-50 overflow-y-auto transition-transform duration-300 ease-in-out md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo & Header */}
        <div className="p-5 border-b border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center shadow-md shadow-primary/20">
              <Code2 size={16} className="text-white" />
            </div>
            <div>
              <p className="font-display font-bold text-sm text-white">Keyur Mistry</p>
              <p className="text-xs text-primary/90 font-medium">Admin Panel</p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] md:hidden"
              aria-label="Close sidebar"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                onClick={() => handleNavClick(item.href)}
                onMouseEnter={() => router.prefetch(item.href)}
                onTouchStart={() => router.prefetch(item.href)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer select-none',
                  isActive
                    ? 'bg-primary/20 text-white border border-primary/40 font-semibold shadow-sm'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
                )}
              >
                <Icon size={16} className="pointer-events-none" />
                <span className="pointer-events-none">{item.label}</span>
                {isActive && <ChevronRight size={12} className="ml-auto text-primary pointer-events-none" />}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/[0.06]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400/80 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  )
}
