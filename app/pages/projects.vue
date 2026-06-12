<template>
    <div>
        <h1>{{ t('projects.title') }}</h1>

        <p v-if="error">{{ t('projects.error') }}</p>
        <p v-else-if="!projects?.length">{{ t('projects.empty') }}</p>
        <ul v-else>
            <li v-for="project in projects" :key="project.slug">
                <h2>{{ project.title }}</h2>
                <p>{{ project.description[locale] }}</p>
                <p>{{ project.year }} — {{ project.technologies.join(', ') }}</p>
                <a v-if="project.url" :href="project.url" target="_blank" rel="noopener">{{ t('projects.visit') }}</a>
                <a v-if="project.repository" :href="project.repository" target="_blank" rel="noopener">{{ t('projects.repository') }}</a>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import type { Project } from '#shared/types/project';

const { t, locale } = useI18n()

const { data: projects, error } = await useFetch<Project[]>('/api/projects')

useAppHead({
    title: t('projects.head.title'),
    description: t('projects.head.description'),
    url: '/projects',
    noindex: false,
})
</script>
