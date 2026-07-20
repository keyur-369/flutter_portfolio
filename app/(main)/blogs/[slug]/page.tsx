import { blogService } from '@/services/blogService'
import { notFound } from 'next/navigation'
import { BlogPostView } from '@/components/blogs/BlogPostView'

interface BlogPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { slug } = await params
  const blog = await blogService.getBySlug(slug)
  if (!blog) return { title: 'Post Not Found' }
  return { title: blog.title, description: blog.description }
}

export const revalidate = 60

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params
  const blog = await blogService.getBySlug(slug)
  if (!blog || !blog.published) notFound()
  return <BlogPostView blog={blog} />
}
