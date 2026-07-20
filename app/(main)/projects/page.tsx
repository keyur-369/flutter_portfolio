import type { Metadata } from 'next'
import { projectService } from '@/services/projectService'
import { ProjectsClient } from '@/components/projects/ProjectsClient'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore Keyur Mistry\'s Flutter and full-stack projects — Split Expenses, MCQ Pro, InvoiceHub and more.',
}

export const revalidate = 3600

export default async function ProjectsPage() {
  const projects = await projectService.getAll()
  return <ProjectsClient initialProjects={projects} />
}
