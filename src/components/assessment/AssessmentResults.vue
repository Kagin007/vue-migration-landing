<script setup>
import { computed } from 'vue'
import { useCalendly } from '../../composables/useCalendly'
import ScoreGauge from './ScoreGauge.vue'
import CategoryCard from './CategoryCard.vue'

const { openCalendly } = useCalendly()

const props = defineProps({
  totalScore: { type: Number, required: true },
  maxPossibleScore: { type: Number, required: true },
  tier: { type: String, required: true },
  tierLabel: { type: String, required: true },
  tierColor: { type: String, required: true },
  categoryScores: { type: Array, required: true },
  riskAreas: { type: Array, required: true },
  timelineEstimate: { type: String, required: true },
  recommendedApproach: { type: String, required: true },
  answers: { type: Object, required: true },
})

const emit = defineEmits(['reset'])

const categoryExplanations = computed(() => {
  const explanations = {}
  const a = props.answers

  // State Management
  if (a.vuex === 'namespaced') {
    explanations.state_management = 'Namespaced Vuex modules will each need to become separate Pinia stores with refactored access patterns.'
  } else if (a.vuex === 'simple') {
    explanations.state_management = 'A simple Vuex store maps cleanly to a single Pinia store — this is one of the easier parts of the migration.'
  }

  // Template & Component Patterns
  const patterns = a.legacy_patterns
  if (Array.isArray(patterns) && patterns.length > 0 && !patterns.includes('none')) {
    const parts = []
    if (patterns.includes('mixins')) parts.push('mixins need refactoring into composables')
    if (patterns.includes('filters')) parts.push('filters must be replaced with computed properties or helpers')
    if (patterns.includes('event_bus')) parts.push('the event bus needs to be replaced with provide/inject or a store')
    if (parts.length) {
      explanations.template_patterns = parts.charAt ? parts : parts.join(', ').replace(/, ([^,]*)$/, ', and $1') + '.'
      explanations.template_patterns = parts.join(', ').replace(/, ([^,]*)$/, ', and $1')
      explanations.template_patterns = explanations.template_patterns.charAt(0).toUpperCase() + explanations.template_patterns.slice(1) + '.'
    }
  }

  // Build Tooling
  if (a.build_tooling === 'nuxt2') {
    explanations.build_tooling = 'Nuxt 2 to Nuxt 3 is a significant framework migration on top of the Vue upgrade — server engine, file conventions, and plugins all change.'
  } else if (a.build_tooling === 'webpack') {
    explanations.build_tooling = 'Custom Webpack configurations will need to be mapped to Vite equivalents, including any custom plugins and loaders.'
  } else if (a.build_tooling === 'vue_cli') {
    explanations.build_tooling = 'Vue CLI to Vite is a well-documented upgrade path with established migration tooling.'
  }

  // Testing
  if (a.testing === 'none') {
    explanations.testing = 'Without automated tests, building at least smoke tests before migrating will significantly reduce risk.'
  } else if (a.testing === 'some') {
    explanations.testing = 'Existing tests will need updates for Vue 3 test utils, and gaps should be filled before migrating critical paths.'
  }

  return explanations
})

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="results">
    <!-- Score gauge -->
    <div class="results-header">
      <ScoreGauge
        :score="totalScore"
        :maxScore="maxPossibleScore"
        :tierLabel="tierLabel"
        :tierColor="tierColor"
      />
      <div class="timeline-badge">
        <span class="timeline-label">Estimated timeline</span>
        <span class="timeline-value mono">{{ timelineEstimate }}</span>
      </div>
    </div>

    <!-- Category breakdown -->
    <div class="results-section">
      <h4 class="results-section-title">Category Breakdown</h4>
      <div class="category-grid">
        <CategoryCard
          v-for="(cat, i) in categoryScores"
          :key="cat.id"
          :label="cat.label"
          :icon="cat.icon"
          :score="cat.score"
          :maxScore="cat.maxScore"
          :percentage="cat.percentage"
          :explanation="categoryExplanations[cat.id]"
          :index="i"
        />
      </div>
    </div>

    <!-- Risk areas -->
    <div v-if="riskAreas.length" class="results-section">
      <h4 class="results-section-title">Key Risk Areas</h4>
      <div class="risk-list">
        <div v-for="(risk, i) in riskAreas" :key="i" class="risk-item">
          <span class="risk-indicator" :class="{
            high: risk.score >= 3,
            medium: risk.score === 2,
            low: risk.score <= 1,
          }"></span>
          <p>{{ risk.text }}</p>
        </div>
      </div>
    </div>

    <!-- Recommended approach -->
    <div class="results-section">
      <h4 class="results-section-title">Recommended Approach</h4>
      <p class="approach-text">{{ recommendedApproach }}</p>
    </div>

    <!-- CTAs -->
    <div class="results-ctas">
      <button class="btn btn-primary btn-lg" @click="openCalendly">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        Book a Free Intro Call
      </button>
      <a href="#pricing" class="btn btn-secondary btn-lg" @click.prevent="scrollTo('pricing')">
        Order a Codebase Audit
      </a>
    </div>

    <button class="retake-link" @click="emit('reset')">
      Retake Assessment
    </button>
  </div>
</template>

<style scoped>
.results {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.results-header {
  text-align: center;
}

.timeline-badge {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 24px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
}

.timeline-label {
  font-size: 0.8rem;
  color: var(--text-tertiary);
}

.timeline-value {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-primary);
}

.results-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.results-section-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-primary);
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.risk-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.risk-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
}

.risk-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 7px;
}

.risk-indicator.high { background: #ef4444; }
.risk-indicator.medium { background: #f59e0b; }
.risk-indicator.low { background: #42b883; }

.risk-item p {
  font-size: 0.9rem;
  line-height: 1.6;
}

.approach-text {
  font-size: 0.95rem;
  line-height: 1.7;
  padding: 20px;
  background: var(--accent-subtle);
  border: 1px solid var(--accent-border);
  border-radius: 12px;
}

.results-ctas {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.results-ctas .btn {
  width: 100%;
  max-width: 480px;
  justify-content: center;
  text-align: center;
}

.retake-link {
  background: none;
  border: none;
  color: var(--text-tertiary);
  font-family: inherit;
  font-size: 0.87rem;
  cursor: pointer;
  text-align: center;
  padding: 8px;
  transition: color 0.2s ease;
}

.retake-link:hover {
  color: var(--accent);
}

@media (max-width: 640px) {
  .category-grid {
    grid-template-columns: 1fr;
  }
}
</style>
