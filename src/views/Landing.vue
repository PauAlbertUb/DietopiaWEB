<template>
  <section class="landing-view">
    <nav class="landing-navbar">
      <div class="container navbar-content">
        <router-link to="/" class="navbar-brand">
          <span class="brand-icon">🥗</span>
          Dietopia
        </router-link>
        <div style="display:flex; gap:12px; align-items:center;">
          <router-link to="/login" class="btn btn-outline btn-sm">Iniciar sesión</router-link>
          <router-link to="/login" class="btn btn-primary btn-sm">Unirse gratis</router-link>
        </div>
      </div>
    </nav>

    <HeroSection />

    <!-- Value Props -->
    <section class="value-props">
      <div class="container">
        <div class="section-header">
          <div class="section-eyebrow">¿Por qué Dietopia?</div>
          <h2>Todo lo que necesitas para comer bien</h2>
          <p>Sin apps complicadas. Sin recetas inentendibles. Solo resultados.</p>
        </div>
        <div class="props-grid">
          <div class="prop-card">
            <span class="prop-icon">🎯</span>
            <h3>Personalizado</h3>
            <p>Tu dieta se adapta a tus objetivos, restricciones y presupuesto.</p>
          </div>
          <div class="prop-card">
            <span class="prop-icon">⚡</span>
            <h3>Rápido</h3>
            <p>Genera un plan semanal en segundos, no horas.</p>
          </div>
          <div class="prop-card">
            <span class="prop-icon">💰</span>
            <h3>Económico</h3>
            <p>Ahorra hasta 40% en tu lista de la compra.</p>
          </div>
          <div class="prop-card">
            <span class="prop-icon">😋</span>
            <h3>Delicioso</h3>
            <p>Recetas variadas que no te aburren.</p>
          </div>
          <div class="prop-card">
            <span class="prop-icon">📊</span>
            <h3>Seguimiento</h3>
            <p>Monitoriza tu progreso y mantén tu motivación.</p>
          </div>
          <div class="prop-card">
            <span class="prop-icon">🚀</span>
            <h3>IA Avanzada</h3>
            <p>Tecnología inteligente que aprende de ti.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How it Works -->
    <section class="how-it-works">
      <div class="container">
        <div class="section-header">
          <div class="section-eyebrow">Proceso</div>
          <h2>En 3 pasos tienes tu dieta</h2>
          <p>Más sencillo imposible.</p>
        </div>
        <div class="steps-grid">
          <div class="step-card">
            <div class="step-number">1</div>
            <div style="font-size:2rem; margin-bottom:12px;">📋</div>
            <h3>Cuéntanos sobre ti</h3>
            <p>Tus objetivos, restricciones y presupuesto. Solo 2 minutos.</p>
          </div>
          <div class="step-card">
            <div class="step-number">2</div>
            <div style="font-size:2rem; margin-bottom:12px;">🤖</div>
            <h3>La IA genera tu plan</h3>
            <p>Dieta semanal personalizada con recetas y lista de la compra optimizada.</p>
          </div>
          <div class="step-card">
            <div class="step-number">3</div>
            <div style="font-size:2rem; margin-bottom:12px;">✅</div>
            <h3>Disfruta comiendo mejor</h3>
            <p>Sigue el plan, ajusta lo que quieras y mira tu progreso.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="testimonials">
      <div class="container">
        <div class="section-header">
          <div class="section-eyebrow">Comunidad</div>
          <h2>Lo que dicen nuestros usuarios</h2>
        </div>
        <div class="testimonials-grid">
          <div v-for="testimonial in TESTIMONIALS" :key="testimonial.author" class="testimonial-card">
            <p class="testimonial-text">"{{ testimonial.text }}"</p>
            <div class="testimonial-author">
              <div class="author-avatar">{{ testimonial.avatar }}</div>
              <div>
                <div class="author-name">{{ testimonial.author }}</div>
                <div class="author-role">{{ testimonial.role }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <h2>¿Listo para comer mejor?</h2>
        <p>Únete a más de 12.000 personas que ya disfrutan de dietas personalizadas sin esfuerzo.</p>
        <router-link to="/login" class="btn btn-white btn-lg">
          Empezar ahora
        </router-link>
      </div>
    </section>

    <!-- Footer -->
    <footer>
      <div class="container">
        <div class="footer-content">
          <div class="footer-brand">
            <span style="font-size: 1.5rem;">🥗</span>
            Dietopia
          </div>
          <div class="footer-links">
            <a href="#">Sobre nosotros</a>
            <a href="#">Privacidad</a>
            <a href="#">Términos</a>
            <a href="#">Contacto</a>
          </div>
        </div>
        <p>&copy; 2025 Dietopia. Todos los derechos reservados.</p>
      </div>
    </footer>
  </section>
</template>

<script setup>
import { TESTIMONIALS } from '../services/mockData'
import HeroSection from '../components/HeroSection.vue'
</script>

<style scoped>
.landing-view {
  background: var(--color-bg);
}

.landing-navbar {
  height: var(--navbar-height);
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-lg);
  font-weight: 800;
  color: var(--color-primary);
  text-decoration: none;
}

.brand-icon {
  font-size: 1.5rem;
}

.value-props {
  padding: var(--space-16) 0;
  background: var(--color-surface);
}

.section-header {
  text-align: center;
  margin-bottom: var(--space-12);
}

.section-eyebrow {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-primary);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: var(--space-3);
}

.section-header h2 {
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 800;
  margin-bottom: var(--space-4);
}

.section-header p {
  font-size: var(--text-lg);
  color: var(--color-text-muted);
  max-width: 520px;
  margin: 0 auto;
}

.props-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: var(--space-6);
}

.prop-card {
  padding: var(--space-6);
  border-radius: var(--radius-md);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  text-align: center;
  transition: all var(--transition-base);
}

.prop-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-primary);
}

.prop-icon {
  font-size: 2.5rem;
  margin-bottom: var(--space-4);
  display: block;
}

.prop-card h3 {
  font-size: var(--text-xl);
  font-weight: 700;
  margin-bottom: var(--space-2);
}

.prop-card p {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: 1.6;
}

.how-it-works {
  padding: var(--space-16) 0;
  background: linear-gradient(180deg, var(--color-primary-bg) 0%, var(--color-surface) 100%);
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-6);
  margin-top: var(--space-10);
}

.step-card {
  text-align: center;
  padding: var(--space-6);
}

.step-number {
  width: 48px;
  height: 48px;
  background: var(--color-primary);
  color: #fff;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-xl);
  font-weight: 800;
  margin: 0 auto var(--space-4);
}

.step-card h3 {
  font-size: var(--text-lg);
  font-weight: 700;
  margin-bottom: var(--space-2);
}

.step-card p {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.testimonials {
  padding: var(--space-16) 0;
  background: var(--color-surface);
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-6);
  margin-top: var(--space-10);
}

.testimonial-card {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-6);
  position: relative;
  transition: all var(--transition-base);
}

.testimonial-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.testimonial-card::before {
  content: '"';
  position: absolute;
  top: -10px;
  left: 20px;
  font-size: 4rem;
  color: var(--color-primary);
  font-family: serif;
  line-height: 1;
}

.testimonial-text {
  font-size: var(--text-base);
  color: var(--color-text);
  line-height: 1.7;
  margin-bottom: var(--space-4);
  font-style: italic;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.author-avatar {
  width: 40px;
  height: 40px;
  background: var(--color-primary-bg);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.author-name {
  font-weight: 700;
  font-size: var(--text-sm);
}

.author-role {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.cta-section {
  padding: var(--space-16) 0;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  text-align: center;
  color: #fff;
}

.cta-section h2 {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 800;
  color: #fff;
  margin-bottom: var(--space-4);
}

.cta-section p {
  font-size: var(--text-lg);
  color: rgba(255,255,255,0.85);
  margin-bottom: var(--space-8);
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
}

.btn-white {
  background: #fff;
  color: var(--color-primary-dark);
  border-color: #fff;
}

.btn-white:hover {
  background: var(--color-primary-bg);
  border-color: var(--color-primary-bg);
  color: var(--color-primary-dark);
  transform: translateY(-2px);
}

footer {
  padding: var(--space-8) 0;
  background: var(--color-bg-alt);
  border-top: 1px solid var(--color-border);
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
}

.footer-brand {
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-primary);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.footer-links {
  display: flex;
  gap: var(--space-6);
}

.footer-links a {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.footer-links a:hover {
  color: var(--color-primary);
}

footer p {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  text-align: center;
  margin: 0;
}
</style>
