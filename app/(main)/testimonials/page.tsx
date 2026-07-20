import type { Metadata } from 'next'
import { testimonialService } from '@/services/testimonialService'
import { TestimonialsClient } from '@/components/testimonials/TestimonialsClient'

export const metadata: Metadata = {
  title: 'Testimonials',
  description: 'What clients and collaborators say about working with Keyur Mistry.',
}

export const revalidate = 60

export default async function TestimonialsPage() {
  const testimonials = await testimonialService.getAll()
  return <TestimonialsClient testimonials={testimonials} />
}
