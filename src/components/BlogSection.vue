<script setup>
const posts = [
  {
    title: 'Vuex to Pinia: Why and How to Migrate Your Vue Store',
    description: 'Vuex 4 works with Vue 3, so why bother migrating to Pinia? Here\'s the practical case for switching — and a step-by-step approach based on migrating a production application with 20+ store modules.',
    path: '/blog/vuex-to-pinia-migration',
    date: 'February 16, 2026',
    datetime: '2026-02-16',
  },
  {
    title: 'Case Study: Migrating a 300+ File Enterprise App from Vue 2 to Vue 3',
    description: 'How I migrated a production enterprise application from Vue 2 to Vue 3 in two sprints — 300+ files, 40 tickets, one sprint of validation. The full breakdown of phases, decisions, and results.',
    path: '/blog/vue-2-to-vue-3-migration-case-study',
    date: 'February 6, 2026',
    datetime: '2026-02-06',
  },
  {
    title: 'Vue 2 to Vue 3 Migration Gotchas: 10 Breaking Changes That Catch Teams Off Guard',
    description: 'The Vue 2 to Vue 3 migration has subtle breaking changes that slip past linters and build tools. Here are 10 gotchas from real migration experience — and how to fix each one.',
    path: '/blog/vue-2-to-vue-3-gotchas',
    date: 'January 27, 2026',
    datetime: '2026-01-27',
  },
]
</script>

<template>
  <section id="blog" class="section section-divider" aria-labelledby="blog-heading">
    <div class="container">
      <div class="reveal" style="text-align: center;">
        <span class="section-label">// From the Blog</span>
        <h2 id="blog-heading" class="section-title" style="margin-left: auto; margin-right: auto;">
          Vue Migration <span class="text-gradient">Insights</span>
        </h2>
        <p class="section-subtitle" style="margin-left: auto; margin-right: auto;">
          Practical articles on Vue 2 to Vue 3 migration — breaking changes, gotchas, and advice from real migration experience.
        </p>
      </div>

      <div class="blog-grid">
        <router-link
          v-for="post in posts"
          :key="post.path"
          :to="post.path"
          class="blog-card reveal"
        >
          <article>
            <time :datetime="post.datetime" class="blog-date mono">{{ post.date }}</time>
            <h3 class="blog-title">{{ post.title }}</h3>
            <p class="blog-description">{{ post.description }}</p>
            <span class="blog-link">Read article &rarr;</span>
          </article>
        </router-link>
      </div>

      <div class="blog-cta reveal">
        <router-link to="/blog" class="btn btn-secondary">
          View All Articles
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.blog-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 40px;
}

.blog-card {
  display: block;
  padding: 28px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  transition: all 0.2s ease;
  color: inherit;
}

.blog-card:hover {
  border-color: var(--accent-border);
  box-shadow: var(--shadow-md), 0 0 20px rgba(66, 184, 131, 0.08);
  transform: translateY(-2px);
  color: inherit;
}

.blog-date {
  font-size: 0.78rem;
  color: var(--text-tertiary);
}

.blog-title {
  font-size: 1.1rem;
  margin: 10px 0 12px;
  line-height: 1.35;
}

.blog-description {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.65;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-link {
  font-size: 0.87rem;
  font-weight: 600;
  color: var(--accent);
}

.blog-cta {
  text-align: center;
}

@media (max-width: 900px) {
  .blog-grid {
    grid-template-columns: 1fr;
    max-width: 520px;
    margin-left: auto;
    margin-right: auto;
  }
}

@media (max-width: 375px) {
  .blog-card {
    padding: 20px;
  }
}
</style>
