<template>
    <div class="glass-card p-6">
        <div class="flex items-center gap-2.5 mb-3.5">
            <Button variant="secondary" size="sm" icon-only aria-label="Notification">
                <Icon name="ic:baseline-notifications" size="17" aria-hidden="true" />
            </Button>
            <div>
                <p class="font-semibold text-sm">New message</p>
                <p class="text-xs text-white/50">Just now</p>
            </div>
        </div>
        <p class="text-sm text-white/70 mb-4">Your export is ready to download from the dashboard.
        </p>
        <div class="flex flex-wrap gap-3 items-center">
            <Button size="sm" class="flex-1">Open</Button>
            <Button variant="ghost" size="sm">Dismiss</Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from '~/components/atoms/Button.vue';

</script>
