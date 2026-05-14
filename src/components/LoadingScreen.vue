<template>
  <div class="loading-screen">
    <div class="loading-container">
      <div class="spinner"></div>
      <h2>{{ currentMessage }}</h2>
      <p>Esto puede tardar 1-2 minutos...</p>
      <div class="progress-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const messages = [
  'Analizando tu perfil...',
  'Buscando el mejor plan para ti...',
  'Calculando macronutrientes...',
  'Buscando los mejores precios...',
  'Optimizando calorías...',
  'Preparando tu dieta personalizada...'
]

const currentMessage = ref(messages[0])
let messageIndex = 0

onMounted(() => {
  const interval = setInterval(() => {
    messageIndex = (messageIndex + 1) % messages.length
    currentMessage.value = messages[messageIndex]
  }, 3000)

  return () => clearInterval(interval)
})
</script>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-container {
  text-align: center;
  animation: fadeIn 0.3s ease;
}

.spinner {
  width: 60px;
  height: 60px;
  margin: 0 auto var(--space-6);
  border: 4px solid rgba(91, 165, 91, 0.1);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

h2 {
  font-size: var(--text-2xl);
  font-weight: 700;
  margin-bottom: var(--space-2);
  color: var(--color-text);
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

p {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  margin-bottom: var(--space-6);
}

.progress-dots {
  display: flex;
  justify-content: center;
  gap: var(--space-2);
}

.progress-dots span {
  width: 10px;
  height: 10px;
  background: var(--color-primary);
  border-radius: 50%;
  animation: bounce 1.4s infinite;
}

.progress-dots span:nth-child(1) {
  animation-delay: 0s;
}

.progress-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.progress-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes bounce {
  0%, 100% {
    opacity: 0.3;
    transform: translateY(0);
  }
  50% {
    opacity: 1;
    transform: translateY(-10px);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
