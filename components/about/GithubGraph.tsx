'use client'

import { motion } from 'framer-motion'
import GitHubCalendar from 'react-github-calendar'
import { Github } from 'lucide-react'
import { RealtimeActivityDashboard } from '@/components/activity/RealtimeActivityDashboard'

interface GithubGraphProps {
  username?: string | null
}

export function GithubGraph({ username }: GithubGraphProps) {
  let gitUser = 'keyur-369'
  if (username) {
    if (username.includes('github.com/')) {
      gitUser = username.split('github.com/')[1].replace('/', '')
    } else {
      gitUser = username
    }
  }

  return (
    <div className="space-y-6">
      {/* Real-Time Developer Activity Hub */}
      <RealtimeActivityDashboard />

      {/* GitHub Contribution Heatmap */}
      <section className="py-12 relative text-white">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-purple-500/30 text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">
              <Github size={12} />
              <span>Yearly Contribution Matrix</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-4xl text-white mb-3">
              GitHub <span className="gradient-text">Heatmap</span>
            </h2>

            <p className="text-slate-400 text-sm sm:text-base max-w-xl mb-8">
              Public code contributions and open-source commit history over the past 365 days.
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
    </div>
  )
}
