import { NextResponse } from 'next/server'
import { blogService } from '@/services/blogService'
import { testimonialService } from '@/services/testimonialService'
import { slugify } from '@/lib/utils'

export async function GET() {
  try {
    // 1. Add a dummy blog post
    const blogTitle = 'My First Blog Post: Building with Next.js & Supabase'
    await blogService.create({
      title: blogTitle,
      slug: slugify(blogTitle),
      description: 'A quick overview of my journey building this portfolio website using Next.js and Supabase.',
      content: `## Hello World!

Welcome to my first blog post. 

I've built this portfolio to showcase my work, share my thoughts on software development, and provide a place where potential clients or employers can learn more about me.

### Why this stack?
- **Next.js**: Great for performance and SEO.
- **Supabase**: An awesome open-source Firebase alternative.
- **Tailwind CSS**: For beautiful, rapid styling.

Stay tuned for more updates and deeper technical articles in the future!`,
      published: true,
      cover_image: null,
    })

    // 2. Add a dummy testimonial
    await testimonialService.create({
      client_name: 'Jane Doe',
      designation: 'CTO',
      company: 'Tech Solutions Inc.',
      review: 'Keyur is an exceptional developer. He delivered our cross-platform Flutter app ahead of schedule and the code quality was top notch. Highly recommended for any complex mobile or web projects!',
    })

    return NextResponse.json({ success: true, message: 'Dummy data seeded successfully!' })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
