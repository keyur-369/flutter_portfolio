import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { StatsSection } from '@/components/home/StatsSection'
import { FeaturedProjects } from '@/components/home/FeaturedProjects'
import { TechStack } from '@/components/home/TechStack'
import { CallToAction } from '@/components/home/CallToAction'
import { profileService } from '@/services/profileService'
import { projectService } from '@/services/projectService'
import { skillsService } from '@/services/skillsService'
import { certificateService } from '@/services/certificateService'
import { experienceService } from '@/services/experienceService'
import { testimonialService } from '@/services/testimonialService'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'

export const metadata: Metadata = {
  title: 'Keyur Mistry — Flutter & Full Stack Developer',
  description:
    'Flutter Developer with practical experience developing cross-platform applications using Flutter, Firebase and Supabase.',
}

export const revalidate = 3600

export default async function HomePage() {
  const [profile, featuredProjects, skills, certs, experience, testimonials] = await Promise.all([
    profileService.get(),
    projectService.getFeatured(),
    skillsService.getAll(),
    certificateService.getAll(),
    experienceService.getAll(),
    testimonialService.getAll(),
  ])

  return (
    <>
      <HeroSection profile={profile} />
      <StatsSection
        skillsCount={skills.length}
        projectsCount={featuredProjects.length}
        certsCount={certs.length}
        expCount={experience.length > 0 ? 1 : 0}
      />
      <FeaturedProjects projects={featuredProjects} />
      <TechStack skills={skills} />
      <TestimonialsSection testimonials={testimonials} />
      <CallToAction profile={profile} />
    </>
  )
}
