<template>
    <section class="mb-12 text-center pt-8">
        <div class="flex flex-col items-center justify-center gap-2 mb-4">
            <div class="profile-photo mb-4">
                <img />
                <NuxtImg src="/photos/profile_no-bg.png" :alt="`${props.profile?.firstName} ${props.profile?.lastName}`"
                    class="profile-photo__img" placeholder loading="eager" />
            </div>
            <h1 class="text-5xl">
                {{ props.profile?.firstName }} <span class="font-extrabold">{{ props.profile?.lastName }}</span>
            </h1>
            <h2 class="text-3xl font-bold">
                {{ tString(props.profile?.jobTitle) }}
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
import Button from '~/components/atoms/Button.vue'

const props = defineProps<{
    profile: Profile | null;
}>()

const { t } = useI18n()
</script>

<style scoped>
.profile-photo {
    position: relative;
    width: 9rem;
    height: 9rem;
    border-radius: 9999px;
    background: linear-gradient(135deg, var(--glass-white-20) 0%, var(--glass-white-06) 100%);
    backdrop-filter: var(--glass-filter-md);
    -webkit-backdrop-filter: var(--glass-filter-md);
    border: 1px solid var(--glass-white-30);
    overflow: hidden;
}

.profile-photo__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
}
</style>
