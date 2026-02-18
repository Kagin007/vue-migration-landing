<script setup>
import { ref } from 'vue'
import { useScrollProgress } from '../../composables/useScrollProgress'
import { useCalendly } from '../../composables/useCalendly'

const { scrollPercent } = useScrollProgress()
const { openCalendly } = useCalendly()
const visible = ref(true)

function dismiss() {
  visible.value = false
}
</script>

<template>
  <Transition name="sticky-banner">
    <div v-if="visible && scrollPercent >= 40" class="sticky-banner">
      <div class="sticky-banner-content">
        <p class="sticky-banner-text">Need help migrating to Vue 3?</p>
        <div class="sticky-banner-actions">
          <a href="/#assessment" class="btn btn-primary btn-sm">Free Assessment</a>
          <button class="btn btn-secondary btn-sm" @click="openCalendly">Book a Call</button>
        </div>
      </div>
      <button class="sticky-banner-dismiss" aria-label="Dismiss banner" @click="dismiss">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.sticky-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 998;
  background: var(--bg-card);
  border-top: 1px solid var(--border);
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.sticky-banner-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.sticky-banner-text {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
}

.sticky-banner-actions {
  display: flex;
  gap: 8px;
}

.btn-sm {
  padding: 10px 16px;
  font-size: 0.85rem;
}

.sticky-banner-dismiss {
  background: none;
  border: none;
  color: var(--text-tertiary);
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
}

.sticky-banner-dismiss:hover {
  color: var(--text-primary);
}

.sticky-banner-enter-active,
.sticky-banner-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.sticky-banner-enter-from,
.sticky-banner-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

@media (max-width: 640px) {
  .sticky-banner {
    padding: 12px 16px;
  }

  .sticky-banner-content {
    flex-direction: column;
    gap: 10px;
    flex: 1;
  }

  .sticky-banner-text {
    white-space: normal;
    text-align: center;
  }

  .sticky-banner-actions {
    width: 100%;
  }

  .sticky-banner-actions .btn {
    flex: 1;
    justify-content: center;
  }
}
</style>
