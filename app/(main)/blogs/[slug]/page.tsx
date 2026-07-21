import { blogService } from '@/services/blogService'
import { notFound } from 'next/navigation'
import { BlogPostView } from '@/components/blogs/BlogPostView'
import type { Metadata } from 'next'

interface BlogPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params
  const blog = await blogService.getBySlug(slug)
  if (!blog) return { title: 'Post Not Found' }

  const ogUrl = `/api/og?type=blog&title=${encodeURIComponent(blog.title ?? '')}&subtitle=${encodeURIComponent(blog.description ?? '')}`

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title ?? undefined,
      description: blog.description ?? undefined,
      type: 'article',
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
          alt: blog.title ?? 'Blog Post',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title ?? undefined,
      description: blog.description ?? undefined,
      images: [ogUrl],
    },
  }
}

export const revalidate = 60

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params
  const blog = await blogService.getBySlug(slug)
  if (!blog || !blog.published) notFound()
  return <BlogPostView blog={blog} />
}
