'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { BookOpen, Search, Calendar, ArrowRight, Clock } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'
import { TiltCard } from '@/components/ui/TiltCard'
import { formatDate, estimateReadTime } from '@/lib/utils'
import type { Blog } from '@/types/database'

const BLOG_GRADIENTS = [
  'from-blue-500/20 to-indigo-500/20',
  'from-violet-500/20 to-purple-500/20',
  'from-pink-500/20 to-rose-500/20',
]

interface BlogsClientProps {
  blogs: Blog[]
}

export function BlogsClient({ blogs }: BlogsClientProps) {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search) return blogs
    return blogs.filter((b) =>
      (b.title ?? '').toLowerCase().includes(search.toLowerCase()) ||
      (b.description ?? '').toLowerCase().includes(search.toLowerCase())
    )
  }, [blogs, search])

  return (
    <section className="section py-24">
      <div className="container-custom">
        <FadeIn className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-blue-500/30 text-xs font-semibold text-blue-300 uppercase tracking-widest mb-4">
            <BookOpen size={10} />
            Blog
          </div>
          <h1 className="section-title text-white mb-4">
            Thoughts & <span className="gradient-text">Insights</span>
          </h1>
          <p className="section-subtitle mx-auto">
            Articles and insights fetched live from Supabase database.
          </p>
        </FadeIn>

        {blogs.length > 0 && (
          <FadeIn delay={0.2} className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-glass pl-11 w-full"
              />
            </div>
          </FadeIn>
        )}

        {blogs.length === 0 ? (
          <div className="glass-card p-12 text-center max-w-md mx-auto">
            <BookOpen size={36} className="text-indigo-400 mx-auto mb-3 opacity-60" />
            <p className="text-slate-400 text-sm">No articles published yet.</p>
            <p className="text-slate-500 text-xs mt-1">Publish articles from your Admin Panel to render them here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((blog, i) => (
              <FadeIn key={blog.id} delay={i * 0.1}>
                <TiltCard className="h-full">
                  <Link href={`/blogs/${blog.slug}`} className="block h-full">
                    <div className="glass-card h-full flex flex-col overflow-hidden group">
                      {/* Cover */}
                      <div className={`aspect-video bg-gradient-to-br ${BLOG_GRADIENTS[i % BLOG_GRADIENTS.length]} flex items-center justify-center border-b border-white/[0.06] text-4xl`}>
                        {blog.cover_image ? (
                          <img src={blog.cover_image} alt={blog.title ?? ''} className="w-full h-full object-cover" />
                        ) : (
                          ['✍️', '🔥', '⚡'][i % 3]
                        )}
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar size={10} /> {formatDate(blog.created_at)}
                          </span>
                          {blog.content && (
                            <span className="flex items-center gap-1">
                              <Clock size={10} /> {estimateReadTime(blog.content)}
                            </span>
                          )}
                        </div>

                        <h2 className="font-display font-bold text-lg text-white mb-3 leading-tight group-hover:gradient-text transition-all flex-1">
                          {blog.title}
                        </h2>
                        <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                          {blog.description}
                        </p>

                        <span className="flex items-center gap-1.5 text-sm font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors mt-auto">
                          Read Article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
