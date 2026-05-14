# Instrucciones para ejecutar Dietopia (Refactorizado con Vue 3)

## ✅ Proyecto completamente refactorizado

Tu aplicación ha sido refactorizada con **Vue 3 + Vite + Pinia + Vue Router**.

## 📁 Estructura nueva

```
DietopiaWEB/
├── src/
│   ├── assets/styles/main.css
│   ├── components/
│   │   ├── Navbar.vue
│   │   ├── HeroSection.vue
│   │   └── ToastContainer.vue
│   ├── views/
│   │   ├── Landing.vue
│   │   ├── Login.vue
│   │   ├── Dashboard.vue
│   │   ├── DietView.vue
│   │   ├── Shopping.vue
│   │   ├── Progress.vue
│   │   ├── Profile.vue
│   │   ├── DietGeneration.vue
│   │   ├── GuidedShopping.vue
│   │   └── Onboarding.vue
│   ├── stores/
│   │   ├── auth.js
│   │   ├── diet.js
│   │   └── ui.js
│   ├── services/
│   │   └── mockData.js
│   ├── router/
│   │   └── index.js
│   ├── App.vue
│   └── main.js
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Pasos para ejecutar

### 1. Instalar dependencias
```bash
npm install
```

### 2. Desarrollo
```bash
npm run dev
```

Se abrirá automáticamente en http://localhost:5173

### 3. Build para producción
```bash
npm run build
```

### 4. Vista previa de producción
```bash
npm run preview
```

## 🔑 Credenciales de prueba

**Login:**
- Email: `alex@example.com`
- Contraseña: `password123`

O puedes registrarte creando una nueva cuenta.

## 🎯 Características implementadas

✅ **Autenticación**
- Login y registro
- Persistencia de sesión en localStorage
- Guards de rutas protegidas

✅ **Navegación**
- Sistema de router con protección
- Redirecciones automáticas

✅ **Gestión de estado**
- Store de autenticación (Pinia)
- Store de dieta (Pinia)
- Store de UI para notificaciones (Pinia)

✅ **Componentes**
- Navbar reutilizable
- ToastContainer para notificaciones
- HeroSection landing
- Componentes de formularios

✅ **Vistas**
- Landing page
- Login/Signup
- Dashboard con estadísticas
- Visualización de dieta semanal
- Lista de compra
- Progreso del usuario
- Perfil editable
- Generador de dietas
- Onboarding paso a paso

✅ **Funcionalidades**
- Ver plan de comidas
- Seleccionar días
- Ver recetas e ingredientes
- Editar perfil
- Generar nuevas dietas
- Notificaciones toast

## 📝 Notas importantes

1. **Los datos son mock**: Todos los datos mostrados son simulados (localStorage)
2. **Autenticación front-end**: No requiere backend para funcionar
3. **Responsive**: Funciona en desktop, tablet y móvil
4. **CSS moderno**: Utiliza CSS custom properties y grid/flexbox

## 🔧 Archivos eliminados

Los siguientes archivos ya no son necesarios:
- `pages/*.html` (reemplazados por componentes Vue)
- `js/main.js` (migrado a `src/main.js`)
- `js/data.js` (migrado a `src/services/mockData.js`)
- `css/main.css` (migrado a `src/assets/styles/main.css`)

Estos directorios vacíos pueden ser eliminados manualmente.

## 💡 Próximas mejoras sugeridas

1. Integración con backend real
2. Autenticación con JWT
3. Gráficos interactivos (Chart.js)
4. PWA (manifest + service worker)
5. Tests unitarios (Vitest)
6. E2E tests (Cypress/Playwright)
7. Compresión de imágenes
8. Lazy loading

## 📞 Soporte

Si necesitas ayuda, revisa:
- [Vue 3 Docs](https://vuejs.org)
- [Vite Docs](https://vitejs.dev)
- [Pinia Docs](https://pinia.vuejs.org)
- [Vue Router Docs](https://router.vuejs.org)

---

**¡Tu aplicación está lista para usar! 🎉**
