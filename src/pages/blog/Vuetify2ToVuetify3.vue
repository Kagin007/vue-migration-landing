<script setup>
import { useHead } from '@unhead/vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function scrollTo(id) {
  router.push({ path: '/', hash: `#${id}` })
}

const title = 'Vuetify 2 to Vuetify 3 Migration: The Hardest Part of Your Vue 3 Upgrade'
const description = 'Vuetify 3 is a near-complete rewrite. Grid system, component APIs, theming, SASS variables — almost everything changed. Here is a practical guide to migrating from Vuetify 2 to Vuetify 3 based on a 300+ file production migration.'
const url = 'https://www.vuemigration.dev/blog/vuetify-2-to-vuetify-3-migration'

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
          <span class="section-label">Blog</span>
          <h1>Vuetify 2 to Vuetify 3 Migration: The Hardest Part of Your Vue 3 Upgrade</h1>
          <div class="blog-meta">
            <span>By Adam Schulte</span>
            <span class="meta-divider">|</span>
            <time datetime="2026-02-16">February 16, 2026</time>
          </div>
        </header>

        <section class="blog-content">
          <p class="lead">
            If your Vue 2 application uses Vuetify, the component framework migration is going to be the most time-consuming part of your Vue 3 upgrade. Vuetify 3 is not an incremental update — it's a near-complete rewrite. The grid system changed, component prop names changed, the theming system was rebuilt, SASS variables moved to CSS custom properties, and dozens of components have entirely new APIs.
          </p>
          <p>
            I migrated a <router-link to="/blog/vue-2-to-vue-3-migration-case-study">300+ file enterprise application</router-link> from Vuetify 2 to Vuetify 3. Here's what I learned about what actually changes, what takes the most time, and how to approach it without losing your mind.
          </p>

          <h2>Why Vuetify Makes Vue 3 Migration Harder</h2>
          <p>
            A Vue 2 to Vue 3 migration without Vuetify is mostly a framework-level concern — you update lifecycle hooks, swap Vuex for Pinia, adopt the Composition API, and move to Vite (though even that has <router-link to="/blog/vue-2-to-vue-3-gotchas">plenty of subtle gotchas</router-link>). The component templates largely stay the same.
          </p>
          <p>
            With Vuetify, you're doing two major migrations at once. Every template that uses a Vuetify component is potentially affected. If 80% of your components use <code>v-btn</code>, <code>v-card</code>, <code>v-text-field</code>, or <code>v-data-table</code>, then 80% of your templates need changes. The Vuetify migration touches more lines of code than the Vue framework migration itself.
          </p>

          <h2>The Grid System: v-container, v-layout, v-flex Are Gone</h2>
          <p>
            Vuetify 2 used <code>v-container</code>, <code>v-layout</code>, and <code>v-flex</code> for its grid system. In Vuetify 3, the grid components are <code>v-container</code>, <code>v-row</code>, and <code>v-col</code>. The names changed, and the prop API changed with them.
          </p>
          <div class="code-block">
            <div class="code-label">Vuetify 2</div>
            <pre><code>&lt;v-container&gt;
  &lt;v-layout row wrap&gt;
    &lt;v-flex xs12 md6&gt;
      &lt;!-- content --&gt;
    &lt;/v-flex&gt;
    &lt;v-flex xs12 md6&gt;
      &lt;!-- content --&gt;
    &lt;/v-flex&gt;
  &lt;/v-layout&gt;
&lt;/v-container&gt;</code></pre>
          </div>
          <div class="code-block">
            <div class="code-label">Vuetify 3</div>
            <pre><code>&lt;v-container&gt;
  &lt;v-row&gt;
    &lt;v-col cols="12" md="6"&gt;
      &lt;!-- content --&gt;
    &lt;/v-col&gt;
    &lt;v-col cols="12" md="6"&gt;
      &lt;!-- content --&gt;
    &lt;/v-col&gt;
  &lt;/v-row&gt;
&lt;/v-container&gt;</code></pre>
          </div>
          <p>
            This is one of the most tedious changes because layout components appear <em>everywhere</em>. Every page, every dialog, every form that uses the grid needs to be updated. The conversion is mechanical but voluminous — expect this to touch more files than any other single change.
          </p>
          <p>
            The good news is it's straightforward to search and replace. The bad news is that some Vuetify 2 grid props like <code>align-center</code> and <code>justify-center</code> on <code>v-layout</code> become <code>align="center"</code> and <code>justify="center"</code> on <code>v-row</code>, so you can't do a blind find-and-replace.
          </p>

          <h2>v-btn: The Variant Prop</h2>
          <p>
            In Vuetify 2, button styles were controlled by boolean props: <code>text</code>, <code>outlined</code>, <code>flat</code>, <code>depressed</code>, <code>icon</code>. In Vuetify 3, these are consolidated into a single <code>variant</code> prop.
          </p>
          <div class="code-block">
            <div class="code-label">Vuetify 2</div>
            <pre><code>&lt;v-btn text&gt;Cancel&lt;/v-btn&gt;
&lt;v-btn outlined color="primary"&gt;Save&lt;/v-btn&gt;
&lt;v-btn depressed color="primary"&gt;Submit&lt;/v-btn&gt;
&lt;v-btn icon&gt;&lt;v-icon&gt;mdi-close&lt;/v-icon&gt;&lt;/v-btn&gt;</code></pre>
          </div>
          <div class="code-block">
            <div class="code-label">Vuetify 3</div>
            <pre><code>&lt;v-btn variant="text"&gt;Cancel&lt;/v-btn&gt;
&lt;v-btn variant="outlined" color="primary"&gt;Save&lt;/v-btn&gt;
&lt;v-btn variant="flat" color="primary"&gt;Submit&lt;/v-btn&gt;
&lt;v-btn icon="mdi-close"&gt;&lt;/v-btn&gt;</code></pre>
          </div>
          <p>
            The mapping: <code>text</code> → <code>variant="text"</code>, <code>outlined</code> → <code>variant="outlined"</code>, <code>depressed</code> → <code>variant="flat"</code>, and <code>flat</code> → <code>variant="flat"</code>. The <code>icon</code> prop now takes the icon name directly instead of wrapping a <code>v-icon</code> child.
          </p>
          <p>
            Buttons are probably the most-used Vuetify component in any application. Search your codebase for <code>&lt;v-btn</code> and count the hits — that's roughly how many templates need updating for this change alone.
          </p>

          <h2>v-data-table: A Complete Rewrite</h2>
          <p>
            The data table is where most teams spend the most migration time. Vuetify 3's <code>v-data-table</code> was rewritten from scratch. The prop names changed, the slot names changed, and the way you customize columns and rows is fundamentally different.
          </p>
          <div class="code-block">
            <div class="code-label">Vuetify 2</div>
            <pre><code>&lt;v-data-table
  :headers="headers"
  :items="users"
  :search="search"
  :loading="loading"
&gt;
  &lt;template v-slot:item.actions="{ item }"&gt;
    &lt;v-btn icon @click="edit(item)"&gt;
      &lt;v-icon&gt;mdi-pencil&lt;/v-icon&gt;
    &lt;/v-btn&gt;
  &lt;/template&gt;
&lt;/v-data-table&gt;</code></pre>
          </div>
          <div class="code-block">
            <div class="code-label">Vuetify 3</div>
            <pre><code>&lt;v-data-table
  :headers="headers"
  :items="users"
  :search="search"
  :loading="loading"
&gt;
  &lt;template v-slot:item.actions="{ item }"&gt;
    &lt;v-btn icon="mdi-pencil" @click="edit(item)" /&gt;
  &lt;/template&gt;
&lt;/v-data-table&gt;</code></pre>
          </div>
          <p>
            The basic usage looks similar, but the differences compound when you use advanced features. Server-side pagination props changed: <code>server-items-length</code> became <code>items-length</code>. The <code>options</code> event-based pagination was replaced with individual <code>v-model</code> bindings for page, items-per-page, and sort. Custom header slots were renamed. The <code>item</code> slot parameter structure changed.
          </p>
          <p>
            If your application has complex data tables with custom sorting, server-side pagination, expandable rows, or grouped data, plan for each table to take significant individual attention. There's no shortcut — each one needs to be manually converted and tested.
          </p>

          <h2>Dialogs and Menus: The Activator Pattern</h2>
          <p>
            Vuetify 2 used an <code>activator</code> slot with a <code>v-on</code> binding to wire up dialogs and menus:
          </p>
          <div class="code-block">
            <div class="code-label">Vuetify 2</div>
            <pre><code>&lt;v-dialog v-model="dialog" max-width="500"&gt;
  &lt;template v-slot:activator="{ on, attrs }"&gt;
    &lt;v-btn v-bind="attrs" v-on="on"&gt;
      Open Dialog
    &lt;/v-btn&gt;
  &lt;/template&gt;
  &lt;v-card&gt;...&lt;/v-card&gt;
&lt;/v-dialog&gt;</code></pre>
          </div>
          <div class="code-block">
            <div class="code-label">Vuetify 3</div>
            <pre><code>&lt;v-dialog v-model="dialog" max-width="500"&gt;
  &lt;template v-slot:activator="{ props }"&gt;
    &lt;v-btn v-bind="props"&gt;
      Open Dialog
    &lt;/v-btn&gt;
  &lt;/template&gt;
  &lt;v-card&gt;...&lt;/v-card&gt;
&lt;/v-dialog&gt;</code></pre>
          </div>
          <p>
            The <code>on</code> and <code>attrs</code> slot props are merged into a single <code>props</code> object. This applies to <code>v-dialog</code>, <code>v-menu</code>, <code>v-tooltip</code>, and any other component that uses the activator pattern. The change is small per instance, but if you have dozens of dialogs and menus, it adds up.
          </p>
          <p>
            The gotcha: if you forget to update a single activator, the dialog or menu simply won't open. No error, no warning — the click handler just isn't bound. These are easy to miss during testing if you don't systematically click every trigger.
          </p>

          <h2>Theming: From SASS Variables to CSS Custom Properties</h2>
          <p>
            Vuetify 2's theming was built on SASS. You overrode variables in a <code>variables.scss</code> file, and the build process compiled your customizations into the final CSS. In Vuetify 3, theming is runtime-based using CSS custom properties.
          </p>
          <div class="code-block">
            <div class="code-label">Vuetify 2 — variables.scss</div>
            <pre><code>$body-font-family: 'Inter', sans-serif;
$heading-font-family: 'Inter', sans-serif;
$border-radius-root: 8px;
$btn-border-radius: 8px;</code></pre>
          </div>
          <div class="code-block">
            <div class="code-label">Vuetify 3 — plugin setup</div>
            <pre><code>import { createVuetify } from 'vuetify'

export default createVuetify({
  defaults: {
    VBtn: { rounded: 'lg' },
    VCard: { rounded: 'lg' },
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#42b883',
          secondary: '#35495e',
        },
      },
    },
  },
})</code></pre>
          </div>
          <p>
            This is a fundamental architecture change. If your application heavily customized Vuetify through SASS variables — custom colors, border radii, spacing, typography — all of that needs to move to the JavaScript configuration or CSS custom properties.
          </p>
          <p>
            Some SASS variables have no direct equivalent in Vuetify 3. For those, you'll need to write custom CSS targeting Vuetify's class names or use the <code>defaults</code> configuration to set prop defaults globally.
          </p>

          <h2>Form Inputs: Prop and Event Renames</h2>
          <p>
            Nearly every form component has renamed props or changed behavior:
          </p>
          <ul>
            <li><code>v-text-field</code>: <code>outlined</code> → <code>variant="outlined"</code>, <code>filled</code> → <code>variant="filled"</code>, <code>solo</code> → <code>variant="solo"</code></li>
            <li><code>v-select</code>: same <code>variant</code> changes, plus <code>item-text</code> → <code>item-title</code>, <code>item-value</code> stays the same</li>
            <li><code>v-autocomplete</code>: same as <code>v-select</code>, plus the internal filtering and slot API changed</li>
            <li><code>v-checkbox</code>: <code>input-value</code> → <code>model-value</code>, label positioning changed</li>
            <li><code>v-radio-group</code>: <code>v-radio</code> now uses <code>label</code> and <code>value</code> directly instead of being a separate component with its own complex API</li>
          </ul>
          <p>
            The <code>variant</code> prop pattern is consistent across all form inputs, which helps once you learn it. But the per-component quirks — renamed slots, changed event payloads, different validation behavior — mean you need to test each form individually.
          </p>

          <h2>v-card: Structural Changes</h2>
          <p>
            Vuetify 2's card sub-components were <code>v-card-title</code>, <code>v-card-subtitle</code>, <code>v-card-text</code>, and <code>v-card-actions</code>. Vuetify 3 keeps these but also adds props directly on <code>v-card</code> for simpler cases:
          </p>
          <div class="code-block">
            <div class="code-label">Vuetify 3 — simplified card</div>
            <pre><code>&lt;v-card
  title="Card Title"
  subtitle="Card subtitle"
  text="Card body content"
/&gt;</code></pre>
          </div>
          <p>
            The main migration issue is that <code>v-card-text</code> no longer applies the same default padding in all cases. If you relied on implicit spacing from Vuetify 2's card layout, you may see layout shifts. Review each card and verify the spacing is correct after migration.
          </p>

          <h2>Icons: Setup Changed</h2>
          <p>
            In Vuetify 2, you configured icons globally and <code>v-icon</code> accepted the icon name as a child text node. In Vuetify 3, <code>v-icon</code> uses the <code>icon</code> prop, and the icon set must be explicitly installed:
          </p>
          <div class="code-block">
            <div class="code-label">Vuetify 2</div>
            <pre><code>&lt;v-icon&gt;mdi-home&lt;/v-icon&gt;
&lt;v-icon large color="primary"&gt;mdi-account&lt;/v-icon&gt;</code></pre>
          </div>
          <div class="code-block">
            <div class="code-label">Vuetify 3</div>
            <pre><code>&lt;v-icon icon="mdi-home" /&gt;
&lt;v-icon icon="mdi-account" size="large" color="primary" /&gt;</code></pre>
          </div>
          <p>
            The <code>large</code>, <code>small</code>, <code>x-large</code> boolean props are replaced by a single <code>size</code> prop. And icons passed as text content still work in some cases, but the recommended pattern is the <code>icon</code> prop.
          </p>

          <h2>Typography and Utility Classes</h2>
          <p>
            Vuetify 2's typography classes like <code>headline</code>, <code>title</code>, <code>subheading</code>, <code>body-1</code>, <code>body-2</code>, and <code>caption</code> are replaced with <code>text-h1</code> through <code>text-h6</code>, <code>text-subtitle-1</code>, <code>text-subtitle-2</code>, <code>text-body-1</code>, <code>text-body-2</code>, <code>text-caption</code>, etc.
          </p>
          <p>
            Spacing helpers (<code>pa-4</code>, <code>mx-2</code>, etc.) mostly survived unchanged, but some edge cases around responsive spacing and negative margins behave differently. If your layouts look slightly off after migration, check the spacing utilities first.
          </p>

          <h2>Migration Strategy: Do It Separately</h2>
          <p>
            The single most important piece of advice: <strong>don't migrate Vue and Vuetify at the same time</strong>. Migrate Vue 2 to Vue 3 first using the <code>@vue/compat</code> compatibility build, get that stable, then tackle Vuetify 2 to Vuetify 3 as a separate phase.
          </p>
          <p>
            When you do migrate Vuetify, work through it component by component, not file by file. Migrate all <code>v-btn</code> instances across the entire codebase in one pass. Then all <code>v-data-table</code> instances. Then all dialogs and menus. This approach lets you build muscle memory for each component's changes and catch patterns that a file-by-file approach would miss.
          </p>
          <p>
            Here's the order I'd recommend:
          </p>
          <ul>
            <li><strong>Grid system first</strong> — <code>v-layout</code>/<code>v-flex</code> → <code>v-row</code>/<code>v-col</code>. High volume, mechanical changes.</li>
            <li><strong>Buttons and icons</strong> — <code>v-btn</code> variant props and <code>v-icon</code> prop syntax. Also high volume.</li>
            <li><strong>Form inputs</strong> — <code>v-text-field</code>, <code>v-select</code>, <code>v-checkbox</code>, etc. Test every form after converting.</li>
            <li><strong>Dialogs, menus, tooltips</strong> — Activator pattern update. Test every trigger.</li>
            <li><strong>Data tables</strong> — Save these for last. They take the most time per instance and require the most testing.</li>
            <li><strong>Theming and SASS</strong> — Move SASS overrides to the Vuetify plugin config. Verify visual appearance across light/dark themes.</li>
          </ul>

          <h2>There Is No Codemod</h2>
          <p>
            Unlike some framework migrations, there is no reliable automated codemod for Vuetify 2 to Vuetify 3. The changes are too varied and context-dependent. Template-level transformations (prop renames, slot changes, structural refactors) don't lend themselves to AST-based automation the way JavaScript refactors do.
          </p>
          <p>
            This means the migration is fundamentally manual work. You can speed it up with targeted search-and-replace for the simpler patterns (<code>v-layout</code> → <code>v-row</code>, <code>text</code> → <code>variant="text"</code>), but complex components like data tables and forms need individual attention.
          </p>
          <p>
            For a medium-sized application (50–150 components), the Vuetify migration alone typically takes 1–3 weeks depending on how heavily the app uses Vuetify's advanced features. For larger applications with complex data tables and custom themes, it can take longer.
          </p>
        </section>

        <section class="blog-cta">
          <div class="cta-card">
            <h2>Need Help With Your Vuetify Migration?</h2>
            <p>
              I've migrated Vuetify 2 to Vuetify 3 on a 300+ file production application. I know where the time sinks are and how to avoid them. Whether you need an audit of what's involved or hands-on execution, I can help.
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
