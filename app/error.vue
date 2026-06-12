<template>

  <div class="glass-page__overlay" aria-hidden="true" />
  <div class="glass-page__inner">
    <main>
      <div class="flex min-h-screen items-center justify-center">
        <div class="w-full max-w-[90%] sm:max-w-md space-y-8 text-center">
          <div>
            <h1 class="text-9xl text-white-300 century-gothic-bold">{{ error.statusCode }}</h1>
            <h2 class="text-3xl text-white mt-8 century-gothic-bold">
              {{ title }}
            </h2>
            <p class="mt-4 text-md text-gray-600">
              {{ description }}
            </p>
          </div>
          <div class="mt-10 space-y-4">
            <Button class="w-full" variant="primary" size="lg" @click="goToHome()">{{ t('routing.home') }}</Button>
            <Button class="w-full" variant="ghost" size="lg" @click="goBack()">{{ t('routing.back') }}</Button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/atoms/Button.vue'
import { goBack, goToHome } from '~/utils/routing'

const props = defineProps<{
  error: {
    statusCode: number;
    message: string;
  };
}>()

const { t } = useI18n()

const isNuxtMessage = computed(() => {
  return props.error.message && (
    props.error.message.toLowerCase().includes('error') ||
    props.error.message.toLowerCase().includes('not') ||
    props.error.message.toLowerCase().includes('nuxt')
  );
});

const title = computed(() => {
  if (!isNuxtMessage.value) { // Si le message d'erreur ne semble pas être un message générique de Nuxt, on l'affiche tel quel
    return props.error.message;
  } else {
    switch (props.error.statusCode) {
      case 400:
        return t('pages.error.400.title');
      case 401:
        return t('pages.error.401.title');
      case 403:
        return t('pages.error.403.title');
      case 404:
        return t('pages.error.404.title');
      case 500:
        return t('pages.error.500.title');
      default:
        return t('pages.error.unknown.title');
    }
  }
});

const description = computed(() => {
  switch (props.error.statusCode) {
    case 400:
      return t('pages.error.400.description');
    case 401:
      return t('pages.error.401.description');
    case 403:
      return t('pages.error.403.description');
    case 404:
      return t('pages.error.404.description');
    case 500:
      return t('pages.error.500.description');
    default:
      return t('pages.error.unknown.description');
  }
});

useAppHead({
  title: `${props.error.statusCode} - ${title.value}`,
})

</script>
