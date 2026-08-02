import { useGsap, type Gsap, type GsapContext } from '~/composables/useGsap'

/**
 * A task may optionally return a teardown function (e.g. to drop a window listener).
 * Typed as `unknown` so tasks that simply return nothing still satisfy the signature.
 */
type MotionTask = (gsap: Gsap) => unknown

/**
 * Escape hatch for animations too bespoke for the `v-reveal` directive.
 *
 * Tasks are queued during `setup`, then run together once GSAP has loaded, inside a
 * `gsap.context()` that is reverted on unmount — so every tween and ScrollTrigger a
 * component creates is torn down with it, no manual bookkeeping.
 *
 * ```ts
 * const { onGsap } = useReveal()
 * onGsap(gsap => gsap.from(titleRef.value, { y: 40, opacity: 0 }))
 * ```
 *
 * @param scope optional root element — selector strings inside tasks resolve within it
 */
export function useReveal(scope?: Ref<HTMLElement | null>) {
    const tasks: MotionTask[] = []
    let context: GsapContext | null = null

    onMounted(async () => {
        const gsap = await useGsap()
        if (!gsap || !tasks.length) return

        // Wait for pending data/DOM updates so tasks measure a settled layout.
        await nextTick()

        context = gsap.context(() => {
            const teardowns = tasks
                .map(task => task(gsap))
                .filter((result): result is () => void => typeof result === 'function')
            // Returned to gsap.context() so it runs them on revert().
            return () => teardowns.forEach(teardown => teardown())
        }, scope?.value ?? undefined)
    })

    onBeforeUnmount(() => {
        context?.revert()
        context = null
    })

    return {
        onGsap(task: MotionTask) {
            tasks.push(task)
        },
    }
}
