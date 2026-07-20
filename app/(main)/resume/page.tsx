import type { Metadata } from 'next'
import { profileService } from '@/services/profileService'
import { ResumeViewer } from '@/components/resume/ResumeViewer'

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Download Keyur Mistry\'s resume — Flutter Developer with experience in Firebase, Supabase, and REST APIs.',
}

export default async function ResumePage() {
  const profile = await profileService.get()
  return <ResumeViewer resumeUrl={profile?.resume_url ?? null} profile={profile} />
}
