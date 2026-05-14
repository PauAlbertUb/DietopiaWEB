export const SUPERMARKETS = [
  {
    id: 'caprabo',
    name: 'Caprabo',
    icon: '🏪',
    color: '#FF6B35',
    distanceKm: 2.3,
    priceIndex: 0.95 // Más barato
  },
  {
    id: 'mercadona',
    name: 'Mercadona',
    icon: '🛒',
    color: '#FFD700',
    distanceKm: 1.8,
    priceIndex: 1.0 // Promedio
  },
  {
    id: 'lidl',
    name: 'Lidl',
    icon: '💙',
    color: '#003DA5',
    distanceKm: 3.1,
    priceIndex: 0.88 // Muy barato
  },
  {
    id: 'carrefour',
    name: 'Carrefour',
    icon: '🔴',
    color: '#FF0000',
    distanceKm: 4.2,
    priceIndex: 1.05 // Más caro
  },
  {
    id: 'dia',
    name: 'Día',
    icon: '🟠',
    color: '#FF9900',
    distanceKm: 0.9,
    priceIndex: 0.92 // Barato
  }
]

export const SHOPPING_OPTIMIZATION_PRIORITIES = [
  { value: 'cheapest', label: 'Més barat', icon: '💰' },
  { value: 'closest', label: 'Més a prop', icon: '📍' },
  { value: 'quality', label: 'Millor qualitat', icon: '⭐' },
  { value: 'eco', label: 'Només ECO i BIO', icon: '🌿' }
]

export const generateShoppingListByStore = (products, priorityFilter = 'cheapest') => {
  const shoppingByStore = {}
  const priorityFactors = {
    cheapest: 0.92,
    closest: 0.98,
    quality: 1.05,
    eco: 0.95
  }
  const factor = priorityFactors[priorityFilter] || 1
  
  SUPERMARKETS.forEach(store => {
    shoppingByStore[store.id] = {
      store: store,
      items: [],
      estimatedCost: 0
    }
  })

  products.forEach(product => {
    // Simular disponibilidad y precios en cada tienda
    SUPERMARKETS.forEach(store => {
      const basePrice = product.price
      const storePrice = basePrice * store.priceIndex * factor
      
      shoppingByStore[store.id].items.push({
        ...product,
        price: Number(storePrice.toFixed(2)),
        store: store.id
      })
      
      shoppingByStore[store.id].estimatedCost += storePrice
    })
  })

  return shoppingByStore
}

export const optimizeShoppingRoute = (stores, priority = 'cheapest') => {
  const sorted = [...stores].sort((a, b) => {
    switch (priority) {
      case 'cheapest':
        return a.estimatedCost - b.estimatedCost
      case 'closest':
        return a.store.distanceKm - b.store.distanceKm
      case 'quality':
        return b.store.priceIndex - a.store.priceIndex // Inverso: más caro = mejor calidad
      case 'eco':
        // Simular tiendas ECO
        return b.store.id === 'lidl' ? -1 : 1
      default:
        return 0
    }
  })

  return sorted.slice(0, 3) // Máximo 3 supermercats
}
