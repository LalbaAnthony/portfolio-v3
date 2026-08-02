<template>
    <div class="safe-area">
        <h1 class="title-page pt-2 pb-4">{{ project ? tString(project.title) : '' }}</h1>

        <Breadcrumb :items="[
            { name: t('pages.projects.title'), url: '/projects' },
            ...(project ? [{ name: tString(project.title), url: `/projects/${project.slug}` }] : [])
        ]" />

        <NoContent v-if="error" :message="t('pages.project.error')" />
        <ProjectDetailSkeleton v-else-if="loading" />
        <template v-else-if="project">
            <h1></h1>
            <p>{{ tString(project.description) ?? '' }}</p>
            <p>{{ project.year }} — {{ project.technologies.join(', ') }}</p>
            <a v-if="project.productionUrl" :href="project.productionUrl" target="_blank" rel="noopener">{{
                t('pages.project.visit') }}</a>
            <a v-if="project.repositoryUrl" :href="project.repositoryUrl" target="_blank" rel="noopener">{{
                t('pages.project.repositoryUrl') }}</a>
        </template>
    </div>
</template>

<script setup lang="ts">
import Breadcrumb from '~/components/molecules/Breadcrumb.vue';
import NoContent from '~/components/molecules/NoContent.vue';
import ProjectDetailSkeleton from '~/components/organisms/ProjectDetailSkeleton.vue';
import { useProject } from '~/composables/data/useProjects';
import { tString } from '~/utils/i18n';

const { t } = useI18n()
const route = useRoute()

const { project, loading, error } = await useProject(route.params.slug as string)

if (!project.value) {
    throw createError({ statusCode: 404 })
}

if (project.value) {
    useAppHead({
        title: tString(project.value.title),
        description: tString(project.value.abstract),
        url: `/projects/${route.params.slug}`,
    })
}
</script>
