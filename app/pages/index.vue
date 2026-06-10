<template>
    <div class="glass-page">
        <div class="glass-page__overlay" aria-hidden="true" />

        <div class="glass-page__inner">
            <main class="glass-main">

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

                <!-- ── Hero ───────────────────────────────────────────── -->
                <section class="sec text-center pt-8">
                    <h1>Liquid <b>Glass</b> UI</h1>
                    <p class="sub">Glassmorphism components that blur and refract the world behind them.</p>
                    <div class="hero-actions">
                        <Button size="xxl">Get started</Button>
                        <Button variant="ghost" size="xl">View docs</Button>
                    </div>
                </section>

                <!-- ── Size scale ─────────────────────────────────────── -->
                <section class="sec">
                    <span class="slbl">Size scale</span>
                    <div class="row">
                        <Button size="xs">XS</Button>
                        <Button size="sm">Small</Button>
                        <Button size="md">Medium</Button>
                        <Button size="lg">Large</Button>
                        <Button size="xl">X-Large</Button>
                        <Button size="xxl">XX-Large</Button>
                    </div>
                </section>

                <!-- ── Color variants ─────────────────────────────────── -->
                <section class="sec">
                    <span class="slbl">Color variants</span>
                    <div class="row">
                        <Button variant="primary">Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="ghost">Ghost</Button>
                    </div>
                </section>

                <!-- ── Pills ──────────────────────────────────────────── -->
                <section class="sec">
                    <span class="slbl">Pills (border-radius full)</span>
                    <div class="row">
                        <Button variant="primary" pill>Primary</Button>
                        <Button variant="secondary" pill>Secondary</Button>
                        <Button variant="ghost" pill>Ghost</Button>
                    </div>
                </section>

                <!-- ── With icons ──────────────────────────────────────── -->
                <section class="sec">
                    <span class="slbl">With icons</span>
                    <div class="row">
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

                <!-- ── States ─────────────────────────────────────────── -->
                <section class="sec">
                    <span class="slbl">States</span>
                    <div class="row">
                        <Button>Normal</Button>
                        <Button disabled>Disabled</Button>
                        <Button variant="secondary" loading>Loading…</Button>
                        <Button variant="ghost">
                            <Icon name="ic:baseline-lock" size="15" aria-hidden="true" />
                            Locked
                        </Button>
                    </div>
                </section>

                <!-- ── Icon-only ───────────────────────────────────────── -->
                <section class="sec">
                    <span class="slbl">Icon-only buttons</span>
                    <div class="row flex-wrap">
                        <Button variant="secondary" icon-only aria-label="Home">
                            <Icon name="ic:baseline-home" size="20" aria-hidden="true" />
                        </Button>
                        <Button variant="secondary" icon-only aria-label="Search">
                            <Icon name="ic:baseline-search" size="20" aria-hidden="true" />
                        </Button>
                    </div>
                </section>

                <!-- ── Glass cards ─────────────────────────────────────── -->
                <section class="sec">
                    <span class="slbl">Glass cards with actions</span>
                    <div class="card-grid">

                        <GlassCard>
                            <div class="card-header">
                                <Button variant="secondary" size="sm" icon-only aria-label="Notification">
                                    <Icon name="ic:baseline-notifications" size="17" aria-hidden="true" />
                                </Button>
                                <div>
                                    <p class="card-title">New message</p>
                                    <p class="card-meta">Just now</p>
                                </div>
                            </div>
                            <p class="card-body">Your export is ready to download from the dashboard.</p>
                            <div class="row">
                                <Button size="sm" style="flex: 1; justify-content: center">Open</Button>
                                <Button variant="ghost" size="sm">Dismiss</Button>
                            </div>
                        </GlassCard>
                    </div>
                </section>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from '~/components/atoms/Button.vue';
import GlassCard from '~/components/atoms/GlassCard.vue';
import type { Language } from '~/types/i18n';

const { t, locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

function switchLocale(code: Language) {
    navigateTo(switchLocalePath(code))
}

</script>

<style scoped>
/* ── Page background ─────────────────────────────────────── */
.glass-page {
    position: relative;
    min-height: 100vh;
    color: white;
    background-color: #1e0f3c;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.glass-page__overlay {
    position: fixed;
    inset: 0;
    background: linear-gradient(135deg, rgba(40, 10, 100, .58) 0%, rgba(10, 40, 100, .42) 50%, rgba(70, 10, 70, .48) 100%);
    pointer-events: none;
    z-index: 0;
}

.glass-page__inner {
    position: relative;
    z-index: 1;
}

/* ── Layout ───────────────────────────────────────────────── */
.glass-main {
    padding: 2rem 1.5rem;
    max-width: 700px;
    margin: 0 auto;
}

.sec {
    margin-bottom: 3rem
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

.row {
    display: flex;
    flex-wrap: wrap;
    gap: .75rem;
    align-items: center;
}

/* ── Hero ─────────────────────────────────────────────────── */
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

.hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
}

/* ── Cards ────────────────────────────────────────────────── */
.card-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

@media (max-width: 560px) {
    .card-grid {
        grid-template-columns: 1fr
    }
}

.col-span {
    grid-column: 1 / -1
}

.card-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: .875rem;
}

.card-spread {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
}

.card-title {
    font-weight: 600;
    font-size: .875rem;
}

.card-meta {
    font-size: .72rem;
    color: rgba(255, 255, 255, .48);
}

.card-body {
    font-size: .82rem;
    color: rgba(255, 255, 255, .68);
    line-height: 1.6;
    margin-bottom: 1rem;
}
</style>
