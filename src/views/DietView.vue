<template>
  <div class="diet-view">
    <div class="container py-8">
      <div class="header">
        <h1>{{ currentPlan.week }}</h1>
        <p>Calorías objetivo: <strong>{{ currentPlan.calories_target }} kcal</strong></p>
      </div>

      <!-- Day Selector -->
      <div class="day-selector">
        <button
          v-for="day in currentPlan.days"
          :key="day.id"
          @click="selectDay(day.id)"
          :class="['day-btn', { active: selectedDay === day.id }]"
        >
          <div class="day-name">{{ day.day }}</div>
          <div class="day-date">{{ day.date }}</div>
        </button>
      </div>

      <!-- Meals Display -->
      <div v-if="currentDay" class="meals-container">
        <div v-for="(meal, mealType) in currentDay.meals" :key="mealType" class="meal-card">
          <div class="meal-header">
            <span class="meal-emoji">{{ meal.emoji }}</span>
            <div>
              <h3>{{ meal.name }}</h3>
              <p class="meal-time">{{ meal.time }}</p>
            </div>
            <div class="meal-cals">{{ meal.calories }} kcal</div>
          </div>

          <div class="meal-tags">
            <span v-for="tag in meal.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>

          <div class="meal-macros">
            <div class="macro">
              <span class="macro-label">Proteína</span>
              <span class="macro-value">{{ meal.macros.protein }}g</span>
            </div>
            <div class="macro">
              <span class="macro-label">Carbos</span>
              <span class="macro-value">{{ meal.macros.carbs }}g</span>
            </div>
            <div class="macro">
              <span class="macro-label">Grasa</span>
              <span class="macro-value">{{ meal.macros.fat }}g</span>
            </div>
          </div>

          <details class="meal-details">
            <summary>Ver receta e ingredientes</summary>
            <div class="details-content">
              <h4>Ingredientes:</h4>
              <ul>
                <li v-for="ing in meal.ingredients" :key="ing">{{ ing }}</li>
              </ul>
              <h4>Preparación:</h4>
              <p>{{ meal.recipe }}</p>
            </div>
          </details>
        </div>
      </div>

      <!-- Daily Total -->
      <div class="daily-total">
        <div class="total-card">
          <span>Total de calorías: <strong>{{ totalCalories }}</strong> / {{ currentPlan.calories_target }} kcal</span>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: (totalCalories / currentPlan.calories_target * 100) + '%' }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useDietStore } from '../stores/diet'

const dietStore = useDietStore()

const currentPlan = computed(() => dietStore.mealPlan)
const selectedDay = computed(() => dietStore.selectedDay)
const currentDay = computed(() => dietStore.getCurrentDay())
const totalCalories = computed(() => dietStore.getTotalCalories())

const selectDay = (dayId) => {
  dietStore.selectDay(dayId)
}
</script>

<style scoped>
.diet-view {
  padding: var(--space-8) 0;
  min-height: calc(100vh - var(--navbar-height));
}

.py-8 {
  padding: var(--space-8) 0;
}

.header {
  margin-bottom: var(--space-10);
}

.header h1 {
  font-size: var(--text-3xl);
  font-weight: 800;
  margin-bottom: var(--space-2);
}

.header p {
  font-size: var(--text-lg);
  color: var(--color-text-muted);
}

.day-selector {
  display: flex;
  gap: var(--space-3);
  overflow-x: auto;
  margin-bottom: var(--space-10);
  padding-bottom: var(--space-3);
}

.day-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-3) var(--space-4);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  cursor: pointer;
  transition: all var(--transition-fast);
  white-space: nowrap;
  min-width: 100px;
}

.day-btn:hover {
  border-color: var(--color-primary);
}

.day-btn.active {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
}

.day-name {
  font-weight: 600;
}

.day-date {
  font-size: var(--text-xs);
  opacity: 0.7;
}

.meals-container {
  display: grid;
  gap: var(--space-6);
  margin-bottom: var(--space-10);
}

.meal-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-6);
  transition: all var(--transition-base);
}

.meal-card:hover {
  box-shadow: var(--shadow-card);
}

.meal-header {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
}

.meal-emoji {
  font-size: 2rem;
  flex-shrink: 0;
}

.meal-header h3 {
  font-size: var(--text-lg);
  margin-bottom: var(--space-1);
}

.meal-time {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.meal-cals {
  margin-left: auto;
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-primary);
  flex-shrink: 0;
}

.meal-tags {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
  margin-bottom: var(--space-4);
}

.tag {
  display: inline-block;
  background: var(--color-primary-bg);
  color: var(--color-primary-dark);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 600;
}

.meal-macros {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-3);
  margin-bottom: var(--space-4);
  padding: var(--space-4);
  background: var(--color-bg);
  border-radius: var(--radius-sm);
}

.macro {
  text-align: center;
}

.macro-label {
  display: block;
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin-bottom: var(--space-1);
}

.macro-value {
  display: block;
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-text);
}

.meal-details {
  cursor: pointer;
}

.meal-details summary {
  padding: var(--space-3);
  background: var(--color-bg);
  border-radius: var(--radius-sm);
  font-weight: 600;
  color: var(--color-primary);
  transition: all var(--transition-fast);
}

.meal-details summary:hover {
  background: var(--color-primary-bg);
}

.details-content {
  padding: var(--space-4);
  padding-top: var(--space-3);
}

.details-content h4 {
  font-size: var(--text-base);
  font-weight: 600;
  margin-top: var(--space-3);
  margin-bottom: var(--space-2);
}

.details-content ul {
  margin-left: var(--space-4);
  margin-bottom: var(--space-2);
}

.details-content li {
  margin-bottom: var(--space-1);
  font-size: var(--text-sm);
}

.details-content p {
  font-size: var(--text-sm);
  line-height: 1.6;
  color: var(--color-text-muted);
}

.daily-total {
  position: sticky;
  bottom: 0;
  margin-left: calc(var(--space-6) * -1);
  margin-right: calc(var(--space-6) * -1);
  margin-bottom: calc(var(--space-6) * -1);
  padding: var(--space-6);
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  color: #fff;
}

.total-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.total-card span {
  font-size: var(--text-lg);
}

.progress-bar {
  height: 8px;
  background: rgba(255,255,255,0.3);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #fff;
  transition: width 0.3s ease;
}
</style>
