import type { Order } from '#shared/types/service'

// Take a query parameter that can be a string, an array of strings, or undefined/null, and return it as an array of strings (or null if it was undefined/null)
export function parseArrayParam(value: string | string[] | undefined | null): string[] | null {
    if (Array.isArray(value)) return value as string[]
    if (typeof value === 'string') return [value]
    return null
}

// Take an order parameter like "title:ASC" or ["title:ASC", "date:DESC"] and convert it to an array of [field, direction] tuples
export function parseOrder(value: string | string[] | undefined | null): Order[] {
    return (parseArrayParam(value) ?? [])
        .map(o => o.split(':') as [string, string])
        .filter((o): o is Order => o.length === 2 && (o[1] === 'ASC' || o[1] === 'DESC'))
}
