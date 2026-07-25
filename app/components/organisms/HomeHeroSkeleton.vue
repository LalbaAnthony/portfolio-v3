<template>
    <section class="mb-12 text-center pt-8">
        <div class="flex flex-col items-center justify-center gap-2 mb-8">
            <Skeleton height="3rem" width="20rem" />
            <Skeleton height="1.875rem" width="14rem" />
        </div>

        <Skeleton height="1rem" width="60%" class="mx-auto my-4" />

        <div class="flex flex-wrap gap-4 justify-center mt-8">
            <Skeleton height="2.75rem" width="9rem" rounded="lg" />
            <Skeleton height="2.75rem" width="6rem" rounded="lg" />
        </div>
    </section>
</template>

<script setup lang="ts">
import Skeleton from '~/components/atoms/Skeleton.vue'
</script>
