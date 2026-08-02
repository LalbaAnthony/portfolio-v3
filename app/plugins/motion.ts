import type { ObjectDirective } from 'vue'
import {
    useGsap,
    canHover,
    refreshScrollTriggers,
    MOTION,
    REVEAL_PRESETS,
    REVEAL_ATTR,
    REVEAL_CLEAR_PROPS,
    type Gsap,
    type RevealPreset,
} from '~/composables/useGsap'

/**
 * Registers the project-wide motion directives.
 *
 * Universal (not `.client`) on purpose: Vue must resolve the directives during SSR too,
 * where `getSSRProps` stamps the initial hidden state. The GSAP chunk itself is only
 * ever imported from `mounted`, i.e. client-side.
 */

// ---------------------------------------------------------------------------
// v-reveal — entrance animation, on scroll by default
// ---------------------------------------------------------------------------

interface RevealOptions {
    /** Named "from" state, see REVEAL_PRESETS. Default: 'up'. */
    preset?: RevealPreset
    /** Animate matching descendants instead of the element itself. */
    children?: string
    /** Seconds before the animation starts. */
    delay?: number
    duration?: number
    /** Seconds between children. Only meaningful with `children`. */
    stagger?: number
    /** ScrollTrigger start position. Default: 'top 82%'. */
    start?: string
    /** Play immediately on mount instead of waiting for scroll. */
    immediate?: boolean
}

type RevealValue = RevealPreset | RevealOptions | undefined

// Separate maps: an element may carry both directives at once.
const revealCleanups = new WeakMap<HTMLElement, () => void>()
const tiltCleanups = new WeakMap<HTMLElement, () => void>()

function normalizeReveal(value: RevealValue): Required<Pick<RevealOptions, 'preset' | 'delay' | 'start'>> & RevealOptions {
    const options: RevealOptions = typeof value === 'string' ? { preset: value } : (value ?? {})
    return {
        preset: options.preset ?? 'up',
        delay: options.delay ?? 0,
        start: options.start ?? 'top 82%',
        ...options,
    }
}

function playReveal(el: HTMLElement, gsap: Gsap, value: RevealValue) {
    const options = normalizeReveal(value)

    let children: HTMLElement[] = []
    if (options.children) {
        try {
            children = Array.from(el.querySelectorAll<HTMLElement>(options.children))
        } catch {
            console.warn(`[v-reveal] invalid children selector: ${options.children}`)
        }
    }

    // Falling back to the element itself keeps content visible if nothing matched.
    const targets: HTMLElement | HTMLElement[] = children.length ? children : el

    const tween = gsap.from(targets, {
        ...REVEAL_PRESETS[options.preset],
        duration: options.duration ?? MOTION.duration.base,
        delay: options.delay,
        stagger: children.length ? (options.stagger ?? MOTION.stagger) : 0,
        // Hand styling back to CSS once done, so `:hover` transforms keep working.
        clearProps: REVEAL_CLEAR_PROPS,
        scrollTrigger: options.immediate
            ? undefined
            : { trigger: el, start: options.start, once: true },
    })

    // GSAP has now written the "from" state inline, so dropping the SSR attribute
    // cannot flash the un-animated content.
    el.removeAttribute(REVEAL_ATTR)

    revealCleanups.set(el, () => {
        tween.scrollTrigger?.kill()
        tween.kill()
    })
}

const reveal: ObjectDirective<HTMLElement, RevealValue> = {
    getSSRProps() {
        return { [REVEAL_ATTR]: '' }
    },
    async mounted(el, binding) {
        const gsap = await useGsap()
        if (!gsap) {
            el.removeAttribute(REVEAL_ATTR)
            return
        }
        playReveal(el, gsap, binding.value)
    },
    unmounted(el) {
        revealCleanups.get(el)?.()
        revealCleanups.delete(el)
    },
}

// ---------------------------------------------------------------------------
// v-tilt — pointer-tracked 3D tilt, hover-capable devices only
// ---------------------------------------------------------------------------

interface TiltOptions {
    /** Max rotation in degrees. Default: 7. */
    max?: number
    /** Scale applied while hovered. Default: 1.03. */
    scale?: number
    /** Upward lift in px while hovered. Default: 6. */
    lift?: number
}

function normalizeTilt(value: number | TiltOptions | undefined): Required<TiltOptions> {
    const options: TiltOptions = typeof value === 'number' ? { max: value } : (value ?? {})
    return {
        max: options.max ?? 7,
        scale: options.scale ?? 1.03,
        lift: options.lift ?? 6,
    }
}

const tilt: ObjectDirective<HTMLElement, number | TiltOptions | undefined> = {
    async mounted(el, binding) {
        if (!canHover()) return

        const gsap = await useGsap()
        if (!gsap) return

        const options = normalizeTilt(binding.value)
        const quick = (prop: string) => gsap.quickTo(el, prop, { duration: 0.5, ease: MOTION.ease.out })
        const rotateX = quick('rotationX')
        const rotateY = quick('rotationY')
        const moveY = quick('y')
        const scale = quick('scale')

        const onEnter = () => {
            // Re-applied per hover so a reveal's `clearProps` can never strip it.
            gsap.set(el, { transformPerspective: 900, willChange: 'transform' })
            scale(options.scale)
            moveY(-options.lift)
        }

        const onMove = (event: PointerEvent) => {
            const rect = el.getBoundingClientRect()
            const ratioX = (event.clientX - rect.left) / rect.width - 0.5
            const ratioY = (event.clientY - rect.top) / rect.height - 0.5
            rotateY(ratioX * options.max * 2)
            rotateX(-ratioY * options.max * 2)
        }

        const onLeave = () => {
            rotateX(0)
            rotateY(0)
            moveY(0)
            scale(1)
            gsap.set(el, { willChange: 'auto' })
        }

        el.addEventListener('pointerenter', onEnter)
        el.addEventListener('pointermove', onMove)
        el.addEventListener('pointerleave', onLeave)

        tiltCleanups.set(el, () => {
            el.removeEventListener('pointerenter', onEnter)
            el.removeEventListener('pointermove', onMove)
            el.removeEventListener('pointerleave', onLeave)
            gsap.killTweensOf(el)
        })
    },
    unmounted(el) {
        tiltCleanups.get(el)?.()
        tiltCleanups.delete(el)
    },
}

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('reveal', reveal)
    nuxtApp.vueApp.directive('tilt', tilt)

    // Route changes swap page height; stale trigger positions would fire at the wrong scroll.
    nuxtApp.hook('page:finish', () => {
        refreshScrollTriggers()
    })
})
