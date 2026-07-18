import type { Project } from '#shared/types/project'
import type { Order } from '#shared/types/service'
import { applySearch, applySorting } from '#shared/utils/service'
import projectsData from '../data/projects.json'

const projects = projectsData as Project[]

export function getProjects(options?: { search?: string, featured?: boolean | null, technologies?: string[] | null }, order: Order[] = [], limit?: number): Project[] {
  const { search, featured, technologies } = options || {}

  let result = [...projects]

  if (search) {
    result = applySearch(result, search, p => [p.title, p.description.en, p.description.fr, p.abstract.en, p.abstract.fr])
  }

  if (featured != null) {
    result = result.filter(p => p.featured === featured)
  }

  if (technologies?.length) {
    const techs = technologies.map(t => normalize(t))
    result = result.filter(p =>
      p.technologies.some(t => techs.includes(normalize(t))),
    )
  }

  result = applySorting(result, order)

  if (limit != null) {
    result = result.slice(0, limit)
  }

  return result
}


export function getProject(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug)
}

export function getTechnologies(limit?: number): string[] {
  const counts = new Map<string, number>()

  for (const tech of projects.flatMap(p => p.technologies)) {
    counts.set(tech, (counts.get(tech) ?? 0) + 1)
  }

  const sorted = [...counts.keys()].sort((a, b) => counts.get(b)! - counts.get(a)!)

  if (limit != null) {
    return sorted.slice(0, limit)
  }

  return sorted
}
