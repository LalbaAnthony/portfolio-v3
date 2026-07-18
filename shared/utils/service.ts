import type { Order } from '#shared/types/service'

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
