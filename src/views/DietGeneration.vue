<template>
  <div class="diet-generation-view">
    <LoadingScreen v-if="isLoading" />
    
    <div v-else class="container py-8">
      <h1>🤖 Generar nueva dieta</h1>
      <p class="subtitle">Usamos los datos que ya completaste en el onboarding</p>

      <div class="summary-panel">
        <div class="summary-header">
          <div>
            <h2>Tu perfil está listo</h2>
            <p>Ahora generamos directamente tu plan sin volver a pedirte lo mismo.</p>
          </div>
          <div class="summary-badge">Listo para generar</div>
        </div>

        <div class="summary-grid">
          <div class="summary-card">
            <span class="summary-label">Objetivo</span>
            <strong>{{ profile.goalLabel }}</strong>
          </div>
          <div class="summary-card">
            <span class="summary-label">Peso / Altura</span>
            <strong>{{ profile.weight }} kg · {{ profile.height }} cm</strong>
          </div>
          <div class="summary-card">
            <span class="summary-label">Edad</span>
            <strong>{{ profile.age }} años</strong>
          </div>
          <div class="summary-card">
            <span class="summary-label">Presupuesto</span>
            <strong>{{ profile.budget }}€ / semana</strong>
          </div>
          <div class="summary-card">
            <span class="summary-label">Restricciones</span>
            <strong>{{ profile.restrictionsText }}</strong>
          </div>
          <div class="summary-card">
            <span class="summary-label">Tiempo cocina</span>
            <strong>{{ profile.cookingTimeText }}</strong>
          </div>
        </div>

        <div class="summary-note">
          <p>La dieta se generará con tu perfil guardado y luego podrás revisarla, ajustarla y comprar desde la lista optimizada.</p>
        </div>

        <button @click="generateDiet" class="btn btn-primary btn-lg" style="width: 100%;">
          ✨ Generar mi dieta
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useOnboardingStore } from '../stores/onboarding'
import { useUIStore } from '../stores/ui'
import LoadingScreen from '../components/LoadingScreen.vue'

const router = useRouter()
const authStore = useAuthStore()
const onboardingStore = useOnboardingStore()
const uiStore = useUIStore()

const isLoading = ref(false)

const goalLabels = {
  lose_weight: 'Perder peso',
  maintain: 'Mantener',
  gain_muscle: 'Ganar músculo'
}

const restrictionLabels = {
  vegetarian: 'Vegetariano',
  vegan: 'Vegano',
  gluten_free: 'Sin gluten',
  dairy_free: 'Sin lactosa',
  shellfish: 'Sin mariscos',
  nut_free: 'Sin frutos secos'
}

const timeLabels = {
  low: 'Poco tiempo',
  medium: 'Tiempo medio',
  high: 'Mucho tiempo'
}

const profile = computed(() => {
  const user = authStore.user || {}
  const formData = onboardingStore.formData
  const restrictions = formData.restrictions || []

  return {
    goalLabel: goalLabels[formData.goal || user.goal || 'maintain'] || 'Mantener',
    weight: formData.weight || user.weight || '-',
    height: formData.height || user.height || '-',
    age: formData.age || user.age || '-',
    budget: formData.budget || user.budget || '-',
    restrictionsText: restrictions.length
      ? restrictions.map(value => restrictionLabels[value] || value).join(', ')
      : 'Sin restricciones',
    cookingTimeText: timeLabels[formData.cookingTime || user.cookingTime || 'medium'] || 'Tiempo medio'
  }
})

const generateDiet = () => {
  isLoading.value = true
  
  // Generación breve para pasar directamente a la dieta
  setTimeout(() => {
    isLoading.value = false
    uiStore.addToast('¡Dieta generada con éxito!', 'success', 3000)
    router.push('/diet')
  }, 2200)
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

.summary-panel {
  max-width: 820px;
  margin: 0 auto;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  box-shadow: var(--shadow-card);
}

.summary-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.summary-header h2 {
  margin-bottom: var(--space-2);
}

.summary-header p {
  margin: 0;
  color: var(--color-text-muted);
}

.summary-badge {
  background: var(--color-primary-bg);
  color: var(--color-primary-dark);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: 700;
  white-space: nowrap;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.summary-card {
  background: var(--color-bg);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-4);
}

.summary-label {
  display: block;
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin-bottom: var(--space-2);
  text-transform: uppercase;
  font-weight: 700;
}

.summary-card strong {
  font-size: var(--text-base);
}

.summary-note {
  margin-bottom: var(--space-6);
  padding: var(--space-4);
  background: rgba(91, 165, 91, 0.08);
  border-radius: var(--radius-md);
}

.summary-note p {
  margin: 0;
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
