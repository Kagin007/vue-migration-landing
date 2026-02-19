<script setup>
import { useScrollProgress } from '../composables/useScrollProgress'
import { useCalendly } from '../composables/useCalendly'

const { pastHero, atContact } = useScrollProgress()
const { openCalendly } = useCalendly()
</script>

<template>
  <Transition name="sticky-cta">
    <div v-if="pastHero && !atContact" class="sticky-mobile-cta">
      <button class="btn btn-primary sticky-cta-btn" @click="openCalendly">
        Book a Free Call
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.sticky-mobile-cta {
  display: none;
}

@media (max-width: 900px) {
  .sticky-mobile-cta {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 998;
    height: 56px;
    align-items: center;
    justify-content: center;
    padding: 0 16px;
    background: var(--bg-nav);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-top: 1px solid var(--border);
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
  }

  .sticky-cta-btn {
    width: 100%;
    max-width: 400px;
    padding: 10px 24px;
    font-size: 0.9rem;
    font-weight: 600;
  }
}

.sticky-cta-enter-active,
.sticky-cta-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.sticky-cta-enter-from,
.sticky-cta-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
