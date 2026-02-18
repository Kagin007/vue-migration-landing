<script setup>
import { useCountUp } from '../composables/useCountUp'

const { count: filesCount, elementRef: filesRef } = useCountUp(300, 2000)
const { count: ticketsCount, elementRef: ticketsRef } = useCountUp(40, 1800)
const { count: sprintsCount, elementRef: sprintsRef } = useCountUp(2, 1200)
</script>

<template>
  <section class="stats-section reveal" aria-label="Migration statistics">
    <div class="container">
      <div class="stats-bar">
        <div class="stat-item" ref="filesRef">
          <span class="stat-value mono">{{ filesCount }}+</span>
          <span class="stat-label">Files migrated</span>
        </div>
        <div class="stat-item" ref="ticketsRef">
          <span class="stat-value mono">{{ ticketsCount }}</span>
          <span class="stat-label">Structured tickets</span>
        </div>
        <div class="stat-item" ref="sprintsRef">
          <span class="stat-value mono">{{ sprintsCount }}</span>
          <span class="stat-label">Sprints to production</span>
        </div>
        <div class="stat-item">
          <span class="stat-value mono">Zero</span>
          <span class="stat-label">Downtime</span>
        </div>
        <div class="stat-item">
          <span class="stat-value mono stat-value--text">Enterprise</span>
          <span class="stat-label">SaaS application</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats-section {
  padding: 40px 0;
}

.stats-bar {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 24px;
  padding: 32px 40px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 20px;
  box-shadow: var(--shadow-sm);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  text-align: center;
}

.stat-value {
  font-size: 2rem;
  font-weight: 800;
  color: var(--accent);
}

.stat-value--text {
  font-size: 1.5rem;
}

.stat-label {
  font-size: 0.82rem;
  color: var(--text-tertiary);
  font-weight: 500;
}

@media (max-width: 768px) {
  .stats-bar {
    grid-template-columns: repeat(3, 1fr);
    padding: 24px;
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .stats-bar {
    grid-template-columns: repeat(2, 1fr);
    padding: 20px 16px;
    gap: 16px;
  }

  .stat-value {
    font-size: 1.6rem;
  }

  .stat-value--text {
    font-size: 1.2rem;
  }
}
</style>
