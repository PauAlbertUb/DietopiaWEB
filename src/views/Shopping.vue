<template>
  <div class="shopping-view">
    <div class="container py-8">
      <h1>🛒 Lista de la compra</h1>
      <p class="subtitle">Optimizada para ahorrar dinero</p>

      <!-- Stats -->
      <div class="shopping-stats">
        <div class="stat">
          <span class="stat-label">Total estimado</span>
          <span class="stat-value">{{ totalCost.toFixed(2) }}€</span>
        </div>
        <div class="stat">
          <span class="stat-label">Ahorro</span>
          <span class="stat-value">{{ savingsAmount.toFixed(2) }}€</span>
        </div>
        <div class="stat">
          <span class="stat-label">Artículos</span>
          <span class="stat-value">24</span>
        </div>
      </div>

      <!-- Filtros por supermercado y optimización -->
      <div class="filter-section">
        <div class="filter-group">
          <h3>Supermercados disponibles</h3>
          <div class="supermarket-buttons">
            <button 
              v-for="store in supermarkets" 
              :key="store.id"
              @click="selectSupermarket(store.id)"
              :class="['supermarket-btn', { active: selectedSupermarket === store.id }]"
            >
              <span class="icon">{{ store.icon }}</span>
              <span>{{ store.name }}</span>
              <span class="distance">{{ store.distanceKm }} km</span>
            </button>
          </div>
        </div>

        <div class="filter-group">
          <h3>Prioridades de búsqueda</h3>
          <div class="priority-buttons">
            <button 
              v-for="priority in priorities" 
              :key="priority.value"
              @click="selectedPriority = priority.value"
              :class="['priority-btn', { active: selectedPriority === priority.value }]"
            >
              <span>{{ priority.icon }}</span> {{ priority.label }}
            </button>
          </div>
        </div>
      </div>

      <div class="action-buttons">
        <button @click="optimizeShopping" class="btn btn-primary">
          ✨ Optimitzar compra
        </button>
        <button @click="startGuidedShopping" class="btn btn-outline">
          🗺️ Compra guiada por tienda
        </button>
      </div>

      <!-- Lista de la compra por categoría -->
      <div class="shopping-list">
        <div class="category">
          <h3>🥬 Frutas y verduras</h3>
          <div class="items">
            <div v-for="(item, idx) in products.vegetables" :key="idx" class="item">
              <input type="checkbox">
              <span>{{ item.name }}</span>
              <span class="price">{{ item.price }}€</span>
            </div>
          </div>
        </div>

        <div class="category">
          <h3>🥩 Proteínas</h3>
          <div class="items">
            <div v-for="(item, idx) in products.proteins" :key="idx" class="item">
              <input type="checkbox">
              <div class="item-details">
                <span>{{ item.name }}</span>
                <button v-if="!item.ecoOnly" class="brand-btn" @click="showBrandOptions(idx)">
                  Cambiar marca
                </button>
              </div>
              <span class="price">{{ item.price }}€</span>
            </div>
          </div>
        </div>

        <div class="category">
          <h3>🥛 Lácteos</h3>
          <div class="items">
            <div v-for="(item, idx) in products.dairy" :key="idx" class="item">
              <input type="checkbox">
              <span>{{ item.name }}</span>
              <span class="price">{{ item.price }}€</span>
            </div>
          </div>
        </div>

        <div class="category">
          <h3>🌾 Carbohidratos</h3>
          <div class="items">
            <div v-for="(item, idx) in products.carbs" :key="idx" class="item">
              <input type="checkbox">
              <span>{{ item.name }}</span>
              <span class="price">{{ item.price }}€</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Acciones -->
      <div class="shopping-actions">
        <button class="btn btn-primary btn-lg">📱 Compartir en WhatsApp</button>
        <button class="btn btn-outline btn-lg">🖨️ Imprimir</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUIStore } from '../stores/ui'
import { SUPERMARKETS, SHOPPING_OPTIMIZATION_PRIORITIES, optimizeShoppingRoute } from '../services/supermarkets'

const router = useRouter()
const uiStore = useUIStore()

const selectedSupermarket = ref('mercadona')
const selectedPriority = ref('cheapest')
const supermarkets = ref(SUPERMARKETS)
const priorities = ref(SHOPPING_OPTIMIZATION_PRIORITIES)

const products = ref({
  vegetables: [
    { name: 'Lechuga mixta (100g)', price: 1.50, category: 'vegetables' },
    { name: 'Tomates cherry (250g)', price: 2.00, category: 'vegetables' },
    { name: 'Brócoli (200g)', price: 1.80, category: 'vegetables' },
  ],
  proteins: [
    { name: 'Pechuga de pollo (600g)', price: 6.50, category: 'proteins', ecoOnly: false },
    { name: 'Salmón (400g)', price: 12.00, category: 'proteins', ecoOnly: false },
    { name: 'Huevos (12 uds)', price: 3.20, category: 'proteins', ecoOnly: false },
  ],
  dairy: [
    { name: 'Yogur natural (400g)', price: 2.30, category: 'dairy' },
    { name: 'Queso fresco (250g)', price: 3.80, category: 'dairy' },
    { name: 'Leche desnatada (1L)', price: 1.20, category: 'dairy' },
  ],
  carbs: [
    { name: 'Pan integral (500g)', price: 2.10, category: 'carbs' },
    { name: 'Arroz integral (1kg)', price: 2.90, category: 'carbs' },
    { name: 'Pasta integral (500g)', price: 1.60, category: 'carbs' },
  ]
})

const totalCost = computed(() => {
  let total = 0
  Object.values(products.value).forEach(category => {
    category.forEach(item => {
      total += item.price
    })
  })
  return total
})

const savingsAmount = computed(() => {
  return totalCost.value * 0.25
})

const selectSupermarket = (storeId) => {
  selectedSupermarket.value = storeId
  const store = supermarkets.value.find(s => s.id === storeId)
  uiStore.addToast(`Supermercado seleccionado: ${store.name}`, 'info', 2000)
}

const optimizeShopping = () => {
  const stores = supermarkets.value.map(store => ({
    store: store,
    estimatedCost: totalCost.value * store.priceIndex,
    items: []
  }))
  
  const optimized = optimizeShoppingRoute(stores, selectedPriority.value)
  
  let message = `Optimizado por ${selectedPriority.value === 'cheapest' ? 'precio' : selectedPriority.value === 'closest' ? 'cercanía' : selectedPriority.value === 'quality' ? 'calidad' : 'ECO'}. `
  message += `Mejor en ${optimized[0].store.name}: ${optimized[0].estimatedCost.toFixed(2)}€`
  
  uiStore.addToast(message, 'success', 3000)
}

const startGuidedShopping = () => {
  const store = supermarkets.value.find(s => s.id === selectedSupermarket.value)
  uiStore.addToast(`🗺️ Iniciando compra guiada en ${store.name}...`, 'info', 2000)
  router.push({
    name: 'GuidedShopping',
    query: {
      store: selectedSupermarket.value,
      priority: selectedPriority.value
    }
  })
}

const showBrandOptions = (idx) => {
  uiStore.addToast('Opciones de marca disponibles (Simulado)', 'info', 2000)
}
</script>

<style scoped>
.shopping-view {
  padding: var(--space-8) 0;
  min-height: calc(100vh - var(--navbar-height));
}

.py-8 {
  padding: var(--space-8) 0;
}

.shopping-view h1 {
  font-size: var(--text-3xl);
  font-weight: 800;
  margin-bottom: var(--space-2);
}

.subtitle {
  font-size: var(--text-lg);
  color: var(--color-text-muted);
  margin-bottom: var(--space-8);
}

.shopping-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--space-4);
  margin-bottom: var(--space-10);
}

.stat {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  text-align: center;
}

.stat-label {
  display: block;
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  margin-bottom: var(--space-2);
}

.stat-value {
  display: block;
  font-size: var(--text-2xl);
  font-weight: 800;
  color: var(--color-primary);
}

/* Filtros */
.filter-section {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-6);
  margin-bottom: var(--space-6);
}

.filter-group {
  margin-bottom: var(--space-6);
}

.filter-group:last-child {
  margin-bottom: 0;
}

.filter-group h3 {
  font-size: var(--text-base);
  font-weight: 700;
  margin-bottom: var(--space-3);
  color: var(--color-text);
}

.supermarket-buttons,
.priority-buttons {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.supermarket-btn,
.priority-btn {
  flex: 1;
  min-width: 120px;
  padding: var(--space-3) var(--space-4);
  background: var(--color-bg);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-base);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
}

.supermarket-btn:hover,
.priority-btn:hover {
  border-color: var(--color-primary);
  background: rgba(91, 165, 91, 0.05);
}

.supermarket-btn.active,
.priority-btn.active {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.supermarket-btn .icon {
  font-size: 1.5rem;
}

.distance {
  font-size: var(--text-xs);
  opacity: 0.7;
}

.supermarket-btn.active .distance {
  opacity: 0.9;
}

/* Botones de acción */
.action-buttons {
  display: flex;
  gap: var(--space-4);
  margin-bottom: var(--space-8);
}

.action-buttons .btn {
  flex: 1;
}

/* Lista de compra */
.shopping-list {
  margin-bottom: var(--space-10);
}

.category {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-6);
  margin-bottom: var(--space-4);
}

.category h3 {
  font-size: var(--text-lg);
  margin-bottom: var(--space-4);
  color: var(--color-primary);
}

.items {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  background: var(--color-bg);
  border-radius: var(--radius-sm);
  transition: all var(--transition-base);
}

.item:hover {
  background: rgba(91, 165, 91, 0.03);
}

.item input {
  margin: 0;
  width: 18px;
  height: 18px;
  cursor: pointer;
  flex-shrink: 0;
}

.item-details {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-3);
}

.item span:nth-of-type(1) {
  flex: 1;
  font-size: var(--text-sm);
}

.brand-btn {
  background: none;
  border: none;
  color: var(--color-primary);
  cursor: pointer;
  font-size: var(--text-xs);
  text-decoration: underline;
  padding: 0;
  transition: opacity var(--transition-base);
}

.brand-btn:hover {
  opacity: 0.7;
}

.price {
  font-weight: 600;
  color: var(--color-primary);
  min-width: 50px;
  text-align: right;
}

.shopping-actions {
  display: flex;
  gap: var(--space-4);
  justify-content: center;
  flex-wrap: wrap;
}

.shopping-actions .btn {
  min-width: 200px;
}

@media (max-width: 640px) {
  .supermarket-buttons,
  .priority-buttons {
    flex-direction: column;
  }

  .supermarket-btn,
  .priority-btn {
    flex: none;
    width: 100%;
  }

  .action-buttons {
    flex-direction: column;
  }

  .action-buttons .btn {
    width: 100%;
  }

  .shopping-actions {
    flex-direction: column;
  }

  .shopping-actions .btn {
    width: 100%;
  }
}
</style>
