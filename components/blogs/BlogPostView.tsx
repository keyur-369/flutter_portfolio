'use client'

import Link from 'next/link'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { FadeIn } from '@/components/ui/FadeIn'
import { formatDate, estimateReadTime } from '@/lib/utils'
import type { Blog } from '@/types/database'

interface BlogPostViewProps {
  blog: Blog
}

export function BlogPostView({ blog }: BlogPostViewProps) {
  return (
    <section className="section py-24">
      <div className="container-custom max-w-3xl">
        <FadeIn>
          <Link href="/blogs" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-8">
            <ArrowLeft size={14} /> Back to Blog
          </Link>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex items-center gap-4 text-sm text-white/40 mb-6">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} /> {formatDate(blog.created_at)}
            </span>
            {blog.content && (
              <span className="flex items-center gap-1.5">
                <Clock size={12} /> {estimateReadTime(blog.content)}
              </span>
            )}
          </div>

          <h1 className="font-display font-black text-4xl md:text-5xl text-white mb-6 leading-tight">
            {blog.title}
          </h1>

          {blog.description && (
            <p className="text-white/60 text-xl leading-relaxed mb-10 pb-10 border-b border-white/[0.06]">
              {blog.description}
            </p>
          )}
        </FadeIn>

        {blog.content && (
          <FadeIn delay={0.2}>
            <article className="prose prose-invert prose-lg max-w-none
              prose-headings:font-display prose-headings:font-bold prose-headings:text-white
              prose-p:text-white/60 prose-p:leading-relaxed
              prose-strong:text-white prose-strong:font-semibold
              prose-code:text-indigo-300 prose-code:bg-indigo-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
              prose-pre:bg-white/[0.04] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl
              prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:text-indigo-300
              prose-blockquote:border-l-indigo-500 prose-blockquote:text-white/50
              prose-li:text-white/60
            ">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {blog.content}
              </ReactMarkdown>
            </article>
          </FadeIn>
        )}
      </div>
    </section>
  )
}
