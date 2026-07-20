import { projectService } from '@/services/projectService'
import { notFound } from 'next/navigation'
import { ProjectDetail } from '@/components/projects/ProjectDetail'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects = await projectService.getAll()
  return projects.map((p) => ({ slug: p.slug ?? p.id }))
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await projectService.getBySlug(slug)
  if (!project) return { title: 'Project Not Found' }
  return {
    title: project.title,
    description: project.description,
  }
}

export const revalidate = 3600

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await projectService.getBySlug(slug)
  if (!project) notFound()
  return <ProjectDetail project={project} />
}
