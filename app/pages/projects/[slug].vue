<template>
    <div class="safe-area">
        <h1 class="title-page pt-2 pb-4">{{ project?.title ?? '' }}</h1>

        <Breadcrumb :items="[
            { name: t('pages.projects.title'), url: '/projects' },
            ...(project ? [{ name: project.title, url: `/projects/${project.slug}` }] : [])
        ]" />

        <div v-if="error">
            <p>{{ t('pages.projects.error') }}</p>
        </div>
        <div v-else-if="project">
            <h1></h1>
            <p>{{ tString(project.description) }}</p>
            <p>{{ project.year }} — {{ project.technologies.join(', ') }}</p>
            <a v-if="project.url" :href="project.url" target="_blank" rel="noopener">{{ t('pages.projects.visit') }}</a>
            <a v-if="project.repository" :href="project.repository" target="_blank" rel="noopener">{{
                t('pages.projects.repository') }}</a>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Project } from '#shared/types/project';
import Breadcrumb from '~/components/molecules/Breadcrumb.vue';
import { tString } from '~/utils/i18n';

const { t } = useI18n()
const route = useRoute()

const { data: project, error } = await useFetch<Project>(`/api/projects/${route.params.slug}`)

if (!project.value) {
    throw createError({ statusCode: 404 })
}

if (project.value) {
    useAppHead({
        title: project.value.title,
        description: tString(project.value.abstract),
        url: `/projects/${route.params.slug}`,
    })
}
</script>
