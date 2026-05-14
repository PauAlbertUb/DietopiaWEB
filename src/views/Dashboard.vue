<template>
  <div class="dashboard-view">
    <MotivationalPopup ref="popupRef" :messages="motivationalMessages" />
    
    <div class="container py-8">
      <div class="welcome-section">
        <div class="welcome-header">
          <div>
            <h1>👋 ¡Hola, {{ user?.name }}!</h1>
            <p class="welcome-subtitle">Bienvenido a tu panel de control</p>
          </div>
          <div class="day-counter">
              <div class="day-number">Día {{ currentDay }}/{{ totalDays }}</div>
            <p>{{ dayPhrase }}</p>
          </div>
        </div>
      </div>

      <div class="dashboard-grid">
        <!-- Stats Cards -->
        <div class="stat-card">
          <div class="stat-icon">📊</div>
          <div>
            <div class="stat-label">Días activos</div>
            <div class="stat-value">{{ user?.daysActive || 0 }}</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">🔥</div>
          <div>
            <div class="stat-label">Racha actual</div>
            <div class="stat-value">{{ user?.streak || 0 }} días</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">✅</div>
          <div>
            <div class="stat-label">Cumplimiento</div>
            <div class="stat-value">{{ user?.compliance || 0 }}%</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">⚖️</div>
          <div>
            <div class="stat-label">Peso</div>
            <div class="stat-value">{{ user?.weight || 0 }} kg</div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <section class="quick-actions">
        <h2>Acciones rápidas</h2>
        <div class="actions-grid">
          <router-link to="/diet" class="action-card">
            <span class="action-icon">🥗</span>
            <h3>Ver dieta</h3>
            <p>Tu plan de comidas para esta semana</p>
          </router-link>
          <router-link to="/diet-generation" class="action-card">
            <span class="action-icon">🤖</span>
            <h3>Generar dieta</h3>
            <p>Crea un nuevo plan personalizado</p>
          </router-link>
          <router-link to="/shopping" class="action-card">
            <span class="action-icon">🛒</span>
            <h3>Comprar</h3>
            <p>Tu lista optimizada de la compra</p>
          </router-link>
          <router-link to="/progress" class="action-card">
            <span class="action-icon">📈</span>
            <h3>Progreso</h3>
            <p>Mira tu evolución</p>
          </router-link>
        </div>
      </section>

      <!-- Today's Meals -->
      <section class="today-meals">
        <h2>Comidas de hoy</h2>
        <div class="meals-list">
          <div v-for="(meal, type) in todayMeals" :key="type" class="meal-item">
            <div class="meal-emoji">{{ meal.emoji }}</div>
            <div class="meal-info">
              <h4>{{ meal.name }}</h4>
              <p>{{ meal.time }} · {{ meal.calories }} kcal</p>
            </div>
            <div class="meal-tags">
              <span v-for="tag in meal.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useDietStore } from '../stores/diet'
import MotivationalPopup from '../components/MotivationalPopup.vue'

const authStore = useAuthStore()
const dietStore = useDietStore()
const popupRef = ref(null)

const user = computed(() => authStore.user)
const totalDays = computed(() => dietStore.mealPlan?.days?.length || 7)
const todayMeals = computed(() => dietStore.getCurrentDayMeals())

// Contador de días
const currentDay = computed(() => {
  const savedWeek = localStorage.getItem('dietopia_current_week')
  return savedWeek ? parseInt(savedWeek) : 1
})

const dayPhrase = computed(() => {
  const phrases = {
    1: 'Comenzant la setmana amb bon peu! 💪',
    2: 'Segon dia, vas molt bé! 👍',
    3: 'Meitat de setmana, continua així! 🔥',
    4: 'Ja has superat la meitat! 💪',
    5: 'Casi lo consigues! Ánimo! 💪',
    6: 'Penúltimo día, vamos! 🏆',
    7: 'Último día, remata fuerte! 🎯'
  }
  return phrases[currentDay.value] || 'Novo ciclo! Tú puedes! 🚀'
})

const motivationalMessages = computed(() => [
  {
    icon: '🍽️',
    title: 'Hoy cocinarás...',
    message: 'Unos deliciosos espaguetis a la boloñesa con ensalada fresca y pan integral'
  },
  {
    icon: '💰',
    title: 'Ahorros del día',
    message: `Has ahorrado €${(Math.random() * 15).toFixed(2)} comparado con comer fuera de casa`
  },
  {
    icon: '⏱️',
    title: 'Tiempo es oro',
    message: 'Solo necesitarás 25 minutos para preparar hoy tu menú completo'
  },
  {
    icon: '🎯',
    title: 'Tu objetivo',
    message: `Con este menú completarás tu objetivo de ${user.value?.goal === 'lose_weight' ? 'perder peso' : user.value?.goal === 'gain_muscle' ? 'ganar músculo' : 'mantener peso'}`
  }
])

onMounted(() => {
  // Auto-mostrar popup después de 500ms
  setTimeout(() => {
    if (popupRef.value) {
      popupRef.value.show()
    }
  }, 500)
})
</script>

<style scoped>
.dashboard-view {
  padding: var(--space-8) 0;
  min-height: calc(100vh - var(--navbar-height));
}

.py-8 {
  padding: var(--space-8) 0;
}

.welcome-section {
  margin-bottom: var(--space-12);
}

.welcome-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-8);
}

.welcome-header h1 {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  margin-bottom: var(--space-2);
}

.welcome-subtitle {
  font-size: var(--text-lg);
  color: var(--color-text-muted);
}

.day-counter {
  background: linear-gradient(135deg, var(--color-primary) 0%, #7fc97f 100%);
  color: white;
  padding: var(--space-4) var(--space-6);
  border-radius: var(--radius-lg);
  text-align: center;
  box-shadow: 0 4px 12px rgba(91, 165, 91, 0.2);
  min-width: 180px;
}

.day-number {
  font-size: var(--text-3xl);
  font-weight: 800;
  margin-bottom: var(--space-1);
}

.day-counter p {
  font-size: var(--text-sm);
  opacity: 0.95;
  margin: 0;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-6);
  margin-bottom: var(--space-12);
}

.stat-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-6);
  display: flex;
  align-items: center;
  gap: var(--space-4);
  transition: all var(--transition-base);
}

.stat-card:hover {
  box-shadow: var(--shadow-card);
  transform: translateY(-2px);
}

.stat-icon {
  font-size: 2rem;
}

.stat-label {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  margin-bottom: var(--space-1);
}

.stat-value {
  font-size: var(--text-2xl);
  font-weight: 800;
  color: var(--color-primary);
}

.quick-actions {
  margin-bottom: var(--space-12);
}

.quick-actions h2,
.today-meals h2 {
  font-size: var(--text-2xl);
  font-weight: 700;
  margin-bottom: var(--space-6);
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-6);
}

.action-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-6);
  text-decoration: none;
  text-align: center;
  transition: all var(--transition-base);
  color: inherit;
}

.action-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md);
  transform: translateY(-4px);
}

.action-icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: var(--space-3);
}

.action-card h3 {
  font-size: var(--text-lg);
  margin-bottom: var(--space-1);
  color: var(--color-text);
}

.action-card p {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.meals-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.meal-item {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  display: flex;
  align-items: center;
  gap: var(--space-4);
  transition: all var(--transition-base);
}

.meal-item:hover {
  box-shadow: var(--shadow-card);
}

.meal-emoji {
  font-size: 1.8rem;
  flex-shrink: 0;
}

.meal-info {
  flex: 1;
}

.meal-info h4 {
  font-size: var(--text-base);
  font-weight: 600;
  margin-bottom: var(--space-1);
}

.meal-info p {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.meal-tags {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
  justify-content: flex-end;
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

@media (max-width: 640px) {
  .welcome-header {
    flex-direction: column;
    align-items: stretch;
  }

  .day-counter {
    min-width: auto;
  }
}
</style>
