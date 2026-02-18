<script setup>
defineProps({
  label: { type: String, required: true },
  icon: { type: String, required: true },
  score: { type: Number, required: true },
  maxScore: { type: Number, required: true },
  percentage: { type: Number, required: true },
  explanation: { type: String, default: '' },
  index: { type: Number, default: 0 },
})
</script>

<template>
  <div class="category-card" :style="{ animationDelay: `${index * 0.1}s` }">
    <div class="category-header">
      <span class="category-icon">{{ icon }}</span>
      <span class="category-label">{{ label }}</span>
      <span class="category-score mono">{{ score }} / {{ maxScore }}</span>
    </div>
    <div class="category-bar-track">
      <div
        class="category-bar-fill"
        :style="{ width: `${percentage}%` }"
        :class="{
          low: percentage <= 33,
          medium: percentage > 33 && percentage <= 66,
          high: percentage > 66,
        }"
      ></div>
    </div>
    <p v-if="explanation" class="category-explanation">{{ explanation }}</p>
  </div>
</template>

<style scoped>
.category-card {
  padding: 20px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  animation: card-in 0.5s ease both;
}

@keyframes card-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.category-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.category-icon {
  font-size: 1.1rem;
}

.category-label {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-primary);
  flex: 1;
}

.category-score {
  font-size: 0.8rem;
  color: var(--text-tertiary);
}

.category-bar-track {
  height: 6px;
  background: var(--bg-tertiary);
  border-radius: 3px;
  overflow: hidden;
}

.category-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.8s ease;
}

.category-bar-fill.low {
  background: #42b883;
}

.category-bar-fill.medium {
  background: #f59e0b;
}

.category-bar-fill.high {
  background: #ef4444;
}

.category-explanation {
  font-size: 0.82rem;
  color: var(--text-tertiary);
  line-height: 1.5;
  margin-top: 10px;
}
</style>
