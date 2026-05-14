<template>
  <div class="toast-container">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      :class="['toast', `toast-${toast.type}`]"
    >
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUiStore } from '../stores/ui'

const uiStore = useUiStore()
const toasts = computed(() => uiStore.toasts)
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: var(--space-4);
  right: var(--space-4);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  pointer-events: none;
}

.toast {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  box-shadow: var(--shadow-lg);
  animation: slideIn 0.3s ease;
  min-width: 300px;
  max-width: 400px;
  pointer-events: auto;
}

.toast-success {
  border-left: 4px solid var(--color-success);
}

.toast-error {
  border-left: 4px solid var(--color-danger);
}

.toast-info {
  border-left: 4px solid var(--color-primary);
}

.toast-default {
  border-left: 4px solid var(--color-text-muted);
}

@keyframes slideIn {
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (max-width: 640px) {
  .toast {
    min-width: 280px;
    max-width: 90vw;
  }
}
</style>
