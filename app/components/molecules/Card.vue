<template>
    <Container>
        <div class="card-header">
            <Button variant="secondary" size="sm" icon-only aria-label="Notification">
                <Icon name="ic:baseline-notifications" size="17" aria-hidden="true" />
            </Button>
            <div>
                <p class="card-title">New message</p>
                <p class="card-meta">Just now</p>
            </div>
        </div>
        <p class="card-body">Your export is ready to download from the dashboard.</p>
        <div class="flex flex-wrap gap-3 items-center">
            <Button size="sm" style="flex: 1; justify-content: center">Open</Button>
            <Button variant="ghost" size="sm">Dismiss</Button>
        </div>
    </Container>
</template>

<script setup lang="ts">
import Container from '~/components/atoms/Container.vue';
import Button from '~/components/atoms/Button.vue';

</script>

<style scoped>
.card-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: .875rem;
}

.card-spread {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
}

.card-title {
    font-weight: 600;
    font-size: .875rem;
}

.card-meta {
    font-size: .72rem;
    color: rgba(255, 255, 255, .48);
}

.card-body {
    font-size: .82rem;
    color: rgba(255, 255, 255, .68);
    line-height: 1.6;
    margin-bottom: 1rem;
}
</style>