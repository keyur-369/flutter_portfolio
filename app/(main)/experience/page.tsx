import type { Metadata } from 'next'
import { experienceService } from '@/services/experienceService'
import { ExperienceTimeline } from '@/components/about/ExperienceTimeline'
import { Briefcase } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Keyur Mistry\'s professional experience — Flutter Developer Intern at Patrixel.',
}

export const revalidate = 3600

export default async function ExperiencePage() {
  const experience = await experienceService.getAll()
  return (
    <section className="section py-24">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-violet-500/30 text-xs font-semibold text-violet-300 uppercase tracking-widest mb-4">
            <Briefcase size={10} />
            Career
          </div>
          <h1 className="section-title text-white mb-4">
            Work <span className="gradient-text">Experience</span>
          </h1>
          <p className="section-subtitle mx-auto">
            My professional journey building real-world applications and gaining industry experience.
          </p>
        </div>
        <ExperienceTimeline experience={experience} />
      </div>
    </section>
  )
}
