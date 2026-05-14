<template>
  <div class="diet-generation-view">
    <LoadingScreen v-if="isLoading" />
    
    <div v-else class="container py-8">
      <h1>🤖 Generar nueva dieta</h1>
      <p class="subtitle">Personaliza tu plan semanal</p>

      <div class="form-container">
        <div class="form-section">
          <h2>1. Objetivo</h2>
          <div class="options">
            <label v-for="opt in goals" :key="opt.value" class="option-card">
              <input v-model="form.goal" type="radio" :value="opt.value">
              <span class="icon">{{ opt.icon }}</span>
              <span class="label">{{ opt.label }}</span>
            </label>
          </div>
        </div>

        <div class="form-section">
          <h2>2. Restricciones</h2>
          <div class="options">
            <label v-for="rest in restrictions" :key="rest.value" class="checkbox-card">
              <input v-model="form.restrictions" type="checkbox" :value="rest.value">
              <span class="icon">{{ rest.icon }}</span>
              <span class="label">{{ rest.label }}</span>
            </label>
          </div>
        </div>

        <div class="form-section">
          <h2>3. Presupuesto</h2>
          <div class="range-input">
            <input v-model.number="form.budget" type="range" min="20" max="150" step="5">
            <span class="range-value">{{ form.budget }}€ / semana</span>
          </div>
        </div>

        <button @click="generateDiet" class="btn btn-primary btn-lg" style="width: 100%;">
          ✨ Generar mi dieta
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUIStore } from '../stores/ui'
import LoadingScreen from '../components/LoadingScreen.vue'

const router = useRouter()
const uiStore = useUIStore()

const isLoading = ref(false)

const goals = [
  { value: 'lose_weight', label: 'Perder peso', icon: '📉' },
  { value: 'maintain', label: 'Mantener', icon: '⚖️' },
  { value: 'gain_muscle', label: 'Ganar músculo', icon: '💪' }
]

const restrictions = [
  { value: 'vegetarian', label: 'Vegetariano', icon: '🥗' },
  { value: 'vegan', label: 'Vegano', icon: '🌱' },
  { value: 'gluten_free', label: 'Sin gluten', icon: '🌾' },
  { value: 'dairy_free', label: 'Sin lactosa', icon: '🥛' }
]

const form = ref({
  goal: 'lose_weight',
  restrictions: [],
  budget: 60
})

const generateDiet = () => {
  isLoading.value = true
  
  // Simular 90 segundos (1.5 minutos) de procesamiento
  setTimeout(() => {
    isLoading.value = false
    uiStore.addToast('¡Dieta generada con éxito!', 'success', 3000)
    router.push('/diet')
  }, 90000)
}
</script>

<style scoped>
.diet-generation-view {
  padding: var(--space-8) 0;
  min-height: calc(100vh - var(--navbar-height));
}

.py-8 {
  padding: var(--space-8) 0;
}

.diet-generation-view h1 {
  font-size: var(--text-3xl);
  font-weight: 800;
  margin-bottom: var(--space-2);
}

.subtitle {
  font-size: var(--text-lg);
  color: var(--color-text-muted);
  margin-bottom: var(--space-10);
}

.form-container {
  max-width: 600px;
  margin: 0 auto;
}

.form-section {
  margin-bottom: var(--space-10);
}

.form-section h2 {
  font-size: var(--text-lg);
  margin-bottom: var(--space-4);
}

.options {
  display: grid;
  gap: var(--space-4);
}

.option-card,
.checkbox-card {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4);
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-base);
}

.option-card:hover,
.checkbox-card:hover {
  border-color: var(--color-primary);
}

.option-card input:checked ~ .icon,
.option-card input:checked ~ .label,
.checkbox-card input:checked ~ .icon,
.checkbox-card input:checked ~ .label {
  color: var(--color-primary);
}

.option-card input,
.checkbox-card input {
  margin: 0;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.icon {
  font-size: 1.5rem;
}

.label {
  font-weight: 600;
}

.range-input {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.range-input input {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: var(--color-border);
  outline: none;
  -webkit-appearance: none;
}

.range-input input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--color-primary);
  cursor: pointer;
}

.range-input input::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--color-primary);
  cursor: pointer;
  border: none;
}

.range-value {
  font-weight: 600;
  white-space: nowrap;
}
</style>
