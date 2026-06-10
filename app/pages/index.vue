<template>
    <div>
        <div class="glass-page__overlay" aria-hidden="true" />
        <div class="glass-page__inner">
            <main class="safe-area">
                <div>
                    <select :value="locale"
                        @change="switchLocale(($event.target as HTMLSelectElement).value as Language)">
                        <option v-for="loc in locales" :key="loc.code" :value="loc.code">
                            {{ loc.name }}
                        </option>
                    </select>

                    <h1>{{ t('home.title') }}</h1>
                    <p>{{ t('home.description') }}</p>
                </div>

                <!-- -- Hero --------------------------------------------- -->
                <section class="mb-12 text-center pt-8">
                    <h1>Liquid <b>Glass</b> UI</h1>
                    <p class="sub">Glassmorphism components that blur and refract the world behind them.</p>
                    <div class="flex flex-wrap gap-4 justify-center">
                        <Button size="xxl">Get started</Button>
                        <Button variant="ghost" size="xl">View docs</Button>
                    </div>
                </section>

                <!-- -- Size scale --------------------------------------- -->
                <section class="mb-12">
                    <span class="slbl">Size scale</span>
                    <div class="flex flex-wrap gap-3 items-center">
                        <Button size="xs">XS</Button>
                        <Button size="sm">Small</Button>
                        <Button size="md">Medium</Button>
                        <Button size="lg">Large</Button>
                        <Button size="xl">X-Large</Button>
                        <Button size="xxl">XX-Large</Button>
                    </div>
                </section>

                <!-- -- Color variants ----------------------------------- -->
                <section class="mb-12">
                    <span class="slbl">Color variants</span>
                    <div class="flex flex-wrap gap-3 items-center">
                        <Button variant="primary">Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="ghost">Ghost</Button>
                    </div>
                </section>

                <!-- -- Pills -------------------------------------------- -->
                <section class="mb-12">
                    <span class="slbl">Pills (border-radius full)</span>
                    <div class="flex flex-wrap gap-3 items-center">
                        <Button variant="primary" pill>Primary</Button>
                        <Button variant="secondary" pill>Secondary</Button>
                        <Button variant="ghost" pill>Ghost</Button>
                    </div>
                </section>

                <!-- -- With icons ---------------------------------------- -->
                <section class="mb-12">
                    <span class="slbl">With icons</span>
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

                <!-- -- States ------------------------------------------- -->
                <section class="mb-12">
                    <span class="slbl">States</span>
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

                <!-- -- Icon-only ----------------------------------------- -->
                <section class="mb-12">
                    <span class="slbl">Icon-only buttons</span>
                    <div class="flex flex-wrap gap-3 items-center">
                        <Button variant="secondary" icon-only aria-label="Home">
                            <Icon name="ic:baseline-home" size="20" aria-hidden="true" />
                        </Button>
                        <Button variant="secondary" icon-only aria-label="Search">
                            <Icon name="ic:baseline-search" size="20" aria-hidden="true" />
                        </Button>
                    </div>
                </section>

                <!-- -- Glass cards --------------------------------------- -->
                <section class="mb-12">
                    <span class="slbl">Glass cards with actions</span>
                    <Grid :layouts="{ default: 1, xl: 2 }">
                        <Card />
                        <Card />
                        <Card />
                    </Grid>
                </section>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from '~/components/atoms/Button.vue';
import Card from '~/components/molecules/Card.vue';
import Grid from '~/components/molecules/Grid.vue';
import type { Language } from '~/types/i18n';

const { t, locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

function switchLocale(code: Language) {
    navigateTo(switchLocalePath(code))
}

definePageMeta({
    title: 'Anthony Lalba - Portfolio',
    description: 'A collection of my work, experience, and projects.',
})

</script>

<style scoped>
/* -- Page background --------------------------------------- */

.glass-page__overlay {
    position: fixed;
    inset: 0;
    background:
        /* teal-500 */
        radial-gradient(ellipse 680px 560px at 12% 18%, rgba(20, 184, 166, 0.38) 0%, transparent 70%),
        /* blue-500 */
        radial-gradient(ellipse 720px 620px at 88% 8%, rgba(59, 130, 246, 0.38) 0%, transparent 70%),
        /* amber-500 */
        radial-gradient(ellipse 580px 700px at 75% 82%, rgba(245, 158, 11, 0.32) 0%, transparent 70%),
        /* violet-500 */
        radial-gradient(ellipse 640px 540px at 18% 88%, rgba(139, 92, 246, 0.38) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
}

.glass-page__inner {
    position: relative;
    z-index: 1;
}

.slbl {
    display: block;
    font-size: 10px;
    letter-spacing: .3em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, .48);
    font-weight: 500;
    margin-bottom: 1.1rem;
}


/* -- Hero --------------------------------------------------- */
h1 {
    font-size: 2.75rem;
    font-weight: 300;
    letter-spacing: -.02em;
    text-align: center;
    text-shadow: 0 2px 24px rgba(0, 0, 0, .5);
}

h1 b {
    font-weight: 700
}

.sub {
    text-align: center;
    color: rgba(255, 255, 255, .58);
    font-size: 1rem;
    max-width: 420px;
    margin: 0 auto 2rem;
    line-height: 1.65;
}
</style>
