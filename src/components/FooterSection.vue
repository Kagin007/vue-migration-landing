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
          <svg class="footer-logo" viewBox="0 0 400 400" width="24" height="24" aria-hidden="true">
            <defs>
              <linearGradient id="footerMainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#42b883" />
                <stop offset="100%" style="stop-color:#3ba676" />
              </linearGradient>
              <linearGradient id="footerDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#3d5a80" />
                <stop offset="100%" style="stop-color:#34506e" />
              </linearGradient>
            </defs>
            <path d="M160,310 L55,165 L115,165 L160,240 L285,65 L345,65 Z" fill="url(#footerDarkGrad)"/>
            <path d="M160,240 L110,160 L138,160 L160,198 L265,80 L293,80 Z" fill="url(#footerMainGrad)"/>
          </svg>
          <span>Vue Migration Consulting</span>
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
