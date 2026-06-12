<template>
    <div class="safe-area">
        <h1 class="text-3xl font-bold pt-2 pb-4">{{ project?.title ?? '' }}</h1>

        <Breadcrumb :items="[
            { name: t('pages.projects.title'), url: '/projects' },
            ...(project ? [{ name: project.title, url: `/actualites/${project.slug}` }] : [])
        ]" />

        <div v-if="error">
            <p>{{ t('pages.projects.error') }}</p>
        </div>
        <div v-else-if="project">
            <h1></h1>
            <p>{{ project.description[locale] }}</p>
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

const { t, locale } = useI18n()
const route = useRoute()

const { data: project, error } = await useFetch<Project>(`/api/projects/${route.params.slug}`)

if (project.value) {
    useAppHead({
        title: project.value.title,
        description: project.value.description[locale.value],
        url: `/projects/${route.params.slug}`,
    })
}
</script>
