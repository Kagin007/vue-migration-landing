<script setup>
import { ref } from 'vue'

const faqs = [
  {
    q: 'How long does a typical migration take?',
    a: 'It depends on the size and complexity of your codebase. A small-to-medium application (30–80 components) typically takes 2–4 weeks for a full migration. Larger applications may take 6–10 weeks. The codebase audit gives you an accurate timeline before any execution begins.',
  },
  {
    q: 'Will there be downtime during the migration?',
    a: 'No. The migration is done incrementally so your application stays deployable throughout the entire process. We use Vue\'s compatibility build and feature flags to ensure both old and new code can coexist during the transition. You ship to production continuously.',
  },
  {
    q: 'Do you work with our existing development team?',
    a: 'Absolutely. In the Guided Migration model, I work directly alongside your team through code reviews, pair programming, and architecture guidance. For the Full Migration model, I integrate with your existing PR workflow so your team has full visibility and can review every change.',
  },
  {
    q: 'What if we only need part of the migration?',
    a: 'That\'s completely fine. Maybe you only need the Vuex-to-Pinia migration, or just the build tooling upgrade to Vite. The codebase audit will identify which pieces make sense to tackle and in what order. You can stop at any phase — each increment delivers standalone value.',
  },
  {
    q: 'What does "AI-accelerated" actually mean?',
    a: 'I use AI-assisted tooling to handle repetitive migration patterns — things like converting Options API components to Composition API, updating import patterns, and generating boilerplate. This dramatically speeds up the mechanical parts of the migration while I focus my expertise on the architectural decisions, edge cases, and testing strategy that require human judgment.',
  },
  {
    q: 'How is this different from hiring a consultancy?',
    a: 'Traditional consultancies assign a rotating team of developers who need ramp-up time on your codebase, charge agency rates, and often follow generic playbooks. I\'m a single senior developer with direct, recent experience completing this exact migration. Lower overhead, faster execution, and you get the same person from audit through handoff.',
  },
]

const openIndex = ref(null)

function toggle(i) {
  openIndex.value = openIndex.value === i ? null : i
}
</script>

<template>
  <section id="faq" class="section faq-section">
    <div class="container">
      <div class="reveal" style="text-align: center;">
        <span class="section-label">// FAQ</span>
        <h2 class="section-title" style="margin-left: auto; margin-right: auto;">Common questions.<br><span class="text-gradient">Straight answers.</span></h2>
      </div>

      <div class="faq-list">
        <div
          v-for="(faq, i) in faqs"
          :key="i"
          class="faq-item reveal"
          :class="[`reveal-delay-${Math.min(i + 1, 5)}`, { open: openIndex === i }]"
        >
          <button class="faq-trigger" @click="toggle(i)" :aria-expanded="openIndex === i">
            <span>{{ faq.q }}</span>
            <svg class="faq-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
          <div class="faq-answer">
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
