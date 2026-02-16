<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useDarkMode } from '../composables/useDarkMode'
import { useActiveSection } from '../composables/useActiveSection'

const router = useRouter()
const route = useRoute()

const { isDark, toggle: toggleTheme } = useDarkMode()
const { activeSection } = useActiveSection(['hero', 'problem', 'approach', 'assessment', 'pricing', 'credibility', 'faq'])

const scrolled = ref(false)
const mobileOpen = ref(false)

const navLinks = [
  { id: 'problem', label: 'Why Now' },
  { id: 'approach', label: 'Approach' },
  { id: 'assessment', label: 'Assessment' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'credibility', label: 'About' },
  { id: 'faq', label: 'FAQ' },
]

function handleScroll() {
  scrolled.value = window.scrollY > 20
}

function scrollTo(id) {
  mobileOpen.value = false
  if (route.path === '/') {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  } else {
    router.push({ path: '/', hash: `#${id}` })
  }
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <header class="navbar" :class="{ scrolled, 'mobile-open': mobileOpen }">
    <div class="container navbar-inner">
      <router-link to="/" class="navbar-brand">
        <svg class="vue-logo" viewBox="0 0 261.76 226.69" width="28" height="24" aria-hidden="true">
          <g transform="matrix(1.3333 0 0 -1.3333 -76.311 313.34)">
            <path d="m178.04 235.01-22.056-38.208-22.056 38.208h-40.836l62.892-108.96 62.892 108.96z" fill="#42b883"/>
            <path d="m178.04 235.01-22.056-38.208-22.056 38.208h-15.832l37.888-65.64 37.888 65.64z" fill="var(--accent-secondary)"/>
          </g>
        </svg>
        <span class="brand-text">Vue Migration<span class="brand-dot">.</span></span>
      </router-link>

      <nav class="navbar-nav" :class="{ open: mobileOpen }">
        <a
          v-for="link in navLinks"
          :key="link.id"
          :href="`#${link.id}`"
          class="nav-link"
          :class="{ active: route.path === '/' && activeSection === link.id }"
          @click.prevent="scrollTo(link.id)"
        >
          {{ link.label }}
        </a>
        <router-link to="/blog" class="nav-link" :class="{ active: route.path.startsWith('/blog') }" @click="mobileOpen = false">Blog</router-link>
        <a href="#contact" class="btn btn-primary nav-cta" @click.prevent="scrollTo('contact')">
          Contact
        </a>
      </nav>

      <div class="navbar-actions">
        <button class="theme-toggle" @click="toggleTheme" :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
          <svg v-if="isDark" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
          <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>

        <button class="mobile-toggle" @click="mobileOpen = !mobileOpen" :aria-label="mobileOpen ? 'Close menu' : 'Open menu'">
          <span class="hamburger" :class="{ open: mobileOpen }">
            <span></span><span></span><span></span>
          </span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--bg-nav);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;
}

.navbar.scrolled {
  border-bottom-color: var(--border);
  box-shadow: var(--shadow-sm);
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-primary);
  font-weight: 700;
  font-size: 1.1rem;
}

.navbar-brand:hover {
  color: var(--text-primary);
}

.brand-dot {
  color: var(--accent);
}

.navbar-nav {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-link {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: var(--text-primary);
  background: var(--accent-subtle);
}

.nav-link.active {
  color: var(--accent);
  background: var(--accent-subtle);
}

.nav-cta {
  margin-left: 12px;
  padding: 10px 20px;
  font-size: 0.85rem;
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-toggle:hover {
  color: var(--accent);
  border-color: var(--accent-border);
}

.mobile-toggle {
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
}

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 20px;
}

.hamburger span {
  display: block;
  height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.hamburger.open span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
}

.hamburger.open span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

@media (max-width: 900px) {
  .navbar-nav {
    position: fixed;
    top: 72px;
    left: 0;
    right: 0;
    background: var(--bg-nav);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    flex-direction: column;
    padding: 16px 24px 24px;
    border-bottom: 1px solid var(--border);
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s ease;
    gap: 4px;
  }

  .navbar-nav.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .nav-link {
    width: 100%;
    padding: 12px 16px;
  }

  .nav-cta {
    margin-left: 0;
    margin-top: 8px;
    justify-content: center;
  }

  .mobile-toggle {
    display: flex;
  }
}
</style>
