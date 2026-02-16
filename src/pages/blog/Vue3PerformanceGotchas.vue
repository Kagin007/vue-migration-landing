<script setup>
import { useHead } from '@unhead/vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function scrollTo(id) {
  router.push({ path: '/', hash: `#${id}` })
}

const title = 'Vue 3 Performance: Eager Reactivity, shallowRef, and Computed Stability'
const description = 'Vue 3\'s reactivity system is more aggressive than Vue 2\'s. That means performance problems that never existed in Vue 2 can appear after migration. Here are two real patterns from a production migration — and how to fix them.'
const url = 'https://www.vuemigration.dev/blog/vue-3-performance-pitfalls'

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
    { property: 'article:published_time', content: '2026-02-10T00:00:00Z' },
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
        "datePublished": "2026-02-10T00:00:00Z",
        "dateModified": "2026-02-10T00:00:00Z",
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
          <span class="section-label">Blog</span>
          <h1>Vue 3 Performance: Eager Reactivity, shallowRef, and Computed Stability</h1>
          <div class="blog-meta">
            <span>By Adam Schulte</span>
            <span class="meta-divider">|</span>
            <time datetime="2026-02-10">February 10, 2026</time>
          </div>
        </header>

        <section class="blog-content">
          <p class="lead">
            Vue 3's reactivity system is fundamentally different from Vue 2's. Vue 2 was lazy — it marked dependencies as dirty and deferred updates until something triggered a re-render. Vue 3 is eager — every change to reactive data flows through its entire dependency chain immediately. This is more correct, but it means performance problems that never existed in Vue 2 can surface after migration.
          </p>
          <p>
            These aren't theoretical issues. On a <router-link to="/blog/vue-2-to-vue-3-migration-case-study">300+ file enterprise migration</router-link>, we hit two performance patterns that caused visible slowdowns in production. Both were caused by Vue 3's reactivity doing <em>more work</em> than Vue 2 did — and both had clean fixes once we understood what was happening.
          </p>

          <h2>The Problem: Vue 3 Reacts to Everything</h2>
          <p>
            In Vue 2, reactivity was built on <code>Object.defineProperty</code>. It had known limitations — it couldn't detect property additions, array index changes, or deeply nested mutations without explicit helpers like <code>Vue.set()</code>. But those limitations also meant Vue 2 was accidentally efficient in some cases. It simply didn't track things it couldn't see.
          </p>
          <p>
            Vue 3 uses <code>Proxy</code>, which intercepts every property access and mutation on a reactive object. That means Vue 3 tracks more dependencies, triggers more updates, and propagates changes more aggressively. For most applications, this is invisible. But when you have large data structures, complex computed chains, or third-party libraries that manage their own state, the overhead can compound.
          </p>

          <h2>Pattern 1: shallowRef for Third-Party Libraries</h2>

          <h3>The symptom</h3>
          <p>
            We had a D3.js visualization rendering 200+ elements. After the Vue 3 migration, interactions that were instant in Vue 2 had a visible delay — roughly 200ms per update. The D3 rendering logic hadn't changed. The data hadn't changed. Only the Vue version had changed.
          </p>

          <h3>The cause</h3>
          <p>
            The D3 instance was stored in a <code>ref()</code>. In Vue 3, <code>ref()</code> deeply wraps its value in a reactive proxy. That means every property on the D3 instance — every internal method, every child node reference, every layout calculation — was being intercepted by Vue's reactivity system. D3 does a lot of internal state management during rendering, and Vue was tracking all of it.
          </p>
          <div class="code-block">
            <div class="code-label">The problem</div>
            <pre><code>import { ref } from 'vue'

// Vue deeply proxies the entire D3 instance
// Every internal property access triggers reactivity tracking
const chart = ref(new D3Chart(container))</code></pre>
          </div>

          <h3>The fix</h3>
          <p>
            Replace <code>ref()</code> with <code>shallowRef()</code>. A shallow ref only tracks the reference itself — whether the variable is reassigned. It does not proxy the internal properties of the value. D3 gets to manage its own state without Vue intercepting every property access.
          </p>
          <div class="code-block">
            <div class="code-label">The fix</div>
            <pre><code>import { shallowRef } from 'vue'

// Vue only tracks reassignment of the reference
// D3's internals are left alone
const chart = shallowRef(new D3Chart(container))</code></pre>
          </div>
          <p>
            The rendering time dropped from 200ms to 5ms. The D3 visualization went back to feeling instant, same as it had in Vue 2.
          </p>

          <h3>When to use shallowRef</h3>
          <p>
            Use <code>shallowRef</code> whenever you're storing a third-party class instance that Vue doesn't need to deeply observe. Common examples:
          </p>
          <ul>
            <li><strong>D3.js</strong> — chart instances, scales, layouts</li>
            <li><strong>Three.js</strong> — scenes, cameras, renderers</li>
            <li><strong>Chart.js</strong> — chart instances</li>
            <li><strong>CodeMirror / Monaco</strong> — editor instances</li>
            <li><strong>Map libraries</strong> — Leaflet, Mapbox GL instances</li>
          </ul>
          <p>
            The rule: if you need Vue to react when the <em>reference</em> changes (e.g., replacing the chart with a new one), but you don't need Vue to track the object's internal state, use <code>shallowRef</code>.
          </p>

          <h2>Pattern 2: Computed Stability and the Reactive Chain</h2>

          <h3>The symptom</h3>
          <p>
            We had a drag-and-drop editor backed by a store containing 200+ elements. Selecting an element — clicking on it to mark it active — caused a noticeable lag. In Vue 2, selection was instant. In Vue 3, the entire element list was re-rendering on every selection change.
          </p>

          <h3>The cause</h3>
          <p>
            The store held the active element as a full object reference. A computed property mapped all elements into a node list, comparing each element's UUID against the active element to determine the <code>selected</code> flag:
          </p>
          <div class="code-block">
            <div class="code-label">The problem</div>
            <pre><code>const activeElement = computed(() => store.getActiveElement)

const nodes = computed(() => {
  return elements.value.map((element) => ({
    id: element.metadata.uuid,
    x: element.metadata.dndData?.x ?? 0,
    y: element.metadata.dndData?.y ?? 0,
    name: element.template.metadata.name,
    selected: element.metadata.uuid === activeElement.value?.metadata.uuid,
  }))
})</code></pre>
          </div>
          <p>
            The issue is that <code>activeElement</code> is a computed that returns a full object. When the active element changes, Vue replaces the entire object reference. Since <code>previousValue !== currentValue</code> (they're different objects), Vue marks <code>activeElement</code> as changed. That triggers <code>nodes</code> to recompute, which rebuilds the entire node list — all 200+ elements — even though only the <code>selected</code> flag on two elements actually changed.
          </p>
          <p>
            In Vue 2, the lazy reactivity model masked this. Computeds were marked dirty but didn't always propagate until something forced a re-render. In Vue 3, the eager model means the entire chain fires immediately.
          </p>

          <h3>The fix: stabilize the computed</h3>
          <p>
            The Vue docs call this <a href="https://vuejs.org/guide/best-practices/performance.html#computed-stability" target="_blank" rel="noopener">computed stability</a>. The idea is to extract the primitive value that actually matters — in this case, the UUID — so the reactive chain stops propagating when the primitive hasn't changed:
          </p>
          <div class="code-block">
            <div class="code-label">Better — stabilize with a primitive</div>
            <pre><code>const activeElement = computed(() => store.getActiveElement)
const activeElementUuid = computed(() => activeElement.value?.metadata.uuid)

const nodes = computed(() => {
  return elements.value.map((element) => ({
    id: element.metadata.uuid,
    x: element.metadata.dndData?.x ?? 0,
    y: element.metadata.dndData?.y ?? 0,
    name: element.template.metadata.name,
    selected: element.metadata.uuid === activeElementUuid.value,
  }))
})</code></pre>
          </div>
          <p>
            Now when the active element changes but the UUID is the same (e.g., the object was replaced but represents the same element), <code>activeElementUuid</code> returns the same string. Since <code>previousValue === currentValue</code>, Vue stops the reactive chain there. The <code>nodes</code> computed doesn't recompute.
          </p>

          <h3>The better fix: store the primitive</h3>
          <p>
            The stabilized computed works at the consumption site, but every component that reads the active element needs to remember to extract the UUID. A more robust solution is to fix this at the store level:
          </p>
          <div class="code-block">
            <div class="code-label">Best — store the primitive, derive the object</div>
            <pre><code>// In the store
const activeElementUuid = ref(null)

const activeElement = computed(() =>
  elements.value.find(el => el.metadata.uuid === activeElementUuid.value)
)

function setActiveElement(uuid) {
  activeElementUuid.value = uuid
}</code></pre>
          </div>
          <p>
            Now the store holds a UUID string as the source of truth. The full element object is derived via a computed. Every consumer that only needs the UUID gets a stable primitive. Consumers that need the full object get it from the derived computed. The reactive chain is clean at the architectural level — no need for every component to independently stabilize its computeds.
          </p>

          <h2>Why This Matters After a Migration</h2>
          <p>
            These patterns are specific to Vue 3 migrations because they're caused by the difference between Vue 2's lazy and Vue 3's eager reactivity. Your Vue 2 code was "fast" not because it was well-optimized, but because Vue 2's reactivity system was doing less work. After migration, Vue 3 does the correct amount of work — which is sometimes more than you need.
          </p>
          <p>
            The <router-link to="/blog/vue-2-to-vue-3-gotchas">breaking changes that catch teams off guard</router-link> are usually API-level — renamed hooks, changed v-model behavior, removed modifiers. But performance regressions are harder to catch because nothing is "broken." The app works. It's just slower. These issues only surface through profiling or through users noticing that something feels wrong.
          </p>

          <h2>The Rules of Thumb</h2>
          <ul>
            <li><strong>Use <code>shallowRef</code> for third-party instances.</strong> If Vue doesn't need to track an object's internal state, don't let it. D3, Three.js, Chart.js, map libraries, editor instances — all candidates for <code>shallowRef</code>.</li>
            <li><strong>Stabilize computeds with primitives.</strong> If a computed returns an object but downstream computeds only need a single property, extract that property into its own computed. Primitive equality (<code>===</code>) stops the reactive chain.</li>
            <li><strong>Store primitives, derive objects.</strong> When a store tracks "which item is active," store the ID, not the object. Derive the object via a computed. This keeps the reactive chain clean for every consumer, not just the ones that remember to optimize.</li>
            <li><strong>Profile after migration.</strong> Don't assume that the same code runs at the same speed on Vue 3. Vue DevTools and the browser performance profiler will show you where Vue 3's reactivity is doing unnecessary work.</li>
          </ul>
        </section>

        <section class="blog-cta">
          <div class="cta-card">
            <h2>Seeing Performance Issues After Your Migration?</h2>
            <p>
              Vue 3's reactivity model is more powerful but less forgiving. If your migrated application is slower than it should be, I can help identify and fix the patterns causing unnecessary reactive overhead.
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

.blog-content em {
  font-style: italic;
}

.code-block {
  margin: 20px 0;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--border);
}

.code-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-tertiary);
  padding: 8px 16px;
  background: var(--bg-tertiary);
  border-bottom: 1px solid var(--border);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.code-block pre {
  margin: 0;
  padding: 16px;
  background: var(--bg-code);
  overflow-x: auto;
}

.code-block code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  line-height: 1.7;
  color: var(--text-primary);
  background: none;
  padding: 0;
  border-radius: 0;
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
