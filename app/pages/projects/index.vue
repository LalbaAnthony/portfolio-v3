<template>
    <div class="safe-area">
        <h1 class="title-page pt-2 pb-4">{{ t('pages.projects.title') }}</h1>

        <Breadcrumb :items="[
            { name: t('pages.projects.title'), url: '/projects' },
        ]" />

        <NoContent v-if="error" :message="t('pages.projects.error')" />
        <NoContent v-else-if="!projects?.length" :message="t('pages.projects.empty')" />
        <Grid v-else :layouts="{ default: 1, md: 2, lg: 3 }">
            <ProjectCard v-for="project in projects" :key="project.slug" :project="project" />
        </Grid>
    </div>
</template>

<script setup lang="ts">
import type { Project } from '#shared/types/project';
import ProjectCard from '~/components/organisms/ProjectCard.vue';
import Grid from '~/components/molecules/Grid.vue';
import Breadcrumb from '~/components/molecules/Breadcrumb.vue';
import NoContent from '~/components/molecules/NoContent.vue';

const { t } = useI18n()

const { data: projects, error } = await useFetch<Project[]>('/api/projects')

useAppHead({
    title: t('pages.projects.head.title'),
    description: t('pages.projects.head.description'),
    url: '/projects',
})
</script>
