<template>
  <section id="approach" class="section">
    <div class="container">
      <div class="reveal">
        <span class="section-label">// The Methodology</span>
        <h2 class="section-title">Structured. Incremental.<br><span class="text-gradient">AI-accelerated.</span></h2>
        <p class="section-subtitle">
          No big-bang rewrites. No guesswork. A proven four-phase process that
          keeps your application running while we modernize it underneath.
        </p>
      </div>

      <div class="approach-timeline">
        <div class="timeline-line"></div>

        <div v-for="(step, i) in steps" :key="i" class="timeline-step reveal" :class="`reveal-delay-${i + 1}`">
          <div class="step-marker">
            <span class="step-number mono">{{ String(i + 1).padStart(2, '0') }}</span>
          </div>
          <div class="step-content">
            <div class="step-header">
              <h3>{{ step.title }}</h3>
              <span class="step-badge mono">{{ step.badge }}</span>
            </div>
            <p>{{ step.description }}</p>
            <ul class="step-details">
              <li v-for="detail in step.details" :key="detail">{{ detail }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="approach-highlight reveal">
        <div class="highlight-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
        </div>
        <div>
          <h3>AI-Accelerated Execution</h3>
          <p>
            By combining deep Vue expertise with AI-assisted tooling, I deliver migrations
            at a pace that traditional consultancies can't match — without sacrificing code quality
            or test coverage. The same methodology that completed a full 300+ file enterprise migration
            in two sprints.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const steps = [
  {
    title: 'Codebase Audit',
    badge: 'Week 1',
    description: 'A thorough assessment of your current Vue 2 application to map dependencies, identify risks, and build a realistic migration plan.',
    details: [
      'Component inventory and complexity analysis',
      'Vuex store mapping and state management review',
      'Third-party dependency compatibility check',
      'Risk assessment and prioritized ticket breakdown',
    ],
  },
  {
    title: 'Migration Plan',
    badge: 'Week 1–2',
    description: 'A detailed, ticket-by-ticket execution plan your team can review, estimate, and track — no black boxes.',
    details: [
      'Structured ticket breakdown (typically 30–50 tickets)',
      'Dependency graph and execution order',
      'Testing strategy for each migration phase',
      'Rollback plan and risk mitigation steps',
    ],
  },
  {
    title: 'Incremental Execution',
    badge: 'Weeks 2–6',
    description: 'Methodical migration executed in small, reviewable increments. Your app stays deployable throughout the process.',
    details: [
      'Vue 3 + Composition API conversion',
      'Vuetify 2 → Vuetify 3 component framework upgrade',
      'Vuex → Pinia state management migration',
      'Vue CLI → Vite build tooling upgrade',
      'TypeScript adoption and type safety improvements',
    ],
  },
  {
    title: 'Verification & Handoff',
    badge: 'Final Week',
    description: 'Comprehensive validation that everything works before cutting over, plus knowledge transfer so your team owns the result.',
    details: [
      'Full test suite execution and gap analysis',
      'Performance benchmarking (before vs. after)',
      'Team walkthrough and documentation',
      'Post-migration support period',
    ],
  },
]
</script>

<style scoped>
.approach-timeline {
  position: relative;
  max-width: 720px;
  margin: 0 auto 48px;
}

.timeline-line {
  position: absolute;
  left: 24px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--border);
}

.timeline-step {
  display: flex;
  gap: 24px;
  padding-bottom: 40px;
  position: relative;
}

.timeline-step:last-child {
  padding-bottom: 0;
}

.step-marker {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--bg-primary);
  border: 2px solid var(--accent);
  z-index: 1;
}

.step-number {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--accent);
}

.step-content {
  flex: 1;
  padding-top: 4px;
}

.step-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.step-header h3 {
  font-size: 1.15rem;
}

.step-badge {
  font-size: 0.75rem;
  padding: 4px 10px;
  background: var(--accent-subtle);
  color: var(--accent);
  border-radius: 100px;
  font-weight: 500;
}

.step-content > p {
  font-size: 0.93rem;
  margin-bottom: 16px;
}

.step-details {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.step-details li {
  font-size: 0.87rem;
  color: var(--text-secondary);
  padding-left: 20px;
  position: relative;
}

.step-details li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0.6;
}

.approach-highlight {
  display: flex;
  gap: 20px;
  padding: 32px;
  background: var(--bg-secondary);
  border: 1px solid var(--accent-border);
  border-radius: 16px;
  max-width: 720px;
  margin: 0 auto;
}

.highlight-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--accent-subtle);
  color: var(--accent);
}

.approach-highlight h3 {
  margin-bottom: 8px;
  font-size: 1.1rem;
}

.approach-highlight p {
  font-size: 0.93rem;
  line-height: 1.7;
}

@media (max-width: 640px) {
  .timeline-line {
    left: 20px;
  }

  .step-marker {
    width: 40px;
    height: 40px;
  }

  .timeline-step {
    gap: 16px;
  }

  .approach-highlight {
    flex-direction: column;
  }
}

@media (max-width: 375px) {
  .timeline-line {
    left: 16px;
  }

  .step-marker {
    width: 36px;
    height: 36px;
  }

  .step-number {
    font-size: 0.75rem;
  }

  .timeline-step {
    gap: 12px;
    padding-bottom: 28px;
  }

  .approach-highlight {
    padding: 20px;
  }
}
</style>
