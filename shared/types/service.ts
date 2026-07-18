export const PAGINATION_LIMIT_DEFAULT = 12 // 12 is a nice number for grids (can be divided by 2, 3, 4, 6)
export const PAGINATION_LIMIT_MAX = 100

export interface Pagination {
    page: number,
    limit: number,
    total?: number | undefined,
    offset?: number | undefined,
    count?: number | undefined
}

export type Order = [string, 'ASC' | 'DESC']
