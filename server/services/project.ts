import type { Project } from '#shared/types/project'
import projectsData from '../data/projects.json'

const projects = projectsData as Project[]

export function getProjects(): Project[] {
  return [...projects].sort((a, b) => b.year - a.year)
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter(project => project.featured)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug)
}
