<script setup>
import { useHead } from '@unhead/vue'

useHead({
  title: 'Page Not Found — Vue Migration Consulting',
})
</script>

<template>
  <main class="not-found">
    <div class="container not-found-content">
      <span class="error-code mono">404</span>
      <h1>Page not found</h1>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <router-link to="/" class="btn btn-primary">Back to Home</router-link>
    </div>
  </main>
</template>

<style scoped>
.not-found {
  min-height: calc(100vh - 72px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.not-found-content {
  text-align: center;
  padding: 80px 24px;
}

.error-code {
  font-size: 5rem;
  font-weight: 800;
  color: var(--accent);
  line-height: 1;
  margin-bottom: 16px;
  display: block;
}

.not-found-content h1 {
  font-size: 1.5rem;
  margin-bottom: 12px;
}

.not-found-content p {
  color: var(--text-secondary);
  margin-bottom: 32px;
}
</style>
