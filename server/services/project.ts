import type { Project } from '~~/shared/types/project'
import type { Order, Pagination } from '~~/shared/types/service'
import { applySearch, applySorting, isValideSearch, paginationDefault } from '~~/shared/utils/service'
import projectsData from '~~/server/data/projects.json'

const projects = projectsData as Project[]

export class ProjectService {
  public count(options?: { search: string | null, featured: boolean, technologies: string[] | null }): number {
    const { search, featured, technologies } = options || {}

    let result = [...projects]

    if (search && isValideSearch(search)) {
      result = applySearch(result, search, p => [p.title, p.description.en, p.description.fr, p.abstract.en, p.abstract.fr])
    }

    if (featured) {
      result = result.filter(p => p.featured === featured)
    }

    if (technologies?.length) {
      const techs = technologies.map(t => normalize(t))
      result = result.filter(p =>
        p.technologies.some(t => techs.includes(normalize(t))),
      )
    }

    return result.length
  }

  public getAll(options?: { search: string | null, featured: boolean, technologies: string[] | null }, order: Order[] = [], pagination?: Pagination | null): Project[] {
    const { search, featured, technologies } = options || {}
    const { offset, limit } = pagination || paginationDefault()

    let result = [...projects]

    if (search && isValideSearch(search)) {
      result = applySearch(result, search, p => [p.title, p.description.en, p.description.fr, p.abstract.en, p.abstract.fr])
    }

    if (featured) {
      result = result.filter(p => p.featured === featured)
    }

    if (technologies?.length) {
      const techs = technologies.map(t => normalize(t))
      result = result.filter(p =>
        p.technologies.some(t => techs.includes(normalize(t))),
      )
    }

    result = applySorting(result, order)

    if (offset !== undefined && limit !== undefined) {
      result = result.slice(offset, offset + limit)
    }

    return result
  }

  public getOne(slug: string): Project | undefined {
    return projects.find(project => project.slug === slug)
  }

  public getTechnologies(): string[] {
    const counts = new Map<string, number>()

    for (const tech of projects.flatMap(p => p.technologies)) {
      counts.set(tech, (counts.get(tech) ?? 0) + 1)
    }

    const sorted = [...counts.keys()].sort((a, b) => counts.get(b)! - counts.get(a)!)

    return sorted
  }
}

export const projectService = new ProjectService()