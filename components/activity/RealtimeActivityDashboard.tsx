'use client'

import { motion } from 'framer-motion'
import { Activity, Radio, Users } from 'lucide-react'
import { SpotifyWidget } from './SpotifyWidget'
import { WakaTimeWidget } from './WakaTimeWidget'
import { GithubActivityWidget } from './GithubActivityWidget'

export function RealtimeActivityDashboard() {
  return (
    <section className="py-12 relative text-white">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-10"
        >
          {/* Live Visitor Indicator Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-emerald-500/30 text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-3 shadow-lg shadow-emerald-500/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <Activity size={12} />
            <span>Developer Pulse & Live Integrations</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl text-white mb-3">
            Real-Time <span className="gradient-text">Activity Hub</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl">
            Live insights into my coding hours, current soundtrack, and GitHub commit stream.
          </p>
        </motion.div>

        {/* 3-Column Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <WakaTimeWidget />
          <SpotifyWidget />
          <GithubActivityWidget />
        </div>
      </div>
    </section>
  )
}
