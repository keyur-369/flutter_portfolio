'use client'

import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, Copy, Check } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { FadeIn } from '@/components/ui/FadeIn'
import { formatDate, estimateReadTime } from '@/lib/utils'
import type { Blog } from '@/types/database'
import { useState, useCallback } from 'react'

interface BlogPostViewProps {
  blog: Blog
}

// ── Copy-to-Clipboard Code Block ────────────────────────────────────────────
function CodeBlock({ language, children }: { language: string; children: string }) {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(() => {
    navigator.clipboard.writeText(children).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [children])

  return (
    <div className="relative group/code my-6 rounded-xl overflow-hidden border border-white/10">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/[0.04] border-b border-white/[0.06]">
        <span className="text-xs font-mono text-white/30 uppercase tracking-widest">
          {language || 'code'}
        </span>
        <button
          onClick={copy}
          aria-label="Copy code"
          className="flex items-center gap-1.5 text-xs text-white/30 hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-primary/10"
        >
          {copied ? (
            <>
              <Check size={12} className="text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        style={atomDark}
        language={language}
        PreTag="div"
        customStyle={{
          margin: 0,
          borderRadius: 0,
          background: 'rgba(5, 5, 5, 0.8)',
          padding: '1.25rem 1.5rem',
          fontSize: '0.875rem',
          lineHeight: '1.7',
        }}
        codeTagProps={{ style: { fontFamily: 'var(--font-jetbrains, monospace)' } }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  )
}

// ── Main Component ───────────────────────────────────────────────────────────
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
            <article
              className="
                prose prose-invert prose-lg max-w-none
                prose-headings:font-display prose-headings:font-bold prose-headings:text-white prose-headings:scroll-mt-24
                prose-h2:text-2xl prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-3
                prose-h3:text-xl
                prose-p:text-white/65 prose-p:leading-[1.9]
                prose-strong:text-white prose-strong:font-semibold
                prose-em:text-white/70
                prose-code:text-orange-400 prose-code:bg-orange-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
                prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-none
                prose-a:text-primary prose-a:no-underline prose-a:font-medium hover:prose-a:underline
                prose-blockquote:border-l-4 prose-blockquote:border-primary/60 prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-white/60
                prose-li:text-white/65 prose-li:marker:text-primary/70
                prose-table:border prose-table:border-white/10 prose-thead:bg-white/5
                prose-th:text-white prose-th:font-semibold prose-th:px-4 prose-th:py-3 prose-th:border prose-th:border-white/10
                prose-td:px-4 prose-td:py-3 prose-td:border prose-td:border-white/[0.06] prose-td:text-white/60
                prose-hr:border-white/10
                prose-img:rounded-xl prose-img:border prose-img:border-white/10
              "
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  // ── Code blocks (fenced) ─────────────────────────────────
                  code(props) {
                    const { children, className } = props
                    const match = /language-(\w+)/.exec(className || '')
                    // Check if we're inside a <pre> tag (block code) by checking className
                    const isBlock = Boolean(match)

                    if (isBlock && match) {
                      return (
                        <CodeBlock language={match[1]}>
                          {String(children).replace(/\n$/, '')}
                        </CodeBlock>
                      )
                    }

                    // Inline code
                    return (
                      <code className={className}>
                        {children}
                      </code>
                    )
                  },
                  // ── Pre wrapper — let CodeBlock handle its own wrapper ───
                  pre(props) {
                    return <>{props.children}</>
                  },
                  // ── Images — add loading="lazy" ──────────────────────────
                  img(props) {
                    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
                    return <img {...props} loading="lazy" className="rounded-xl border border-white/10 w-full" />
                  },
                }}
              >
                {blog.content}
              </ReactMarkdown>
            </article>
          </FadeIn>
        )}
      </div>
    </section>
  )
}
