'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Code, Flame, Sparkles } from 'lucide-react'

interface LanguageStat {
  name: string
  percent: number
  color?: string
}

interface WakaTimeData {
  totalHours: string
  dailyAverage: string
  languages: LanguageStat[]
  status: string
}

export function WakaTimeWidget() {
  const [wakaData, setWakaData] = useState<WakaTimeData | null>(null)

  useEffect(() => {
    fetch('/api/wakatime')
      .then((res) => res.json())
      .then((data) => setWakaData(data))
      .catch(() => {})
  }, [])

  const defaultLanguages: LanguageStat[] = [
    { name: 'Dart / Flutter', percent: 62, color: '#02569B' },
    { name: 'TypeScript', percent: 24, color: '#3178C6' },
    { name: 'Supabase / SQL', percent: 9, color: '#3ECF8E' },
    { name: 'HTML / CSS', percent: 5, color: '#E34F26' },
  ]

  const languages = wakaData?.languages || defaultLanguages

  return (
    <div className="glass-card p-5 sm:p-6 rounded-3xl border border-white/10 bg-white/[0.02] flex flex-col justify-between h-full relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-300">
      {/* Ambient glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-cyan-500/10 blur-2xl group-hover:bg-cyan-500/20 transition-all" />

      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Clock size={16} />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1">
              WakaTime <span className="text-[10px] text-cyan-400 font-normal">Coding Activity</span>
            </h4>
            <p className="text-[11px] text-slate-400">Weekly IDE metrics</p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
          <Flame size={12} />
          <span>7-Day Streak</span>
        </div>
      </div>

      {/* Weekly Totals */}
      <div className="grid grid-cols-2 gap-3 mb-4 relative z-10">
        <div className="bg-slate-950/60 p-3 rounded-2xl border border-white/10">
          <span className="text-[10px] text-slate-400 block font-medium">Coded This Week</span>
          <span className="text-lg font-black text-white gradient-text">
            {wakaData?.totalHours || '44 hrs 20 mins'}
          </span>
        </div>
        <div className="bg-slate-950/60 p-3 rounded-2xl border border-white/10">
          <span className="text-[10px] text-slate-400 block font-medium">Daily Average</span>
          <span className="text-lg font-black text-cyan-300">
            {wakaData?.dailyAverage || '6 hrs 20 mins'}
          </span>
        </div>
      </div>

      {/* Language Breakdown */}
      <div className="space-y-2 relative z-10">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
          <Code size={11} className="text-cyan-400" /> Language Distribution
        </span>
        <div className="space-y-2">
          {languages.map((lang) => (
            <div key={lang.name} className="space-y-1">
              <div className="flex justify-between text-xs font-medium text-slate-300">
                <span>{lang.name}</span>
                <span className="font-mono text-cyan-400">{lang.percent}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${lang.percent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-cyan-400"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
