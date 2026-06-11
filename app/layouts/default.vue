<template>
    <div>
        <header class="glass-card p-2 sticky top-0 z-30 m-1 md:m-2 lg:m-4">
            <div class="flex items-center justify-between">
                <div>
                    <span>Anthony Lalba</span>
                </div>

                <nav class="max-w-xl flex items-center justify-end gap-2 md:gap-4">
                    <select :value="locale"
                        @change="switchLocale(($event.target as HTMLSelectElement).value as Language)">
                        <option v-for="loc in locales" :key="loc.code" :value="loc.code">
                            {{ loc.name }}
                        </option>
                    </select>
                    <Button>Normal</Button>
                    <Button>Normal</Button>
                </nav>
            </div>
        </header>

        <div class="glass-page__overlay" aria-hidden="true" />
        <div class="glass-page__inner">
            <main>
                <slot />
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from '~/components/atoms/Button.vue';
import type { Language } from '~/types/i18n';

const { t, locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

function switchLocale(code: Language) {
    navigateTo(switchLocalePath(code))
}
</script>