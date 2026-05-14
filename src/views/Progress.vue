<template>
  <div class="progress-view">
    <div class="container py-8">
      <h1>📊 Tu progreso</h1>

      <div class="kpi-grid">
        <article class="kpi-card">
          <p>Peso actual</p>
          <strong>{{ currentWeight.toFixed(1) }} kg</strong>
          <small>{{ weightDeltaText }}</small>
        </article>
        <article class="kpi-card">
          <p>Cumplimiento semanal</p>
          <strong>{{ compliancePercent }}%</strong>
          <small>{{ completedMeals }}/{{ totalMeals }} comidas completadas</small>
        </article>
        <article class="kpi-card">
          <p>Kcal promedio</p>
          <strong>{{ averageDailyCalories }} kcal</strong>
          <small>Objetivo: {{ targetCalories }} kcal</small>
        </article>
      </div>

      <div class="progress-cards">
        <div class="progress-card">
          <h3>📉 Evolución de peso (4 semanas)</h3>
          <div class="bars">
            <div v-for="point in weightSeries" :key="point.week" class="bar-item">
              <span class="bar-label">S{{ point.week }}</span>
              <div class="bar-track">
                <div class="bar-fill" :style="{ height: point.height + '%' }"></div>
              </div>
              <span class="bar-value">{{ point.weight.toFixed(1) }}</span>
            </div>
          </div>
        </div>

        <div class="progress-card">
          <h3>🎯 Cumplimiento diario</h3>
          <div class="daily-list">
            <div v-for="day in dailyCompletion" :key="day.day" class="daily-row">
              <span>{{ day.day }}</span>
              <div class="daily-track">
                <div class="daily-fill" :style="{ width: day.percent + '%' }"></div>
              </div>
              <strong>{{ day.percent }}%</strong>
            </div>
          </div>
        </div>

        <div class="progress-card">
          <h3>🔥 Balance calórico</h3>
          <p class="stat-text">
            Hoy llevas <strong>{{ currentDayCalories }} kcal</strong> de <strong>{{ targetCalories }} kcal</strong>.
          </p>
          <div class="calorie-track">
            <div class="calorie-fill" :style="{ width: caloriePercent + '%' }"></div>
          </div>
          <p class="stat-text" v-if="remainingCalories > 0">
            Te quedan {{ remainingCalories }} kcal para el objetivo.
          </p>
          <p class="stat-text" v-else>
            Superaste tu objetivo por {{ Math.abs(remainingCalories) }} kcal.
          </p>
        </div>
      </div>

      <div class="achievements">
        <h2>Logros 🏆</h2>
        <div class="achievements-grid">
          <div class="achievement" :class="{ active: compliancePercent >= 70 }">
            <span>7️⃣</span>
            <p>Semana consistente</p>
          </div>
          <div class="achievement" :class="{ active: streak >= 5 }">
            <span>💪</span>
            <p>Racha {{ streak }} días</p>
          </div>
          <div class="achievement" :class="{ active: currentWeight <= targetWeight }">
            <span>🎯</span>
            <p>Objetivo de peso</p>
          </div>
          <div class="achievement" :class="{ active: compliancePercent >= 85 }">
            <span>🌟</span>
            <p>Super usuario</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useDietStore } from '../stores/diet'

const authStore = useAuthStore()
const dietStore = useDietStore()

const user = computed(() => authStore.user || {})

const currentWeight = computed(() => Number(user.value.weight || 75))
const goalType = computed(() => user.value.goal || 'maintain')
const targetWeight = computed(() => {
  if (goalType.value === 'lose_weight') return currentWeight.value - 3
  if (goalType.value === 'gain_muscle') return currentWeight.value + 2
  return currentWeight.value
})

const simulatedStartWeight = computed(() => {
  if (goalType.value === 'lose_weight') return currentWeight.value + 3
  if (goalType.value === 'gain_muscle') return currentWeight.value - 2
  return currentWeight.value
})

const weightDelta = computed(() => currentWeight.value - simulatedStartWeight.value)
const weightDeltaText = computed(() => {
  if (weightDelta.value === 0) return 'Sin cambios frente al inicio'
  return `${weightDelta.value > 0 ? '+' : ''}${weightDelta.value.toFixed(1)} kg vs inicio`
})

const mealsPerDay = 4
const totalMeals = computed(() => (dietStore.mealPlan?.days?.length || 0) * mealsPerDay)
const completedMeals = computed(() => Math.round(totalMeals.value * ((user.value.compliance || 0) / 100)))
const compliancePercent = computed(() => user.value.compliance || 0)
const streak = computed(() => user.value.streak || 0)

const targetCalories = computed(() => Number(dietStore.mealPlan?.calories_target || 1800))
const currentDayCalories = computed(() => dietStore.getTotalCalories())
const averageDailyCalories = computed(() => {
  const days = dietStore.mealPlan?.days || []
  if (!days.length) return 0

  const total = days.reduce((sum, day) => {
    const mealCalories = Object.values(day.meals || {}).reduce((mealSum, meal) => mealSum + (meal.calories || 0), 0)
    return sum + mealCalories
  }, 0)

  return Math.round(total / days.length)
})

const caloriePercent = computed(() => Math.min(100, Math.round((currentDayCalories.value / targetCalories.value) * 100)))
const remainingCalories = computed(() => targetCalories.value - currentDayCalories.value)

const weightSeries = computed(() => {
  const start = simulatedStartWeight.value
  const end = currentWeight.value
  const steps = 4

  const values = Array.from({ length: steps }, (_, idx) => {
    const weight = start + ((end - start) * (idx + 1)) / steps
    return {
      week: idx + 1,
      weight
    }
  })

  const minW = Math.min(...values.map(v => v.weight))
  const maxW = Math.max(...values.map(v => v.weight))
  const range = Math.max(1, maxW - minW)

  return values.map(v => ({
    ...v,
    height: Math.round(((v.weight - minW) / range) * 60) + 30
  }))
})

const dailyCompletion = computed(() => {
  const labels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
  const baseline = compliancePercent.value

  return labels.map((day, idx) => {
    const drift = (idx % 2 === 0 ? 1 : -1) * (idx * 3)
    const percent = Math.max(40, Math.min(100, baseline + drift))
    return { day, percent }
  })
})
</script>

<style scoped>
.progress-view {
  padding: var(--space-8) 0;
  min-height: calc(100vh - var(--navbar-height));
}

.py-8 {
  padding: var(--space-8) 0;
}

.progress-view h1 {
  font-size: var(--text-3xl);
  font-weight: 800;
  margin-bottom: var(--space-8);
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--space-4);
  margin-bottom: var(--space-8);
}

.kpi-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-5);
}

.kpi-card p {
  margin: 0 0 var(--space-2) 0;
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.kpi-card strong {
  display: block;
  font-size: var(--text-2xl);
  color: var(--color-primary);
  margin-bottom: var(--space-1);
}

.kpi-card small {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.progress-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-6);
  margin-bottom: var(--space-12);
}

.progress-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-6);
}

.progress-card h3 {
  font-size: var(--text-lg);
  margin-bottom: var(--space-4);
}

.bars {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-3);
  min-height: 180px;
}

.bar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
}

.bar-label,
.bar-value {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.bar-track {
  width: 100%;
  max-width: 40px;
  height: 120px;
  background: var(--color-bg-alt);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}

.bar-fill {
  width: 100%;
  background: linear-gradient(180deg, #86d486 0%, var(--color-primary) 100%);
  transition: height var(--transition-base);
}

.daily-list {
  display: grid;
  gap: var(--space-3);
}

.daily-row {
  display: grid;
  grid-template-columns: 36px 1fr 44px;
  gap: var(--space-3);
  align-items: center;
}

.daily-row span,
.daily-row strong {
  font-size: var(--text-sm);
}

.daily-track,
.calorie-track {
  height: 8px;
  background: var(--color-bg-alt);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.daily-fill,
.calorie-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), #8bd78b);
  transition: width var(--transition-base);
}

.stat-text {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  margin-bottom: var(--space-3);
}

.achievements {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-6);
}

.achievements h2 {
  font-size: var(--text-2xl);
  margin-bottom: var(--space-6);
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: var(--space-4);
}

.achievement {
  background: var(--color-bg);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  text-align: center;
  transition: all var(--transition-base);
  opacity: 0.5;
}

.achievement.active {
  background: var(--color-primary-bg);
  border-color: var(--color-primary);
  opacity: 1;
}

.achievement span {
  font-size: 2rem;
  display: block;
  margin-bottom: var(--space-2);
}

.achievement p {
  font-size: var(--text-sm);
  color: var(--color-text);
}
</style>
