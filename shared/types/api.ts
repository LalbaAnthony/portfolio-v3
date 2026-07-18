export type Params = Record<string, unknown>
export type Headers = Record<string, string>

export const API_RETRY_DELAY_MS = 1000

export const HTTP_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] as const
export type HttpMethod = typeof HTTP_METHODS[number]

export interface ApiOptions {
    params?: Params
    body?: Record<string, unknown>
    headers?: Headers
    retry?: number
}

export interface ApiResponse<T> {
    status: number
    ok: boolean
    data?: T
    error?: unknown
}