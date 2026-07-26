<template>
    <section class="py-16">
        <div class="mx-auto max-w-6xl px-4 md:px-8">
            <div class="mb-8">
                <Skeleton height="2rem" width="10rem" class="mb-3" />
                <Skeleton height="1rem" width="18rem" />
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                <div
                    v-for="i in 10"
                    :key="i"
                    class="glass-container p-4 flex flex-col items-center gap-3"
                >
                    <Skeleton width="2rem" height="2rem" rounded="md" />
                    <Skeleton height="0.75rem" width="4rem" rounded="full" />
                    <Skeleton height="3px" rounded="full" class="w-full" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import Skeleton from '~/components/atoms/Skeleton.vue'
</script>
