<script setup>
import { ref } from 'vue'

const faqs = [
  {
    q: 'How long does a typical Vue 2 to Vue 3 migration take?',
    a: 'It depends on the size and complexity of your codebase. A small-to-medium application (30–80 components) typically takes 2–4 weeks for a full migration. Larger applications may take 6–10 weeks. The codebase audit gives you an accurate timeline before any execution begins.',
  },
  {
    q: 'Will there be downtime during the Vue migration?',
    a: 'No — your users are never affected. If your app uses Vuetify, there\'s no bridge between Vuetify 2 and 3, so the migration lands as one release rather than shipping incrementally. That means a dedicated validation sprint before merging, but zero downtime for your end users.',
  },
  {
    q: 'Do you work with our existing development team?',
    a: 'Absolutely. I integrate with your existing PR workflow so your team has full visibility and can review every change. I handle the migration execution while your developers stay focused on shipping features.',
  },
  {
    q: 'What if we only need a partial Vue migration?',
    a: 'That\'s completely fine. Maybe you only need the Vuex-to-Pinia migration, or just the build tooling upgrade to Vite. The codebase audit will identify which pieces make sense to tackle and in what order. You can stop at any phase — each increment delivers standalone value.',
  },
  {
    q: 'How is hiring a Vue migration consultant different from a consultancy?',
    a: 'Traditional consultancies assign a rotating team of developers who need ramp-up time on your codebase, charge agency rates, and often follow generic playbooks. I\'m a single developer with direct, recent experience completing this exact migration. Lower overhead, faster execution, and you get the same person from audit through handoff.',
  },
  {
    q: 'What does Vue 2 end of life mean for my application?',
    a: 'Vue 2 has been end-of-life for over two years — no more security patches, bug fixes, or ecosystem updates. The longer you wait, the harder it gets. A migration audit gives you a clear picture of the effort involved so you can plan with confidence.',
  },
  {
    q: 'Do you handle Nuxt 2 to Nuxt 3 migrations?',
    a: 'Yes. Nuxt 2 reached end of life in June 2024 and presents additional migration complexity on top of the core Vue 2 to Vue 3 upgrade. I handle the full Nuxt migration including server middleware, layouts, plugins, and the shift to Nitro. The same structured methodology applies — audit first, then incremental execution with zero downtime.',
  },
]

const openIndex = ref(null)

function toggle(i) {
  openIndex.value = openIndex.value === i ? null : i
}
</script>

<template>
  <section id="faq" class="section faq-section section-divider" aria-labelledby="faq-heading">
    <div class="container">
      <div class="reveal" style="text-align: center;">
        <span class="section-label">// FAQ</span>
        <h2 id="faq-heading" class="section-title" style="margin-left: auto; margin-right: auto;">Vue 2 to Vue 3 Migration:<br><span class="text-gradient">Common Questions</span></h2>
      </div>

      <div class="faq-list reveal">
        <div
          v-for="(faq, i) in faqs"
          :key="i"
          class="faq-item"
          :class="{ open: openIndex === i }"
        >
          <button
            :id="`faq-trigger-${i}`"
            class="faq-trigger"
            @click="toggle(i)"
            :aria-expanded="openIndex === i"
            :aria-controls="`faq-answer-${i}`"
          >
            <span>{{ faq.q }}</span>
            <svg class="faq-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
          <div
            :id="`faq-answer-${i}`"
            class="faq-answer"
            role="region"
            :aria-labelledby="`faq-trigger-${i}`"
            :aria-hidden="openIndex !== i"
          >
            <div class="faq-answer-inner">
              <p>{{ faq.a }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.faq-section {
  background: var(--bg-secondary);
}

.faq-list {
  max-width: 720px;
  margin: 0 auto;
}

.faq-item {
  border-bottom: 1px solid var(--border);
}

.faq-item:first-child {
  border-top: 1px solid var(--border);
}

.faq-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  padding: 24px 0;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text-primary);
  transition: color 0.2s ease;
}

.faq-trigger:hover {
  color: var(--accent);
}

.faq-chevron {
  flex-shrink: 0;
  color: var(--text-tertiary);
  transition: transform 0.3s ease;
}

.faq-item.open .faq-chevron {
  transform: rotate(180deg);
  color: var(--accent);
}

.faq-answer {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease;
}

.faq-item.open .faq-answer {
  grid-template-rows: 1fr;
}

.faq-answer-inner {
  overflow: hidden;
}

.faq-answer p {
  padding-bottom: 24px;
  font-size: 0.93rem;
  line-height: 1.75;
}


</style>
