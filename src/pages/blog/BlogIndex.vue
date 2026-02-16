<script setup>
import { useHead } from '@unhead/vue'

useHead({
  title: 'Blog | Vue Migration Consulting',
  meta: [
    { name: 'description', content: 'Articles on Vue 2 to Vue 3 migration — breaking changes, gotchas, and practical advice from real migration experience.' },
    { name: 'author', content: 'Adam Schulte' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://www.vuemigration.dev/blog' },
    { property: 'og:title', content: 'Blog | Vue Migration Consulting' },
    { property: 'og:description', content: 'Articles on Vue 2 to Vue 3 migration — breaking changes, gotchas, and practical advice from real migration experience.' },
    { property: 'og:image', content: 'https://www.vuemigration.dev/og-image.png' },
    { property: 'og:site_name', content: 'Vue Migration Consulting' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Blog | Vue Migration Consulting' },
    { name: 'twitter:description', content: 'Articles on Vue 2 to Vue 3 migration — breaking changes, gotchas, and practical advice from real migration experience.' },
  ],
  link: [
    { rel: 'canonical', href: 'https://www.vuemigration.dev/blog' },
  ],
})

const posts = [
  {
    title: '3 Vue 3 Features That Change How You Build Components',
    description: 'defineExpose, shallowRef, and Teleport solve problems that Vue 2 teams worked around for years. Practical examples from a production migration — controlling component APIs, managing third-party state, and escaping DOM hierarchy constraints.',
    path: '/blog/vue-3-features-guide',
    date: 'February 16, 2026',
    datetime: '2026-02-16',
  },
  {
    title: 'Vue 3 Performance: Eager Reactivity, shallowRef, and Computed Stability',
    description: 'Vue 3\'s reactivity system is more aggressive than Vue 2\'s. Two real performance patterns from a production migration — shallowRef for third-party libraries and computed stability for reactive chains — and how to fix them.',
    path: '/blog/vue-3-performance-pitfalls',
    date: 'February 16, 2026',
    datetime: '2026-02-16',
  },
  {
    title: 'Case Study: Migrating a 300+ File Enterprise App from Vue 2 to Vue 3',
    description: 'How I migrated a production enterprise application from Vue 2 to Vue 3 in two sprints — 300+ files, 40 tickets, one sprint of validation. The full breakdown of phases, decisions, and results.',
    path: '/blog/vue-2-to-vue-3-migration-case-study',
    date: 'February 16, 2026',
    datetime: '2026-02-16',
  },
  {
    title: 'Vuetify 2 to Vuetify 3 Migration: The Hardest Part of Your Vue 3 Upgrade',
    description: 'Vuetify 3 is a near-complete rewrite. Grid system, component APIs, theming, SASS variables — almost everything changed. A practical guide based on a 300+ file production migration.',
    path: '/blog/vuetify-2-to-vuetify-3-migration',
    date: 'February 16, 2026',
    datetime: '2026-02-16',
  },
  {
    title: 'Vue 2 to Vue 3 Migration Gotchas: 10 Breaking Changes That Catch Teams Off Guard',
    description: 'The Vue 2 to Vue 3 migration has subtle breaking changes that slip past linters and build tools. Here are 10 gotchas from real migration experience — and how to fix each one.',
    path: '/blog/vue-2-to-vue-3-gotchas',
    date: 'February 16, 2026',
    datetime: '2026-02-16',
  },
  {
    title: 'Vue 2 End of Life: What It Means and How to Migrate to Vue 3',
    description: 'Vue 2 reached end of life on December 31, 2023. Learn what this means for your application, the security risks of staying on Vue 2, and how to plan your Vue 3 migration.',
    path: '/blog/vue-2-end-of-life',
    date: 'February 9, 2026',
    datetime: '2026-02-09',
  },
]
</script>

<template>
  <main>
    <section class="blog-index section">
      <div class="container blog-container">
        <header class="blog-index-header">
          <span class="section-label">Blog</span>
          <h1>Vue Migration Blog</h1>
          <p class="section-subtitle">
            Practical articles on Vue 2 to Vue 3 migration — breaking changes, gotchas, and advice from real migration experience.
          </p>
        </header>

        <div class="post-list">
          <router-link
            v-for="post in posts"
            :key="post.path"
            :to="post.path"
            class="post-card"
          >
            <article>
              <time :datetime="post.datetime" class="post-date">{{ post.date }}</time>
              <h2 class="post-title">{{ post.title }}</h2>
              <p class="post-description">{{ post.description }}</p>
              <span class="post-link">Read article &rarr;</span>
            </article>
          </router-link>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.blog-container {
  max-width: 720px;
}

.blog-index-header {
  margin-bottom: 48px;
}

.blog-index-header h1 {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  margin-top: 16px;
  margin-bottom: 16px;
}

.post-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.post-card {
  display: block;
  padding: 32px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  transition: all 0.2s ease;
  color: inherit;
}

.post-card:hover {
  border-color: var(--accent-border);
  box-shadow: var(--shadow-md);
  background: var(--bg-card-hover);
  color: inherit;
}

.post-date {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  color: var(--text-tertiary);
}

.post-title {
  font-size: 1.3rem;
  margin: 8px 0 12px;
  line-height: 1.35;
}

.post-description {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 16px;
}

.post-link {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--accent);
}

@media (max-width: 640px) {
  .post-card {
    padding: 24px 20px;
  }
}
</style>
