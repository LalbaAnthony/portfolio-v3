<template>
    <div class="glass-container p-4 flex flex-col items-center gap-3">
        <Skeleton width="2rem" height="2rem" rounded="md" />
        <Skeleton height="0.75rem" width="4rem" rounded="full" />
        <Skeleton height="3px" rounded="full" class="w-full" />
    </div>
</template>

<script setup lang="ts">
import Skeleton from '~/components/atoms/Skeleton.vue'
</script>