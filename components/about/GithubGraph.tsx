'use client'

import { motion } from 'framer-motion'
import GitHubCalendar from 'react-github-calendar'
import { Github, Sparkles } from 'lucide-react'

interface GithubGraphProps {
  username?: string | null
}

export function GithubGraph({ username }: GithubGraphProps) {
  let gitUser = 'keyurmistry'
  if (username) {
    if (username.includes('github.com/')) {
      gitUser = username.split('github.com/')[1].replace('/', '')
    } else {
      gitUser = username
    }
  }

  return (
    <section className="py-16 relative text-white">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-emerald-500/30 text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-3">
            <Github size={12} />
            <span>Open Source & Commits</span>
          </div>

          <h2 className="font-syne font-black text-3xl sm:text-4xl text-white mb-3">
            GitHub <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Contribution Activity</span>
          </h2>
          
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mb-8">
            My public activity stream, code commits, and open-source contributions over the past year.
          </p>

          <div
            className="p-6 sm:p-8 rounded-3xl w-full max-w-5xl overflow-hidden overflow-x-auto flex justify-center glass border border-white/10 shadow-2xl"
            style={{
              background: 'rgba(8, 8, 12, 0.6)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <GitHubCalendar
              username={gitUser}
              colorScheme="dark"
              theme={{
                light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
              }}
              style={{ margin: '0 auto' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
