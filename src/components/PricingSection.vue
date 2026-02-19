<script setup>
import { ref } from 'vue'

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const tiers = ref([
  {
    name: 'Migration Audit',
    price: '$1,500 – $2,500',
    unit: 'CAD, fixed fee',
    description: 'Understand exactly what your migration involves before committing to execution.',
    popular: false,
    features: [
      'Full codebase assessment',
      'Component & dependency inventory',
      'Risk analysis and complexity scoring',
      'Detailed migration plan with ticket breakdown',
      'Performance profiling and reactivity optimization',
      'Effort estimate and timeline projection',
      'Written report you can act on independently',
    ],
    cta: 'Get Started',
    ctaLink: '#contact',
  },
  {
    name: 'Guided Migration',
    price: '$175 – $225',
    unit: 'CAD, per hour',
    description: 'Your team executes the migration with my expert guidance. I provide the roadmap, review every PR, and unblock technical challenges so your developers build Vue 3 skills while shipping the migration.',
    popular: false,
    features: [
      'Everything in the Migration Audit',
      'Weekly strategy and planning sessions',
      'Code reviews on all migration PRs',
      'Architecture guidance for Composition API patterns',
      'Pinia state management design review',
      'Vite configuration and build optimization support',
      'On-demand async support via Slack or email',
      'Knowledge transfer — your team owns the result',
    ],
    cta: 'Get in Touch',
    ctaLink: '#contact',
  },
  {
    name: 'Full Migration',
    price: '$7,500 – $60,000',
    unit: 'CAD, project-based',
    description: 'End-to-end execution. I handle the migration from audit through production deployment so your team can stay focused on shipping features.',
    popular: true,
    tiers: [
      { label: 'Small', detail: '< 50 components', range: '$7,500 – $12,000' },
      { label: 'Medium', detail: '50–150 components', range: '$15,000 – $30,000' },
      { label: 'Large', detail: '150+ components', range: '$30,000 – $60,000' },
    ],
    features: [
      'Everything in the Migration Audit',
      'Full hands-on-keyboard execution',
      'Vue 3, Vuetify 3, Pinia, Vite, and TypeScript migration',
      'Code reviews and PR-based workflow',
      'Test suite updates and validation',
      'Performance optimization',
      'Post-migration support period',
    ],
    cta: 'Get in Touch',
    ctaLink: '#contact',
  },
])
</script>

<template>
  <section id="pricing" class="section pricing-section section-divider" aria-labelledby="pricing-heading">
    <div class="container">
      <div class="reveal" style="text-align: center;">
        <span class="section-label">// Services & Pricing</span>
        <h2 id="pricing-heading" class="section-title" style="margin-left: auto; margin-right: auto;">Vue Migration Services & Pricing.<br><span class="text-gradient">Right-sized for your team.</span></h2>
        <p class="section-subtitle" style="margin-left: auto; margin-right: auto;">
          Start with an audit to scope the work, get guided support for your team, or go straight to a full migration — either way, you get the same developer from start to finish.
        </p>
      </div>

      <div class="pricing-grid">
        <div
          v-for="(tier, i) in tiers"
          :key="tier.name"
          class="pricing-card reveal"
          :class="[`reveal-delay-${i + 1}`, { popular: tier.popular }]"
        >
          <div v-if="tier.popular" class="popular-badge mono">Most Popular</div>

          <h3 class="tier-name">{{ tier.name }}</h3>
          <div class="tier-price">
            <span class="price-value">{{ tier.price }}</span>
            <span class="price-unit">{{ tier.unit }}</span>
          </div>
          <p class="tier-description">{{ tier.description }}</p>

          <div v-if="tier.tiers" class="tier-breakdown">
            <div v-for="t in tier.tiers" :key="t.label" class="tier-row">
              <div class="tier-row-label">
                <span class="tier-row-name">{{ t.label }}</span>
                <span class="tier-row-detail">{{ t.detail }}</span>
              </div>
              <span class="tier-row-range mono">{{ t.range }}</span>
            </div>
          </div>

          <ul class="tier-features">
            <li v-for="feature in tier.features" :key="feature">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {{ feature }}
            </li>
          </ul>

          <a :href="tier.ctaLink" class="btn" :class="tier.popular ? 'btn-primary' : 'btn-secondary'" style="width: 100%; justify-content: center;" @click.prevent="scrollTo('contact')">
            {{ tier.cta }}
          </a>
        </div>
      </div>

      <p class="pricing-note reveal">
        All pricing in Canadian dollars. Scope and final pricing confirmed after an initial discovery call.
        Not sure where to start? <a href="#contact" @click.prevent="scrollTo('contact')">Let's talk</a> — no commitment required.
      </p>
    </div>
  </section>
</template>

<style scoped>
.pricing-section {
  background: var(--bg-secondary);
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 32px;
  align-items: start;
}

.pricing-card {
  position: relative;
  padding: 36px 28px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 20px;
  transition: all 0.3s ease;
}

.pricing-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg), 0 0 20px rgba(66, 184, 131, 0.08);
}

.pricing-card.popular {
  border-color: var(--accent);
  box-shadow: var(--shadow-lg), 0 0 0 1px var(--accent), 0 0 24px rgba(66, 184, 131, 0.1);
}

.popular-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 16px;
  background: var(--gradient-accent);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 100px;
  white-space: nowrap;
}

.tier-name {
  font-size: 1.15rem;
  margin-bottom: 16px;
}

.tier-price {
  margin-bottom: 16px;
}

.price-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-primary);
  font-family: 'JetBrains Mono', monospace;
}

.price-unit {
  display: block;
  font-size: 0.85rem;
  color: var(--text-tertiary);
  margin-top: 4px;
}

.tier-description {
  font-size: 0.9rem;
  margin-bottom: 24px;
  min-height: 60px;
}

.tier-features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 28px;
}

.tier-features li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.88rem;
  color: var(--text-secondary);
}

.tier-features li svg {
  flex-shrink: 0;
  color: var(--accent);
  margin-top: 2px;
}

.tier-breakdown {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
  padding: 16px;
  background: var(--bg-tertiary);
  border-radius: 12px;
  border: 1px solid var(--border);
}

.tier-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.tier-row-label {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tier-row-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-primary);
}

.tier-row-detail {
  font-size: 0.78rem;
  color: var(--text-tertiary);
}

.tier-row-range {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--accent);
  white-space: nowrap;
}

.pricing-note {
  text-align: center;
  font-size: 0.9rem;
  color: var(--text-tertiary);
}

@media (max-width: 1100px) {
  .pricing-grid {
    grid-template-columns: 1fr;
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
  }

  .tier-description {
    min-height: unset;
  }
}

@media (max-width: 480px) {
  .pricing-grid {
    max-width: 100%;
  }

  .pricing-card {
    padding: 28px 20px;
  }

  .price-value {
    font-size: 1.25rem;
    word-break: break-word;
  }

  .tier-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }

  .tier-row-range {
    white-space: normal;
  }
}
</style>
