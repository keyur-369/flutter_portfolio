import type { Metadata } from 'next'
import { profileService } from '@/services/profileService'
import { educationService } from '@/services/educationService'
import { experienceService } from '@/services/experienceService'
import { skillsService } from '@/services/skillsService'
import { projectService } from '@/services/projectService'
import { certificateService } from '@/services/certificateService'
import { AboutHero } from '@/components/about/AboutHero'
import { EducationTimeline } from '@/components/about/EducationTimeline'
import { ExperienceTimeline } from '@/components/about/ExperienceTimeline'
import { AboutStats } from '@/components/about/AboutStats'
import { GithubGraph } from '@/components/about/GithubGraph'

export const metadata: Metadata = {
  title: 'About | Keyur Mistry',
  description: 'Learn about Keyur Mistry — Flutter Developer, his career journey, technical skills, education, and milestones.',
}

export const revalidate = 3600

export default async function AboutPage() {
  const [profile, education, experience, skills, projects, certs] = await Promise.all([
    profileService.get(),
    educationService.getAll(),
    experienceService.getAll(),
    skillsService.getAll(),
    projectService.getAll(),
    certificateService.getAll(),
  ])

  return (
    <div className="min-h-screen pt-4 pb-16">
      <AboutHero profile={profile} />
      <AboutStats
        eduCount={education.length}
        expCount={experience.length > 0 ? 1 : 0}
        skillsCount={skills.length}
        projectsCount={projects.length}
        certsCount={certs.length}
      />
      <ExperienceTimeline experience={experience} />
      <EducationTimeline education={education} />
      <GithubGraph username={profile?.github} />
    </div>
  )
}
