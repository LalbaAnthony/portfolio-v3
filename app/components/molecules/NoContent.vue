<template>
    <div class="flex items-center justify-center h-[300px] sm:h-[350px] md:h-[400px]">
        <div class="text-center space-y-2">
            <Icon :name="props.icon" size="3em" class="mx-auto text-white/80" />
            <p class="text-md text-white/80">{{ props.message }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">

const props = withDefaults(defineProps<{
    icon?: string
    message?: string
}>(), {
    icon: 'mdi:package-variant',
    message: 'No content available.'
});

</script>