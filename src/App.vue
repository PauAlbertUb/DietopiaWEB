<template>
  <div class="app">
    <Navbar v-if="showNavbar" />
    <RouterView />
    <ToastContainer />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import ToastContainer from './components/ToastContainer.vue'
import { useAuthStore } from './stores/auth'

const route = useRoute()
const authStore = useAuthStore()

onMounted(() => {
  authStore.initializeAuth()
})

// No mostrar navbar en login ni en landing
const showNavbar = computed(() => {
  return authStore.isLoggedIn && !['Landing', 'Login'].includes(route.name)
})
</script>

<style scoped>
.app {
  min-height: 100vh;
  background-color: var(--color-bg);
}
</style>
