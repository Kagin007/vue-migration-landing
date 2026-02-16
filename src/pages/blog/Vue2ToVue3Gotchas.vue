<script setup>
import { useHead } from '@unhead/vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function scrollTo(id) {
  router.push({ path: '/', hash: `#${id}` })
}

const title = 'Vue 2 to Vue 3 Migration Gotchas: 10 Breaking Changes That Catch Teams Off Guard'
const description = 'The Vue 2 to Vue 3 migration has subtle breaking changes that slip past linters and build tools. Here are 10 gotchas from real migration experience — and how to fix each one.'
const url = 'https://www.vuemigration.dev/blog/vue-2-to-vue-3-gotchas'

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
    { property: 'article:published_time', content: '2026-01-27T00:00:00Z' },
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
        "datePublished": "2026-01-27T00:00:00Z",
        "dateModified": "2026-01-27T00:00:00Z",
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
          <h1>Vue 2 to Vue 3 Migration Gotchas: 10 Breaking Changes That Catch Teams Off Guard</h1>
          <div class="blog-meta">
            <span>By Adam Schulte</span>
            <span class="meta-divider">|</span>
            <time datetime="2026-01-27">January 27, 2026</time>
          </div>
        </header>

        <section class="blog-content">
          <p class="lead">
            The Vue 2 to Vue 3 migration guide lists every breaking change, but some of them don't cause build errors. They cause <em>runtime</em> bugs — components that render wrong, events that silently stop firing, props that arrive as <code>undefined</code>. These are the gotchas I've hit on real migrations, including a <router-link to="/blog/vue-2-to-vue-3-migration-case-study">300+ file enterprise application</router-link>. Each one slipped past the compiler and had to be caught through testing or code review.
          </p>

          <h2>1. v-model Works Completely Differently</h2>
          <p>
            In Vue 2, <code>v-model</code> on a component maps to a <code>value</code> prop and an <code>input</code> event. In Vue 3, it maps to <code>modelValue</code> and <code>update:modelValue</code>.
          </p>
          <p>
            This one is well-documented, but the gotcha is that it <strong>doesn't throw an error</strong>. Your component just silently stops working. The parent passes <code>modelValue</code>, the child reads <code>value</code> and gets <code>undefined</code>. Two-way binding is broken but nothing in the console tells you why.
          </p>
          <div class="code-block">
            <div class="code-label">Vue 2</div>
            <pre><code>props: ['value'],
methods: {
  update(val) {
    this.$emit('input', val)
  }
}</code></pre>
          </div>
          <div class="code-block">
            <div class="code-label">Vue 3</div>
            <pre><code>const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

function update(val) {
  emit('update:modelValue', val)
}</code></pre>
          </div>
          <p>
            If you have dozens of form components, this is one of the most time-consuming changes because every single one needs to be updated. If you're using Vuetify, the <router-link to="/blog/vuetify-2-to-vuetify-3-migration">Vuetify 2 to 3 migration</router-link> compounds this — form input APIs changed significantly there too. Search your codebase for <code>this.$emit('input'</code> and <code>props: ['value']</code> to find them all.
          </p>

          <h2>2. Attribute Fallthrough Behavior Changed</h2>
          <p>
            In Vue 2, class, style, and event listeners applied to a component are merged onto the root element automatically. <code>$attrs</code> contains everything <em>except</em> class and style. In Vue 3, <code>$attrs</code> now includes <strong>everything</strong> — class, style, and event listeners — and they all fall through to the root element by default.
          </p>
          <p>
            This seems harmless until you have a component with multiple root elements (fragments — newly allowed in Vue 3). With multiple roots, Vue doesn't know where to apply the fallthrough attributes, so it drops them and logs a runtime warning. Your parent component adds <code>class="mt-4"</code> and it vanishes.
          </p>
          <p>
            The fix is to explicitly bind <code>$attrs</code> to the element that should receive them:
          </p>
          <div class="code-block">
            <div class="code-label">Vue 3 — explicit $attrs binding</div>
            <pre><code>&lt;template&gt;
  &lt;label&gt;{{ label }}&lt;/label&gt;
  &lt;input v-bind="$attrs" /&gt;
&lt;/template&gt;

&lt;script setup&gt;
defineOptions({ inheritAttrs: false })
&lt;/script&gt;</code></pre>
          </div>

          <h2>3. Lifecycle Hooks Were Renamed</h2>
          <p>
            <code>beforeDestroy</code> is now <code>beforeUnmount</code>. <code>destroyed</code> is now <code>unmounted</code>. The old names still work with the Options API during the compatibility build phase, but when you switch to <code>&lt;script setup&gt;</code> and the Composition API, the equivalent hooks are <code>onBeforeUnmount</code> and <code>onUnmounted</code>.
          </p>
          <p>
            The gotcha: if you're migrating incrementally and using the <code>@vue/compat</code> compatibility build, the old names work fine. You ship to production. Months later you drop the compat build, and suddenly your cleanup logic stops running — event listeners aren't removed, timers aren't cleared, subscriptions aren't cancelled. These bugs are hard to trace because the component <em>mounts</em> fine. It just never <em>cleans up</em>.
          </p>
          <p>
            Search for <code>beforeDestroy</code> and <code>destroyed</code> across your codebase and rename them before dropping <code>@vue/compat</code>.
          </p>

          <h2>4. .native Modifier on Events Is Removed</h2>
          <p>
            In Vue 2, if you wanted to listen to a native DOM event on a component (rather than a custom emitted event), you used <code>.native</code>:
          </p>
          <div class="code-block">
            <div class="code-label">Vue 2</div>
            <pre><code>&lt;MyButton @click.native="handleClick" /&gt;</code></pre>
          </div>
          <p>
            In Vue 3, <code>.native</code> is removed entirely. All events that aren't declared in the component's <code>emits</code> option automatically fall through as native DOM events.
          </p>
          <p>
            The gotcha: if a child component declares <code>click</code> in its <code>emits</code>, the parent's <code>@click</code> listens to the emitted event. If the child <em>doesn't</em> declare it, <code>@click</code> falls through as a native click handler. Whether your event listener works depends on the child's emits declaration — something the parent template doesn't tell you.
          </p>
          <p>
            The fix: always declare your emits explicitly. This makes the behavior predictable and gives you better tooling support:
          </p>
          <div class="code-block">
            <div class="code-label">Vue 3</div>
            <pre><code>const emit = defineEmits(['click', 'update'])
// Now @click on the parent always listens
// to the emitted event, not a native click</code></pre>
          </div>

          <h2>5. Custom Directives Have a New Signature</h2>
          <p>
            The directive hook names changed to match component lifecycle hooks. <code>bind</code> is now <code>beforeMount</code>. <code>inserted</code> is now <code>mounted</code>. <code>update</code> and <code>componentUpdated</code> are merged into <code>updated</code>. <code>unbind</code> is now <code>unmounted</code>.
          </p>
          <div class="code-block">
            <div class="code-label">Vue 2</div>
            <pre><code>Vue.directive('focus', {
  inserted(el) {
    el.focus()
  }
})</code></pre>
          </div>
          <div class="code-block">
            <div class="code-label">Vue 3</div>
            <pre><code>const vFocus = {
  mounted(el) {
    el.focus()
  }
}</code></pre>
          </div>
          <p>
            The gotcha is that the old hook names don't throw errors — the directive just never fires. Your <code>inserted</code> hook silently does nothing because Vue 3 doesn't recognize it. If you have custom directives for things like focus management, click-outside detection, or intersection observers, they'll all break without any console output.
          </p>

          <h2>6. Async Components Need defineAsyncComponent</h2>
          <p>
            In Vue 2, you could define an async component by returning a promise from a function:
          </p>
          <div class="code-block">
            <div class="code-label">Vue 2</div>
            <pre><code>components: {
  AsyncModal: () => import('./Modal.vue')
}</code></pre>
          </div>
          <p>
            In Vue 3, you need to wrap it with <code>defineAsyncComponent</code>:
          </p>
          <div class="code-block">
            <div class="code-label">Vue 3</div>
            <pre><code>import { defineAsyncComponent } from 'vue'

const AsyncModal = defineAsyncComponent(
  () => import('./Modal.vue')
)</code></pre>
          </div>
          <p>
            The gotcha: in the Options API, the old syntax <em>sometimes</em> still works during the compat build. But when you move to <code>&lt;script setup&gt;</code>, the lazy import pattern just returns a promise object instead of a component. You get a cryptic "Invalid VNode type" error rather than a clear "use defineAsyncComponent" message.
          </p>

          <h2>7. Global API Registration Changed</h2>
          <p>
            Vue 2's global API (<code>Vue.component()</code>, <code>Vue.directive()</code>, <code>Vue.mixin()</code>, <code>Vue.use()</code>) registered everything on the shared global <code>Vue</code> constructor. In Vue 3, these methods move to the app instance:
          </p>
          <div class="code-block">
            <div class="code-label">Vue 2</div>
            <pre><code>Vue.component('BaseButton', BaseButton)
Vue.directive('tooltip', tooltipDirective)
Vue.use(MyPlugin)</code></pre>
          </div>
          <div class="code-block">
            <div class="code-label">Vue 3</div>
            <pre><code>const app = createApp(App)
app.component('BaseButton', BaseButton)
app.directive('tooltip', tooltipDirective)
app.use(MyPlugin)</code></pre>
          </div>
          <p>
            The gotcha isn't the API change itself — that's straightforward. It's the <strong>order of operations</strong>. In Vue 2, you could register components and plugins in any file, in any order, before or after <code>new Vue()</code>. In Vue 3, everything must be registered on the app instance <em>before</em> calling <code>app.mount()</code>. If a plugin or global component registration happens asynchronously or in a file that executes after mount, it silently fails.
          </p>

          <h2>8. Transition Class Names Changed</h2>
          <p>
            The <code>&lt;transition&gt;</code> component renamed its enter classes. <code>v-enter</code> is now <code>v-enter-from</code>. <code>v-leave</code> is now <code>v-leave-from</code>. The <code>v-enter-active</code> and <code>v-leave-active</code> names are unchanged.
          </p>
          <div class="code-block">
            <div class="code-label">Vue 2 CSS</div>
            <pre><code>.fade-enter { opacity: 0; }
.fade-enter-active { transition: opacity 0.3s; }
.fade-leave-active { transition: opacity 0.3s; }
.fade-leave-to { opacity: 0; }</code></pre>
          </div>
          <div class="code-block">
            <div class="code-label">Vue 3 CSS</div>
            <pre><code>.fade-enter-from { opacity: 0; }
.fade-enter-active { transition: opacity 0.3s; }
.fade-leave-active { transition: opacity 0.3s; }
.fade-leave-to { opacity: 0; }</code></pre>
          </div>
          <p>
            The gotcha: when the class name doesn't match, the element still transitions — but with no starting state. So instead of fading in from transparent, the element just appears instantly. The leave animation usually still works because <code>v-leave-to</code> wasn't renamed. This makes it easy to miss during testing because things <em>mostly</em> work. Your modals still close with a fade but open without one.
          </p>

          <h2>9. Watchers on Arrays Behave Differently</h2>
          <p>
            In Vue 2, a watcher on an array fires when the array is mutated in place (<code>push</code>, <code>splice</code>, etc.) because Vue 2 wraps array methods. In Vue 3, reactivity is proxy-based, so mutation is tracked natively — but there's a subtle difference with <code>deep</code> watching.
          </p>
          <p>
            In Vue 3, if you watch a reactive array, the callback fires when items are added or removed. But if you need to react to changes <em>inside</em> array items (e.g., changing a property on an object in the array), you need <code>deep: true</code> — which you may not have needed in Vue 2 depending on how your reactivity was set up.
          </p>
          <p>
            The gotcha: you'll have lists that update when you add items but don't react when you edit an item's property inline. The UI is stale but the data is correct. It only becomes obvious when you navigate away and come back — suddenly the correct data appears.
          </p>

          <h2>10. Template Refs Work Differently in script setup</h2>
          <p>
            In Vue 2 with the Options API, you access refs via <code>this.$refs.myRef</code> and they're available after mount. In Vue 3 with <code>&lt;script setup&gt;</code>, you declare a <code>ref()</code> with the same name as the template <code>ref</code> attribute:
          </p>
          <div class="code-block">
            <div class="code-label">Vue 3 script setup</div>
            <pre><code>&lt;template&gt;
  &lt;input ref="inputEl" /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref, onMounted } from 'vue'

const inputEl = ref(null)

onMounted(() => {
  inputEl.value.focus()
})
&lt;/script&gt;</code></pre>
          </div>
          <p>
            The gotcha: the ref variable name <strong>must match</strong> the template <code>ref</code> attribute exactly. If you name the variable <code>input</code> and the attribute <code>ref="inputEl"</code>, the ref is always <code>null</code>. No warning, no error. And because refs are <code>null</code> during SSR anyway, you might not catch this until a user reports that some interactive feature doesn't work.
          </p>
          <p>
            Another trap: in Vue 2, <code>this.$refs</code> on a <code>v-for</code> element gives you an array. In Vue 3, you need to use a function ref to collect multiple elements:
          </p>
          <div class="code-block">
            <div class="code-label">Vue 3 — v-for refs</div>
            <pre><code>&lt;div
  v-for="item in list"
  :ref="el => { if (el) itemRefs.push(el) }"
/&gt;</code></pre>
          </div>

          <h2>How to Catch These Before Production</h2>
          <p>
            The common thread across all these gotchas is that they don't cause build failures. Your CI passes. The app renders. But something is subtly wrong — an event doesn't fire, a class doesn't apply, a cleanup function never runs.
          </p>
          <p>
            Here's what I do on every migration:
          </p>
          <ul>
            <li><strong>Enable compat build warnings</strong> — <code>@vue/compat</code> logs deprecation warnings at runtime for every Vue 2 pattern it detects. Run through the app with the console open and fix every warning before dropping the compat build. While you're at it, plan your <router-link to="/blog/vuex-to-pinia-migration">Vuex to Pinia migration</router-link> — compat mode is a good time to transition your stores too.</li>
            <li><strong>Search for known patterns</strong> — <code>this.$emit('input'</code>, <code>beforeDestroy</code>, <code>.native</code>, <code>v-enter {</code>, <code>Vue.component(</code>. A codebase-wide search catches most of these before you even test.</li>
            <li><strong>Test transitions manually</strong> — Automated tests rarely cover enter/leave animations. Click through every modal, dropdown, and accordion and watch for missing animations.</li>
            <li><strong>Test cleanup paths</strong> — Navigate away from pages, close modals, switch tabs. If a component has lifecycle cleanup, test the path that triggers it.</li>
            <li><strong>Audit custom directives separately</strong> — Directives are easy to forget because they live outside the component hierarchy. List every directive, verify the hook names, and test each one.</li>
          </ul>
        </section>

        <section class="blog-cta">
          <div class="cta-card">
            <h2>Need Help With Your Migration?</h2>
            <p>
              I've worked through all of these gotchas on production applications. Whether you need a codebase audit to identify risks or hands-on help executing the migration, I can help you avoid the surprises.
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
