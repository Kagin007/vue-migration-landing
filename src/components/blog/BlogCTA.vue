<script setup>
import { useCalendly } from '../../composables/useCalendly'

const props = defineProps({
  variant: {
    type: String,
    required: true,
    validator: (v) => ['assessment', 'contact'].includes(v),
  },
})

const { openCalendly } = useCalendly()
</script>

<template>
  <div class="blog-cta-banner">
    <template v-if="variant === 'assessment'">
      <p class="blog-cta-text">Not sure how complex your migration is? Take our free 2-minute assessment.</p>
      <a href="/#assessment" class="btn btn-primary">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
        </svg>
        Take the Assessment
      </a>
    </template>
    <template v-else>
      <p class="blog-cta-text">Ready to migrate? Book a free 15-minute intro call.</p>
      <button class="btn btn-primary" @click="openCalendly">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        Book a Free Call
      </button>
    </template>
  </div>
</template>

<style scoped>
.blog-cta-banner {
  padding: 32px;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 16px;
  text-align: center;
  margin: 40px 0;
}

.blog-cta-text {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
}

@media (max-width: 640px) {
  .blog-cta-banner {
    padding: 24px 20px;
  }

  .blog-cta-banner .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
