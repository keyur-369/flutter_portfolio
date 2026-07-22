import type { Metadata } from 'next'
import { projectService } from '@/services/projectService'
import { ProjectsClient } from '@/components/projects/ProjectsClient'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore Keyur Mistry\'s Flutter and full-stack projects — Split Expenses, MCQ Pro, InvoiceHub and more.',
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function ProjectsPage() {
  const projects = await projectService.getAll()
  return <ProjectsClient initialProjects={projects} />
}
