import type { Project } from '#shared/types/project'
import type { Order } from '#shared/types/service'
import { applySorting, sanitizeSearch } from '#shared/utils/service'
import projectsData from '../data/projects.json'

const projects = projectsData as Project[]

export function getProjects(options?: { search?: string, featured?: boolean | null, technologies?: string[] | null }, order: Order[] = [], limit?: number): Project[] {
  const { search, featured, technologies } = options || {}

  let result = [...projects]

  if (search) {
    const needle = sanitizeSearch(search)
    result = result.filter(p =>
      sanitizeSearch(p.title).includes(needle)
      || sanitizeSearch(p.description.en || '').includes(needle)
      || sanitizeSearch(p.description.fr || '').includes(needle),
    )
  }

  if (featured != null) {
    result = result.filter(p => p.featured === featured)
  }

  if (technologies?.length) {
    const techs = technologies.map(t => sanitizeSearch(t))
    result = result.filter(p =>
      p.technologies.some(t => techs.includes(sanitizeSearch(t))),
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
