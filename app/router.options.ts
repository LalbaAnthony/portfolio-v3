import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }

        if (to.hash) {
            const delay = from && from.path !== to.path ? 400 : 0
            return new Promise((resolve) => {
                setTimeout(() => {
                    const element = document.querySelector(to.hash)
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
                        resolve(false)
                    } else {
                        resolve({ el: to.hash, behavior: 'smooth' })
                    }
                }, delay)
            })
        }

        return { top: 0 }
    }
}