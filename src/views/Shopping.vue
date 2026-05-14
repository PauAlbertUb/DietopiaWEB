<template>
  <div class="shopping-view">
    <div class="container py-8">
      <h1>🛒 Lista de la compra</h1>
      <p class="subtitle">Optimizada para ahorrar dinero</p>

      <div v-if="shoppingCompleted" class="completion-card">
        <div class="completion-icon">✅</div>
        <h2>Compra realizada con éxito</h2>
        <p>Tu pedido a domicilio ya está cerrado y no volverá a mostrarse.</p>
        <router-link to="/dashboard" class="btn btn-primary btn-lg">Volver al inicio</router-link>
      </div>

      <template v-else>

      <!-- Stats -->
      <div class="shopping-stats">
        <div class="stat">
          <span class="stat-label">Total restante</span>
          <span class="stat-value">{{ totalCost.toFixed(2) }}€</span>
        </div>
        <div class="stat">
          <span class="stat-label">Ahorro</span>
          <span class="stat-value">{{ savingsAmount.toFixed(2) }}€</span>
        </div>
        <div class="stat">
          <span class="stat-label">Artículos restantes</span>
          <span class="stat-value">{{ totalItems }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Tienda activa</span>
          <span class="stat-value">{{ selectedStore.name }}</span>
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

      <div class="selection-summary">
        <strong>{{ selectedStore.name }}</strong>
        <span>·</span>
        <span>{{ selectedPriorityLabel }}</span>
        <span>·</span>
        <span>{{ selectedStore.distanceKm }} km</span>
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
            <div v-for="(item, idx) in products.vegetables" :key="idx" class="item" :class="{ checked: item.checked }">
              <input v-model="item.checked" type="checkbox">
              <span>{{ item.name }}</span>
              <span class="price">{{ adjustedPrice(item.price).toFixed(2) }}€</span>
            </div>
          </div>
        </div>

        <div class="category">
          <h3>🥩 Proteínas</h3>
          <div class="items">
            <div v-for="(item, idx) in products.proteins" :key="idx" class="item" :class="{ checked: item.checked }">
              <input v-model="item.checked" type="checkbox">
              <div class="item-details">
                <span>{{ item.name }}</span>
                <button v-if="!item.ecoOnly" class="brand-btn" @click="showBrandOptions(idx)">
                  Cambiar marca
                </button>
              </div>
              <span class="price">{{ adjustedPrice(item.price).toFixed(2) }}€</span>
            </div>
          </div>
        </div>

        <div class="category">
          <h3>🥛 Lácteos</h3>
          <div class="items">
            <div v-for="(item, idx) in products.dairy" :key="idx" class="item" :class="{ checked: item.checked }">
              <input v-model="item.checked" type="checkbox">
              <span>{{ item.name }}</span>
              <span class="price">{{ adjustedPrice(item.price).toFixed(2) }}€</span>
            </div>
          </div>
        </div>

        <div class="category">
          <h3>🌾 Carbohidratos</h3>
          <div class="items">
            <div v-for="(item, idx) in products.carbs" :key="idx" class="item" :class="{ checked: item.checked }">
              <input v-model="item.checked" type="checkbox">
              <span>{{ item.name }}</span>
              <span class="price">{{ adjustedPrice(item.price).toFixed(2) }}€</span>
            </div>
          </div>
        </div>
      </div>

      <div class="delivery-panel">
        <button v-if="!showDeliveryForm" @click="showDeliveryForm = true" class="btn btn-primary btn-lg">
          🏠 Compra a domicilio
        </button>

        <div v-else class="delivery-form">
          <div class="form-group">
            <label>Dirección de casa</label>
            <input v-model="deliveryAddress" type="text" class="form-input" placeholder="Calle, número, piso, ciudad...">
          </div>
          <button @click="completeHomeDelivery" class="btn btn-primary btn-lg">
            Confirmar compra y cerrar pantalla
          </button>
        </div>
      </div>

      </template>
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
const showDeliveryForm = ref(false)
const deliveryAddress = ref('')
const shoppingCompleted = ref(localStorage.getItem('dietopia_shopping_completed') === 'true')

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

const selectedStore = computed(() => {
  return supermarkets.value.find(store => store.id === selectedSupermarket.value) || supermarkets.value[0]
})

const selectedPriorityLabel = computed(() => {
  return priorities.value.find(priority => priority.value === selectedPriority.value)?.label || 'Sin prioridad'
})

const priceMultipliers = {
  cheapest: 0.92,
  closest: 0.98,
  quality: 1.06,
  eco: 0.95
}

const priceFactor = computed(() => {
  const storeFactor = selectedStore.value?.priceIndex || 1
  const priorityFactor = priceMultipliers[selectedPriority.value] || 1
  return storeFactor * priorityFactor
})

const adjustedPrice = (price) => {
  return Number((price * priceFactor.value).toFixed(2))
}

const totalItems = computed(() => {
  return Object.values(products.value).reduce((count, category) => {
    return count + category.filter(item => !item.checked).length
  }, 0)
})

const baseTotal = computed(() => {
  return Object.values(products.value).reduce((total, category) => {
    return total + category.reduce((sum, item) => sum + adjustedPrice(item.price), 0)
  }, 0)
})

const totalCost = computed(() => {
  return Number(Object.values(products.value).reduce((total, category) => {
    return total + category.reduce((sum, item) => {
      return sum + (item.checked ? 0 : adjustedPrice(item.price))
    }, 0)
  }, 0).toFixed(2))
})

const savingsAmount = computed(() => {
  return Math.max(0, baseTotal.value - totalCost.value)
})

const selectSupermarket = (storeId) => {
  selectedSupermarket.value = storeId
  const store = supermarkets.value.find(s => s.id === storeId)
  uiStore.addToast(`Supermercado seleccionado: ${store.name}`, 'info', 2000)
}

const optimizeShopping = () => {
  const stores = supermarkets.value.map(store => ({
    store: store,
    estimatedCost: baseTotal.value * store.priceIndex * (priceMultipliers[selectedPriority.value] || 1),
    items: []
  }))
  
  const optimized = optimizeShoppingRoute(stores, selectedPriority.value)
  
  let message = `Optimizado por ${selectedPriorityLabel.value}. `
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

const completeHomeDelivery = () => {
  if (!deliveryAddress.value.trim()) {
    uiStore.addToast('Escribe la dirección de entrega', 'error', 2500)
    return
  }

  localStorage.setItem('dietopia_shopping_completed', 'true')
  shoppingCompleted.value = true
  uiStore.addToast('Compra realizada con éxito', 'success', 3000)
  router.push('/dashboard')
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

.selection-summary {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-6);
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  flex-wrap: wrap;
}

.selection-summary strong {
  color: var(--color-text);
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

.item.checked {
  opacity: 0.55;
  text-decoration: line-through;
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

.delivery-panel {
  margin-top: var(--space-8);
  display: flex;
  justify-content: center;
}

.delivery-form {
  width: 100%;
  max-width: 640px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-6);
}

.completion-card {
  display: grid;
  justify-items: center;
  text-align: center;
  gap: var(--space-4);
  padding: var(--space-8);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-8);
}

.completion-icon {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 2rem;
  background: rgba(91, 165, 91, 0.12);
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
