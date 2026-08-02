import type { MaybeRefOrGetter, Ref } from 'vue'

// Distance from the viewport at which the sentinel starts triggering, so the next page
// is already in flight by the time the user reaches the bottom of the current one.
export const INFINITE_SCROLL_ROOT_MARGIN = '200px'

export interface UseInfiniteScrollOptions {
    rootMargin?: string
    // While falsy, the sentinel keeps being observed but never triggers.
    enabled?: MaybeRefOrGetter<boolean>
}

/**
 * useInfiniteScroll - fires `onTrigger` whenever the given sentinel element enters the viewport.
 *
 * Generic on purpose: it knows nothing about pagination, it only reports visibility.
 * Pair it with `useInfiniteList` (data side) or use it standalone for any "reveal on scroll" need.
 */
export function useInfiniteScroll(
    target: Ref<HTMLElement | null | undefined>,
    onTrigger: () => unknown,
    options: UseInfiniteScrollOptions = {},
) {
    const { rootMargin = INFINITE_SCROLL_ROOT_MARGIN, enabled = true } = options

    const isVisible = ref(false)
    const isEnabled = computed(() => toValue(enabled))

    let observer: IntersectionObserver | null = null

    const stop = () => {
        observer?.disconnect()
        observer = null
        isVisible.value = false
    }

    const observe = (el: HTMLElement | null | undefined) => {
        stop()

        // No observer on the server, and no polyfill fallback: without IntersectionObserver
        // the consumer keeps whatever manual control it exposes (retry button, etc.).
        if (!el || typeof IntersectionObserver === 'undefined') return

        observer = new IntersectionObserver(
            entries => { isVisible.value = entries.some(entry => entry.isIntersecting) },
            { rootMargin },
        )
        observer.observe(el)
    }

    watch(target, observe, { immediate: true, flush: 'post' })

    // Watching `isEnabled` too covers the chain-loading case: when a page finishes loading
    // while the sentinel is still on screen (short page, tall viewport), the observer will not
    // emit a new entry, so re-enabling is what triggers the next load.
    watch([isVisible, isEnabled], ([visible, ready]) => {
        if (visible && ready) onTrigger()
    })

    onBeforeUnmount(stop)

    return { isVisible, stop }
}
