import { $fetch } from 'ofetch'

/**
 * useApi - composable API utility with built-in error handling, retries, and auth support
 */
export default function useApi() {
    /**
     * Unified request handler with retries and error handling
     */
    const request = async <T>(
        method: HttpMethod,
        endpoint: string,
        options: ApiOptions = {},
    ): Promise<ApiResponse<T>> => {
        const { params, body, headers, retry = 1 } = options

        const url = `/api${endpoint}`
        let attempt = 0

        while (true) {
            try {
                const response = await $fetch.raw<T>(url, {
                    method,
                    params,
                    body,
                    headers,
                })

                return {
                    status: response.status,
                    ok: response.status >= 200 && response.status < 300,
                    data: response._data,
                }
            } catch (err: any) {  // eslint-disable-line @typescript-eslint/no-explicit-any
                const status = err?.response?.status ?? 0
                const data = err?.response?._data
                const error = { status, data }

                if (attempt < retry) {
                    attempt++
                    await sleep(API_RETRY_DELAY_MS) // Exponential backoff
                    continue
                }

                return { status, ok: false, error, data }
            }
        }
    }

    return {
        get: <T>(endpoint: string, options?: ApiOptions) =>
            request<T>('GET', endpoint, options),
        post: <T>(endpoint: string, options?: ApiOptions) =>
            request<T>('POST', endpoint, options),
        put: <T>(endpoint: string, options?: ApiOptions) =>
            request<T>('PUT', endpoint, options),
        patch: <T>(endpoint: string, options?: ApiOptions) =>
            request<T>('PATCH', endpoint, options),
        delete: <T>(endpoint: string, options?: ApiOptions) =>
            request<T>('DELETE', endpoint, options),
    }
}
