'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Star, GitCommit, GitFork, ExternalLink } from 'lucide-react'

interface CommitEvent {
  repo: string
  message: string
  date: string
}

interface GithubStats {
  username: string
  publicRepos: number
  followers: number
  totalStars: number
  totalForks: number
  recentCommits: CommitEvent[]
}

export function GithubActivityWidget() {
  const [stats, setStats] = useState<GithubStats | null>(null)

  useEffect(() => {
    fetch('/api/github-stats')
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => {})
  }, [])

  return (
    <div className="glass-card p-5 sm:p-6 rounded-3xl border border-white/10 bg-white/[0.02] flex flex-col justify-between h-full relative overflow-hidden group hover:border-purple-500/30 transition-all duration-300">
      {/* Ambient glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-purple-500/10 blur-2xl group-hover:bg-purple-500/20 transition-all" />

      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Github size={16} />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1">
              GitHub <span className="text-[10px] text-purple-400 font-normal">Live Activity</span>
            </h4>
            <p className="text-[11px] text-slate-400">@keyur-369</p>
          </div>
        </div>

        <a
          href="https://github.com/keyur-369"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-purple-400 hover:text-purple-300 font-semibold inline-flex items-center gap-1"
        >
          <span>Profile</span>
          <ExternalLink size={12} />
        </a>
      </div>

      {/* Stats Counter Row */}
      <div className="grid grid-cols-3 gap-2 mb-4 relative z-10 text-center">
        <div className="bg-slate-950/60 p-2.5 rounded-2xl border border-white/10">
          <Star size={14} className="text-amber-400 mx-auto mb-1" />
          <span className="text-base font-extrabold text-white block">
            {stats?.totalStars ?? 28}
          </span>
          <span className="text-[9px] text-slate-400 uppercase font-semibold">Stars</span>
        </div>
        <div className="bg-slate-950/60 p-2.5 rounded-2xl border border-white/10">
          <Github size={14} className="text-purple-400 mx-auto mb-1" />
          <span className="text-base font-extrabold text-white block">
            {stats?.publicRepos ?? 22}
          </span>
          <span className="text-[9px] text-slate-400 uppercase font-semibold">Repos</span>
        </div>
        <div className="bg-slate-950/60 p-2.5 rounded-2xl border border-white/10">
          <GitFork size={14} className="text-cyan-400 mx-auto mb-1" />
          <span className="text-base font-extrabold text-white block">
            {stats?.totalForks ?? 12}
          </span>
          <span className="text-[9px] text-slate-400 uppercase font-semibold">Forks</span>
        </div>
      </div>

      {/* Recent Commits Feed */}
      <div className="space-y-2 relative z-10 flex-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
          <GitCommit size={11} className="text-purple-400" /> Recent Commit Stream
        </span>
        <div className="space-y-2">
          {(stats?.recentCommits ?? []).slice(0, 3).map((commit, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-2 text-xs hover:border-purple-500/20 transition-all"
            >
              <GitCommit size={13} className="text-purple-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="font-mono text-[10px] text-cyan-300 block truncate">
                  {commit.repo}
                </span>
                <p className="text-slate-300 text-[11px] truncate">{commit.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
