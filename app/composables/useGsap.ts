export type Gsap = typeof import('gsap')['gsap']
export type GsapContext = ReturnType<Gsap['context']>

/**
 * Shared motion tokens. Every animation in the app pulls its easing, duration and
 * travel distance from here so the whole site moves with one personality.
 */
export const MOTION = {
    ease: {
        out: 'power3.out',
        inOut: 'power2.inOut',
        pop: 'back.out(1.7)',
        soft: 'expo.out',
    },
    duration: {
        fast: 0.4,
        base: 0.65,
        slow: 0.9,
    },
    distance: 40,
    stagger: 0.08,
} as const

/**
 * "From" states used by the `v-reveal` directive. Adding an entry here makes a new
 * reveal style available project-wide as `v-reveal="'<name>'"`.
 */
export const REVEAL_PRESETS = {
    up: { y: MOTION.distance, opacity: 0 },
    down: { y: -MOTION.distance, opacity: 0 },
    left: { x: -MOTION.distance, opacity: 0 },
    right: { x: MOTION.distance, opacity: 0 },
    fade: { opacity: 0 },
    zoom: { scale: 0.88, opacity: 0 },
    pop: { scale: 0.6, opacity: 0, ease: MOTION.ease.pop },
    blur: { opacity: 0, filter: 'blur(14px)' },
    flip: { rotationX: -60, transformOrigin: '50% 100% -50px', opacity: 0 },
    mask: { clipPath: 'inset(0 0 100% 0)', y: 24, opacity: 0 },
    rise: { y: MOTION.distance * 1.6, scale: 0.96, opacity: 0 },
} satisfies Record<string, Record<string, unknown>>

export type RevealPreset = keyof typeof REVEAL_PRESETS

/**
 * Properties an entrance tween hands back to CSS once it finishes.
 *
 * Deliberately an explicit list rather than `clearProps: 'all'`: "all" wipes the whole
 * inline style attribute, which also destroys bindings Vue owns — a `:style="{ width }"`
 * would be reset and the element would snap to its default size.
 */
export const REVEAL_CLEAR_PROPS
    = 'transform,translate,rotate,scale,opacity,filter,clipPath,transformOrigin'

/** Attribute set during SSR to hide reveal targets until GSAP takes over. */
export const REVEAL_ATTR = 'data-reveal'

export function prefersReducedMotion(): boolean {
    return typeof window !== 'undefined'
        && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function canHover(): boolean {
    return typeof window !== 'undefined'
        && window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

/** Failsafe: never leave content stuck at opacity 0 when animations cannot run. */
function unhideAll() {
    if (typeof document === 'undefined') return
    document.querySelectorAll(`[${REVEAL_ATTR}]`).forEach(el => el.removeAttribute(REVEAL_ATTR))
}

let gsapPromise: Promise<Gsap | null> | null = null

/**
 * Lazily loads GSAP + ScrollTrigger on the client, once per session.
 * Resolves to `null` on the server, under reduced-motion, or if the chunk fails
 * to load — callers treat `null` as "render the static page, no animation".
 */
export function useGsap(): Promise<Gsap | null> {
    if (typeof window === 'undefined') return Promise.resolve(null)

    if (prefersReducedMotion()) {
        unhideAll()
        return Promise.resolve(null)
    }

    if (!gsapPromise) {
        gsapPromise = (async () => {
            try {
                const [{ gsap }, { ScrollTrigger }] = await Promise.all([
                    import('gsap'),
                    import('gsap/ScrollTrigger'),
                ])
                gsap.registerPlugin(ScrollTrigger)
                gsap.defaults({ ease: MOTION.ease.out, duration: MOTION.duration.base })
                return gsap
            } catch (error) {
                console.error('[motion] GSAP failed to load, falling back to static rendering', error)
                unhideAll()
                return null
            }
        })()
    }

    return gsapPromise
}

/** Recalculates every ScrollTrigger — call after content height changes. */
export async function refreshScrollTriggers() {
    const gsap = await useGsap()
    if (!gsap) return
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    ScrollTrigger.refresh()
}
