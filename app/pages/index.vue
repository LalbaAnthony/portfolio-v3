<template>
    <div class="safe-area">
        <HomeHero />
        <HomeProjects />
    </div>
</template>

<script setup lang="ts">
import HomeHero from '~/components/organisms/HomeHero.vue';
import HomeProjects from '~/components/organisms/HomeProjects.vue';

const { t } = useI18n()

useAppHead({
    title: t('pages.home.head.title'),
    description: t('pages.home.head.description'),
    url: '/',
    noindex: false,
})

</script>
