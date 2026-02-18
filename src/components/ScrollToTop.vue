<script setup>
import { useScrollProgress } from '../composables/useScrollProgress'

const { pastHero } = useScrollProgress()

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <Transition name="scroll-top">
    <button
      v-if="pastHero"
      class="scroll-to-top"
      aria-label="Scroll to top"
      @click="scrollToTop"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="18 15 12 9 6 15"/>
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 999;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-md);
  transition: all 0.2s ease;
}

.scroll-to-top:hover {
  color: var(--accent);
  border-color: var(--accent-border);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.scroll-top-enter-active,
.scroll-top-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.scroll-top-enter-from,
.scroll-top-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

@media (max-width: 640px) {
  .scroll-to-top {
    bottom: 20px;
    right: 20px;
  }
}
</style>
