<template>
  <span class="glass-spinner" aria-hidden="true" />
</template>

<style scoped>
.glass-spinner {
  width: 15px;
  height: 15px;
  border: 2px solid rgba(255, 255, 255, .3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: glass-spin .7s linear infinite;
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
}

@keyframes glass-spin {
  to {
    transform: rotate(360deg)
  }
}
</style>
