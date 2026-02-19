<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const showVue3 = ref(false)
const visible = ref(false)
let observer = null

const el = ref(null)

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !visible.value) {
        visible.value = true
        setTimeout(() => { showVue3.value = true }, 1200)
        observer.disconnect()
      }
    },
    { threshold: 0.3 }
  )
  if (el.value) observer.observe(el.value)
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <div ref="el" class="code-demo reveal" :class="{ revealed: visible }">
    <div class="code-window">
      <div class="code-header">
        <div class="window-dots">
          <span></span><span></span><span></span>
        </div>
        <span class="code-filename mono">{{ showVue3 ? 'UserProfile.vue' : 'UserProfile.vue' }}</span>
        <Transition name="badge-swap" mode="out-in">
          <span v-if="!showVue3" key="vue2" class="code-version code-version--old mono">Vue 2 · Options API</span>
          <span v-else key="vue3" class="code-version code-version--new mono">Vue 3 · Composition API</span>
        </Transition>
      </div>

      <div class="code-body">
        <Transition name="code-swap" mode="out-in">
          <pre v-if="!showVue3" key="vue2" class="code-block"><code><span class="line"><span class="kw">export default</span> {</span>
<span class="line">  <span class="fn">data</span>() {</span>
<span class="line">    <span class="kw">return</span> {</span>
<span class="line">      user: <span class="val">null</span>,</span>
<span class="line">      loading: <span class="val">true</span></span>
<span class="line">    }</span>
<span class="line">  },</span>
<span class="line">  <span class="fn">computed</span>: {</span>
<span class="line">    displayName() {</span>
<span class="line">      <span class="kw">return</span> <span class="kw">this</span>.user?.name ?? <span class="str">'Guest'</span></span>
<span class="line">    }</span>
<span class="line">  },</span>
<span class="line">  <span class="fn">mounted</span>() {</span>
<span class="line">    <span class="kw">this</span>.fetchUser()</span>
<span class="line">  },</span>
<span class="line">  <span class="cm">methods</span>: {</span>
<span class="line">    <span class="kw">async</span> <span class="fn">fetchUser</span>() {</span>
<span class="line">      <span class="kw">this</span>.user = <span class="kw">await</span> getUser()</span>
<span class="line">      <span class="kw">this</span>.loading = <span class="val">false</span></span>
<span class="line">    }</span>
<span class="line">  }</span>
<span class="line">}</span></code></pre>

          <pre v-else key="vue3" class="code-block"><code><span class="line"><span class="kw">import</span> { ref, computed, onMounted } <span class="kw">from</span> <span class="str">'vue'</span></span>
<span class="line"></span>
<span class="line"><span class="kw">const</span> user = <span class="fn">ref</span>(<span class="val">null</span>)</span>
<span class="line"><span class="kw">const</span> loading = <span class="fn">ref</span>(<span class="val">true</span>)</span>
<span class="line"></span>
<span class="line"><span class="kw">const</span> displayName = <span class="fn">computed</span>(() <span class="kw">=></span></span>
<span class="line">  user.value?.name ?? <span class="str">'Guest'</span></span>
<span class="line">)</span>
<span class="line"></span>
<span class="line"><span class="kw">async function</span> <span class="fn">fetchUser</span>() {</span>
<span class="line">  user.value = <span class="kw">await</span> getUser()</span>
<span class="line">  loading.value = <span class="val">false</span></span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"><span class="fn">onMounted</span>(<span class="fn">fetchUser</span>)</span></code></pre>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.code-demo {
  max-width: 580px;
  margin: 0 auto;
}

.code-window {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-lg);
  background: var(--bg-code);
}

.code-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: var(--bg-tertiary);
  border-bottom: 1px solid var(--border);
}

.window-dots {
  display: flex;
  gap: 6px;
}

.window-dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--border);
}

.window-dots span:first-child { background: #ef4444; opacity: 0.7; }
.window-dots span:nth-child(2) { background: #eab308; opacity: 0.7; }
.window-dots span:last-child { background: #22c55e; opacity: 0.7; }

.code-filename {
  font-size: 0.78rem;
  color: var(--text-tertiary);
}

.code-version {
  margin-left: auto;
  font-size: 0.7rem;
  padding: 3px 10px;
  border-radius: 100px;
  font-weight: 600;
}

.code-version--old {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.code-version--new {
  background: rgba(66, 184, 131, 0.1);
  color: var(--accent);
}

.code-body {
  padding: 20px;
  min-height: 380px;
  display: flex;
  align-items: flex-start;
}

.code-block {
  margin: 0;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.82rem;
  line-height: 1.7;
  white-space: pre;
  color: var(--text-secondary);
}

.line {
  display: block;
}

.kw { color: #c678dd; }
.fn { color: #61afef; }
.str { color: #98c379; }
.val { color: #d19a66; }
.cm { color: #61afef; }

[data-theme='light'] .kw { color: #8839ef; }
[data-theme='light'] .fn { color: #1e66f5; }
[data-theme='light'] .str { color: #40a02b; }
[data-theme='light'] .val { color: #fe640b; }
[data-theme='light'] .cm { color: #1e66f5; }

/* Transitions */
.code-swap-enter-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.code-swap-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.code-swap-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.code-swap-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.badge-swap-enter-active,
.badge-swap-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.badge-swap-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.badge-swap-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

@media (max-width: 640px) {
  .code-block {
    font-size: 0.72rem;
  }

  .code-body {
    padding: 16px;
    min-height: 340px;
  }
}

@media (max-width: 375px) {
  .code-block {
    font-size: 0.65rem;
  }

  .code-body {
    padding: 12px;
    min-height: 300px;
  }

  .code-version {
    display: none;
  }
}
</style>
