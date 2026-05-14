<template>
  <div class="auth-container">
    <div class="auth-page">
      <div class="auth-panel-left">
        <div class="auth-left-content">
          <div class="auth-left-logo">🥗</div>
          <h2>Dietopia</h2>
          <p>Tu asistente de dietas personalizadas</p>

          <div class="testimonials-section">
            <div class="testimonial-card">
              <p class="testimonial-text">"{{ currentTestimonialData.quote }}"</p>
              <div class="testimonial-author">
                <div class="testimonial-avatar">{{ currentTestimonialData.avatar }}</div>
                <div class="author-info">
                  <div class="author-name">{{ currentTestimonialData.name }}</div>
                  <div class="author-role">{{ currentTestimonialData.role }}</div>
                </div>
              </div>
            </div>

            <div class="testimonial-dots">
              <button
                v-for="(_, idx) in testimonials"
                :key="idx"
                :class="['dot', { active: currentTestimonial === idx }]"
                @click="currentTestimonial = idx"
              ></button>
            </div>
          </div>

          <div class="left-footer">
            <p>✓ Dietas personalizadas</p>
            <p>✓ Compras optimizadas</p>
            <p>✓ Seguimiento de progreso</p>
          </div>
        </div>
      </div>

      <div class="auth-panel-right">
        <div class="auth-form-container">
          <div class="auth-header">
            <h1 v-if="!isSignup">Acceder</h1>
            <h1 v-else>Crear cuenta</h1>
            <p v-if="!isSignup">Continúa con tu dieta personalizada</p>
            <p v-else>Únete a Dietopia hoy</p>
          </div>

          <div class="auth-tabs">
            <button
              :class="['auth-tab', { active: !isSignup }]"
              @click="isSignup = false"
            >
              Acceso
            </button>
            <button
              :class="['auth-tab', { active: isSignup }]"
              @click="isSignup = true"
            >
              Registro
            </button>
          </div>

          <div class="oauth-section">
            <button @click="handleOAuthGoogle" class="oauth-btn oauth-google">
              <span class="oauth-icon">🔵</span>
              Continuar con Google
            </button>
            <button @click="handleOAuthApple" class="oauth-btn oauth-apple">
              <span class="oauth-icon">🍎</span>
              Continuar con Apple
            </button>
          </div>

          <div class="divider">O continúa con email</div>

          <div v-if="!isSignup" class="form-panel active">
            <div class="form-group">
              <label>Email</label>
              <input
                v-model="loginForm.email"
                type="email"
                class="form-input"
                placeholder="tu@email.com"
              >
            </div>
            <div class="form-group">
              <label>Contraseña</label>
              <div class="password-wrapper">
                <input
                  v-model="loginForm.password"
                  :type="showPassword ? 'text' : 'password'"
                  class="form-input"
                  placeholder="••••••••"
                >
                <button
                  @click="showPassword = !showPassword"
                  class="password-toggle"
                  type="button"
                >
                  {{ showPassword ? '👁️' : '👁️‍🗨️' }}
                </button>
              </div>
            </div>
            <button @click="handleLogin" class="btn btn-primary btn-lg" style="width: 100%; margin-bottom: var(--space-4);">
              Acceder
            </button>
            <a href="#" class="link-forgot">¿Olvidaste tu contraseña?</a>
          </div>

          <div v-else class="form-panel active">
            <div class="form-group">
              <label>Nombre</label>
              <input
                v-model="signupForm.name"
                type="text"
                class="form-input"
                placeholder="Tu nombre"
              >
            </div>
            <div class="form-group">
              <label>Email</label>
              <input
                v-model="signupForm.email"
                type="email"
                class="form-input"
                placeholder="tu@email.com"
              >
            </div>
            <div class="form-group">
              <label>Contraseña</label>
              <div class="password-wrapper">
                <input
                  v-model="signupForm.password"
                  :type="showPasswordSignup ? 'text' : 'password'"
                  class="form-input"
                  placeholder="••••••••"
                >
                <button
                  @click="showPasswordSignup = !showPasswordSignup"
                  class="password-toggle"
                  type="button"
                >
                  {{ showPasswordSignup ? '👁️' : '👁️‍🗨️' }}
                </button>
              </div>
              <div class="password-strength">
                <div class="strength-track">
                  <div class="strength-bar" :style="{ width: passwordStrength + '%', backgroundColor: getStrengthColor() }"></div>
                </div>
              </div>
              <p class="strength-text">{{ getStrengthText() }}</p>
            </div>
            <div class="form-group">
              <label class="checkbox-label">
                <input v-model="signupForm.terms" type="checkbox">
                <span>Acepto los términos y condiciones</span>
              </label>
            </div>
            <button @click="handleSignup" class="btn btn-primary btn-lg" style="width: 100%;">
              Crear cuenta
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useUIStore } from '../stores/ui'
import { MOCK_USER } from '../services/mockData'

const router = useRouter()
const authStore = useAuthStore()
const uiStore = useUIStore()

const isSignup = ref(false)
const showPassword = ref(false)
const showPasswordSignup = ref(false)
const currentTestimonial = ref(0)
let testimonialInterval = null

const testimonials = [
  {
    avatar: '👩‍💼',
    name: 'María García',
    role: 'Perdió 5kg en un mes',
    quote: 'He perdido 5kg en un mes sin pasar hambre. Las recetas son deliciosas.'
  },
  {
    avatar: '👨‍💻',
    name: 'José González',
    role: 'Ahorró 40 euros semanales',
    quote: 'Ahorro un 40% en la compra gracias a las recomendaciones de supermercados.'
  },
  {
    avatar: '👩‍🏫',
    name: 'Laura Martínez',
    role: 'Cambió sus hábitos',
    quote: 'La mejor app para transformar mis hábitos alimenticios. Totalmente recomendada.'
  }
]

const currentTestimonialData = computed(() => {
  return testimonials[currentTestimonial.value] || testimonials[0]
})

const goToOnboarding = () => {
  router.push('/onboarding')
}

const loginForm = ref({
  email: 'alex@example.com',
  password: 'password123'
})

const signupForm = ref({
  name: '',
  email: '',
  password: '',
  terms: false
})

const passwordStrength = computed(() => {
  const pwd = signupForm.value.password
  if (pwd.length === 0) return 0
  if (pwd.length < 6) return 25
  if (pwd.length < 10) return 50
  if (pwd.length < 15) return 75
  return 100
})

const getStrengthColor = () => {
  if (passwordStrength.value < 25) return '#e05c5c'
  if (passwordStrength.value < 50) return '#f0a500'
  if (passwordStrength.value < 75) return '#9fb5de'
  return '#4caf50'
}

const getStrengthText = () => {
  if (passwordStrength.value < 25) return 'Muy débil'
  if (passwordStrength.value < 50) return 'Débil'
  if (passwordStrength.value < 75) return 'Buena'
  return 'Muy fuerte'
}

const handleLogin = () => {
  if (!loginForm.value.email || !loginForm.value.password) {
    uiStore.addToast('Por favor completa todos los campos', 'error', 3000)
    return
  }

  const user = {
    ...MOCK_USER,
    email: loginForm.value.email,
    profileCompleted: false,
    shoppingCompleted: false
  }

  authStore.login(user)
  uiStore.addToast(`¡Bienvenido, ${user.name}!`, 'success', 3000)
  goToOnboarding()
}

const handleSignup = () => {
  if (!signupForm.value.name || !signupForm.value.email || !signupForm.value.password) {
    uiStore.addToast('Por favor completa todos los campos', 'error', 3000)
    return
  }

  if (signupForm.value.password.length < 8) {
    uiStore.addToast('La contraseña debe tener al menos 8 caracteres', 'error', 3000)
    return
  }

  if (!signupForm.value.terms) {
    uiStore.addToast('Debes aceptar los términos y condiciones', 'error', 3000)
    return
  }

  const user = {
    ...MOCK_USER,
    name: signupForm.value.name,
    email: signupForm.value.email,
    avatar: signupForm.value.name[0].toUpperCase(),
    profileCompleted: false,
    shoppingCompleted: false
  }

  authStore.login(user)
  uiStore.addToast(`¡Bienvenido, ${user.name}!`, 'success', 3000)
  goToOnboarding()
}

const handleOAuthGoogle = () => {
  uiStore.addToast('Google OAuth (Simulado)', 'info', 3000)
  const user = {
    ...MOCK_USER,
    name: 'Usuario Google',
    email: 'google@example.com',
    profileCompleted: false,
    shoppingCompleted: false
  }
  authStore.login(user)
  goToOnboarding()
}

const handleOAuthApple = () => {
  uiStore.addToast('Apple OAuth (Simulado)', 'info', 3000)
  const user = {
    ...MOCK_USER,
    name: 'Usuario Apple',
    email: 'apple@example.com',
    profileCompleted: false,
    shoppingCompleted: false
  }
  authStore.login(user)
  goToOnboarding()
}

onMounted(() => {
  testimonialInterval = setInterval(() => {
    currentTestimonial.value = (currentTestimonial.value + 1) % testimonials.length
  }, 4000)
})

onBeforeUnmount(() => {
  if (testimonialInterval) {
    clearInterval(testimonialInterval)
  }
})
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
}

.auth-page {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

@media (max-width: 800px) {
  .auth-page {
    grid-template-columns: 1fr;
  }

  .auth-panel-left {
    display: none;
  }
}

.auth-panel-left {
  background: linear-gradient(160deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-12);
  position: relative;
  overflow: hidden;
}

.auth-panel-left::before {
  content: '';
  position: absolute;
  top: -50px;
  right: -50px;
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 50%;
}

.auth-panel-left::after {
  content: '';
  position: absolute;
  bottom: -80px;
  left: -80px;
  width: 400px;
  height: 400px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 50%;
}

.auth-left-content {
  position: relative;
  z-index: 1;
  color: #fff;
  text-align: center;
}

.auth-left-logo {
  font-size: 3rem;
  margin-bottom: var(--space-4);
}

.auth-left-content h2 {
  font-size: var(--text-3xl);
  font-weight: 800;
  color: #fff;
  margin-bottom: var(--space-4);
}

.auth-left-content p {
  font-size: var(--text-lg);
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: var(--space-8);
}

.testimonials-section {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  max-width: 360px;
  margin: var(--space-8) auto;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.testimonial-card {
  animation: fadeIn 0.3s ease;
}

.testimonial-text {
  font-size: var(--text-base);
  color: rgba(255, 255, 255, 0.92);
  font-style: italic;
  margin-bottom: var(--space-4);
  line-height: 1.6;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding-top: var(--space-4);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.testimonial-avatar {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.author-info {
  flex: 1;
}

.author-name {
  font-weight: 700;
  color: #fff;
  font-size: var(--text-sm);
}

.author-role {
  font-size: var(--text-xs);
  color: rgba(255, 255, 255, 0.7);
}

.testimonial-dots {
  display: flex;
  justify-content: center;
  gap: var(--space-2);
  margin-top: var(--space-4);
}

.dot {
  width: 8px;
  height: 8px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  cursor: pointer;
  border: none;
  transition: all var(--transition-base);
}

.dot.active {
  background: #fff;
  width: 24px;
  border-radius: var(--radius-full);
}

.left-footer {
  text-align: left;
  margin-top: var(--space-8);
}

.left-footer p {
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: var(--space-2);
}

.auth-panel-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-12) var(--space-8);
  background: var(--color-bg);
  overflow-y: auto;
}

.auth-form-container {
  width: 100%;
  max-width: 400px;
}

.auth-header {
  text-align: center;
  margin-bottom: var(--space-8);
}

.auth-header h1 {
  font-size: var(--text-2xl);
  font-weight: 800;
  margin-bottom: var(--space-2);
}

.auth-header p {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.auth-tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-2);
  background: var(--color-bg-alt);
  padding: 4px;
  border-radius: var(--radius-md);
  margin-bottom: var(--space-6);
}

.auth-tab {
  padding: var(--space-3);
  text-align: center;
  border-radius: calc(var(--radius-md) - 4px);
  font-size: var(--text-sm);
  font-weight: 600;
  cursor: pointer;
  color: var(--color-text-muted);
  transition: all var(--transition-fast);
  border: none;
  background: none;
}

.auth-tab.active {
  background: var(--color-surface);
  color: var(--color-text);
  box-shadow: var(--shadow-sm);
}

.oauth-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

.oauth-btn {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-text);
  font-size: var(--text-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-base);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
}

.oauth-btn:hover {
  border-color: var(--color-primary);
  background: rgba(91, 165, 91, 0.05);
}

.oauth-icon {
  font-size: 1.2rem;
}

.divider {
  text-align: center;
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  margin: var(--space-6) 0;
  position: relative;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 40%;
  height: 1px;
  background: var(--color-border);
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

.form-group {
  margin-bottom: var(--space-4);
}

label {
  display: block;
  margin-bottom: var(--space-2);
  font-weight: 600;
  font-size: var(--text-sm);
  color: var(--color-text);
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
  transition: all var(--transition-fast);
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-bg);
}

.password-wrapper {
  position: relative;
}

.password-wrapper .form-input {
  padding-right: 44px;
}

.password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-muted);
  font-size: 1rem;
  padding: 0;
}

.password-strength {
  margin-top: var(--space-2);
  margin-bottom: var(--space-2);
}

.strength-track {
  width: 100%;
  height: 6px;
  background: #e5e5e5;
  border-radius: var(--radius-full);
  overflow: hidden;
}

.strength-bar {
  height: 100%;
  transition: width 0.3s ease;
}

.strength-text {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin: 0;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  cursor: pointer;
  font-weight: 500;
  font-size: var(--text-sm);
}

.checkbox-label input {
  width: 18px;
  height: 18px;
  cursor: pointer;
  margin: 0;
}

.link-forgot {
  display: block;
  text-align: center;
  color: var(--color-primary);
  text-decoration: none;
  font-size: var(--text-sm);
  font-weight: 600;
  transition: opacity var(--transition-base);
}

.link-forgot:hover {
  opacity: 0.7;
}

.form-panel {
  display: none;
}

.form-panel.active {
  display: block;
  animation: slideInUp 0.3s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
