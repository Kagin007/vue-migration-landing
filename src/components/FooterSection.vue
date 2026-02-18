<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

function scrollTo(id) {
  if (route.path === '/') {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  } else {
    router.push({ path: '/', hash: `#${id}` })
  }
}
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-bottom">
        <div class="footer-brand">
          <svg class="vue-logo" viewBox="0 0 261.76 226.69" width="24" height="20" aria-hidden="true">
            <g transform="matrix(1.3333 0 0 -1.3333 -76.311 313.34)">
              <path d="m178.04 235.01-22.056-38.208-22.056 38.208h-40.836l62.892-108.96 62.892 108.96z" fill="#42b883"/>
              <path d="m178.04 235.01-22.056-38.208-22.056 38.208h-15.832l37.888-65.64 37.888 65.64z" fill="var(--accent-secondary)"/>
            </g>
          </svg>
          <span>Vue Migration Consulting</span>
        </div>

        <div class="footer-links">
          <a href="#contact" @click.prevent="scrollTo('contact')">Contact</a>
          <span class="footer-divider">|</span>
          <a href="https://www.linkedin.com/in/adam-schulte-a279ab10/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <span class="footer-divider">|</span>
          <a href="https://github.com/Kagin007">GitHub</a>
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
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--text-primary);
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
