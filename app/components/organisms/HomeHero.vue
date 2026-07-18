<template>
    <section class="mb-12 text-center pt-8">
        <div class="flex flex-col items-center justify-center gap-2 mb-8">
            <h1 class="text-5xl">
                {{ props.profile?.firstName }} <span class="font-extrabold">{{ props.profile?.lastName }}</span>
            </h1>
            <h2 class="text-3xl font-bold title-rainbow">
                {{ props.profile?.jobTitle }}
            </h2>
        </div>

        <p class="text-white/60 align-center my-4">{{ t('pages.home.hero.description') }}</p>

        <div class="flex flex-wrap gap-4 justify-center mt-8">
            <Button size="lg" icon="ic:baseline-download">{{ t('pages.home.hero.resume') }}</Button>
            <Button size="lg" variant="ghost">{{ t('pages.home.hero.more') }}</Button>
        </div>
    </section>
</template>

<script setup lang="ts">
import Button from '../atoms/Button.vue';

const props = defineProps<{
    profile: Profile | null;
}>()

const { t } = useI18n()

</script>