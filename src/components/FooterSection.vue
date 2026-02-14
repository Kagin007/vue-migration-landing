<template>
  <footer class="footer">
    <div class="container">
      <div id="footer-cta" class="footer-cta reveal">
        <h2>Ready to leave Vue 2 behind?</h2>
        <p>
          Book a free intro call to discuss your application, timeline, and the best path forward.
          No commitment, no sales pitch — just a technical conversation with someone who's done it.
        </p>
        <div class="footer-cta-actions">
          <a href="#calendly" class="btn btn-primary btn-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Book a Free Intro Call
          </a>
          <a href="mailto:hello@example.com" class="btn btn-ghost btn-lg">
            Or email me directly
          </a>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-brand">
          <svg class="vue-logo" viewBox="0 0 261.76 226.69" width="24" height="20">
            <g transform="matrix(1.3333 0 0 -1.3333 -76.311 313.34)">
              <path d="m178.04 235.01-22.056-38.208-22.056 38.208h-40.836l62.892-108.96 62.892 108.96z" fill="#42b883"/>
              <path d="m178.04 235.01-22.056-38.208-22.056 38.208h-15.832l37.888-65.64 37.888 65.64z" fill="var(--accent-secondary)"/>
            </g>
          </svg>
          <span>Vue Migration Consulting</span>
        </div>

        <div class="footer-links">
          <a href="mailto:hello@example.com">hello@example.com</a>
          <span class="footer-divider">|</span>
          <a href="#linkedin">LinkedIn</a>
          <span class="footer-divider">|</span>
          <a href="#github">GitHub</a>
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
  padding: 0 0 40px;
  background: var(--bg-primary);
}

.footer-cta {
  text-align: center;
  padding: 80px 40px;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 24px;
  margin-bottom: 48px;
}

.footer-cta h2 {
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  margin-bottom: 16px;
}

.footer-cta > p {
  font-size: 1.05rem;
  max-width: 560px;
  margin: 0 auto 32px;
}

.footer-cta-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.footer-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding-top: 8px;
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

@media (max-width: 640px) {
  .footer-cta {
    padding: 48px 24px;
  }

  .footer-cta-actions {
    flex-direction: column;
  }

  .footer-cta-actions .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
