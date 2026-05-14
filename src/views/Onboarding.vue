<template>
  <div class="onboarding-view">
    <div class="container py-8">
      <h1>🚀 Bienvenido a Dietopia</h1>
      <p class="subtitle">Vamos a personalizar tu experiencia en {{ totalSteps }} pasos</p>

      <!-- Barra de progreso -->
      <div class="progress-section">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: getProgressPercentage() + '%' }"></div>
        </div>
        <p class="progress-text">Paso {{ currentStep }} de {{ totalSteps }}</p>
      </div>

      <div class="step-content">
        <!-- PARTE 1: DATOS ESENCIALES -->
        <div v-if="currentStep === 1" class="form-section">
          <h2>📋 Cuéntanos sobre ti</h2>
          <p class="form-description">Datos básicos para generar tu dieta inicial</p>
          <div class="form-group">
            <label>Peso (kg)</label>
            <input v-model.number="formData.weight" type="number" class="form-input" placeholder="ej: 75">
          </div>
          <div class="form-group">
            <label>Altura (cm)</label>
            <input v-model.number="formData.height" type="number" class="form-input" placeholder="ej: 175">
          </div>
          <div class="form-group">
            <label>Edad</label>
            <input v-model.number="formData.age" type="number" class="form-input" placeholder="ej: 28">
          </div>
        </div>

        <div v-else-if="currentStep === 2" class="form-section">
          <h2>🎯 ¿Cuál es tu objetivo?</h2>
          <label v-for="goal in goals" :key="goal.value" class="radio-card">
            <input v-model="formData.goal" type="radio" :value="goal.value">
            <span class="icon">{{ goal.icon }}</span>
            <div>
              <span class="label">{{ goal.label }}</span>
              <p>{{ goal.description }}</p>
            </div>
          </label>
        </div>

        <div v-else-if="currentStep === 3" class="form-section">
          <h2>⚠️ Restricciones dietéticas</h2>
          <p class="form-description">Selecciona las que apliquen a ti</p>
          <div class="restrictions">
            <label v-for="rest in restrictions" :key="rest.value" class="checkbox-card">
              <input v-model="formData.restrictions" type="checkbox" :value="rest.value">
              <span class="icon">{{ rest.icon }}</span>
              <span class="label">{{ rest.label }}</span>
            </label>
          </div>
        </div>

        <div v-else-if="currentStep === 4" class="form-section">
          <h2>💰 Presupuesto y planificación</h2>
          <div class="form-group">
            <label>Presupuesto semanal (€)</label>
            <input v-model.number="formData.budget" type="number" class="form-input" placeholder="ej: 60">
          </div>
          <div class="form-group">
            <label>¿Cómo prefieres planificar?</label>
            <div class="radio-group">
              <label class="radio-option">
                <input v-model="formData.planningType" type="radio" value="weekly">
                <span>📅 Semanal</span>
              </label>
              <label class="radio-option">
                <input v-model="formData.planningType" type="radio" value="monthly">
                <span>📆 Mensual</span>
              </label>
            </div>
          </div>
        </div>

        <!-- PARTE 2: DATOS REFINADOS (después de completar parte 1) -->
        <div v-else-if="currentStep === 5" class="form-section">
          <h2>⏱️ Tiempo disponible</h2>
          <p class="form-description">Datos para optimizar tu dieta</p>
          <div class="form-group">
            <label>Tiempo disponible para cocinar</label>
            <select v-model="formData.cookingTime" class="form-input">
              <option value="">Selecciona...</option>
              <option value="low">Muy poco (menos de 15 min)</option>
              <option value="medium">Medio (15-30 min)</option>
              <option value="high">Mucho (más de 30 min)</option>
            </select>
          </div>
          <div class="form-group">
            <label>Tiempo para compra y planificación</label>
            <select v-model="formData.shoppingTime" class="form-input">
              <option value="">Selecciona...</option>
              <option value="low">Muy poco (menos de 1 hora)</option>
              <option value="medium">Medio (1-2 horas)</option>
              <option value="high">Mucho (más de 2 horas)</option>
            </select>
          </div>
        </div>

        <div v-else-if="currentStep === 6" class="form-section">
          <h2>🏃 Actividad física y preferencias</h2>
          <div class="form-group">
            <label>¿Realizas actividad física?</label>
            <div class="radio-group">
              <label class="radio-option">
                <input v-model="formData.physicalActivity" type="radio" value="no">
                <span>❌ No</span>
              </label>
              <label class="radio-option">
                <input v-model="formData.physicalActivity" type="radio" value="yes">
                <span>✅ Sí</span>
              </label>
            </div>
          </div>
          <div v-if="formData.physicalActivity === 'yes'" class="form-group">
            <label>Tipo de actividad</label>
            <select v-model="formData.activityType" class="form-input">
              <option value="">Selecciona...</option>
              <option value="cardio">🏃 Cardio</option>
              <option value="strength">💪 Fuerza</option>
              <option value="mixed">🤸 Mixto</option>
            </select>
          </div>
          <div class="form-group">
            <label>¿Para cuántas personas planificas?</label>
            <input v-model.number="formData.peopleCount" type="number" class="form-input" min="1" placeholder="1">
          </div>
        </div>
      </div>

      <div class="step-actions">
        <button v-if="currentStep > 1" @click="previousStep" class="btn btn-outline btn-lg">← Anterior</button>
        <button v-if="currentStep < totalSteps" @click="nextStep" :disabled="!canProceed" class="btn btn-primary btn-lg">
          Siguiente →
        </button>
        <button v-else @click="finishOnboarding" class="btn btn-primary btn-lg">✅ Finalizar y empezar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useOnboardingStore } from '../stores/onboarding'
import { useAuthStore } from '../stores/auth'
import { useUIStore } from '../stores/ui'

const router = useRouter()
const authStore = useAuthStore()
const uiStore = useUIStore()
const onboardingStore = useOnboardingStore()

const currentStep = computed(() => onboardingStore.currentStep)
const totalSteps = computed(() => onboardingStore.totalSteps)
const formData = computed(() => onboardingStore.formData)

const getProgressPercentage = () => onboardingStore.getProgressPercentage()

const goals = [
  { value: 'lose_weight', label: 'Perder peso', description: 'Bajar de peso de forma saludable', icon: '📉' },
  { value: 'maintain', label: 'Mantener', description: 'Estabilizar peso actual', icon: '⚖️' },
  { value: 'gain_muscle', label: 'Ganar músculo', description: 'Aumentar masa muscular', icon: '💪' }
]

const restrictions = [
  { value: 'vegetarian', label: 'Vegetariano', icon: '🥗' },
  { value: 'vegan', label: 'Vegano', icon: '🌱' },
  { value: 'gluten_free', label: 'Sin gluten', icon: '🌾' },
  { value: 'dairy_free', label: 'Sin lactosa', icon: '🥛' },
  { value: 'shellfish', label: 'Sin mariscos', icon: '🦐' },
  { value: 'nut_free', label: 'Sin frutos secos', icon: '🥜' }
]

const canProceed = computed(() => {
  const { weight, height, age, goal, budget, planningType, cookingTime, shoppingTime, physicalActivity } = formData.value
  
  switch (currentStep.value) {
    case 1:
      return weight && height && age
    case 2:
      return goal
    case 3:
      return true
    case 4:
      return budget && planningType
    case 5:
      return cookingTime && shoppingTime
    case 6:
      return physicalActivity !== ''
    default:
      return false
  }
})

const nextStep = () => {
  if (canProceed.value) {
    onboardingStore.nextStep()
  } else {
    uiStore.addToast('Por favor completa todos los campos', 'error', 3000)
  }
}

const previousStep = () => {
  onboardingStore.previousStep()
}

const finishOnboarding = async () => {
  if (!authStore.user) return

  await authStore.updateUser({
    weight: formData.value.weight,
    height: formData.value.height,
    age: formData.value.age,
    goal: formData.value.goal,
    restrictions: formData.value.restrictions,
    budget: formData.value.budget,
    planningType: formData.value.planningType,
    cookingTime: formData.value.cookingTime,
    shoppingTime: formData.value.shoppingTime,
    physicalActivity: formData.value.physicalActivity,
    activityType: formData.value.activityType,
    peopleCount: formData.value.peopleCount,
    profileCompleted: true,
    onboardingCompleted: true
  })

  uiStore.addToast('¡Perfil configurado! Bienvenido a Dietopia', 'success', 3000)
  onboardingStore.resetOnboarding()
  router.push('/diet-generation')
}
</script>

<style scoped>
.onboarding-view {
  padding: var(--space-8) 0;
  min-height: calc(100vh - var(--navbar-height));
  background: linear-gradient(135deg, var(--color-bg) 0%, #fafafa 100%);
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

.py-8 {
  padding: var(--space-8) 0;
}

.onboarding-view h1 {
  font-size: var(--text-4xl);
  font-weight: 800;
  margin-bottom: var(--space-2);
  text-align: center;
}

.subtitle {
  font-size: var(--text-lg);
  color: var(--color-text-muted);
  margin-bottom: var(--space-10);
  text-align: center;
}

/* Barra de Progreso */
.progress-section {
  margin-bottom: var(--space-10);
}

.progress-bar {
  height: 8px;
  background: var(--color-border);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: var(--space-3);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), #7fc97f);
  transition: width 0.3s ease;
  border-radius: 10px;
}

.progress-text {
  text-align: center;
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  font-weight: 600;
}

.step-content {
  min-height: 350px;
  margin-bottom: var(--space-10);
}

.form-section {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  animation: fade-in 0.3s ease;
}

.form-section h2 {
  font-size: var(--text-2xl);
  font-weight: 700;
  margin-bottom: var(--space-2);
  color: var(--color-text);
}

.form-description {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  margin-bottom: var(--space-6);
}

.form-group {
  margin-bottom: var(--space-6);
}

.form-group label {
  display: block;
  margin-bottom: var(--space-2);
  font-weight: 600;
  font-size: var(--text-base);
  color: var(--color-text);
}

.form-input,
select {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-family: inherit;
  font-size: var(--text-base);
  transition: all var(--transition-base);
}

.form-input:focus,
select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(91, 165, 91, 0.1);
}

/* Radio Cards */
.radio-card {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  padding: var(--space-4);
  background: var(--color-bg);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  margin-bottom: var(--space-3);
  transition: all var(--transition-base);
}

.radio-card:hover {
  border-color: var(--color-primary);
  background: rgba(91, 165, 91, 0.02);
}

.radio-card input[type="radio"] {
  margin-top: 4px;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.radio-card input[type="radio"]:checked ~ .icon {
  transform: scale(1.2);
}

.radio-card .icon {
  font-size: 1.75rem;
  transition: transform 0.2s ease;
}

.radio-card div {
  flex: 1;
}

.radio-card .label {
  font-weight: 600;
  display: block;
  margin-bottom: var(--space-1);
}

.radio-card p {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  margin: 0;
}

/* Checkboxes */
.restrictions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);
}

.checkbox-card {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: var(--color-bg);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-base);
}

.checkbox-card:hover {
  border-color: var(--color-primary);
  background: rgba(91, 165, 91, 0.02);
}

.checkbox-card input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.checkbox-card .icon {
  font-size: 1.25rem;
}

.checkbox-card .label {
  font-weight: 500;
  margin: 0;
}

/* Radio Group */
.radio-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.radio-option {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: background var(--transition-base);
}

.radio-option:hover {
  background: rgba(91, 165, 91, 0.05);
}

.radio-option input {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

/* Acciones */
.step-actions {
  display: flex;
  gap: var(--space-4);
  justify-content: center;
}

.step-actions .btn {
  flex: 1;
  max-width: 240px;
}

.step-actions .btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Media Queries */
@media (max-width: 640px) {
  .restrictions {
    grid-template-columns: 1fr;
  }
  
  .step-actions {
    flex-direction: column;
  }
  
  .step-actions .btn {
    max-width: none;
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
