import type { Metadata } from 'next'
import { blogService } from '@/services/blogService'
import { BlogsClient } from '@/components/blogs/BlogsClient'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Flutter tips, mobile development insights, and full-stack tutorials by Keyur Mistry.',
}

export const revalidate = 3600

export default async function BlogsPage() {
  const blogs = await blogService.getAll(true)
  return <BlogsClient blogs={blogs} />
}
