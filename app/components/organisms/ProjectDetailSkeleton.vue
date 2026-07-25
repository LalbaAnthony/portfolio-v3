<template>
    <div class="mt-4 space-y-4">
        <div class="space-y-2">
            <Skeleton height="0.875rem" width="100%" />
            <Skeleton height="0.875rem" width="100%" />
            <Skeleton height="0.875rem" width="70%" />
        </div>

        <Skeleton height="0.875rem" width="40%" />

        <div class="flex gap-3 flex-wrap">
            <Skeleton height="2rem" width="8rem" rounded="lg" />
            <Skeleton height="2rem" width="8rem" rounded="lg" />
        </div>
    </div>
</template>

<script setup lang="ts">
import Skeleton from '~/components/atoms/Skeleton.vue'
</script>
