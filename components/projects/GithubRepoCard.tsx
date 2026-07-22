'use client'

import { motion } from 'framer-motion'
import { Github, Star, GitFork, AlertCircle, ExternalLink, Code2 } from 'lucide-react'

export interface GithubRepoCardData {
  title?: string
  raw_name?: string
  description?: string
  tech_stack?: string[]
  github_url: string
  live_url?: string
  image?: string
  stars?: number
  forks?: number
  issues?: number
  watchers?: number
  owner?: string
  owner_avatar?: string
  language?: string
}

interface GithubRepoCardProps {
  data: GithubRepoCardData
  className?: string
  showOgBanner?: boolean
}

export function GithubRepoCard({ data, className = '' }: GithubRepoCardProps) {
  const owner = data.owner || 'keyur-369'
  const repoName = data.raw_name || data.title?.toLowerCase().replace(/\s+/g, '_') || 'repository'
  const avatarUrl = data.owner_avatar || `https://github.com/${owner}.png`

  return (
    <motion.a
      href={data.github_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      className={`group block relative overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-xl transition-all hover:border-purple-500/50 hover:shadow-2xl font-sans ${className}`}
    >
      <div className="p-6 sm:p-7 space-y-6">
        {/* Header: Owner / Repo Name & Avatar Photo */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="text-sm sm:text-base font-medium text-slate-500 font-mono mb-0.5">
              {owner}/
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight truncate font-display group-hover:text-purple-600 transition-colors">
              {repoName}
            </h3>
          </div>

          <div className="relative flex-shrink-0">
            <img
              src={avatarUrl}
              alt={owner}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-slate-200 shadow-md group-hover:border-purple-400 transition-colors"
            />
          </div>
        </div>

        {/* Description snippet if available */}
        {data.description && (
          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed font-normal">
            {data.description}
          </p>
        )}

        {/* Stats Row & GitHub Logo */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-5 sm:gap-8 font-mono text-xs">
            <div className="flex flex-col items-center">
              <span className="font-bold text-slate-900 text-base sm:text-lg">1</span>
              <span className="text-[10px] sm:text-xs text-slate-400 font-sans">Contributor</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-slate-900 text-base sm:text-lg">{data.issues ?? 0}</span>
              <span className="text-[10px] sm:text-xs text-slate-400 font-sans flex items-center gap-0.5">
                <AlertCircle size={10} className="text-emerald-500" /> Issues
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-slate-900 text-base sm:text-lg">{data.stars ?? 0}</span>
              <span className="text-[10px] sm:text-xs text-slate-400 font-sans flex items-center gap-0.5">
                <Star size={10} className="text-amber-500 fill-amber-400" /> Stars
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-slate-900 text-base sm:text-lg">{data.forks ?? 0}</span>
              <span className="text-[10px] sm:text-xs text-slate-400 font-sans flex items-center gap-0.5">
                <GitFork size={10} className="text-blue-500" /> Forks
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-purple-600 font-semibold group-hover:underline hidden sm:inline flex items-center gap-1">
              View on GitHub <ExternalLink size={11} />
            </span>
            <Github size={28} className="text-slate-800 group-hover:text-purple-600 transition-colors flex-shrink-0" />
          </div>
        </div>
      </div>

      {/* Signature Multi-Color GitHub Accent Line */}
      <div className="h-1.5 w-full flex">
        <div className="h-full bg-[#00c7b7] w-2/5" />
        <div className="h-full bg-[#ea4c89] w-1/5" />
        <div className="h-full bg-[#f44336] w-1/5" />
        <div className="h-full bg-[#ffb74d] w-1/5" />
      </div>
    </motion.a>
  )
}
