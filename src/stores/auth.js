import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isLoggedIn = computed(() => !!user.value)

  // Initialize from localStorage
  const initializeAuth = () => {
    const savedUser = localStorage.getItem('dietopia_user')
    if (savedUser) {
      user.value = JSON.parse(savedUser)
    }
  }

  const login = (userData) => {
    user.value = userData
    localStorage.setItem('dietopia_user', JSON.stringify(userData))
    localStorage.setItem('dietopia_loggedIn', JSON.stringify(true))
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('dietopia_user')
    localStorage.removeItem('dietopia_loggedIn')
  }

  const updateUser = (updates) => {
    if (user.value) {
      user.value = { ...user.value, ...updates }
      localStorage.setItem('dietopia_user', JSON.stringify(user.value))
    }
  }

  return {
    user,
    isLoggedIn,
    initializeAuth,
    login,
    logout,
    updateUser
  }
})
