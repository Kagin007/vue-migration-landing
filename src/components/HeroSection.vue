<script setup>
import { ref, onMounted } from 'vue'

const loaded = ref(false)
onMounted(() => {
  requestAnimationFrame(() => { loaded.value = true })
})
</script>

<template>
  <section id="hero" class="hero">
    <div class="hero-bg">
      <div class="hero-grid"></div>
      <div class="hero-glow"></div>
    </div>

    <div class="container hero-content" :class="{ loaded }">
      <div class="hero-badge">
        <span class="badge-dot"></span>
        <span class="mono">Vue 2 reached EOL — December 31, 2023</span>
      </div>

      <h1 class="hero-title">
        Your Vue 2 app has an<br>
        <span class="text-gradient">expiration date.</span>
      </h1>

      <p class="hero-subtitle">
        I migrate production Vue 2 applications to Vue 3 using a structured,
        AI-accelerated methodology — faster and with less risk than traditional consultancies.
        40 tickets. Two sprints. Battle-tested on production SaaS.
      </p>

      <div class="hero-actions">
        <a href="#calendly" class="btn btn-primary btn-lg">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          Book a Free Intro Call
        </a>
        <a href="#pricing" class="btn btn-secondary btn-lg">
          Start with a Codebase Audit
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </a>
      </div>

      <div class="hero-proof">
        <div class="proof-item">
          <span class="proof-value mono">40</span>
          <span class="proof-label">Structured tickets</span>
        </div>
        <div class="proof-divider"></div>
        <div class="proof-item">
          <span class="proof-value mono">2</span>
          <span class="proof-label">Sprints to complete</span>
        </div>
        <div class="proof-divider"></div>
        <div class="proof-item">
          <span class="proof-value mono">0</span>
          <span class="proof-label">Production downtime</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 72px;
  overflow: hidden;
  background: var(--gradient-hero);
}

.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--border-light) 1px, transparent 1px),
    linear-gradient(90deg, var(--border-light) 1px, transparent 1px);
  background-size: 60px 60px;
  opacity: 0.5;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%);
}

.hero-glow {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(66, 184, 131, 0.08) 0%, transparent 70%);
  border-radius: 50%;
}

.hero-content {
  position: relative;
  text-align: center;
  max-width: 820px;
  margin: 0 auto;
  padding: 80px 24px;
}

.hero-content > * {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.hero-content.loaded > *:nth-child(1) { opacity: 1; transform: translateY(0); transition-delay: 0.1s; }
.hero-content.loaded > *:nth-child(2) { opacity: 1; transform: translateY(0); transition-delay: 0.2s; }
.hero-content.loaded > *:nth-child(3) { opacity: 1; transform: translateY(0); transition-delay: 0.35s; }
.hero-content.loaded > *:nth-child(4) { opacity: 1; transform: translateY(0); transition-delay: 0.5s; }
.hero-content.loaded > *:nth-child(5) { opacity: 1; transform: translateY(0); transition-delay: 0.65s; }

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 18px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 100px;
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 32px;
  box-shadow: var(--shadow-sm);
}

.badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ef4444;
  animation: pulse-dot 2s ease infinite;
}

@keyframes pulse-dot {
  0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
  50% { box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
}

.hero-title {
  margin-bottom: 24px;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: clamp(1.05rem, 1.5vw, 1.2rem);
  max-width: 620px;
  margin: 0 auto 40px;
  color: var(--text-secondary);
}

.hero-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 64px;
}

.btn-lg {
  padding: 16px 32px;
  font-size: 1rem;
}

.hero-proof {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 24px 40px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: var(--shadow-md);
}

.proof-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.proof-value {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--accent);
}

.proof-label {
  font-size: 0.8rem;
  color: var(--text-tertiary);
  font-weight: 500;
}

.proof-divider {
  width: 1px;
  height: 40px;
  background: var(--border);
}

@media (max-width: 640px) {
  .hero-content {
    padding: 48px 24px;
  }

  .hero-actions {
    flex-direction: column;
  }

  .hero-actions .btn {
    width: 100%;
    justify-content: center;
  }

  .hero-proof {
    gap: 20px;
    padding: 20px 24px;
  }

  .proof-value {
    font-size: 1.4rem;
  }

  .proof-label {
    font-size: 0.7rem;
  }
}
</style>
