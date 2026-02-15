<script setup>
defineProps({
  question: { type: String, required: true },
  stepNumber: { type: Number, required: true },
})
</script>

<template>
  <div class="assessment-step">
    <h3 class="step-question">{{ question }}</h3>
    <slot />
  </div>
</template>

<style scoped>
.assessment-step {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.step-question {
  font-size: clamp(1.15rem, 2vw, 1.35rem);
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.4;
}
</style>
