<script setup>
import { useHead } from '@unhead/vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function scrollTo(id) {
  router.push({ path: '/', hash: `#${id}` })
}

const title = 'Case Study: Migrating a 300+ File Enterprise App from Vue 2 to Vue 3'
const description = 'How I migrated a production enterprise application from Vue 2 to Vue 3 in two sprints — 300+ files, 40 tickets, one sprint of validation. The full breakdown of phases, decisions, and results.'
const url = 'https://www.vuemigration.dev/blog/vue-2-to-vue-3-migration-case-study'

useHead({
  title,
  meta: [
    { name: 'description', content: description },
    { name: 'author', content: 'Adam Schulte' },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: url },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: 'https://www.vuemigration.dev/og-image.png' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:type', content: 'image/png' },
    { property: 'og:site_name', content: 'Vue Migration Consulting' },
    { property: 'article:published_time', content: '2026-02-16T00:00:00Z' },
    { property: 'article:author', content: 'Adam Schulte' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: 'https://www.vuemigration.dev/og-image.png' },
  ],
  link: [
    { rel: 'canonical', href: url },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "description": description,
        "image": "https://www.vuemigration.dev/og-image.png",
        "datePublished": "2026-02-16T00:00:00Z",
        "dateModified": "2026-02-16T00:00:00Z",
        "author": {
          "@type": "Person",
          "name": "Adam Schulte",
          "url": "https://www.linkedin.com/in/adam-schulte-a279ab10/"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Vue Migration Consulting",
          "url": "https://www.vuemigration.dev"
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": url
        }
      }),
    },
  ],
})
</script>

<template>
  <main>
    <article class="blog-post section">
      <div class="container blog-container">
        <header class="blog-header">
          <span class="section-label">Case Study</span>
          <h1>Migrating a 300+ File Enterprise App from Vue 2 to Vue 3</h1>
          <div class="blog-meta">
            <span>By Adam Schulte</span>
            <span class="meta-divider">|</span>
            <time datetime="2026-02-16">February 16, 2026</time>
          </div>
        </header>

        <section class="blog-content">
          <p class="lead">
            I led the full Vue 2 to Vue 3 migration of a production enterprise application — 300+ files, touching every layer of the stack. Vue CLI to Vite. Options API to Composition API. Vuetify 2 to Vuetify 3. Vuex to Pinia. The entire migration was broken into 40 structured tickets and completed in two sprints, with a dedicated validation sprint before merging to main.
          </p>
          <p>
            This is the full breakdown of how it happened: what the codebase looked like before, how I planned the work, the order of execution, what went wrong, and the measurable results.
          </p>

          <h2>The Application Before Migration</h2>
          <p>
            The application was a production enterprise SaaS platform built on Vue 2, serving active users daily. Here's what the stack looked like before the migration started:
          </p>
          <ul>
            <li><strong>Vue 2</strong> with Options API across all components</li>
            <li><strong>Vuex</strong> for state management with namespaced modules</li>
            <li><strong>Vuetify 2</strong> as the component framework — heavily used across nearly every view</li>
            <li><strong>Vue CLI + Webpack</strong> for build tooling</li>
            <li><strong>TypeScript</strong> already in use across the codebase</li>
            <li><strong>300+ files</strong> including components, views, stores, composables, and utilities</li>
          </ul>
          <p>
            The codebase had the usual patterns you see in mature Vue 2 applications: mixins for shared logic, Vuex modules with mutations and actions, Options API components with logic spread across <code>data</code>, <code>computed</code>, <code>methods</code>, and <code>watch</code> blocks. Some components were well-structured. Others had grown organically over years of feature development.
          </p>

          <h2>The Audit: Turning Unknowns Into Tickets</h2>
          <p>
            Before writing a single line of migration code, I spent the first week auditing the entire codebase. The goal was simple: turn every unknown into a concrete, estimable ticket.
          </p>
          <p>
            The audit covered:
          </p>
          <ul>
            <li><strong>Component inventory</strong> — how many components, how complex, which Vue 2 patterns they use</li>
            <li><strong>Vuex store mapping</strong> — how many modules, how deeply they were coupled, which components accessed which stores</li>
            <li><strong>Vuetify usage analysis</strong> — which Vuetify components were used, how heavily, and which had the biggest API changes in v3 (data tables, dialogs, form inputs)</li>
            <li><strong>Dependency compatibility</strong> — which third-party packages had Vue 3 versions, which needed replacements</li>
            <li><strong>Vue 2-specific patterns</strong> — mixins, filters, EventBus usage, <code>$listeners</code>, <code>$children</code>, render functions</li>
          </ul>
          <p>
            The output was 40 tickets, each with a clear scope, estimated effort, and defined dependencies. The tickets were ordered in a dependency graph so nothing would be blocked — each ticket could be started as soon as its prerequisites were merged.
          </p>

          <h2>The Migration Order</h2>
          <p>
            The order matters more than most teams realize. Migrating in the wrong sequence creates merge conflicts, blocks parallel work, and forces you to redo things. Here's the sequence I followed:
          </p>

          <h3>Phase 1: Build Tooling (Vue CLI to Vite)</h3>
          <p>
            I started with the build tooling because it's independent of the Vue version. Moving from Vue CLI + Webpack to Vite gave the team an immediate developer experience improvement — dev server startup dropped from tens of seconds to under a second. Hot module replacement became near-instant.
          </p>
          <p>
            This phase also uncovered environment variable patterns, proxy configurations, and build-time assumptions that would have been harder to debug if mixed in with the framework migration.
          </p>

          <h3>Phase 2: Vue 2 to Vue 3 + Component Migration (Options API to Composition API)</h3>
          <p>
            Because there's no bridge version between Vuetify 2 and Vuetify 3, an incremental migration using <code>@vue/compat</code> wasn't an option. The entire migration had to be done in one big shot — Vue 3, Composition API, and Vuetify 3 all needed to land together. That meant all the work happened on a long-running branch, validated thoroughly before merging.
          </p>
          <p>
            I started by upgrading to Vue 3 and converting components from the Options API to the Composition API with <code>&lt;script setup&gt;</code>. This phase had the highest ticket count because it touched every file.
          </p>
          <p>
            Mixins were the hardest part. Each mixin had to be refactored into a composable, and every component that used that mixin needed to be updated to import the composable instead. Some mixins had naming conflicts with component-local data, which only surfaced at runtime — one of many <router-link to="/blog/vue-2-to-vue-3-gotchas">subtle breaking changes</router-link> that don't cause build errors. I handled these by converting the most-used mixins first, then working through the long tail.
          </p>

          <h3>Phase 3: Vuetify 2 to Vuetify 3</h3>
          <p>
            This was the most time-consuming phase. <router-link to="/blog/vuetify-2-to-vuetify-3-migration">Vuetify 3 is effectively a rewrite</router-link> — the grid system, component prop APIs, theming system, and activator patterns all changed. I worked through it component type by component type: all buttons first, then all form inputs, then dialogs and menus, then data tables last (since they required the most individual attention).
          </p>
          <p>
            Data tables with server-side pagination, custom slots, and inline editing took the longest per instance. I budgeted extra time for these and tested each one individually.
          </p>

          <h3>Phase 4: Vuex to Pinia</h3>
          <p>
            I saved state management for last because the Vuex stores were still functional, so there was no urgency to migrate them early. Each Vuex module became a Pinia store. Mutations were eliminated — in Pinia, you modify state directly in actions. Namespaced module access patterns were replaced with direct store imports.
          </p>
          <p>
            I migrated one store module at a time, updating every component that consumed it before moving to the next module. This kept the blast radius small — at any point, the application was fully functional with some stores on Vuex and others on Pinia. Pinia's built-in TypeScript support also improved type safety across the stores, tightening up types that had been looser under Vuex.
          </p>

          <h2>What Went Wrong</h2>
          <p>
            No migration this size goes perfectly. Here's what caused the most unexpected work:
          </p>
          <ul>
            <li><strong>Vuetify's data table rewrite</strong> took longer than estimated. Each table with server-side pagination had a unique combination of slots, events, and configuration that couldn't be batch-converted. I should have estimated each table individually rather than as a group.</li>
            <li><strong>Mixin naming conflicts</strong> only appeared at runtime. A mixin that defined a <code>loading</code> data property conflicted with a component that had its own <code>loading</code> ref. In the Options API, the component's property silently won. In the Composition API, both existed and the template bound to the wrong one. These required careful testing to catch.</li>
            <li><strong>Third-party library lag</strong> — two dependencies didn't have Vue 3 compatible versions at the time. One needed a fork with a small patch. The other had a beta version that was stable enough to use. Both required time I hadn't accounted for.</li>
          </ul>

          <h2>The Results</h2>
          <p>
            Here's what the migration delivered in measurable terms:
          </p>

          <div class="results-grid">
            <div class="result-card">
              <span class="result-value mono">300+</span>
              <span class="result-label">Files migrated</span>
            </div>
            <div class="result-card">
              <span class="result-value mono">40</span>
              <span class="result-label">Structured tickets</span>
            </div>
            <div class="result-card">
              <span class="result-value mono">2</span>
              <span class="result-label">Sprints to complete</span>
            </div>
            <div class="result-card">
              <span class="result-value mono">1</span>
              <span class="result-label">Sprint to validate</span>
            </div>
          </div>

          <p>
            Beyond the numbers, the migration delivered:
          </p>
          <ul>
            <li><strong>Dramatically faster development</strong> — Vite's dev server starts in under a second versus 30+ seconds with Webpack. Hot module replacement is near-instant. Developers spend less time waiting and more time building.</li>
            <li><strong>Better code organization</strong> — the Composition API and composables replaced scattered Options API logic and fragile mixins. Related code lives together by feature, making components easier to read and maintain.</li>
            <li><strong>Simpler state management</strong> — Pinia stores are smaller, fully typed, and don't require the mutation ceremony that Vuex demanded. New stores take minutes to set up instead of hours.</li>
            <li><strong>Stronger type safety</strong> — Pinia's built-in TypeScript support tightened store types that had been looser under Vuex, and Vue 3's Composition API improved type inference for props, emits, and template refs across the board.</li>
            <li><strong>Modern ecosystem access</strong> — the team can now adopt any Vue 3 library, receive security patches, and take advantage of ongoing framework improvements.</li>
          </ul>

          <h2>What I'd Do Differently</h2>
          <p>
            If I ran this migration again, I'd change two things:
          </p>
          <ul>
            <li><strong>Estimate data tables individually</strong> — I grouped all data table migrations into a few tickets. In reality, each complex table is its own mini-project. Individual tickets would have given more accurate timelines and better progress visibility.</li>
            <li><strong>Audit third-party dependencies earlier</strong> — I checked compatibility during the audit phase but didn't actually install and test the Vue 3 versions until I needed them. Testing them upfront would have surfaced the forking and beta-version work earlier in the timeline.</li>
          </ul>

          <h2>Key Takeaways</h2>
          <p>
            After completing this migration, these are the principles I'd pass on to any team facing the same challenge:
          </p>
          <ul>
            <li><strong>Audit before you code.</strong> The week spent mapping the codebase paid for itself many times over. Every ticket was scoped before the first line of migration code was written. No surprises, no scope creep.</li>
            <li><strong>Migrate in phases, not all at once.</strong> Build tooling → framework + components → UI framework → state management. Even when you can't ship incrementally, structuring the work in phases keeps it manageable.</li>
            <li><strong>Vuetify means big-bang.</strong> There's no bridge between Vuetify 2 and Vuetify 3, so <code>@vue/compat</code> doesn't help. Plan for a long-running branch and a dedicated validation sprint before merging.</li>
            <li><strong>Vuetify is the hardest part.</strong> If your app uses Vuetify, plan for the component framework migration to take more time than the Vue framework migration itself.</li>
            <li><strong>Validate before you merge.</strong> We paused pushes to main for a sprint to validate the migration end-to-end. That dedicated validation time caught issues that would have been harder to debug in production.</li>
          </ul>
        </section>

        <section class="blog-cta">
          <div class="cta-card">
            <h2>Facing the Same Migration?</h2>
            <p>
              I've done this before and I can do it for your team. Whether you need an audit to understand the scope or want me to execute the full migration, the methodology is proven and the results are measurable.
            </p>
            <div class="cta-actions">
              <a href="#pricing" class="btn btn-primary" @click.prevent="scrollTo('pricing')">
                View Migration Services
              </a>
              <a href="#contact" class="btn btn-secondary" @click.prevent="scrollTo('contact')">
                Get in Touch
              </a>
            </div>
          </div>
        </section>
      </div>
    </article>
  </main>
</template>

<style scoped>
.blog-container {
  max-width: 720px;
}

.blog-header {
  margin-bottom: 48px;
}

.blog-header h1 {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  margin-top: 16px;
  margin-bottom: 16px;
  line-height: 1.25;
}

.blog-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: var(--text-tertiary);
}

.meta-divider {
  color: var(--border);
}

.blog-content h2 {
  font-size: clamp(1.35rem, 2.5vw, 1.75rem);
  margin-top: 48px;
  margin-bottom: 16px;
}

.blog-content h3 {
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  margin-top: 32px;
  margin-bottom: 12px;
}

.blog-content p {
  margin-bottom: 16px;
  font-size: 1.05rem;
  line-height: 1.8;
}

.blog-content .lead {
  font-size: 1.15rem;
  color: var(--text-primary);
  margin-bottom: 32px;
}

.blog-content ul {
  margin-bottom: 16px;
  padding-left: 24px;
}

.blog-content li {
  margin-bottom: 12px;
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--text-secondary);
}

.blog-content code {
  font-size: 0.9em;
  padding: 2px 6px;
  background: var(--bg-code);
  border-radius: 4px;
  color: var(--accent);
}

.blog-content strong {
  color: var(--text-primary);
  font-weight: 600;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin: 32px 0;
}

.result-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 24px 12px;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 14px;
  text-align: center;
}

.result-value {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--accent);
}

.result-label {
  font-size: 0.8rem;
  color: var(--text-tertiary);
}

.blog-cta {
  margin-top: 64px;
  padding-top: 48px;
  border-top: 1px solid var(--border);
}

.cta-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 40px;
  text-align: center;
}

.cta-card h2 {
  font-size: 1.5rem;
  margin-bottom: 12px;
}

.cta-card p {
  font-size: 1.05rem;
  color: var(--text-secondary);
  max-width: 520px;
  margin: 0 auto 24px;
  line-height: 1.7;
}

.cta-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 640px) {
  .blog-header h1 {
    font-size: 1.5rem;
  }

  .results-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .cta-card {
    padding: 28px 20px;
  }

  .cta-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .cta-actions .btn {
    justify-content: center;
  }
}
</style>
