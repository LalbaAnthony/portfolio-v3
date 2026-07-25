import type { Order } from '~~/shared/types/service'

export function paginationDefault(): Pagination {
    return { page: 1, limit: PAGINATION_LIMIT_DEFAULT, total: 0, offset: 0 }
}

export function paginationMax(): Pagination {
    return { page: 1, limit: PAGINATION_LIMIT_MAX }
}

export function paginate(page: number | null, limit: number | null, count: number): Pagination {
    const pagDefault = paginationDefault()

    page = page ?? pagDefault.page
    limit = limit ?? pagDefault.limit

    if (limit > PAGINATION_LIMIT_MAX) limit = PAGINATION_LIMIT_MAX
    if (limit < 1) limit = PAGINATION_LIMIT_DEFAULT
    if (page < 1) page = 1

    const total: number = Math.ceil(count / limit)
    if (total === 0) page = 1
    else if (page > total) page = total

    const offset: number = (page - 1) * limit
    return { page, limit, total, offset, count }
}

export function isValideSearch(query: unknown): boolean {
    if (typeof query !== 'string') return false

    const trimmed = query.trim()
    if (!trimmed) return false
    if (trimmed.length < 3) return false

    // Check for invalid characters
    const invalidChars = /[<>"'`|\\^{}[\]();:@&=+$,?[\]~]/;
    if (invalidChars.test(trimmed)) return false

    return true
}

export function applySearch<T>(items: T[], query: string | undefined, getFields: (item: T) => (string | null | undefined)[]): T[] {
    const search = normalize(query)

    return items.filter(item =>
        getFields(item).some(field => field && normalize(field).includes(search)),
    )
}

export function applyPagination<T>(items: T[], pagination?: Pagination | null): T[] {
    const { offset, limit } = pagination || paginationDefault()
    if (offset === undefined || limit === undefined) return items
    return items.slice(offset, offset + limit)
}

export function applySorting<T>(items: T[], order: Order[]): T[] {
    if (!order.length) return items

    return [...items].sort((a, b) => {
        for (const [field, dir] of order) {
            const av = (a as Record<string, unknown>)[field]
            const bv = (b as Record<string, unknown>)[field]
            let cmp = 0

            if (typeof av === 'number' && typeof bv === 'number') {
                cmp = av - bv
            } else if (typeof av === 'string' && typeof bv === 'string') {
                cmp = av.localeCompare(bv)
            }

            if (cmp !== 0) return dir === 'DESC' ? -cmp : cmp
        }
        return 0
    })
}
