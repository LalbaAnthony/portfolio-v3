<template>
    <section class="py-16">
        <div class="mx-auto max-w-6xl px-4 md:px-8">
            <div class="mb-8">
                <Skeleton height="2rem" width="10rem" class="mb-3" />
                <Skeleton height="1rem" width="18rem" />
            </div>

            <Grid :layouts="{ default: 1, sm: 2, md: 3 }">
                <ProjectCardSkeleton v-for="i in 3" :key="i" />
            </Grid>
        </div>
    </section>
</template>

<script setup lang="ts">
import Skeleton from '~/components/atoms/Skeleton.vue'
import Grid from '~/components/molecules/Grid.vue'
</script>
