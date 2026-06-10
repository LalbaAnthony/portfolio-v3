<template>
  <div class="glass-card">
    <slot />
  </div>
</template>

<style scoped>
.glass-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, .17) 0%, rgba(255, 255, 255, .06) 100%);
  backdrop-filter: blur(30px) saturate(180%);
  -webkit-backdrop-filter: blur(30px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, .32);
  border-bottom-color: rgba(255, 255, 255, .1);
  border-radius: 1rem;
  padding: 1.5rem;
  color: #fff;
}
</style>
