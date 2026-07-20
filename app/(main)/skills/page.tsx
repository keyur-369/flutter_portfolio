import type { Metadata } from 'next'
import { skillsService } from '@/services/skillsService'
import { SkillsGrid } from '@/components/skills/SkillsGrid'

export const metadata: Metadata = {
  title: 'Skills',
  description: 'Flutter, Dart, Firebase, Supabase, REST APIs — explore Keyur Mistry\'s complete technology stack.',
}

export const revalidate = 3600

export default async function SkillsPage() {
  const groupedSkills = await skillsService.getGrouped()
  return <SkillsGrid groupedSkills={groupedSkills} />
}
