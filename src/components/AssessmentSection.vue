<script setup>
import AssessmentTool from './assessment/AssessmentTool.vue'
</script>

<template>
  <section id="assessment" class="section assessment-section section-divider" aria-labelledby="assessment-heading">
    <div class="container">
      <div class="reveal" style="text-align: center;">
        <span class="section-label">// Free Assessment</span>
        <h2 id="assessment-heading" class="section-title" style="margin-left: auto; margin-right: auto;">
          Free Vue 2 Migration<br><span class="text-gradient">Complexity Assessment</span>
        </h2>
        <p class="section-subtitle" style="margin-left: auto; margin-right: auto;">
          Find out in under 2 minutes. Get a personalized complexity score, risk analysis, and recommended approach.
        </p>
      </div>

      <div class="reveal">
        <AssessmentTool />
      </div>
    </div>
  </section>
</template>

<style scoped>
.assessment-section {
  background: var(--bg-primary);
}
</style>
