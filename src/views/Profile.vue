<template>
  <div class="profile-view">
    <div class="container py-8">
      <h1>👤 Mi perfil</h1>

      <div class="profile-grid">
        <div class="profile-card">
          <h2>Información personal</h2>
          <div class="form-group">
            <label>Nombre</label>
            <input v-model="profile.name" type="text" class="form-input">
          </div>
          <div class="form-group">
            <label>Email</label>
            <input v-model="profile.email" type="email" class="form-input">
          </div>
          <div class="form-group">
            <label>Edad</label>
            <input v-model.number="profile.age" type="number" class="form-input">
          </div>
        </div>

        <div class="profile-card">
          <h2>Datos físicos</h2>
          <div class="form-group">
            <label>Peso (kg)</label>
            <input v-model.number="profile.weight" type="number" class="form-input">
          </div>
          <div class="form-group">
            <label>Altura (cm)</label>
            <input v-model.number="profile.height" type="number" class="form-input">
          </div>
          <div class="form-group">
            <label>IMC</label>
            <input :value="calculateIMC().toFixed(1)" type="text" class="form-input" disabled>
          </div>
        </div>

        <div class="profile-card">
          <h2>Preferencias</h2>
          <div class="form-group">
            <label>Objetivo</label>
            <select v-model="profile.goal" class="form-input">
              <option value="lose_weight">Perder peso</option>
              <option value="maintain">Mantener peso</option>
              <option value="gain_muscle">Ganar músculo</option>
            </select>
          </div>
          <div class="form-group">
            <label>Presupuesto semanal (€)</label>
            <input v-model.number="profile.budget" type="number" class="form-input">
          </div>
        </div>

        <div class="profile-card">
          <h2>Restricciones dietéticas</h2>
          <div class="restrictions">
            <label class="checkbox-label">
              <input v-model="profile.restrictions" type="checkbox" value="vegetarian">
              Vegetariano
            </label>
            <label class="checkbox-label">
              <input v-model="profile.restrictions" type="checkbox" value="vegan">
              Vegano
            </label>
            <label class="checkbox-label">
              <input v-model="profile.restrictions" type="checkbox" value="gluten_free">
              Sin gluten
            </label>
            <label class="checkbox-label">
              <input v-model="profile.restrictions" type="checkbox" value="lactose_free">
              Sin lactosa
            </label>
          </div>
        </div>
      </div>

      <div class="profile-actions">
        <button @click="saveProfile" class="btn btn-primary btn-lg">💾 Guardar cambios</button>
        <button @click="logout" class="btn btn-outline btn-lg">🚪 Cerrar sesión</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useUiStore } from '../stores/ui'

const router = useRouter()
const authStore = useAuthStore()
const uiStore = useUiStore()

const profile = ref({
  name: authStore.user?.name || '',
  email: authStore.user?.email || '',
  age: authStore.user?.age || 0,
  weight: authStore.user?.weight || 0,
  height: authStore.user?.height || 0,
  goal: authStore.user?.goal || 'lose_weight',
  budget: authStore.user?.budget || 60,
  restrictions: authStore.user?.restrictions || []
})

const calculateIMC = () => {
  if (!profile.value.weight || !profile.value.height) return 0
  return profile.value.weight / ((profile.value.height / 100) ** 2)
}

const saveProfile = () => {
  authStore.updateUser(profile.value)
  uiStore.addToast('Perfil actualizado correctamente', 'success')
}

const logout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.profile-view {
  padding: var(--space-8) 0;
  min-height: calc(100vh - var(--navbar-height));
}

.py-8 {
  padding: var(--space-8) 0;
}

.profile-view h1 {
  font-size: var(--text-3xl);
  font-weight: 800;
  margin-bottom: var(--space-10);
}

.profile-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-6);
  margin-bottom: var(--space-10);
}

.profile-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-6);
}

.profile-card h2 {
  font-size: var(--text-lg);
  margin-bottom: var(--space-4);
}

.form-group {
  margin-bottom: var(--space-4);
}

label {
  display: block;
  margin-bottom: var(--space-2);
  font-weight: 600;
  font-size: var(--text-sm);
}

.form-input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-family: inherit;
  font-size: var(--text-base);
  color: var(--color-text);
  background: var(--color-surface);
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-bg);
}

.form-input:disabled {
  background: var(--color-bg);
  opacity: 0.6;
}

.restrictions {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  cursor: pointer;
}

.checkbox-label input {
  margin: 0;
}

.profile-actions {
  display: flex;
  gap: var(--space-4);
  justify-content: center;
}
</style>
