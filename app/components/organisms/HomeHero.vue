<template>
    <section class="mb-12 text-center pt-8">
        <h1 class="title-1 align-center text-5xl my-4">
            {{ GENERAL_ME_FIRST_NAME }} <span class="font-extrabold">{{ GENERAL_ME_LAST_NAME }}</span>
        </h1>
        <p class="text-white/60 align-center my-4">{{ t('pages.home.hero.description') }}</p>

        <div class="flex flex-wrap gap-4 justify-center mt-8">
            <Button size="xl">Get started</Button>
            <Button variant="ghost" size="xl">View docs</Button>
        </div>
    </section>
</template>

<script setup lang="ts">
import { GENERAL_ME_FIRST_NAME, GENERAL_ME_LAST_NAME } from '~/constants/general';
import Button from '../atoms/Button.vue';

const { t } = useI18n()

</script>