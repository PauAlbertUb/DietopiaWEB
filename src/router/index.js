import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// Views
import Landing from '../views/Landing.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import DietView from '../views/DietView.vue'
import Shopping from '../views/Shopping.vue'
import Progress from '../views/Progress.vue'
import Profile from '../views/Profile.vue'
import DietGeneration from '../views/DietGeneration.vue'
import GuidedShopping from '../views/GuidedShopping.vue'
import Onboarding from '../views/Onboarding.vue'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing,
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/diet',
    name: 'DietView',
    component: DietView,
    meta: { requiresAuth: true }
  },
  {
    path: '/shopping',
    name: 'Shopping',
    component: Shopping,
    meta: { requiresAuth: true }
  },
  {
    path: '/progress',
    name: 'Progress',
    component: Progress,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/diet-generation',
    name: 'DietGeneration',
    component: DietGeneration,
    meta: { requiresAuth: true }
  },
  {
    path: '/guided-shopping',
    name: 'GuidedShopping',
    component: GuidedShopping,
    meta: { requiresAuth: true }
  },
  {
    path: '/onboarding',
    name: 'Onboarding',
    component: Onboarding,
    meta: { requiresAuth: false }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.meta.requiresAuth

  if (requiresAuth && !authStore.isLoggedIn) {
    next({ name: 'Login' })
  } else if (to.name === 'Login' && authStore.isLoggedIn) {
    // If user is already logged in, send them to dashboard when they try to access Login
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router
