<script setup>
import { useHead } from '@unhead/vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function scrollTo(id) {
  router.push({ path: '/', hash: `#${id}` })
}

const title = '3 Vue 3 Features That Change How You Build Components'
const description = 'defineExpose, shallowRef, and Teleport are Vue 3 features that solve real problems — controlling component APIs, managing third-party state, and escaping DOM hierarchy constraints. Practical examples from a production migration.'
const url = 'https://www.vuemigration.dev/blog/vue-3-features-guide'

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
    { property: 'article:published_time', content: '2026-02-13T00:00:00Z' },
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
        "datePublished": "2026-02-13T00:00:00Z",
        "dateModified": "2026-02-13T00:00:00Z",
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
          <h1>3 Vue 3 Features That Change How You Build Components</h1>
          <div class="blog-meta">
            <span>By Adam Schulte</span>
            <span class="meta-divider">|</span>
            <time datetime="2026-02-13">February 13, 2026</time>
          </div>
        </header>

        <section class="blog-content">
          <p class="lead">
            Vue 3 introduced a lot of new APIs, but most migration guides focus on what changed — renamed hooks, new v-model behavior, the Composition API. What gets less attention are the features that solve problems you couldn't solve cleanly in Vue 2 at all. Here are three that fundamentally changed how we build components on a <router-link to="/blog/vue-2-to-vue-3-migration-case-study">300+ file enterprise application</router-link>.
          </p>

          <h2>1. defineExpose: Control What Parents Can Access</h2>

          <h3>The Vue 2 problem</h3>
          <p>
            In Vue 2 with the Options API, everything on a component instance was public by default. If a parent component grabbed a child via <code>this.$refs.child</code>, it could access any data property, computed, or method on that child. There was no way to control the API surface — any internal implementation detail was exposed.
          </p>
          <p>
            This led to tight coupling. Parent components reached into child internals for convenience, and over time those implicit dependencies became load-bearing. Refactoring a child component meant auditing every parent that held a ref to it.
          </p>

          <h3>The Vue 3 solution</h3>
          <p>
            With <code>&lt;script setup&gt;</code>, Vue 3 flips the default: <strong>nothing is exposed</strong>. A parent component that accesses a child via template ref gets an empty object unless the child explicitly opts in using <code>defineExpose</code>.
          </p>
          <div class="code-block">
            <div class="code-label">Chart child component</div>
            <pre><code>&lt;script setup&gt;
import { shallowRef } from 'vue'

const svg = shallowRef(null)
const zoomTransform = shallowRef(null)

function initChart(container) {
  // D3 setup, binds zoom behavior to SVG
}

function resetZoom() {
  d3.select(svg.value).transition().call(zoom.transform, d3.zoomIdentity)
}

function zoomToFit() {
  // calculate bounds and apply transform
}

// Only expose the SVG and zoom controls
defineExpose({
  svg,
  resetZoom,
  zoomToFit,
})
&lt;/script&gt;</code></pre>
          </div>
          <div class="code-block">
            <div class="code-label">Parent component</div>
            <pre><code>&lt;template&gt;
  &lt;ChartComponent ref="chartRef" /&gt;
  &lt;div class="zoom-controls"&gt;
    &lt;button @click="chartRef.resetZoom()"&gt;Reset Zoom&lt;/button&gt;
    &lt;button @click="chartRef.zoomToFit()"&gt;Zoom to Fit&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'

const chartRef = ref(null)
// chartRef.value.resetZoom — works
// chartRef.value.svg — works
// chartRef.value.zoomTransform — undefined (not exposed)
&lt;/script&gt;</code></pre>
          </div>

          <h3>When this matters</h3>
          <p>
            We used <code>defineExpose</code> with our D3 chart components to give the parent access to the SVG's zoom properties. In Vue 2, the parent could reach into the child's internals via <code>$refs</code> to access the SVG and control zoom — which meant the parent was coupled to the child's internal implementation. We had a significant amount of code in the Vue 2 version just to bridge zoom control between the parent and the D3 chart.
          </p>
          <p>
            With <code>defineExpose</code>, the chart component explicitly exposes <code>svg</code>, <code>resetZoom()</code>, and <code>zoomToFit()</code> — nothing else. The parent gets a clean API for zoom controls. The chart's internal D3 rendering, data binding, and layout logic are completely private. We eliminated a lot of bridging code by making the API boundary explicit.
          </p>
          <p>
            This is especially valuable when multiple developers work on the same codebase. The exposed API acts as a contract. If it's not in <code>defineExpose</code>, it's an implementation detail that can be refactored freely.
          </p>

          <h2>2. shallowRef: Stop Vue From Tracking What It Shouldn't</h2>

          <h3>The Vue 2 problem</h3>
          <p>
            Vue 2's reactivity system was built on <code>Object.defineProperty</code>, which had known limitations — it couldn't deeply observe complex objects without explicit setup. When you stored a third-party class instance (like a D3 chart or a map library) in a data property, Vue 2 would try to make it reactive but would largely fail silently. The object worked fine because Vue 2 just couldn't see most of its internals.
          </p>

          <h3>The Vue 3 problem</h3>
          <p>
            Vue 3 uses <code>Proxy</code>, which can intercept every property access on any object. When you store a third-party instance in a <code>ref()</code>, Vue 3 wraps it in a deep reactive proxy. Every method call, every internal property access, every state change inside that object triggers Vue's reactivity tracking. For complex objects with hundreds of internal properties — like D3 chart instances managing 200+ elements — this creates massive overhead.
          </p>

          <h3>The fix</h3>
          <p>
            <code>shallowRef</code> creates a ref that only tracks reassignment of <code>.value</code>. The object's internal properties are not proxied. Vue reacts when you replace the reference, but ignores changes inside the object.
          </p>
          <div class="code-block">
            <div class="code-label">ref vs shallowRef</div>
            <pre><code>import { ref, shallowRef } from 'vue'

// Deep reactive — Vue tracks every property
const chart = ref(new D3Chart(container))

// Shallow reactive — Vue only tracks reassignment
const chart = shallowRef(new D3Chart(container))</code></pre>
          </div>
          <p>
            On our production application, switching a D3 chart instance from <code>ref</code> to <code>shallowRef</code> dropped rendering time from 200ms to 5ms with 200+ elements. For a deeper dive into this pattern and when to use it, see <router-link to="/blog/vue-3-performance-pitfalls">Vue 3 Performance: Eager Reactivity, shallowRef, and Computed Stability</router-link>.
          </p>

          <h3>The rule</h3>
          <p>
            If you're storing an object that Vue doesn't need to deeply observe — third-party class instances, canvas contexts, WebSocket connections, Web Worker references — use <code>shallowRef</code>. Let Vue track the reference. Let the library manage its own state.
          </p>

          <h2>3. Teleport: Render Outside the Component Tree</h2>

          <h3>The Vue 2 problem</h3>
          <p>
            In Vue 2, a component's rendered output was always nested inside its parent in the DOM. This caused constant problems with modals, tooltips, and overlays. A modal rendered inside a deeply nested component inherited all of its parent's CSS context — <code>overflow: hidden</code> would clip it, relative positioning would offset it, and z-index stacking contexts made layering unpredictable.
          </p>
          <p>
            The common workaround was to manage modals at the app root level, pass events up the component tree to trigger them, and keep modal state in a global store. It worked, but it scattered the logic across multiple files and created implicit dependencies between the component that needed the modal and the root-level component that rendered it.
          </p>

          <h3>The Vue 3 solution</h3>
          <p>
            <code>&lt;Teleport&gt;</code> lets you render a component's template output at a different location in the DOM while keeping it logically connected to its parent component. The component maintains its props, events, and lifecycle — but the rendered HTML appears wherever you tell it to.
          </p>
          <div class="code-block">
            <div class="code-label">Teleport a modal to body</div>
            <pre><code>&lt;template&gt;
  &lt;div class="node-card"&gt;
    &lt;button @click="showDetails = true"&gt;Details&lt;/button&gt;

    &lt;Teleport to="body"&gt;
      &lt;div v-if="showDetails" class="modal-overlay"&gt;
        &lt;div class="modal"&gt;
          &lt;h2&gt;{<!-- -->{ node.name }}&lt;/h2&gt;
          &lt;p&gt;{<!-- -->{ node.description }}&lt;/p&gt;
          &lt;button @click="showDetails = false"&gt;Close&lt;/button&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/Teleport&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'

const props = defineProps(['node'])
const showDetails = ref(false)
&lt;/script&gt;</code></pre>
          </div>

          <h3>When this matters</h3>
          <p>
            We used <code>Teleport</code> for modals inside our drag-and-drop editor nodes. Each node in the editor is a component rendered at a specific position with CSS transforms. Without Teleport, a modal opened from inside a node would be clipped by the editor's viewport, offset by the node's transform, and trapped in the editor's z-index context.
          </p>
          <p>
            With <code>Teleport to="body"</code>, the modal renders outside the editor entirely. It gets clean positioning, correct z-index behavior, and no inherited overflow clipping — while the component logic (state, events, lifecycle) stays inside the node component where it belongs.
          </p>
          <p>
            This is cleaner than the Vue 2 approach of hoisting modal rendering to the root. The trigger, the state, and the modal template all live in the same component. No global store. No event bus. No parent-child coordination.
          </p>

          <h2>These Features Work Together</h2>
          <p>
            The real power shows when you combine them. Our D3 chart component uses all three:
          </p>
          <ul>
            <li><strong>shallowRef</strong> stores the D3 chart instance without reactive overhead</li>
            <li><strong>defineExpose</strong> exposes the SVG element and zoom controls to the parent, keeping the chart's internal rendering private</li>
            <li><strong>Teleport</strong> renders node detail modals outside the chart's SVG viewport so they're not clipped or offset by the chart's transforms</li>
          </ul>
          <p>
            None of these were possible — or at least not cleanly possible — in Vue 2. They're not just new APIs. They're solutions to problems that Vue 2 teams worked around for years.
          </p>
        </section>

        <section class="blog-cta">
          <div class="cta-card">
            <h2>Migrating to Vue 3?</h2>
            <p>
              These features aren't just nice-to-have — they solve real architectural problems that come up during migration. I can help your team adopt Vue 3's modern patterns while migrating away from Vue 2 workarounds.
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
