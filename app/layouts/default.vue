<template>
    <div>
        <header class="glass-container p-2 sticky top-2 z-30 m-1 md:m-2 lg:m-4">
            <div class="flex items-center justify-between">
                <div>
                    <span>{{ GENERAL_FULL_NAME }}</span>
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
import { GENERAL_FULL_NAME } from '~/constants/general';
import type { Language } from '~/types/i18n';

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

function switchLocale(code: Language) {
    navigateTo(switchLocalePath(code))
}
</script>