<template>
    <div class="safe-area">
        <HomeHeroSkeleton v-if="profileLoading" />
        <HomeHero v-else-if="profile" :profile="profile" />

        <Grid v-if="projectsLoading" :layouts="{ default: 1, sm: 2, md: 3 }">
            <ProjectCardSkeleton v-for="i in 3" :key="i" />
        </Grid>
        <HomeProjects v-else-if="projects.length" :projects="projects" />
    </div>
</template>

<script setup lang="ts">
import HomeHero from '~/components/organisms/HomeHero.vue';
import HomeProjects from '~/components/organisms/HomeProjects.vue';
import HomeHeroSkeleton from '~/components/organisms/HomeHeroSkeleton.vue';
import ProjectCardSkeleton from '~/components/organisms/ProjectCardSkeleton.vue';
import Grid from '~/components/molecules/Grid.vue';
import { useProjectsFeatured } from '~/composables/data/useProjects';
import { useProfile } from '~/composables/data/useProfile';

const { t } = useI18n()

const [
    { profile, loading: profileLoading },
    { projects, loading: projectsLoading },
] = await Promise.all([
    useProfile(),
    useProjectsFeatured(),
])

useAppHead({
    title: t('pages.home.head.title'),
    description: t('pages.home.head.description'),
    url: '/',
})
</script>
