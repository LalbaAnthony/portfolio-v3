import type { MilestoneAny, MilestoneFilters } from '~~/shared/types/milestone'
import type { Order, Pagination } from '~~/shared/types/service'
import { applyPagination, applySorting } from '~~/shared/utils/service'
import milestonesData from '~~/server/data/milestones'

export class MilestoneService {
  private applyFilters(result: MilestoneAny[], options?: MilestoneFilters): MilestoneAny[] {
    const { type } = options || {}

    if (type) {
      result = result.filter(p => p.type === type)
    }

    return result
  }

  public count(options?: MilestoneFilters): number {
    let result = [...milestonesData]
    result = this.applyFilters(result, options)

    return result.length
  }

  public getAll(options?: MilestoneFilters, order: Order[] = [], pagination?: Pagination | null): MilestoneAny[] {
    let result = [...milestonesData]
    result = this.applyFilters(result, options)
    result = applySorting(result, order)
    result = applyPagination(result, pagination)

    return result
  }
}

export const milestoneService = new MilestoneService()