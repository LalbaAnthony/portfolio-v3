import type { Project, ProjectFilters } from '~~/shared/types/project'
import type { Order, Pagination } from '~~/shared/types/service'
import { applyPagination, applySearch, applySorting, isValideSearch } from '~~/shared/utils/service'
import projectsData from '~~/server/data/projects'

export class ProjectService {
  private applyFilters(result: Project[], options?: ProjectFilters): Project[] {
    const { search, featured, technologies } = options || {}

    if (search && isValideSearch(search)) {
      result = applySearch(result, search, p => [...Object.values(p.title), ...Object.values(p.abstract), ...Object.values(p.description), ...p.technologies])
    }

    if (featured) {
      result = result.filter(p => p.featured === featured)
    }

    if (technologies?.length) {
      const techs = technologies.map(t => normalize(t))
      result = result.filter(p =>
        techs.every(t => p.technologies.map(pt => normalize(pt)).includes(t)),
      )
    }

    return result
  }

  public count(options?: ProjectFilters): number {
    let result = [...projectsData]
    result = this.applyFilters(result, options)

    return result.length
  }

  public getAll(options?: ProjectFilters, order: Order[] = [], pagination?: Pagination | null): Project[] {
    let result = [...projectsData]
    result = this.applyFilters(result, options)
    result = applySorting(result, order)
    result = applyPagination(result, pagination)

    return result
  }

  public getOne(slug: string): Project | undefined {
    return projectsData.find(project => project.slug === slug)
  }

  public getTechnologies(): string[] {
    const counts = new Map<string, number>()

    for (const tech of projectsData.flatMap(p => p.technologies)) {
      counts.set(tech, (counts.get(tech) ?? 0) + 1)
    }

    const sorted = [...counts.keys()].sort((a, b) => counts.get(b)! - counts.get(a)!)

    return sorted
  }
}

export const projectService = new ProjectService()