import type { Order } from '#shared/types/service'

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
