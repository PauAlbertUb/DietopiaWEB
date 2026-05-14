<template>
  <div class="hero">
    <div class="container">
      <div class="hero-content">
        <div class="hero-eyebrow">✨ Nuevo: Dietas generadas con IA</div>
        <h1>
          Come mejor.<br>
          <span class="highlight">Sin esfuerzo.</span>
        </h1>
        <p class="hero-desc">
          Dietopia genera tu plan de comidas personalizado en segundos, optimiza tu lista de la compra y te ayuda a alcanzar tus objetivos sin complicaciones.
        </p>
        <div class="hero-cta">
          <router-link to="/login" class="btn btn-primary btn-lg">
            🚀 Unirme ahora — es gratis
          </router-link>
          <a href="#features" class="btn btn-outline btn-lg">
            Ver cómo funciona
          </a>
        </div>
        <div class="hero-stats">
          <div class="hero-stat">
            <span class="hero-stat-value">12000+</span>
            <span class="hero-stat-label">Usuarios activos</span>
          </div>
          <div class="hero-stat">
            <span class="hero-stat-value">40%</span>
            <span class="hero-stat-label">Ahorro en compra</span>
          </div>
          <div class="hero-stat">
            <span class="hero-stat-value">98%</span>
            <span class="hero-stat-label">Satisfacción</span>
          </div>
        </div>
      </div>

      <div class="hero-visual">
        <div class="hero-card-preview hero-card-main">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">
            <div style="font-size:0.8rem; font-weight:700; color:var(--color-text-muted);">PLAN ESTA SEMANA</div>
            <span class="badge badge-green">✓ Activo</span>
          </div>
          <div class="meal-preview-row">
            <div class="meal-preview-emoji">🍓</div>
            <div class="meal-preview-info">
              <h4>Avena con frutas</h4>
              <p>Desayuno · 320 kcal</p>
            </div>
          </div>
          <div class="meal-preview-row">
            <div class="meal-preview-emoji">🥗</div>
            <div class="meal-preview-info">
              <h4>Ensalada de pollo</h4>
              <p>Comida · 480 kcal</p>
            </div>
          </div>
          <div class="meal-preview-row">
            <div class="meal-preview-emoji">🐟</div>
            <div class="meal-preview-info">
              <h4>Salmón al vapor</h4>
              <p>Cena · 420 kcal</p>
            </div>
          </div>
        </div>
        <div class="hero-card-preview hero-card-small">
          <div style="font-size:0.75rem; font-weight:700; color:var(--color-text-muted); margin-bottom:8px;">AHORRO SEMANAL</div>
          <div style="font-size:1.6rem; font-weight:800; color:var(--color-primary);">-38€</div>
          <div style="font-size:0.75rem; color:var(--color-text-muted);">vs. semana anterior</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.hero {
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  background: linear-gradient(160deg, #f0f9f0 0%, #e8f5e9 40%, #ffffff 100%);
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: -100px;
  right: -100px;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(91,165,91,0.1) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-12);
}

.hero-content {
  max-width: 580px;
  flex: 1;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--color-primary-bg);
  border: 1px solid var(--color-border);
  color: var(--color-primary-dark);
  font-size: var(--text-sm);
  font-weight: 600;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  margin-bottom: var(--space-5);
}

.hero h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.15;
  margin-bottom: var(--space-5);
}

.hero h1 .highlight {
  color: var(--color-primary);
  position: relative;
}

.hero-desc {
  font-size: var(--text-lg);
  color: var(--color-text-muted);
  margin-bottom: var(--space-8);
  max-width: 480px;
  line-height: 1.7;
}

.hero-cta {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
  margin-bottom: var(--space-10);
}

.hero-stats {
  display: flex;
  gap: var(--space-6);
  padding-top: var(--space-6);
  border-top: 1px solid var(--color-border);
  flex-wrap: wrap;
}

.hero-stat {
  display: flex;
  flex-direction: column;
}

.hero-stat-value {
  font-size: var(--text-2xl);
  font-weight: 800;
  color: var(--color-primary);
}

.hero-stat-label {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.hero-visual {
  flex: 0 0 auto;
  width: 380px;
  height: 380px;
  position: relative;
  display: none;
}

@media (min-width: 900px) {
  .hero-visual { display: block; }
}

.hero-card-preview {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-lg);
  padding: var(--space-5);
  max-width: 320px;
  position: absolute;
}

.hero-card-main {
  top: 20px;
  left: 20px;
}

.hero-card-small {
  bottom: 30px;
  right: 0;
  width: 200px;
  padding: var(--space-3) var(--space-4);
}

.meal-preview-row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) 0;
  border-bottom: 1px solid var(--color-border);
}

.meal-preview-row:last-child {
  border-bottom: none;
}

.meal-preview-emoji {
  font-size: 1.5rem;
  width: 40px;
  text-align: center;
}

.meal-preview-info h4 {
  font-size: var(--text-sm);
  font-weight: 600;
  margin: 0 0 4px 0;
}

.meal-preview-info p {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin: 0;
}

@media (max-width: 900px) {
  .container {
    flex-direction: column;
  }
}
</style>
