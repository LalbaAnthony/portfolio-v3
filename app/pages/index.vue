<template>
    <div class="safe-area">
        <section class="mb-12 text-center pt-8">
            <h1 class="title-main">{{ GENERAL_ME_FIRST_NAME }} <b>{{ GENERAL_ME_LAST_NAME }}</b></h1>
            <p class="title-submain">{{ t('home.hero.description') }}</p>
            <div class="flex flex-wrap gap-4 justify-center">
                <Button size="2xl">Get started</Button>
                <Button variant="ghost" size="xl">View docs</Button>
            </div>
        </section>

        <section class="mb-12">
            <span class="title-sub">Size scale</span>
            <div class="flex flex-wrap gap-3 items-center">
                <Button size="xs">XS</Button>
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">X-Large</Button>
                <Button size="2xl">XX-Large</Button>
            </div>
        </section>

        <section class="mb-12">
            <span class="title-sub">Color variants</span>
            <div class="flex flex-wrap gap-3 items-center">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
            </div>
        </section>

        <section class="mb-12">
            <span class="title-sub">Pills (border-radius full)</span>
            <div class="flex flex-wrap gap-3 items-center">
                <Button variant="primary" pill>Primary</Button>
                <Button variant="secondary" pill>Secondary</Button>
                <Button variant="ghost" pill>Ghost</Button>
            </div>
        </section>

        <section class="mb-12">
            <span class="title-sub">With icons</span>
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
            <span class="title-sub">States</span>
            <div class="flex flex-wrap gap-3 items-center">
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
                <Button variant="secondary" loading>Loading…</Button>
                <Button variant="ghost">
                    <Icon name="ic:baseline-lock" size="15" aria-hidden="true" />
                    Locked
                </Button>
            </div>
        </section>

        <section class="mb-12">
            <span class="title-sub">Icon-only buttons</span>
            <div class="flex flex-wrap gap-3 items-center">
                <Button variant="secondary" icon-only aria-label="Home">
                    <Icon name="ic:baseline-home" size="20" aria-hidden="true" />
                </Button>
                <Button variant="secondary" icon-only aria-label="Search">
                    <Icon name="ic:baseline-search" size="20" aria-hidden="true" />
                </Button>
            </div>
        </section>

        <section class="mb-12">
            <span class="title-sub">Glass cards with actions</span>
            <Grid :layouts="{ default: 1, xl: 2 }">
                <Card />
                <Card />
                <Card />
            </Grid>
        </section>
    </div>
</template>

<script setup lang="ts">
import Button from '~/components/atoms/Button.vue';
import Card from '~/components/molecules/Card.vue';
import Grid from '~/components/molecules/Grid.vue';
import { GENERAL_ME_FIRST_NAME, GENERAL_ME_LAST_NAME } from '~/constants/general';

const { t } = useI18n()

useAppHead({
    title: t('home.head.title'),
    description: t('home.head.description'),
    url: '/',
    noindex: false,
})

</script>

<style scoped>
.title-main {
    font-size: 2.75rem;
    font-weight: 300;
    letter-spacing: -.02em;
    text-align: center;
    text-shadow: 0 2px 24px rgba(0, 0, 0, .5);
}

.title-main b {
    font-weight: 700
}

.title-submain {
    text-align: center;
    color: rgba(255, 255, 255, .58);
    font-size: 1rem;
    max-width: 420px;
    margin: 0 auto 2rem;
    line-height: 1.65;
}

.title-sub {
    display: block;
    font-size: 10px;
    letter-spacing: .3em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, .48);
    font-weight: 500;
    margin-bottom: 1.1rem;
}
</style>
