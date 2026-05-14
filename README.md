# Dietopia - Refactorizado con Vue 3

Proyecto refactorizado con **Vue 3**, **Vite**, **Pinia** y **Vue Router** para una arquitectura moderna y escalable.

## Estructura del Proyecto

```
src/
├── assets/
│   └── styles/
│       └── main.css          # Estilos globales
├── components/
│   ├── Navbar.vue            # Barra de navegación
│   ├── HeroSection.vue        # Sección hero landing
│   └── ToastContainer.vue     # Notificaciones toast
├── views/
│   ├── Landing.vue            # Página de inicio
│   ├── Login.vue              # Autenticación
│   ├── Dashboard.vue          # Panel de control
│   ├── DietView.vue           # Ver dieta
│   ├── Shopping.vue           # Lista de compra
│   ├── Progress.vue           # Progreso
│   ├── Profile.vue            # Perfil de usuario
│   ├── DietGeneration.vue     # Generar dieta
│   ├── GuidedShopping.vue     # Compra guiada
│   └── Onboarding.vue         # Onboarding
├── stores/
│   ├── auth.js                # Store de autenticación (Pinia)
│   ├── diet.js                # Store de dieta (Pinia)
│   └── ui.js                  # Store de UI (Pinia)
├── services/
│   └── mockData.js            # Datos mock
├── router/
│   └── index.js               # Configuración de router
├── App.vue                    # Componente raíz
└── main.js                    # Punto de entrada
```

## Instalación y Uso

### Instalar dependencias
```bash
npm install
```

### Desarrollo
```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

### Build para producción
```bash
npm run build
```

### Preview de producción
```bash
npm run preview
```

## Características

✅ **Arquitectura Vue 3 moderna**
- Composition API
- Componentes SFC (Single File Components)
- Reactividad reactiva

✅ **Gestión de estado con Pinia**
- Store de autenticación
- Store de dieta
- Store de UI

✅ **Routing con Vue Router**
- Protección de rutas (auth guards)
- Redirecciones automáticas

✅ **Diseño responsive**
- Mobile-first
- Media queries
- Flexbox y Grid

✅ **Componentes reutilizables**
- Navbar
- ToastContainer
- HeroSection
- Form inputs
- Buttons

## Funcionalidades

### Landing Page
- Hero section con CTA
- Propuestas de valor
- Testimoniales
- Footer

### Autenticación
- Login con simulación
- Registro de nuevos usuarios
- Validación de contraseñas
- Session persistence

### Dashboard
- Estadísticas del usuario
- Acciones rápidas
- Comidas de hoy

### Dieta
- Visualización de plan semanal
- Selector de días
- Detalles de comidas
- Macronutrientes
- Recetas e ingredientes

### Compra
- Lista optimizada
- Categorías
- Precios estimados
- Ahorro calculado

### Progreso
- Gráficos de progreso (placeholder)
- Logros desbloqueados
- Estadísticas

### Perfil
- Edición de datos personales
- Físicos (peso, altura)
- Preferencias dietéticas
- Restricciones

### Generador de Dieta
- Selección de objetivo
- Restricciones dietéticas
- Presupuesto ajustable

### Onboarding
- Paso a paso
- Recopilación de datos iniciales
- Preferencias personalizadas

## Tecnologías

- **Vue 3**: Framework progresivo
- **Vite**: Build tool ultra-rápido
- **Pinia**: Gestión de estado
- **Vue Router**: Routing
- **CSS Custom Properties**: Variables CSS
- **Composition API**: Lógica reutilizable

## Próximos pasos

- [ ] Integración con backend
- [ ] Autenticación real (JWT)
- [ ] Gráficos reales (Chart.js)
- [ ] Integración de APIs de tiendas
- [ ] PWA (Progressive Web App)
- [ ] Tests unitarios
- [ ] E2E tests

## Notas

- Los datos mostrados son mock (simulados)
- La autenticación es front-end only
- Los gráficos son placeholders
- Las tiendas se integrarán en futuras versiones

## Licencia

© 2025 Dietopia. Todos los derechos reservados.
