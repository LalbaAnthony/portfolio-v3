import type { Order } from '~~/shared/types/service'

export function parseQueryString(value: unknown): string | null {
    if (Array.isArray(value)) return value[0] ?? null
    if (typeof value === 'string') return value
    return null
}

export function parseQueryBoolean(value: unknown, defaultValue: boolean = false): boolean {
    if (Array.isArray(value)) return parseQueryBoolean(value[0], defaultValue)
    if (typeof value === 'string') return value === 'true' ? true : value === 'false' ? false : defaultValue ?? null
    return defaultValue ?? null
}

export function parseQueryNumber(value: unknown, defaultValue: number | null = null): number | null {
    if (Array.isArray(value)) return parseQueryNumber(value[0], defaultValue)
    if (typeof value === 'string') {
        const parsed = parseFloat(value)
        return isNaN(parsed) ? defaultValue : parsed
    }
    return defaultValue
}

export function parseQueryArray(value: unknown): string[] | null {
    if (Array.isArray(value)) return value as string[]
    if (typeof value === 'string') return [value]
    return null
}

// Take an order parameter like "title:ASC" or ["title:ASC", "date:DESC"] and convert it to an array of [field, direction] tuples
export function parseOrder(value: unknown): Order[] {
    return (parseQueryArray(value) ?? [])
        .map(o => o.split(':') as [string, string])
        .filter((o): o is Order => o.length === 2 && (o[1] === 'ASC' || o[1] === 'DESC'))
}
