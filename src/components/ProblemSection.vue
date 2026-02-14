<template>
  <section id="problem" class="section problem-section">
    <div class="container">
      <div class="reveal">
        <span class="section-label">// The Problem</span>
        <h2 class="section-title">Vue 2 isn't just old.<br>It's a <span class="text-gradient">liability.</span></h2>
        <p class="section-subtitle">
          Since December 31, 2023, Vue 2 receives no security patches, no bug fixes, and no ecosystem updates.
          Every month you wait increases your exposure.
        </p>
      </div>

      <div class="problem-grid">
        <div class="problem-card reveal reveal-delay-1">
          <div class="problem-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <h3>Security Vulnerabilities</h3>
          <p>No more patches means newly discovered CVEs in Vue 2 will never be fixed. Your application is exposed to unpatched vulnerabilities indefinitely.</p>
        </div>

        <div class="problem-card reveal reveal-delay-2">
          <div class="problem-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <h3>Ecosystem Decay</h3>
          <p>Major libraries are dropping Vue 2 support. Vuetify, Nuxt, and the broader ecosystem are Vue 3-only. Staying on Vue 2 means shrinking options and stale dependencies.</p>
        </div>

        <div class="problem-card reveal reveal-delay-3">
          <div class="problem-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
              <line x1="17" y1="11" x2="23" y2="11"/>
            </svg>
          </div>
          <h3>Hiring & Retention</h3>
          <p>Developers don't want to work on dead frameworks. Vue 2 legacy codebases make it harder to recruit talent and keep your best engineers engaged.</p>
        </div>

        <div class="problem-card reveal reveal-delay-4">
          <div class="problem-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
          </div>
          <h3>Compounding Tech Debt</h3>
          <p>Every new feature built on Vue 2 is debt you'll need to rewrite later. The longer you wait, the larger and more expensive the migration becomes.</p>
        </div>
      </div>

      <div class="problem-callout reveal">
        <div class="callout-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
        </div>
        <p>
          <strong>The cost of migration only goes up.</strong>
          Every sprint you build on Vue 2 adds more code to migrate later.
          The best time to start was January 2024. The second best time is now.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.problem-section {
  background: var(--bg-secondary);
}

.problem-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}

.problem-card {
  padding: 32px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.problem-card:hover {
  border-color: var(--accent-border);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.problem-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--accent-subtle);
  color: var(--accent);
  margin-bottom: 20px;
}

.problem-card h3 {
  margin-bottom: 12px;
  font-size: 1.15rem;
}

.problem-card p {
  font-size: 0.93rem;
  line-height: 1.65;
}

.problem-callout {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px 28px;
  background: var(--accent-subtle);
  border: 1px solid var(--accent-border);
  border-radius: 12px;
}

.callout-icon {
  flex-shrink: 0;
  color: var(--accent);
  margin-top: 2px;
}

.problem-callout p {
  font-size: 0.95rem;
}

.problem-callout strong {
  color: var(--text-primary);
}

@media (max-width: 640px) {
  .problem-grid {
    grid-template-columns: 1fr;
  }
}
</style>
