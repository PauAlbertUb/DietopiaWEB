<template>
  <nav class="navbar">
    <div class="container navbar-content">
      <router-link to="/" class="navbar-brand">
        <span class="brand-icon">🥗</span>
        Dietopia
      </router-link>

      <div class="navbar-nav">
        <router-link to="/dashboard" class="nav-link" active-class="active">
          <span class="nav-icon">🏠</span>
          <span class="nav-label">Inicio</span>
        </router-link>
        <router-link to="/diet" class="nav-link" active-class="active">
          <span class="nav-icon">🥗</span>
          <span class="nav-label">Dieta</span>
        </router-link>
        <router-link to="/shopping" class="nav-link" active-class="active">
          <span class="nav-icon">🛒</span>
          <span class="nav-label">Compra</span>
        </router-link>
        <router-link to="/progress" class="nav-link" active-class="active">
          <span class="nav-icon">📊</span>
          <span class="nav-label">Progreso</span>
        </router-link>
        <router-link to="/profile" class="nav-link" active-class="active">
          <span class="nav-icon">{{ user?.avatar || '🧑' }}</span>
          <span class="nav-label">Perfil</span>
        </router-link>
      </div>

      <div class="navbar-actions">
        <button @click="logout" class="btn btn-sm btn-outline">Salir</button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const user = computed(() => authStore.user)

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  height: var(--navbar-height);
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: var(--shadow-sm);
}

.navbar-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-6);
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-lg);
  font-weight: 800;
  color: var(--color-primary);
  text-decoration: none;
  white-space: nowrap;
}

.brand-icon {
  font-size: 1.5rem;
}

.navbar-nav {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  flex: 1;
  justify-content: center;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  color: var(--color-text-muted);
  text-decoration: none;
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
  font-size: var(--text-sm);
  font-weight: 500;
}

.nav-link:hover {
  color: var(--color-primary);
  background: var(--color-primary-bg);
}

.nav-link.active {
  color: var(--color-primary);
  background: var(--color-primary-bg);
  font-weight: 600;
}

.nav-icon {
  font-size: 1.2rem;
}

.nav-label {
  white-space: nowrap;
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

@media (max-width: 768px) {
  .navbar-content {
    flex-wrap: wrap;
    gap: var(--space-3);
  }

  .navbar-nav {
    order: 3;
    width: 100%;
    justify-content: flex-start;
    overflow-x: auto;
  }

  .nav-label {
    display: none;
  }

  .navbar-actions {
    order: 2;
  }
}
</style>
