import type { Skill, SkillFilters } from '~~/shared/types/skill'
import type { Order, Pagination } from '~~/shared/types/service'
import { applyPagination, applySearch, applySorting, isValideSearch } from '~~/shared/utils/service'
import skillsData from '~~/server/data/skills'

export class SkillService {
  private applyFilters(result: Skill[], options?: SkillFilters): Skill[] {
    const { search } = options || {}

    if (search && isValideSearch(search)) {
      result = applySearch(result, search, p => Object.values(p.name))
    }

    return result
  }

  public count(options?: SkillFilters): number {
    let result = [...skillsData]
    result = this.applyFilters(result, options)

    return result.length
  }

  public getAll(options?: SkillFilters, order: Order[] = [], pagination?: Pagination | null): Skill[] {
    let result = [...skillsData]
    result = this.applyFilters(result, options)
    result = applySorting(result, order)
    result = applyPagination(result, pagination)

    return result
  }
}

export const skillService = new SkillService()