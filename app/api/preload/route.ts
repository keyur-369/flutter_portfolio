import { NextResponse } from 'next/server'
import { profileService } from '@/services/profileService'
import { projectService } from '@/services/projectService'
import { skillsService } from '@/services/skillsService'
import { certificateService } from '@/services/certificateService'
import { experienceService } from '@/services/experienceService'
import { testimonialService } from '@/services/testimonialService'
import { blogService } from '@/services/blogService'
import { settingsService } from '@/services/settingsService'
import { educationService } from '@/services/educationService'

export async function GET() {
  try {
    const startTime = Date.now()

    // Warm up all database tables & server caches in parallel
    const [
      profile,
      projects,
      skills,
      certs,
      experience,
      testimonials,
      blogs,
      settings,
      education,
    ] = await Promise.all([
      profileService.get(),
      projectService.getAll(),
      skillsService.getAll(),
      certificateService.getAll(),
      experienceService.getAll(),
      testimonialService.getAll(),
      blogService.getAll(),
      settingsService.get(),
      educationService.getAll(),
    ])

    const duration = Date.now() - startTime

    return NextResponse.json({
      success: true,
      durationMs: duration,
      dataSummary: {
        hasProfile: !!profile,
        projectsCount: projects?.length || 0,
        skillsCount: skills?.length || 0,
        certificatesCount: certs?.length || 0,
        experienceCount: experience?.length || 0,
        testimonialsCount: testimonials?.length || 0,
        blogsCount: blogs?.length || 0,
        educationCount: education?.length || 0,
        hasSettings: !!settings,
      },
    })
  } catch (error: any) {
    console.error('API /preload error:', error)
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to preload data' },
      { status: 500 }
    )
  }
}
