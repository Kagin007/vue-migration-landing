<script setup>
import { useHead } from '@unhead/vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function scrollTo(id) {
  router.push({ path: '/', hash: `#${id}` })
}

const title = 'Vuex to Pinia: Why and How to Migrate Your Vue Store'
const description = 'Vuex 4 works with Vue 3, so why bother migrating to Pinia? Here\'s the practical case for switching — and a step-by-step approach based on migrating a production application with 20+ store modules.'
const url = 'https://www.vuemigration.dev/blog/vuex-to-pinia-migration'

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
          <span class="section-label">// Blog</span>
          <h1>Vuex to Pinia: Why and How to Migrate Your Vue Store</h1>
          <div class="blog-meta">
            <span>By Adam Schulte</span>
            <span class="meta-divider">|</span>
            <time datetime="2026-02-16">February 16, 2026</time>
          </div>
        </header>

        <section class="blog-content">
          <p class="lead">
            Here's the thing about the Vuex-to-Pinia migration: you don't <em>have</em> to do it. Vuex 4 is compatible with Vue 3. Your stores will work. But after migrating a <router-link to="/blog/vue-2-to-vue-3-migration-case-study">300+ file production application</router-link> that had 20+ Vuex modules, I'd strongly recommend doing it anyway — and doing it as part of your Vue 3 migration, not later.
          </p>

          <h2>Why Not Just Use Vuex 4?</h2>
          <p>
            Vuex 4 exists specifically to let Vue 3 applications keep their existing stores running. It works. But it's essentially Vuex 3 with Vue 3 compatibility bolted on — the API is the same, the patterns are the same, the problems are the same.
          </p>
          <p>
            Vuex is in maintenance mode. The Vue team has officially recommended Pinia as the successor. That's not a soft recommendation — the Vuex docs literally say "Pinia is now the new default." New ecosystem tooling, tutorials, and libraries assume Pinia. If you're migrating to Vue 3 to future-proof your application, keeping Vuex around kind of defeats the purpose.
          </p>
          <p>
            But the practical reasons matter more than the political ones. Here's what actually changes day to day:
          </p>
          <ul>
            <li><strong>No more mutations.</strong> This is the big one. In Vuex, every state change needs a mutation, even trivial ones. In Pinia, you just modify state directly. Half the boilerplate disappears overnight.</li>
            <li><strong>Full TypeScript support.</strong> Vuex's typing story was always painful — the store module augmentation, the loosely typed <code>commit</code> and <code>dispatch</code> calls. Pinia is built in TypeScript and everything is inferred naturally.</li>
            <li><strong>No more string-based dispatch.</strong> <code>store.dispatch('modules/users/fetchById', id)</code> becomes <code>userStore.fetchById(id)</code>. Refactoring tools work. Find-all-references works. Typos get caught at build time, not at runtime.</li>
            <li><strong>Simpler devtools.</strong> Pinia's Vue DevTools integration is cleaner and shows each store independently instead of as a single nested tree.</li>
          </ul>

          <h2>What the Migration Actually Looks Like</h2>
          <p>
            A Vuex module and a Pinia store aren't that structurally different. The concepts map almost one-to-one — it's the syntax that changes. Let me walk through a realistic example.
          </p>
          <p>
            Here's a typical Vuex module you'd see in a production app. Nothing fancy — it fetches a list of users, tracks loading state, and has a getter for filtering:
          </p>
          <div class="code-block">
            <div class="code-label">Vuex module</div>
            <pre><code>// store/modules/users.js
export default {
  namespaced: true,

  state: () => ({
    users: [],
    loading: false,
    error: null,
  }),

  getters: {
    activeUsers(state) {
      return state.users.filter(u => u.isActive)
    },
  },

  mutations: {
    SET_USERS(state, users) {
      state.users = users
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_ERROR(state, error) {
      state.error = error
    },
  },

  actions: {
    async fetchUsers({ commit }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const res = await api.getUsers()
        commit('SET_USERS', res.data)
      } catch (err) {
        commit('SET_ERROR', err.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },
  },
}</code></pre>
          </div>
          <p>
            Here's the same thing in Pinia:
          </p>
          <div class="code-block">
            <div class="code-label">Pinia store</div>
            <pre><code>// stores/users.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUsersStore = defineStore('users', () => {
  const users = ref([])
  const loading = ref(false)
  const error = ref(null)

  const activeUsers = computed(() =>
    users.value.filter(u => u.isActive)
  )

  async function fetchUsers() {
    loading.value = true
    error.value = null
    try {
      const res = await api.getUsers()
      users.value = res.data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return { users, loading, error, activeUsers, fetchUsers }
})</code></pre>
          </div>
          <p>
            The entire mutations layer is gone. The action just sets state directly. If you're already using the Composition API in your components (which you probably are if you've <router-link to="/blog/vue-2-to-vue-3-gotchas">migrated to Vue 3</router-link>), this pattern will feel immediately familiar — it's the same <code>ref</code>, <code>computed</code>, and function pattern you're already writing.
          </p>

          <h2>The Two Pinia Syntax Styles</h2>
          <p>
            Pinia supports two ways to define stores: the Options syntax and the Setup syntax. The example above uses the Setup syntax (a function that returns refs and functions). Here's the same store in Options syntax:
          </p>
          <div class="code-block">
            <div class="code-label">Pinia options syntax</div>
            <pre><code>export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [],
    loading: false,
    error: null,
  }),

  getters: {
    activeUsers: (state) => state.users.filter(u => u.isActive),
  },

  actions: {
    async fetchUsers() {
      this.loading = true
      this.error = null
      try {
        const res = await api.getUsers()
        this.users = res.data
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
  },
})</code></pre>
          </div>
          <p>
            The Options syntax looks closer to Vuex and is a more direct migration path — state, getters, and actions map almost one-to-one. The main difference is that actions access state via <code>this</code> instead of receiving it as an argument, and there are no mutations at all.
          </p>
          <p>
            I'd recommend using the Setup syntax if you're also converting your components to <code>&lt;script setup&gt;</code>. It keeps everything consistent — stores and components use the same Composition API primitives. But if you want to minimize the diff and get the migration done faster, the Options syntax is a perfectly valid choice.
          </p>

          <h2>Updating Components: The Tedious Part</h2>
          <p>
            Rewriting the stores themselves is the easy part. The tedious part is updating every component that consumes them. In Vuex, components typically access the store through <code>mapState</code>, <code>mapGetters</code>, <code>mapActions</code>, or direct <code>this.$store</code> calls. All of these patterns change.
          </p>
          <div class="code-block">
            <div class="code-label">Vuex component (Options API)</div>
            <pre><code>import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('users', ['loading', 'error']),
    ...mapGetters('users', ['activeUsers']),
  },
  methods: {
    ...mapActions('users', ['fetchUsers']),
  },
  created() {
    this.fetchUsers()
  },
}</code></pre>
          </div>
          <div class="code-block">
            <div class="code-label">Pinia component (script setup)</div>
            <pre><code>&lt;script setup&gt;
import { storeToRefs } from 'pinia'
import { useUsersStore } from '@/stores/users'

const usersStore = useUsersStore()
const { loading, error, activeUsers } = storeToRefs(usersStore)

usersStore.fetchUsers()
&lt;/script&gt;</code></pre>
          </div>
          <p>
            A few things to notice here:
          </p>
          <ul>
            <li><strong><code>storeToRefs</code> is important.</strong> If you destructure a Pinia store directly, the reactive properties lose their reactivity. <code>storeToRefs</code> converts state and getters to refs while keeping them connected to the store. Actions don't need this — destructure those directly.</li>
            <li><strong>No more namespace strings.</strong> You import the store by name and call it as a function. If you rename the store, your IDE catches every consumer.</li>
            <li><strong>No more <code>this.$store</code>.</strong> Every <code>this.$store.state.users.loading</code> or <code>this.$store.dispatch('users/fetchUsers')</code> needs to be found and replaced.</li>
          </ul>

          <h2>The storeToRefs Gotcha</h2>
          <p>
            This is the single most common mistake I see during Vuex-to-Pinia migrations. It looks like this:
          </p>
          <div class="code-block">
            <div class="code-label">Broken — loses reactivity</div>
            <pre><code>const usersStore = useUsersStore()
const { users, loading } = usersStore  // NOT reactive

// 'loading' is just a plain boolean now
// It will never update when the store changes</code></pre>
          </div>
          <p>
            When you destructure a Pinia store without <code>storeToRefs</code>, you get the <em>current values</em>, not reactive references. Your component renders with the initial state and never updates. It's not an error — the code runs fine. You just get stale data.
          </p>
          <p>
            The fix is simple, but you need to be consistent about it:
          </p>
          <div class="code-block">
            <div class="code-label">Correct — preserves reactivity</div>
            <pre><code>const usersStore = useUsersStore()

// State and getters: use storeToRefs
const { users, loading, activeUsers } = storeToRefs(usersStore)

// Actions: destructure directly (they're just functions)
const { fetchUsers } = usersStore</code></pre>
          </div>
          <p>
            Another approach is to skip destructuring entirely and access everything through the store instance. <code>usersStore.loading</code> stays reactive because you're accessing it through the reactive proxy. This is more verbose in templates but avoids the <code>storeToRefs</code> question altogether.
          </p>

          <h2>Handling Cross-Store Dependencies</h2>
          <p>
            In Vuex, modules that need to interact with other modules use <code>rootState</code>, <code>rootGetters</code>, or dispatch actions with <code>{ root: true }</code>. This is one of the uglier parts of Vuex — the string-based cross-module communication that's impossible to trace through static analysis.
          </p>
          <div class="code-block">
            <div class="code-label">Vuex — cross-module access</div>
            <pre><code>// Inside the 'orders' module
actions: {
  async createOrder({ commit, rootState, dispatch }) {
    const currentUser = rootState.auth.currentUser
    const order = await api.createOrder(currentUser.id, payload)
    commit('ADD_ORDER', order)
    dispatch('notifications/show', 'Order created', { root: true })
  },
}</code></pre>
          </div>
          <div class="code-block">
            <div class="code-label">Pinia — cross-store access</div>
            <pre><code>// stores/orders.js
import { useAuthStore } from './auth'
import { useNotificationsStore } from './notifications'

export const useOrdersStore = defineStore('orders', () => {
  // ...

  async function createOrder(payload) {
    const authStore = useAuthStore()
    const notificationsStore = useNotificationsStore()

    const order = await api.createOrder(authStore.currentUser.id, payload)
    orders.value.push(order)
    notificationsStore.show('Order created')
  }

  return { /* ... */ createOrder }
})</code></pre>
          </div>
          <p>
            This is one of the places where Pinia is unambiguously better. The dependencies between stores are explicit imports. You can trace them. Your IDE can find all usages. There's no string-based dispatch to a module that may or may not exist.
          </p>
          <p>
            One thing to watch for: call <code>useAuthStore()</code> <em>inside</em> the action, not at the top level of the setup function. If you call it at the top level, you can hit circular dependency issues when two stores import each other. Inside an action, the stores are guaranteed to be initialized by the time the function runs.
          </p>

          <h2>Migration Order: How to Sequence It</h2>
          <p>
            You don't need to migrate all your stores at once. Pinia and Vuex can coexist in the same application — just install both and migrate one module at a time. Here's the order I'd recommend:
          </p>
          <ul>
            <li><strong>Start with leaf stores</strong> — modules that don't depend on other modules. These are the simplest to convert because there are no cross-store interactions to worry about.</li>
            <li><strong>Then move to stores with few consumers</strong> — a module used by two or three components is easier to update than one used by thirty. Get comfortable with the pattern before tackling the big ones.</li>
            <li><strong>Save the auth/session store for last</strong> — this is typically the most interconnected module. Every other store depends on it, and it's accessed from route guards, API interceptors, and dozens of components. Migrate this last when you've already converted its dependents.</li>
            <li><strong>Delete Vuex when the last module is migrated.</strong> Remove the Vuex package, remove the store initialization from your entry file, and verify nothing references <code>this.$store</code> anymore.</li>
          </ul>
          <p>
            On the <router-link to="/blog/vue-2-to-vue-3-migration-case-study">enterprise migration I completed</router-link>, the Vuex-to-Pinia conversion was its own dedicated ticket group. I migrated the stores in dependency order over a few days, with each store getting its own PR so the team could review the pattern early and approve the approach before I applied it to all 20+ modules.
          </p>

          <h2>Watch Out For: Plugins and Middleware</h2>
          <p>
            If your Vuex store uses plugins — for persistence, logging, or syncing state — those need to be replaced with Pinia equivalents. The most common one is <code>vuex-persistedstate</code>, which becomes <code>pinia-plugin-persistedstate</code>. The API is different but the concept is the same.
          </p>
          <p>
            Also check your router guards. If you have navigation guards that access <code>store.state.auth.isAuthenticated</code> or dispatch Vuex actions, those need to be updated. Route guards are easy to forget because they live in the router file, not in components — they won't show up in a search for <code>mapState</code> or <code>mapActions</code>.
          </p>
          <p>
            Same goes for Axios interceptors or any API layer that reads from the store. If you have a request interceptor that attaches an auth token from Vuex state, that needs to switch to the Pinia store. Search your entire codebase for <code>store.state</code>, <code>store.getters</code>, <code>store.commit</code>, and <code>store.dispatch</code> to find these.
          </p>

          <h2>Is It Worth the Effort?</h2>
          <p>
            Honestly, yes. Of all the pieces of a Vue 3 migration — the framework upgrade, <router-link to="/blog/vuetify-2-to-vuetify-3-migration">Vuetify</router-link>, the build tooling — the Vuex-to-Pinia migration has the best effort-to-improvement ratio. The individual store conversions are mechanical and low-risk. The result is meaningfully less code, better TypeScript support, and a store layer that's easier for your team to work with going forward.
          </p>
          <p>
            If you're doing a Vue 3 migration anyway, there's no good reason to keep Vuex around. You're already touching the entire codebase. Adding the store migration to the scope doesn't increase the risk much, and it avoids a second migration project six months later when someone asks why you're still using a deprecated state management library.
          </p>
        </section>

        <section class="blog-cta">
          <div class="cta-card">
            <h2>Planning a Vuex to Pinia Migration?</h2>
            <p>
              I've migrated production Vuex stores with 20+ modules to Pinia as part of full Vue 3 migrations. If you need help scoping the work or executing it, I'd be happy to chat.
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
