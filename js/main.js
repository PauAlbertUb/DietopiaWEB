/**
 * main.js – Shared utilities for Dietopia
 * Navigation helpers, toast notifications, and common UI patterns
 */

// ============================================================
// Navigation helper — highlights active nav link
// ============================================================
function initNavigation() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href") || "";
    if (href.includes(currentPage)) {
      link.classList.add("active");
    }
  });
}

// ============================================================
// Toast notifications
// ============================================================
function showToast(message, type = "default", duration = 3000) {
  let toast = document.getElementById("dietopia-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "dietopia-toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.className = "toast " + type;

  // Trigger animation
  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
  }, duration);
}

// ============================================================
// Simple localStorage helpers (simulates user session)
// ============================================================
const Storage = {
  get(key) {
    try {
      const val = localStorage.getItem("dietopia_" + key);
      return val ? JSON.parse(val) : null;
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem("dietopia_" + key, JSON.stringify(value));
    } catch {
      /* ignore quota errors */
    }
  },
  remove(key) {
    localStorage.removeItem("dietopia_" + key);
  },
};

// ============================================================
// Auth guard — if not "logged in", redirect to login
// (purely front-end simulation)
// ============================================================
function requireAuth() {
  const loggedIn = Storage.get("loggedIn");
  if (!loggedIn) {
    window.location.href = getBasePath() + "pages/login.html";
  }
}

// ============================================================
// Get base path relative to current file location
// ============================================================
function getBasePath() {
  const path = window.location.pathname;
  if (path.includes("/pages/")) {
    return "../";
  }
  return "";
}

// ============================================================
// Animate number counting up
// ============================================================
function animateCount(el, target, duration = 800, suffix = "") {
  const start = 0;
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const value = Math.round(start + (target - start) * eased);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ============================================================
// Intersection Observer for fade-in animations
// ============================================================
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
}

// ============================================================
// Render shared navbar
// ============================================================
function renderNavbar(activePage) {
  const base = getBasePath();
  const navbar = document.getElementById("main-navbar");
  if (!navbar) return;

  const isLoggedIn = Storage.get("loggedIn");
  if (!isLoggedIn) return;

  const user = Storage.get("user") || { name: "Usuario", avatar: "🧑" };

  navbar.innerHTML = `
    <div class="container">
      <a href="${base}index.html" class="navbar-brand">
        <span class="brand-icon">🥗</span>
        Dietopia
      </a>
      <nav class="navbar-nav">
        <a href="${base}pages/dashboard.html" class="nav-link ${activePage === 'dashboard' ? 'active' : ''}">
          <span class="nav-icon">🏠</span><span class="nav-label">Inicio</span>
        </a>
        <a href="${base}pages/diet-view.html" class="nav-link ${activePage === 'diet' ? 'active' : ''}">
          <span class="nav-icon">🥗</span><span class="nav-label">Dieta</span>
        </a>
        <a href="${base}pages/shopping.html" class="nav-link ${activePage === 'shopping' ? 'active' : ''}">
          <span class="nav-icon">🛒</span><span class="nav-label">Compra</span>
        </a>
        <a href="${base}pages/progress.html" class="nav-link ${activePage === 'progress' ? 'active' : ''}">
          <span class="nav-icon">📊</span><span class="nav-label">Progreso</span>
        </a>
        <a href="${base}pages/profile.html" class="nav-link ${activePage === 'profile' ? 'active' : ''}">
          <span class="nav-icon">${user.avatar}</span><span class="nav-label">Perfil</span>
        </a>
      </nav>
    </div>
  `;
}

// ============================================================
// Initialize on DOM ready
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  initScrollAnimations();
  initNavigation();
});
