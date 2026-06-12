<template>
    <section class="py-16">
        <div class="mx-auto max-w-6xl px-4 md:px-8">
            <div class="mb-8 flex items-end justify-between">
                <div>
                    <h2 class="title-section mb-2">
                        {{ t('pages.home.projects.title') }}
                    </h2>
                    <p class="text-white/60">
                        {{ t('pages.home.projects.description') }}
                    </p>
                </div>
                <NuxtLink to="/projects"
                    class="hidden sm:inline-flex items-center gap-2 font-semibold hover:gap-3 transition-all">
                    <span>{{ t('pages.home.projects.all') }}</span>
                    <Icon name="ic:baseline-arrow-forward" class="mt-1" />
                </NuxtLink>
            </div>

            <Grid :layouts="{ default: 1, sm: 2, md: 3 }">
                <ProjectCard v-for="project in projects" :key="project.slug" :project="project" />
            </Grid>

            <div class="mt-8 flex justify-center">
                <NuxtLink to="/projects"
                    class=" mt-4 inline-flex sm:hidden  items-center gap-2 font-semibold hover:gap-3 transition-all">
                    <span>{{ t('pages.home.projects.all') }}</span>
                    <Icon name="ic:baseline-arrow-forward" class="mt-1" />
                </NuxtLink>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import Grid from '~/components/molecules/Grid.vue';
import ProjectCard from './ProjectCard.vue';

const { t } = useI18n()

const { data: projects } = await useFetch<Project[]>('/api/projects', {
    params: {
        featured: true,
        limit: 3,
    }
})


</script>