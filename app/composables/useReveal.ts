type GsapInstance = typeof import('gsap')['gsap']

async function loadGsap(): Promise<GsapInstance | null> {
    if (typeof window === 'undefined') return null
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null
    const { gsap } = await import('gsap')
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    gsap.registerPlugin(ScrollTrigger)
    return gsap
}

export function useReveal() {
    const tasks: ((gsap: GsapInstance) => void)[] = []

    onMounted(async () => {
        const gsap = await loadGsap()
        if (!gsap) return
        tasks.forEach(task => task(gsap))
    })

    function heroEntrance(refs: {
        photo: Ref<HTMLElement | null>
        h1: Ref<HTMLElement | null>
        h2: Ref<HTMLElement | null>
        desc: Ref<HTMLElement | null>
        buttons: Ref<HTMLElement | null>
    }) {
        tasks.push((gsap) => {
            gsap.timeline()
                .from(refs.photo.value, { scale: 0.75, opacity: 0, duration: 0.8, ease: 'back.out(1.7)' }, 0)
                .from(refs.h1.value, { y: 30, opacity: 0, duration: 0.65, ease: 'power3.out' }, 0.3)
                .from(refs.h2.value, { y: 25, opacity: 0, duration: 0.65, ease: 'power3.out' }, 0.45)
                .from(refs.desc.value, { y: 20, opacity: 0, duration: 0.55, ease: 'power3.out' }, 0.6)
                .from(Array.from(refs.buttons.value?.children ?? []), { y: 20, opacity: 0, duration: 0.5, stagger: 0.12, ease: 'power3.out' }, 0.72)
        })
    }

    function revealSection(
        sectionRef: Ref<HTMLElement | null>,
        headerRef: Ref<HTMLElement | null>,
        cards?: { selector: string; stagger?: number }
    ) {
        tasks.push((gsap) => {
            const section = sectionRef.value
            if (!section) return

            gsap.from(headerRef.value, {
                y: 30, opacity: 0, duration: 0.65, ease: 'power3.out',
                scrollTrigger: { trigger: section, start: 'top 85%', once: true },
            })

            if (cards) {
                const els = section.querySelectorAll(cards.selector)
                if (els.length) {
                    gsap.from(els, {
                        y: 50, opacity: 0, duration: 0.65, ease: 'power3.out',
                        stagger: cards.stagger ?? 0.08,
                        scrollTrigger: { trigger: section, start: 'top 75%', once: true },
                    })
                }
            }
        })
    }

    return { heroEntrance, revealSection }
}
