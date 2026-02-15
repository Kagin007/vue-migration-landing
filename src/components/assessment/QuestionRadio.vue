<script setup>
const props = defineProps({
  options: { type: Array, required: true },
  modelValue: { type: String, default: null },
})

const emit = defineEmits(['update:modelValue'])

function select(value) {
  emit('update:modelValue', value)
}

function handleKeydown(e, value) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    select(value)
  }
}
</script>

<template>
  <div class="radio-options" role="radiogroup">
    <button
      v-for="option in options"
      :key="option.value"
      class="option-card"
      :class="{ selected: modelValue === option.value }"
      role="radio"
      :aria-checked="modelValue === option.value"
      :tabindex="0"
      @click="select(option.value)"
      @keydown="handleKeydown($event, option.value)"
    >
      <span class="option-indicator">
        <span v-if="modelValue === option.value" class="indicator-dot"></span>
      </span>
      <span class="option-label">{{ option.label }}</span>
    </button>
  </div>
</template>

<style scoped>
.radio-options {
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
  border-radius: 50%;
  border: 2px solid var(--border);
  flex-shrink: 0;
  transition: border-color 0.2s ease;
}

.option-card.selected .option-indicator {
  border-color: var(--accent);
}

.indicator-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent);
}

.option-label {
  font-weight: 500;
}
</style>
