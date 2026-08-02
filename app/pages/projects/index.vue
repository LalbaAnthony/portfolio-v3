<template>
    <div class="safe-area">
        <Breadcrumb :items="[
            { name: t('pages.projects.title'), url: '/projects' },
        ]" />

        <h1 class="title-page pt-2 pb-4">{{ t('pages.projects.title') }}</h1>

        <p class="text-white/60 mb-6">{{ t('pages.projects.description') }}</p>

        <ItemsSelectorSkeleton v-if="technologiesLoading && !technologiesError" class="mb-6" />
        <ItemsSelector v-else-if="technologies" :items="technologies" v-model="technologiesSelected" class="mb-6" />

        <NoContent v-if="projectsError" :message="t('pages.projects.error')" />
        <Grid v-else-if="projectsLoading" :layouts="{ default: 1, md: 2, lg: 3 }">
            <ProjectCardSkeleton v-for="i in 12" :key="i" />
        </Grid>
        <NoContent v-else-if="!projects?.length"
            :message="technologies ? t('pages.projects.vacant') : t('pages.projects.empty')" />
        <template v-else>
            <Grid :layouts="{ default: 1, md: 2, lg: 3 }">
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

const { t } = useI18n()

const technologiesSelected = ref<string[]>([])

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

useAppHead({
    title: t('pages.projects.head.title'),
    description: t('pages.projects.head.description'),
    url: '/projects',
})
</script>
