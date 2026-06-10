<template>
    <div>
        <select :value="locale" @change="switchLocale(($event.target as HTMLSelectElement).value)">
            <option v-for="loc in locales" :key="loc.code" :value="loc.code">
                {{ loc.name }}
            </option>
        </select>

        <h1>{{ t('home.title') }}</h1>
        <p>{{ t('home.description') }}</p>
    </div>
</template>

<script setup lang="ts">
import type { Language } from '~/types/i18n';

const { t, locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

function switchLocale(code: string) {
    navigateTo(switchLocalePath(code as Language))
}
</script>
