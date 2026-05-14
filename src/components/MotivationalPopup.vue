<template>
  <Transition>
    <div v-if="isVisible" class="motivational-popup">
      <button @click="close" class="close-btn">✕</button>
      <div class="popup-content">
        <div class="icon">{{ currentMessage.icon }}</div>
        <h3>{{ currentMessage.title }}</h3>
        <p>{{ currentMessage.message }}</p>
        <div v-if="messages.length > 1" class="dots">
          <span 
            v-for="(msg, idx) in messages" 
            :key="idx"
            :class="{ active: idx === currentIndex }"
            @click="currentIndex = idx"
          ></span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  messages: {
    type: Array,
    default: () => [
      { icon: '🍽️', title: 'Hoy cocinarás...', message: 'Unos deliciosos espaguetis a la boloñesa con ensalada fresca' },
      { icon: '💰', title: 'Ahorros del día', message: 'Has ahorrado €8,50 comparado con comer fuera' },
      { icon: '⏱️', title: 'Tiempo es oro', message: 'Solo necesitarás 25 minutos para preparar hoy tu menú' }
    ]
  }
})

const isVisible = ref(true)
const currentIndex = ref(0)

const currentMessage = computed(() => props.messages[currentIndex.value] || props.messages[0])

const close = () => {
  isVisible.value = false
}

defineExpose({
  show: () => { isVisible.value = true; currentIndex.value = 0 },
  close
})
</script>

<style scoped>
.motivational-popup {
  position: fixed;
  top: 100px;
  right: 20px;
  width: 320px;
  background: linear-gradient(135deg, var(--color-primary) 0%, #7fc97f 100%);
  color: white;
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: 0 8px 24px rgba(91, 165, 91, 0.3);
  z-index: 1000;
  animation: slideInRight 0.3s ease;
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.close-btn:hover {
  opacity: 1;
}

.popup-content {
  text-align: center;
}

.icon {
  font-size: 3rem;
  margin-bottom: var(--space-3);
}

h3 {
  font-size: var(--text-lg);
  font-weight: 700;
  margin-bottom: var(--space-2);
  margin: var(--space-2) 0;
}

p {
  font-size: var(--text-sm);
  opacity: 0.95;
  margin: 0;
  line-height: 1.5;
}

.dots {
  display: flex;
  justify-content: center;
  gap: var(--space-2);
  margin-top: var(--space-4);
}

.dots span {
  width: 8px;
  height: 8px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.2s;
}

.dots span.active {
  background: white;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}

.v-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.v-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 640px) {
  .motivational-popup {
    top: auto;
    bottom: 20px;
    right: 10px;
    left: 10px;
    width: auto;
  }
}
</style>
