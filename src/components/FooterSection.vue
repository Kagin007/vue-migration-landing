<script setup>
import logo from '../assets/vue-migration-logo.svg'
import { useScrollTo } from '../composables/useScrollTo'

const { scrollTo } = useScrollTo()
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-bottom">
        <div class="footer-brand">
          <img :src="logo" alt="Vue Migration Consulting" class="footer-logo" />
          <span>Vue Migration<span class="brand-dot">.</span></span>
        </div>

        <div class="footer-links">
          <a href="#contact" @click.prevent="scrollTo('contact')">Contact</a>
          <span class="footer-divider">|</span>
          <a href="https://www.linkedin.com/in/adam-schulte-a279ab10/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <span class="footer-divider">|</span>
          <a href="https://www.linkedin.com/company/vue-migration-consulting/" target="_blank" rel="noopener noreferrer">Company Page</a>
          <span class="footer-divider">|</span>
          <a href="https://www.youtube.com/@vuemigration" target="_blank" rel="noopener noreferrer">YouTube</a>
          <span class="footer-divider">|</span>
          <a href="https://github.com/Kagin007" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>

        <div class="footer-meta">
          <p>Built with Vue 3 + Vite — naturally.</p>
          <p>&copy; {{ new Date().getFullYear() }} Adam Schulte. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 40px 0;
  background: var(--bg-primary);
}

.footer-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--text-primary);
}

.footer-logo {
  width: 32px;
  height: 32px;
  border-radius: 6px;
}

.brand-dot {
  color: var(--accent);
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.footer-links a {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.footer-links a:hover {
  color: var(--accent);
}

.footer-divider {
  color: var(--border);
  font-size: 0.8rem;
}

.footer-meta {
  text-align: center;
}

.footer-meta p {
  font-size: 0.8rem;
  color: var(--text-tertiary);
}
</style>
