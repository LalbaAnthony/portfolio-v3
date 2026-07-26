<template>
    <section class="py-16">
        <div class="mx-auto max-w-6xl px-4 md:px-8">
            <div class="mb-10">
                <Skeleton height="2rem" width="14rem" class="mb-3" />
                <Skeleton height="1rem" width="22rem" />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div v-for="col in 2" :key="col">
                    <Skeleton height="0.75rem" width="6rem" class="mb-6" rounded="full" />
                    <div class="flex flex-col gap-6">
                        <div v-for="i in 3" :key="i" class="pl-6">
                            <Skeleton height="0.65rem" width="8rem" class="mb-2" rounded="full" />
                            <Skeleton height="0.875rem" width="10rem" class="mb-1.5" />
                            <Skeleton height="0.75rem" width="6rem" class="mb-3" />
                            <Skeleton height="0.65rem" width="100%" class="mb-1" rounded="full" />
                            <Skeleton height="0.65rem" width="80%" rounded="full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import Skeleton from '~/components/atoms/Skeleton.vue'
</script>
