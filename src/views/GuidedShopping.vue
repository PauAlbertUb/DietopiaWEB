<template>
  <div class="guided-view">
    <div class="container py-8">
      <div class="guided-header">
        <div>
          <h1>🗺️ Compra guiada por tienda</h1>
          <p class="subtitle">
            Ruta recomendada en {{ selectedStore.icon }} {{ selectedStore.name }} · {{ selectedStore.distanceKm }} km
          </p>
        </div>
        <div class="guided-summary">
          <p>Total estimado</p>
          <strong>{{ estimatedTotal.toFixed(2) }}€</strong>
        </div>
      </div>

      <div class="route-steps">
        <article v-for="(section, idx) in routeSections" :key="section.key" class="route-card">
          <div class="route-title-row">
            <div class="route-order">{{ idx + 1 }}</div>
            <div>
              <h3>{{ section.icon }} {{ section.title }}</h3>
              <p>{{ section.items.length }} productos</p>
            </div>
          </div>

          <div class="route-items">
            <label v-for="item in section.items" :key="item.id" class="item-row">
              <input v-model="checkedItems" :value="item.id" type="checkbox">
              <span class="item-name">{{ item.name }}</span>
              <span class="item-price">{{ item.price.toFixed(2) }}€</span>
            </label>
          </div>
        </article>
      </div>

      <div class="progress-card">
        <div class="progress-head">
          <h2>Progreso en tienda</h2>
          <span>{{ checkedItems.length }}/{{ flattenedItems.length }} completados</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" :style="{ width: completionPercent + '%' }"></div>
        </div>
      </div>

      <div class="actions">
        <router-link to="/shopping" class="btn btn-outline">⬅️ Volver a lista</router-link>
        <button class="btn btn-primary" @click="completeShopping">✅ Finalizar compra</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUiStore } from '../stores/ui'
import { SUPERMARKETS, generateShoppingListByStore } from '../services/supermarkets'

const route = useRoute()
const router = useRouter()
const uiStore = useUiStore()

const fallbackStore = SUPERMARKETS.find(store => store.id === 'mercadona')
const selectedStore = computed(() => SUPERMARKETS.find(store => store.id === route.query.store) || fallbackStore)

const products = [
  { id: 'v1', name: 'Lechuga mixta (100g)', price: 1.5, category: 'vegetables' },
  { id: 'v2', name: 'Tomates cherry (250g)', price: 2.0, category: 'vegetables' },
  { id: 'v3', name: 'Brócoli (200g)', price: 1.8, category: 'vegetables' },
  { id: 'p1', name: 'Pechuga de pollo (600g)', price: 6.5, category: 'proteins' },
  { id: 'p2', name: 'Salmón (400g)', price: 12.0, category: 'proteins' },
  { id: 'p3', name: 'Huevos (12 uds)', price: 3.2, category: 'proteins' },
  { id: 'd1', name: 'Yogur natural (400g)', price: 2.3, category: 'dairy' },
  { id: 'd2', name: 'Queso fresco (250g)', price: 3.8, category: 'dairy' },
  { id: 'd3', name: 'Leche desnatada (1L)', price: 1.2, category: 'dairy' },
  { id: 'c1', name: 'Pan integral (500g)', price: 2.1, category: 'carbs' },
  { id: 'c2', name: 'Arroz integral (1kg)', price: 2.9, category: 'carbs' },
  { id: 'c3', name: 'Pasta integral (500g)', price: 1.6, category: 'carbs' }
]

const shoppingByStore = computed(() => generateShoppingListByStore(products, route.query.priority || 'cheapest'))
const storeItems = computed(() => shoppingByStore.value[selectedStore.value.id]?.items || [])

const zoneByCategory = {
  vegetables: { key: 'fresh', title: 'Zona de frescos', icon: '🥬' },
  proteins: { key: 'butcher', title: 'Carnicería y pescadería', icon: '🥩' },
  dairy: { key: 'cold', title: 'Refrigerados', icon: '🥛' },
  carbs: { key: 'pantry', title: 'Despensa', icon: '🌾' }
}

const routeSections = computed(() => {
  const grouped = {}

  storeItems.value.forEach(item => {
    const zone = zoneByCategory[item.category]
    if (!grouped[zone.key]) {
      grouped[zone.key] = {
        key: zone.key,
        title: zone.title,
        icon: zone.icon,
        items: []
      }
    }
    grouped[zone.key].items.push(item)
  })

  return Object.values(grouped)
})

const flattenedItems = computed(() => routeSections.value.flatMap(section => section.items))
const estimatedTotal = computed(() => flattenedItems.value.reduce((sum, item) => sum + item.price, 0))

const checkedItems = ref([])
const completionPercent = computed(() => {
  if (!flattenedItems.value.length) return 0
  return Math.round((checkedItems.value.length / flattenedItems.value.length) * 100)
})

const completeShopping = () => {
  if (checkedItems.value.length < flattenedItems.value.length) {
    uiStore.addToast('Aún tienes productos pendientes en la ruta.', 'info', 2500)
    return
  }

  uiStore.addToast('Compra guiada completada. Excelente trabajo.', 'success', 3000)
  router.push('/shopping')
}
</script>

<style scoped>
.guided-view {
  padding: var(--space-8) 0;
  min-height: calc(100vh - var(--navbar-height));
}

.py-8 {
  padding: var(--space-8) 0;
}

.guided-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-6);
  margin-bottom: var(--space-8);
}

.guided-header h1 {
  font-size: var(--text-3xl);
  font-weight: 800;
  margin-bottom: var(--space-2);
}

.subtitle {
  color: var(--color-text-muted);
  font-size: var(--text-base);
}

.guided-summary {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-4) var(--space-5);
  min-width: 150px;
}

.guided-summary p {
  margin: 0;
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

.guided-summary strong {
  font-size: var(--text-xl);
  color: var(--color-primary);
}

.route-steps {
  display: grid;
  gap: var(--space-5);
  margin-bottom: var(--space-8);
}

.route-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-5);
}

.route-title-row {
  display: flex;
  gap: var(--space-4);
  align-items: center;
  margin-bottom: var(--space-4);
}

.route-order {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full);
  background: var(--color-primary-bg);
  color: var(--color-primary-dark);
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.route-title-row h3 {
  margin: 0;
  font-size: var(--text-lg);
}

.route-title-row p {
  margin: 0;
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.route-items {
  display: grid;
  gap: var(--space-2);
}

.item-row {
  display: grid;
  grid-template-columns: 20px 1fr auto;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) 0;
}

.item-name {
  font-size: var(--text-sm);
}

.item-price {
  font-weight: 600;
  color: var(--color-primary);
}

.progress-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-5);
  margin-bottom: var(--space-7);
}

.progress-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-3);
}

.progress-head h2 {
  margin: 0;
  font-size: var(--text-lg);
}

.progress-head span {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

.progress-track {
  height: 10px;
  background: var(--color-bg-alt);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), #7acb7a);
  transition: width var(--transition-base);
}

.actions {
  display: flex;
  gap: var(--space-4);
  justify-content: center;
}

@media (max-width: 800px) {
  .guided-header {
    flex-direction: column;
  }

  .actions {
    flex-direction: column;
  }

  .actions .btn {
    width: 100%;
  }
}
</style>
