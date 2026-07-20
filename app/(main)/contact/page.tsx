import type { Metadata } from 'next'
import { ContactForm } from '@/components/contact/ContactForm'
import { profileService } from '@/services/profileService'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Keyur Mistry — available for freelance projects and full-time opportunities.',
}

export default async function ContactPage() {
  const profile = await profileService.get()
  return <ContactForm profile={profile} />
}
