<template>
    <div class="safe-area">
        <HomeHero :profile="profile"/>
        <HomeProjects v-if="projects.length" :projects="projects" />
    </div>
</template>

<script setup lang="ts">
import HomeHero from '~/components/organisms/HomeHero.vue';
import HomeProjects from '~/components/organisms/HomeProjects.vue';
import { useProjectsFeatured } from '~/composables/data/useProjects';
import { useProfile } from '~/composables/data/useProfile';

const { t } = useI18n()

const [
    { projects },
    { profile }
] = await Promise.all([
    useProjectsFeatured(),
    useProfile(),
])

useAppHead({
    title: t('pages.home.head.title'),
    description: t('pages.home.head.description'),
    url: '/',
})

</script>
