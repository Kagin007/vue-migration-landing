<script setup>
defineProps({
  current: { type: Number, required: true },
  total: { type: Number, required: true },
})
</script>

<template>
  <div class="progress-bar">
    <div class="progress-track">
      <div
        class="progress-fill"
        :style="{ width: `${((current + 1) / total) * 100}%` }"
      ></div>
    </div>
    <span class="progress-label mono">{{ current + 1 }} / {{ total }}</span>
  </div>
</template>

<style scoped>
.progress-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
}

.progress-track {
  flex: 1;
  height: 6px;
  background: var(--bg-tertiary);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--accent);
  border-radius: 3px;
  transition: width 0.4s ease;
}

.progress-label {
  font-size: 0.8rem;
  color: var(--text-tertiary);
  white-space: nowrap;
}
</style>
