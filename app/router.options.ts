import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }

        if (to.hash) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const element = document.querySelector(to.hash)
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
                        resolve(false)
                    } else {
                        resolve({ el: to.hash, behavior: 'smooth' })
                    }
                }, 0)
            })
        }

        return { top: 0 }
    }
}