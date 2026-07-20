'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, FolderOpen, Code2, Briefcase, GraduationCap,
  Award, BookOpen, Quote, Mail, Settings, User, LogOut, ChevronRight,
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
  { href: '/admin/profile', label: 'Profile', icon: User },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  // Pre-warm all admin sub-routes on mount for 0ms instant tab switching
  useEffect(() => {
    navItems.forEach((item) => {
      router.prefetch(item.href)
    })
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    toast.success('Signed out')
    router.push('/admin/login')
  }

  const handleNavClick = (href: string) => {
    router.push(href)
  }

  return (
    <div className="fixed left-0 top-0 h-screen w-64 glass-strong border-r border-white/[0.08] flex flex-col z-40 overflow-y-auto">
      {/* Logo */}
      <div className="p-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-500/20">
            <Code2 size={16} className="text-white" />
          </div>
          <div>
            <p className="font-display font-bold text-sm text-white">Keyur Mistry</p>
            <p className="text-xs text-indigo-400 font-medium">Admin Panel</p>
          </div>
        </div>
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
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-semibold shadow-sm'
                  : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
              )}
            >
              <Icon size={16} className="pointer-events-none" />
              <span className="pointer-events-none">{item.label}</span>
              {isActive && <ChevronRight size={12} className="ml-auto text-indigo-400 pointer-events-none" />}
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
    </div>
  )
}
