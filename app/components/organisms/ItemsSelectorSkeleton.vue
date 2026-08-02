<template>
    <div class="flex flex-wrap gap-2">
        <Skeleton v-for="width in widths" :key="width" height="2rem" :width="width" rounded="full" />
    </div>
</template>

<script setup lang="ts">
import Skeleton from '~/components/atoms/Skeleton.vue'

const widths = ['4.5rem', '5.5rem', '3.5rem', '6rem', '4rem', '5rem', '4.5rem', '3.5rem']
</script>
