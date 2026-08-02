<template>
    <div class="safe-area">
        <Breadcrumb :items="[
            { name: t('pages.projects.title'), url: '/projects' },
        ]" />

        <h1 v-reveal="{ preset: 'mask', immediate: true }" class="title-page pt-2 pb-4">
            {{ t('pages.projects.title') }}
        </h1>

        <p v-reveal="{ immediate: true, delay: 0.1 }" class="text-white/60 mb-6">{{ t('pages.projects.description') }}
        </p>

        <ItemsSelectorSkeleton v-if="technologiesLoading && !technologiesError" class="mb-6" />
        <ItemsSelector v-else-if="technologies" v-model="technologiesSelected"
            v-reveal="{ preset: 'zoom', children: '.btn', stagger: 0.03, immediate: true, delay: 0.2 }"
            :items="technologies" class="mb-6" />

        <NoContent v-if="projectsError" :message="t('pages.projects.error')" />
        <Grid v-else-if="projectsLoading" :layouts="{ default: 1, md: 2, lg: 3 }">
            <ProjectCardSkeleton v-for="i in 12" :key="i" />
        </Grid>
        <NoContent v-else-if="!projects?.length"
            :message="technologies ? t('pages.projects.vacant') : t('pages.projects.empty')" />
        <template v-else>
            <Grid ref="gridRef"
                v-reveal="{ preset: 'rise', children: '.project-card', stagger: 0.05, immediate: true, delay: 0.25 }"
                :layouts="{ default: 1, md: 2, lg: 3 }">
                <ProjectCard v-for="project in projects" :key="project.slug" :project="project" />
                <ProjectCardSkeleton v-for="i in loadingMoreCount" :key="`more-${i}`" />
            </Grid>

            <InfiniteScroll :can-load-more="canLoadMore" :loading="loadingMore" :error="!!errorMore" @load="loadMore" />
        </template>
    </div>
</template>

<script setup lang="ts">
import { useProjectsInfinite, useProjectTechnologies } from '~/composables/data/useProjects';
import ProjectCard from '~/components/organisms/ProjectCard.vue';
import ProjectCardSkeleton from '~/components/organisms/ProjectCardSkeleton.vue';
import ItemsSelector from '~/components/organisms/ItemsSelector.vue';
import Grid from '~/components/molecules/Grid.vue';
import InfiniteScroll from '~/components/molecules/InfiniteScroll.vue';
import Breadcrumb from '~/components/molecules/Breadcrumb.vue';
import NoContent from '~/components/molecules/NoContent.vue';
import ItemsSelectorSkeleton from '~/components/organisms/ItemsSelectorSkeleton.vue';
import { useGsap, refreshScrollTriggers, MOTION, REVEAL_CLEAR_PROPS } from '~/composables/useGsap';

const { t } = useI18n()

const technologiesSelected = ref<string[]>([])
const gridRef = ref<ComponentPublicInstance | null>(null)

const [
    { technologies, loading: technologiesLoading, error: technologiesError },
    { projects, count, limit, loading: projectsLoading, error: projectsError, loadingMore, errorMore, canLoadMore, loadMore }
] = await Promise.all([
    useProjectTechnologies(),
    useProjectsInfinite({ technologies: technologiesSelected }),
])

const loadingMoreCount = computed(() => {
    if (!loadingMore.value) return 0
    const remaining = count.value - projects.value.length
    return remaining > 0 ? Math.min(limit.value, remaining) : limit.value
})

/** Cards animated at least once, so an infinite-scroll append never replays them. */
function markSeen(cards: Iterable<HTMLElement>) {
    for (const card of cards) card.dataset.motionSeen = ''
}

// The server-rendered batch is animated by `v-reveal` on the grid; claim it here so
// the watcher below treats only later arrivals as new.
onMounted(() => {
    const root = gridRef.value?.$el as HTMLElement | undefined
    if (root) markSeen(root.querySelectorAll<HTMLElement>('.project-card'))
})

/**
 * Animates cards the static directive cannot reach: results swapped in by a filter
 * change, and pages appended by the infinite scroll.
 */
watch(projects, async () => {
    const gsap = await useGsap()
    if (!gsap) return

    await nextTick()

    const root = gridRef.value?.$el as HTMLElement | undefined
    if (!root) return

    const fresh = Array.from(
        root.querySelectorAll<HTMLElement>('.project-card:not([data-motion-seen])'),
    )
    markSeen(fresh)

    if (fresh.length) {
        gsap.from(fresh, {
            y: 28,
            scale: 0.96,
            opacity: 0,
            duration: MOTION.duration.fast,
            stagger: 0.04,
            clearProps: REVEAL_CLEAR_PROPS,
            overwrite: true,
        })
    }

    refreshScrollTriggers()
})

useAppHead({
    title: t('pages.projects.head.title'),
    description: t('pages.projects.head.description'),
    url: '/projects',
})
</script>
