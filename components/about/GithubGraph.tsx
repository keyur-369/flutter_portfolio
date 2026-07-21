'use client'

import { motion } from 'framer-motion'
import GitHubCalendar from 'react-github-calendar'

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
    <section className="py-20 relative">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                GitHub Contributions
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              My daily activity and open-source contributions over the last year.
            </p>
          </div>

          <div 
            className="p-6 md:p-8 rounded-2xl w-full max-w-5xl overflow-hidden overflow-x-auto flex justify-center"
            style={{ 
              background: 'rgba(8, 8, 8, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(12px)'
            }}
          >
            <GitHubCalendar 
              username={gitUser} 
              colorScheme="dark"
              theme={{
                light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
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
