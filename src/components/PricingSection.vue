<script setup>
import { ref } from 'vue'

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const tiers = ref([
  {
    name: 'Migration Audit',
    price: '$1,000 – $1,500',
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
    price: '$150 – $250',
    unit: 'CAD / hour',
    description: 'Your team does the work — I provide the expertise, code reviews, and architecture guidance to keep them on track.',
    popular: true,
    features: [
      'Everything in the Migration Audit',
      'Hands-on architecture guidance',
      'Code reviews on migration PRs',
      'Pair programming sessions as needed',
      'Testing strategy and implementation support',
      'Async Slack/email support between sessions',
    ],
    cta: 'Learn More',
    ctaLink: '#contact',
  },
  {
    name: 'Full Migration',
    price: '$5,000 – $50,000',
    unit: 'CAD, project-based',
    description: 'End-to-end execution. I handle the migration from audit through production deployment so your team can stay focused on shipping features.',
    popular: false,
    features: [
      'Everything in the Guided Migration',
      'Full hands-on-keyboard execution',
      'Vue 3, Vuetify 3, Pinia, Vite, and TypeScript migration',
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
  <section id="pricing" class="section pricing-section section-divider">
    <div class="container">
      <div class="reveal" style="text-align: center;">
        <span class="section-label">// Services & Pricing</span>
        <h2 class="section-title" style="margin-left: auto; margin-right: auto;">Flexible engagement models.<br><span class="text-gradient">Right-sized for your team.</span></h2>
        <p class="section-subtitle" style="margin-left: auto; margin-right: auto;">
          Whether you need a roadmap, a guide, or someone to do the heavy lifting — there's an option that fits.
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
        Not sure which option fits? <a href="#contact" @click.prevent="scrollTo('contact')">Let's talk</a> — no commitment required.
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

.pricing-note {
  text-align: center;
  font-size: 0.9rem;
  color: var(--text-tertiary);
}

@media (max-width: 900px) {
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

@media (max-width: 375px) {
  .pricing-grid {
    max-width: 100%;
  }

  .pricing-card {
    padding: 24px 20px;
  }
}
</style>
