<script setup>
import ScoreGauge from './ScoreGauge.vue'
import CategoryCard from './CategoryCard.vue'

defineProps({
  totalScore: { type: Number, required: true },
  maxPossibleScore: { type: Number, required: true },
  tierLabel: { type: String, required: true },
  tierColor: { type: String, required: true },
  categoryScores: { type: Array, required: true },
  riskAreas: { type: Array, required: true },
  timelineEstimate: { type: String, required: true },
  recommendedApproach: { type: String, required: true },
})

const emit = defineEmits(['reset'])
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
      <a href="https://calendly.com" class="btn btn-primary btn-lg" target="_blank" rel="noopener">
        Book a Free Intro Call
      </a>
      <a href="#contact" class="btn btn-secondary btn-lg">
        Order a Detailed Codebase Audit — $1,000–$1,500 CAD
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
