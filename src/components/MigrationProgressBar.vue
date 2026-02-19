<script setup>
import { computed } from 'vue'
import { useScrollProgress } from '../composables/useScrollProgress'

const { scrollPercent } = useScrollProgress()

const label = computed(() => {
  if (scrollPercent.value === 0) return 'Migration: Starting...'
  if (scrollPercent.value === 100) return 'Migration: Complete'
  return `Migration: ${scrollPercent.value}%`
})
</script>

<template>
  <div class="migration-bar" :class="{ complete: scrollPercent === 100 }">
    <div class="migration-bar-fill" :style="{ width: scrollPercent + '%' }"></div>
    <span class="migration-bar-label mono">{{ label }}</span>
  </div>
</template>

<style scoped>
.migration-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1001;
  height: 3px;
  background: transparent;
}

.migration-bar-fill {
  height: 100%;
  background: var(--gradient-accent);
  transition: width 0.15s ease-out;
  box-shadow: 0 0 8px rgba(66, 184, 131, 0.4);
}

.migration-bar-label {
  position: absolute;
  right: 12px;
  top: 6px;
  font-size: 0.65rem;
  color: var(--text-tertiary);
  opacity: 0;
  transform: translateY(-4px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;
  white-space: nowrap;
}

.migration-bar:hover .migration-bar-label {
  opacity: 1;
  transform: translateY(0);
}

.migration-bar.complete .migration-bar-fill {
  box-shadow: 0 0 12px rgba(66, 184, 131, 0.6);
}

@media (max-width: 640px) {
  .migration-bar-label {
    display: none;
  }
}
</style>
