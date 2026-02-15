<script setup>
const props = defineProps({
  options: { type: Array, required: true },
  modelValue: { type: Array, default: () => [] },
})

const emit = defineEmits(['toggle'])

function toggle(value) {
  emit('toggle', value)
}

function handleKeydown(e, value) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    toggle(value)
  }
}
</script>

<template>
  <div class="checkbox-options" role="group">
    <button
      v-for="option in options"
      :key="option.value"
      class="option-card"
      :class="{ selected: modelValue.includes(option.value) }"
      role="checkbox"
      :aria-checked="modelValue.includes(option.value)"
      :tabindex="0"
      @click="toggle(option.value)"
      @keydown="handleKeydown($event, option.value)"
    >
      <span class="option-indicator">
        <svg
          v-if="modelValue.includes(option.value)"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
      <span class="option-label">{{ option.label }}</span>
    </button>
  </div>
</template>

<style scoped>
.checkbox-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.option-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 20px;
  background: var(--bg-card);
  border: 2px solid var(--border);
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  font-family: inherit;
  font-size: 1rem;
  color: var(--text-primary);
  width: 100%;
}

.option-card:hover {
  border-color: var(--accent-border);
  background: var(--bg-card-hover);
}

.option-card:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.option-card.selected {
  border-color: var(--accent);
  background: var(--accent-subtle);
}

.option-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 8px;
  border: 2px solid var(--border);
  flex-shrink: 0;
  transition: all 0.2s ease;
  color: #fff;
}

.option-card.selected .option-indicator {
  border-color: var(--accent);
  background: var(--accent);
}

.option-label {
  font-weight: 500;
}
</style>
