import type { RouteRecordNormalized } from "vue-router"

export const ROUTING_BO_DEFAULT = '/back-office/dashboard'
export const ROUTING_FO_DEFAULT = '/'
export const ROUTING_FO_EMERGENCY_BAR_EXCLUDES = ['/recherche']
export const ROUTING_FO_AUTH_BAR_EXCLUDES = ['/recherche']

export function isInFO() {
    const route = useRoute()
    return !route.path.startsWith('/back-office')
}

export function isInBO() {
    const route = useRoute()
    return route.path.startsWith('/back-office') && !route.path.startsWith('/back-office/authentification')
}

export function isInAuthentication() {
    const route = useRoute()
    return route.path === '/back-office/authentification'
}

export function isInDashboard() {
    const route = useRoute()
    return route.path === '/back-office/dashboard'
}

export function isInSearch() {
    const route = useRoute()
    return route.path === '/recherche'
}

export function goBack() {
    useRouter().back()
}

export function goToSearch(query: string) {
    useRouter().push(`/recherche?q=${encodeURIComponent(query)}`)
}

export function goToHome() {
    if (isInBO()) {
        useRouter().push(ROUTING_BO_DEFAULT)
    } else {
        useRouter().push(ROUTING_FO_DEFAULT)
    }
}

export function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function scrollToEl(element: Element | null) {
    if (!element) return
    element.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

export function highlight(selector: string) {
    const element = document.querySelector(selector)
    if (!element) return

    const animate = () => {
        element.animate(
            [{ transform: 'scale(1)' }, { transform: 'scale(1.05)' }, { transform: 'scale(1)' }],
            { duration: 400, easing: 'ease-in-out' }
        )
    }

    const rect = element.getBoundingClientRect()
    const alreadyInView = rect.top >= 0 && rect.bottom <= window.innerHeight

    if (alreadyInView) {
        animate()
    } else {
        scrollToEl(element)

        if ('onscrollend' in window) {
            window.addEventListener('scrollend', animate, { once: true })
        } else {
            setTimeout(animate, 600)
        }
    }
}

export function openInNewTab(path: string) {
    const url = new URL(path, window.location.origin).href
    window.open(url, '_blank')
}

export function getRoutes(options?: { publicOnly?: boolean, excludes?: string[], search?: string }): RouteRecordNormalized[] {
    const publicOnly = options?.publicOnly ?? true
    const excludes = options?.excludes ?? []
    const search = options?.search ?? ''

    const router = useRouter()
    const allRoutes = router.getRoutes() as RouteRecordNormalized[]

    let filteredRoutes = allRoutes
        .filter(r => typeof r.path === 'string' && !r.path.startsWith('/_') && (typeof r.name !== 'string' || !r.name.startsWith('error'))) // Hide internal routes (e.g. /_internal) and error routes (e.g. name starts with 'error')
        .filter(r => !['()'].some(path => r.path.includes(path))) // Hide dynamic routes with parameters (e.g. /post/:id) or catch-all routes (e.g. /:pathMatch(.*)*)
        .sort((a, b) => a.path.localeCompare(b.path)) // Sort alphabetically by path

    // Ensure there is meta.meta.title for all routes, defaulting to the path if not provided
    filteredRoutes.forEach(r => {
        if (!r.meta) r.meta = {}
        if (!r.meta.title) r.meta.title = r.path
    })

    if (publicOnly) {
        filteredRoutes = filteredRoutes.filter(r => {
            const meta = r.meta || {}
            return !meta.private
        })
    }

    if (excludes.length > 0) {
        filteredRoutes = filteredRoutes.filter(r => !excludes.includes(r.path))
    }

    if (search && search.trim() !== '') {
        const lowerSearch = search.toLowerCase()
        filteredRoutes = filteredRoutes.filter(r => {
            return (
                (r.meta?.title as string)?.toLowerCase().includes(lowerSearch) ||
                r.path.toLowerCase().includes(lowerSearch)
            )
        })
    }

    return filteredRoutes
}