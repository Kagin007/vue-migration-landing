<script setup>
import { ref } from 'vue'
import ScoreGauge from './ScoreGauge.vue'
import CategoryCard from './CategoryCard.vue'

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
  submit: { type: Function, required: true },
  submitStatus: { type: String, required: true },
})

const emit = defineEmits(['reset'])

const email = ref('')
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const emailValid = ref(true)

function sendResults() {
  const trimmed = email.value.trim()
  if (!EMAIL_RE.test(trimmed)) {
    emailValid.value = false
    return
  }
  emailValid.value = true
  props.submit({
    answers: props.answers,
    contactInfo: { email: trimmed },
    scores: {
      totalScore: props.totalScore,
      tier: props.tier,
      tierLabel: props.tierLabel,
      timelineEstimate: props.timelineEstimate,
      categoryScores: props.categoryScores,
    },
  })
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

    <!-- Optional email capture -->
    <div class="email-capture">
      <template v-if="submitStatus === 'sent'">
        <p class="email-success">Results sent! Check your inbox.</p>
      </template>
      <template v-else>
        <p class="email-prompt">Want these results emailed to you?</p>
        <form class="email-form" @submit.prevent="sendResults">
          <input
            v-model="email"
            type="email"
            placeholder="you@company.com"
            class="email-input"
            :class="{ 'email-input--error': !emailValid }"
            @input="emailValid = true"
          />
          <button
            type="submit"
            class="btn btn-primary btn-send"
            :disabled="submitStatus === 'sending'"
          >
            {{ submitStatus === 'sending' ? 'Sending...' : 'Send Results' }}
          </button>
        </form>
        <p v-if="!emailValid" class="email-error">Please enter a valid email address.</p>
        <p v-if="submitStatus === 'error'" class="email-error">Something went wrong. Please try again.</p>
        <p class="email-disclaimer">No spam, ever. Just your results.</p>
      </template>
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

.email-capture {
  text-align: center;
  padding: 24px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
}

.email-prompt {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.email-form {
  display: flex;
  gap: 8px;
  max-width: 400px;
  margin: 0 auto;
}

.email-input {
  flex: 1;
  padding: 12px 14px;
  background: var(--bg-secondary);
  border: 2px solid var(--border);
  border-radius: 10px;
  font-family: inherit;
  font-size: 0.95rem;
  color: var(--text-primary);
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.email-input::placeholder {
  color: var(--text-tertiary);
}

.email-input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-subtle);
}

.email-input--error {
  border-color: #ef4444;
}

.email-input--error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
}

.btn-send {
  white-space: nowrap;
  padding: 12px 20px;
}

.email-error {
  font-size: 0.82rem;
  color: #ef4444;
  margin-top: 8px;
}

.email-disclaimer {
  font-size: 0.8rem;
  color: var(--text-tertiary);
  margin-top: 8px;
}

.email-success {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--accent);
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

  .email-form {
    flex-direction: column;
  }
}
</style>
