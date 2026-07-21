'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Code2, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/skills', label: 'Skills' },
  { href: '/experience', label: 'Experience' },
  { href: '/projects', label: 'Projects' },
  { href: '/certificates', label: 'Certs' },
  { href: '/testimonials', label: 'Reviews' },
  { href: '/blogs', label: 'Blog' },
  { href: '/guestbook', label: 'Guestbook' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    navLinks.forEach((link) => {
      router.prefetch(link.href)
    })
  }, [router])

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false)
    router.push(href)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 py-4 pointer-events-auto">
        <div className="container-custom">
          <div
            className={cn(
              'flex items-center justify-between px-5 py-2.5 rounded-2xl transition-all duration-300',
              isScrolled
                ? 'glass-strong border border-white/8 shadow-2xl shadow-black/60'
                : 'glass border border-white/5'
            )}
          >
            {/* Brand Logo — orange accent */}
            <Link
              href="/"
              prefetch={true}
              onClick={() => handleNavClick('/')}
              onMouseEnter={() => router.prefetch('/')}
              className="flex items-center gap-2.5 group cursor-pointer"
            >
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl group-hover:scale-105 transition-transform"
                style={{ background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)', boxShadow: '0 4px 14px hsl(var(--primary) / 0.3)' }}
              >
                <Code2 size={18} className="text-white" />
              </div>
              <span className="font-display font-bold text-lg tracking-tight">
                <span className="text-white font-extrabold">Keyur</span>
                <span style={{ color: 'hsl(var(--primary))' }}>.</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch={true}
                    onClick={() => handleNavClick(link.href)}
                    onMouseEnter={() => router.prefetch(link.href)}
                    onTouchStart={() => router.prefetch(link.href)}
                    className={cn(
                      'relative px-3.5 py-1.5 text-sm font-medium rounded-xl transition-colors duration-150 cursor-pointer select-none',
                      isActive
                        ? 'text-white font-semibold'
                        : 'text-slate-400 hover:text-white'
                    )}
                  >
                    {isActive && (
                      <span
                        className="absolute inset-0 rounded-xl pointer-events-none"
                        style={{ background: 'hsl(var(--primary) / 0.12)', border: '1px solid hsl(var(--primary) / 0.3)' }}
                      />
                    )}
                    <span className="relative z-10 pointer-events-none">{link.label}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Resume Button — orange */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="/resume"
                onMouseEnter={() => router.prefetch('/resume')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider hover:scale-105 transition-transform cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.9) 100%)',
                  color: '#000',
                  boxShadow: '0 4px 14px hsl(var(--primary) / 0.3)',
                  border: '1px solid hsl(var(--primary) / 0.3)',
                }}
              >
                <Zap size={13} fill="currentColor" />
                Resume
              </a>
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 rounded-xl glass text-white/80 hover:text-white"
              onClick={() => setIsMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="fixed top-20 left-4 right-4 z-40 glass-strong p-4 rounded-2xl border border-white/10 shadow-2xl md:hidden pointer-events-auto"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  onClick={() => handleNavClick(link.href)}
                  onTouchStart={() => router.prefetch(link.href)}
                  className={cn(
                    'block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer',
                    pathname === link.href
                      ? 'text-white font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  )}
                  style={pathname === link.href ? {
                    background: 'hsl(var(--primary) / 0.1)',
                    border: '1px solid hsl(var(--primary) / 0.25)',
                  } : {}}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 pt-2 border-t border-white/10">
                <a
                  href="/resume"
                  className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-center text-black cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.9) 100%)' }}
                  onClick={() => setIsMobileOpen(false)}
                >
                  Download Resume
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
