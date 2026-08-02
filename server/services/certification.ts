import type { Certification, CertificationFilters } from '~~/shared/types/certification'
import type { Order, Pagination } from '~~/shared/types/service'
import { applyPagination, applySearch, applySorting, isValideSearch } from '~~/shared/utils/service'
import certificationsData from '~~/server/data/certifications'

export class CertificationService {
  private applyFilters(result: Certification[], options?: CertificationFilters): Certification[] {
    const { search } = options || {}

    if (search && isValideSearch(search)) {
      result = applySearch(result, search, p => [...Object.values(p.label)])
    }

    return result
  }

  public count(options?: CertificationFilters): number {
    let result = [...certificationsData]
    result = this.applyFilters(result, options)

    return result.length
  }

  public getAll(options?: CertificationFilters, order: Order[] = [], pagination?: Pagination | null): Certification[] {
    let result = [...certificationsData]
    result = this.applyFilters(result, options)
    result = applySorting(result, order)
    result = applyPagination(result, pagination)

    return result
  }
}

export const certificationService = new CertificationService()