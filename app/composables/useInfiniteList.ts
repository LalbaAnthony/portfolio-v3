import type { Ref, WatchSource } from 'vue'
import type { Pagination } from '~~/shared/types/service'

// Shape every paginated `/api/v1` list endpoint already returns.
export interface InfiniteListPage<T> {
    data: T[]
    pagination?: Pagination | null
}

// `null` means "the request failed": the codebase-wide convention for data fetchers, so a failed
// first page leaves `useAsyncData` with a null payload and lets the client retry on hydration.
export type InfiniteListFetcher<T> = (page: number) => Promise<InfiniteListPage<T> | null>

export interface UseInfiniteListOptions {
    // Reactive sources (filters, search, locale…) that reset the list back to its first page.
    watch?: WatchSource[]
}

/**
 * useInfiniteList - accumulates successive pages of any `{ data, pagination }` endpoint.
 *
 * The first page goes through `useAsyncData` so it is still rendered server-side and hydrated
 * from the payload; every following page is fetched on the client and appended.
 * Content-agnostic: pass a fetcher and it works for projects, skills, certifications, etc.
 */
export async function useInfiniteList<T>(
    key: string,
    fetcher: InfiniteListFetcher<T>,
    options: UseInfiniteListOptions = {},
) {
    const items = ref([]) as Ref<T[]>
    const pagination = ref<Pagination | null>(null)
    const loadingMore = ref(false)
    const errorMore = ref<unknown>(null)

    // Bumped on every reset, so a `loadMore` still in flight for the previous filter state
    // is discarded instead of appending stale items to a freshly reset list.
    let generation = 0

    const { data, status, error, refresh } = await useAsyncData(
        key,
        () => fetcher(1),
        {
            getCachedData: (key, nuxtApp, ctx) => ctx.cause === 'initial' ? (nuxtApp.payload.data[key] ?? nuxtApp.static.data[key]) : undefined,
            watch: options.watch ?? [],
        },
    )

    watch(data, (firstPage) => {
        generation++
        items.value = firstPage?.data ?? []
        pagination.value = firstPage?.pagination ?? null
        loadingMore.value = false
        errorMore.value = null
    }, { immediate: true })

    const loading = computed(() => status.value === 'pending')
    const page = computed(() => pagination.value?.page ?? 1)
    // `total` is the number of pages, `count` the number of items (see `paginate()`).
    const pages = computed(() => pagination.value?.total ?? 0)
    const count = computed(() => pagination.value?.count ?? items.value.length)
    const limit = computed(() => pagination.value?.limit ?? PAGINATION_LIMIT_DEFAULT)
    const canLoadMore = computed(() => page.value < pages.value)

    const loadMore = async () => {
        if (loadingMore.value || loading.value || !canLoadMore.value) return

        const current = generation
        const next = page.value + 1

        loadingMore.value = true
        errorMore.value = null

        try {
            const result = await fetcher(next)
            if (current !== generation) return // the list was reset while the request was in flight

            if (!result) {
                errorMore.value = new Error(`Failed to load page ${next} of list "${key}"`)
                return
            }

            items.value = [...items.value, ...result.data]
            pagination.value = result.pagination ?? { ...(pagination.value ?? paginationDefault()), page: next }
        } catch (err) {
            if (current !== generation) return
            errorMore.value = err
        } finally {
            if (current === generation) loadingMore.value = false
        }
    }

    return {
        items,
        pagination,
        page,
        pages,
        count,
        limit,
        canLoadMore,
        loadMore,
        // `loading` covers the first page (and any filter reset), `loadingMore` the appended ones.
        loading,
        loadingMore,
        error,
        errorMore,
        refresh,
    }
}
