<template>
    <div class="glass-container p-6">
        <div class="flex items-center mb-1">
            <div class="flex-1">
                <Skeleton height="1.125rem" width="65%" />
            </div>
            <div class="flex gap-1.5 ml-3">
                <Skeleton height="1.125rem" width="3rem" rounded="full" />
                <Skeleton height="1.125rem" width="3rem" rounded="full" />
            </div>
        </div>

        <Skeleton height="0.75rem" width="2.5rem" class="mt-1 mb-3" />

        <Skeleton height="0.875rem" width="92%" class="mb-4" />

        <div class="flex flex-wrap gap-3 items-center">
            <Skeleton height="2rem" class="flex-1" rounded="lg" />
            <Skeleton height="2rem" width="5rem" rounded="lg" />
        </div>
    </div>
</template>

<script setup lang="ts">
import Skeleton from '~/components/atoms/Skeleton.vue'
</script>
