<template>
    <div class="safe-area">
        <section class="mb-12 text-center pt-8">
            <h1 class="title-1 align-center text-5xl">{{ GENERAL_ME_FIRST_NAME }} <b>{{ GENERAL_ME_LAST_NAME }}</b></h1>
            <p class="text-white/60 align-center my-2">{{ t('pages.home.hero.description') }}</p>
            <div class="flex flex-wrap gap-4 justify-center">
                <Button size="2xl">Get started</Button>
                <Button variant="ghost" size="xl">View docs</Button>
            </div>
        </section>

        <section class="mb-12">
            <div class="flex flex-wrap gap-3 items-center">
                <Button icon="ic:baseline-download" size="xs">XS</Button>
                <Button icon="ic:baseline-download" size="sm">Small</Button>
                <Button icon="ic:baseline-download" size="md">Medium</Button>
                <Button icon="ic:baseline-download" size="lg">Large</Button>
                <Button icon="ic:baseline-download" size="xl">X-Large</Button>
                <Button icon="ic:baseline-download" size="2xl">XX-Large</Button>
            </div>
        </section>

        <section class="mb-12">
            <div class="flex flex-wrap gap-3 items-center">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
            </div>
        </section>

        <section class="mb-12">
            <div class="flex flex-wrap gap-3 items-center">
                <Button variant="primary" pill>Primary</Button>
                <Button variant="secondary" pill>Secondary</Button>
                <Button variant="ghost" pill>Ghost</Button>
            </div>
        </section>

        <section class="mb-12">
            <div class="flex flex-wrap gap-3 items-center">
                <Button variant="primary">
                    <Icon name="ic:baseline-download" size="15" aria-hidden="true" />
                    Download
                </Button>
                <Button variant="secondary">
                    <Icon name="ic:baseline-share" size="15" aria-hidden="true" />
                    Share
                </Button>
            </div>
        </section>

        <section class="mb-12">
            <div class="flex flex-wrap gap-3 items-center">
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
                <Button variant="secondary" loading>Loading…</Button>
            </div>
        </section>

        <section class="mb-12">
            <div class="flex flex-wrap gap-3 items-center">
                <Button variant="secondary" icon-only aria-label="Home">
                    <Icon name="ic:baseline-home" size="20" aria-hidden="true" />
                </Button>
                <Button variant="secondary" icon-only aria-label="Search">
                    <Icon name="ic:baseline-search" size="20" aria-hidden="true" />
                </Button>
            </div>
        </section>

    </div>
</template>

<script setup lang="ts">
import Button from '~/components/atoms/Button.vue';
import { GENERAL_ME_FIRST_NAME, GENERAL_ME_LAST_NAME } from '~/constants/general';

const { t } = useI18n()

useAppHead({
    title: t('pages.home.head.title'),
    description: t('pages.home.head.description'),
    url: '/',
    noindex: false,
})

</script>
