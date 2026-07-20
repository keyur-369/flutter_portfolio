'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Code2, ArrowUp } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Skills', href: '/skills' },
  { label: 'Experience', href: '/experience' },
  { label: 'Contact', href: '/contact' },
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative z-10 mt-32 border-t border-white/[0.06]" style={{ background: 'rgba(4,4,4,0.97)', backdropFilter: 'blur(24px)' }}>
      {/* Ambient glow line — orange */}
      <div className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(to right, transparent, rgba(254,127,45,0.4), rgba(35,61,77,0.3), transparent)' }} />

      <div className="container-custom pt-16 pb-12">
        <FadeIn>
          {/* Top Row: Brand & Social */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-12 border-b border-white/[0.06] text-center lg:text-left">
            <div className="space-y-3">
              <Link href="/" className="inline-flex items-center gap-3.5 group">
                <div className="flex items-center justify-center w-10 h-10 rounded-2xl group-hover:scale-105 transition-transform duration-300"
                  style={{ background: 'linear-gradient(135deg, #FE7F2D 0%, #233D4D 100%)', boxShadow: '0 4px 16px rgba(254,127,45,0.25)' }}
                >
                  <Code2 size={20} className="text-white" />
                </div>
                <span className="font-display font-black text-2xl tracking-tight text-white flex items-center gap-1.5">
                  Keyur <span style={{ color: '#FE7F2D' }}>Mistry</span>
                </span>
              </Link>
              <p className="text-slate-500 text-sm font-normal leading-relaxed max-w-xl">
                Flutter & Full Stack Developer crafting performant, beautiful cross-platform applications.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2 lg:pt-0">
              {[
                { icon: Github, href: 'https://github.com/keyurmistry', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com/in/keyurmistry', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:keyurmistry@email.com', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200"
                  style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: 'rgba(234,236,240,0.5)' }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Bottom Row */}
        <FadeIn delay={0.1}>
          <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <nav aria-label="Footer Navigation">
              <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-sm font-medium">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      prefetch={true}
                      className="text-slate-500 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-6">
              <p className="text-xs text-slate-600 font-medium">
                © {new Date().getFullYear()} Keyur Mistry. All rights reserved.
              </p>

              <motion.button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200"
                style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: 'rgba(234,236,240,0.5)' }}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Scroll to top"
              >
                <span>Back to top</span>
                <ArrowUp size={13} style={{ color: '#FE7F2D' }} />
              </motion.button>
            </div>
          </div>
        </FadeIn>
      </div>
    </footer>
  )
}
