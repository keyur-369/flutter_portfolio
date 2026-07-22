'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Music, Radio, ExternalLink, Sparkles } from 'lucide-react'

interface SpotifyData {
  isPlaying: boolean
  title: string
  artist: string
  album: string
  albumImageUrl: string
  songUrl: string
  isFallback?: boolean
}

export function SpotifyWidget() {
  const [spotifyData, setSpotifyData] = useState<SpotifyData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/spotify')
      .then((res) => res.json())
      .then((data) => {
        setSpotifyData(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="glass-card p-5 sm:p-6 rounded-3xl border border-white/10 bg-white/[0.02] flex flex-col justify-between h-full relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-300">
      {/* Background ambient glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-emerald-500/10 blur-2xl group-hover:bg-emerald-500/20 transition-all" />

      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Radio size={16} className="animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1">
              Spotify <span className="text-[10px] text-emerald-400 font-normal">Now Playing</span>
            </h4>
            <p className="text-[11px] text-slate-400">Coding soundtrack</p>
          </div>
        </div>

        {/* Animated Equalizer Bars */}
        <div className="flex items-end gap-0.5 h-4">
          <motion.span
            animate={{ height: ['40%', '100%', '30%', '80%', '40%'] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
            className="w-1 bg-emerald-400 rounded-full"
          />
          <motion.span
            animate={{ height: ['80%', '30%', '100%', '40%', '80%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="w-1 bg-emerald-400 rounded-full"
          />
          <motion.span
            animate={{ height: ['30%', '90%', '40%', '100%', '30%'] }}
            transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
            className="w-1 bg-emerald-400 rounded-full"
          />
          <motion.span
            animate={{ height: ['70%', '40%', '80%', '20%', '70%'] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            className="w-1 bg-emerald-400 rounded-full"
          />
        </div>
      </div>

      {/* Track Details */}
      {loading ? (
        <div className="flex items-center gap-3 animate-pulse my-2">
          <div className="w-14 h-14 bg-slate-800 rounded-2xl" />
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-slate-800 rounded w-3/4" />
            <div className="h-3 bg-slate-800 rounded w-1/2" />
          </div>
        </div>
      ) : spotifyData ? (
        <div className="flex items-center gap-3.5 my-2 relative z-10">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border border-white/15 flex-shrink-0 group-hover:scale-105 transition-transform">
            <img
              src={spotifyData.albumImageUrl}
              alt={spotifyData.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="flex-1 min-w-0">
            <h5 className="text-sm font-bold text-white truncate group-hover:text-emerald-300 transition-colors">
              {spotifyData.title}
            </h5>
            <p className="text-xs text-slate-300 truncate mb-1">{spotifyData.artist}</p>
            <p className="text-[10px] text-slate-400 truncate flex items-center gap-1 font-mono">
              <Music size={10} className="text-emerald-400 flex-shrink-0" />
              {spotifyData.album}
            </p>
          </div>
        </div>
      ) : null}

      {/* Footer link */}
      {spotifyData?.songUrl && (
        <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs relative z-10">
          <span className="text-[10px] text-slate-400 flex items-center gap-1">
            <Sparkles size={10} className="text-emerald-400" /> Listen on Spotify
          </span>
          <a
            href={spotifyData.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1 transition-colors"
          >
            <span>Open Track</span>
            <ExternalLink size={12} />
          </a>
        </div>
      )}
    </div>
  )
}
