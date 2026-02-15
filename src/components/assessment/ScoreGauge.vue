<script setup>
import { computed, ref, onMounted } from 'vue'

const props = defineProps({
  score: { type: Number, required: true },
  maxScore: { type: Number, required: true },
  tierLabel: { type: String, required: true },
  tierColor: { type: String, required: true },
})

const animated = ref(false)
onMounted(() => {
  requestAnimationFrame(() => { animated.value = true })
})

// Semicircular gauge: 180 degrees mapped to score/max ratio
const percentage = computed(() => Math.min(props.score / props.maxScore, 1))

// SVG arc math for a semicircle gauge
const radius = 80
const circumference = Math.PI * radius // half circle
const strokeOffset = computed(() =>
  circumference - (animated.value ? percentage.value : 0) * circumference,
)
</script>

<template>
  <div class="score-gauge">
    <svg viewBox="0 0 200 120" class="gauge-svg">
      <!-- Background arc -->
      <path
        d="M 20 100 A 80 80 0 0 1 180 100"
        fill="none"
        stroke="var(--bg-tertiary)"
        stroke-width="12"
        stroke-linecap="round"
      />
      <!-- Score arc -->
      <path
        d="M 20 100 A 80 80 0 0 1 180 100"
        fill="none"
        :stroke="tierColor"
        stroke-width="12"
        stroke-linecap="round"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="strokeOffset"
        class="gauge-arc"
      />
    </svg>
    <div class="gauge-center">
      <span class="gauge-score mono">{{ score }}</span>
      <span class="gauge-tier" :style="{ color: tierColor }">{{ tierLabel }}</span>
    </div>
  </div>
</template>

<style scoped>
.score-gauge {
  position: relative;
  width: 220px;
  margin: 0 auto 24px;
}

.gauge-svg {
  width: 100%;
  display: block;
}

.gauge-arc {
  transition: stroke-dashoffset 1.2s ease;
}

.gauge-center {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.gauge-score {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1;
}

.gauge-tier {
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>
