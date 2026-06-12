<template>
  <nav aria-label="breadcrumb" class="my-4">
    <ol class="list-none p-0 m-0 text-sm leading-relaxed">
      <li v-for="(item, index) in breadcrumbs" :key="index"
        class="inline-flex items-center align-middle">
        <NuxtLink v-if="index !== breadcrumbs.length - 1" :to="item.url"
          class="group cursor-pointer flex items-center gap-2">
          <Icon v-if="item.url === '/'" name="ic:baseline-home" size="1.25rem" class="text-white/60" aria-hidden="true" />
          <span class="group-hover:-translate-y-0.5 transition-transform duration-150 font-medium">
            {{ item?.name || 'Page' }}
          </span>
        </NuxtLink>
        <span v-else class="font-base" aria-current="page">
          {{ item?.name || 'Page' }}
        </span>

        <span v-if="index < breadcrumbs.length - 1" class="mx-1 inline-flex items-center" aria-hidden="true">
          <Icon name="ic:baseline-chevron-right" size="1.25em" class="text-white/50" />
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  items: { name?: string | null | undefined; url: string }[],
  home?: boolean
}>(), {
  items: () => [],
  home: true
})

const route = useRoute()

const breadcrumbs = computed(() => {
  const items = []

  if (props.home) {
    items.push({
      name: 'Accueil',
      url: '/'
    })
  }

  if (props.items.length > 0) {
    items.push(...props.items)
    return items
  }

  const urlSegments = route.path.split('/').filter(segment => segment !== '')
  let currenturl = ''

  urlSegments.forEach(segment => {
    currenturl += `/${segment}`

    const name = segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase()) // Capitalize first letter of each word

    items.push({
      name,
      url: currenturl
    })
  })

  return items
})

const breadcrumbJsonLd = computed(() => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: breadcrumbs.value.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    ...(item.url ? { item: item.url } : {}),
  })),
}));

useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify(breadcrumbJsonLd.value),
    },
  ],
});

</script>
