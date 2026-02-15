<script setup>
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ email: '', name: '', company: '' }),
  },
})

const emit = defineEmits(['update:modelValue'])

function update(field, value) {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}
</script>

<template>
  <div class="contact-fields">
    <div class="form-group">
      <label for="assessment-email">Email <span class="required">*</span></label>
      <input
        id="assessment-email"
        type="email"
        placeholder="you@company.com"
        :value="modelValue.email"
        @input="update('email', $event.target.value)"
        required
      />
    </div>

    <div class="form-group">
      <label for="assessment-name">Name</label>
      <input
        id="assessment-name"
        type="text"
        placeholder="Your name"
        :value="modelValue.name"
        @input="update('name', $event.target.value)"
      />
    </div>

    <div class="form-group">
      <label for="assessment-company">Company</label>
      <input
        id="assessment-company"
        type="text"
        placeholder="Your company"
        :value="modelValue.company"
        @input="update('company', $event.target.value)"
      />
    </div>

    <p class="disclaimer">
      I'll send your detailed results to this email. No spam, ever.
    </p>
  </div>
</template>

<style scoped>
.contact-fields {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 0.87rem;
  font-weight: 600;
  color: var(--text-primary);
}

.required {
  color: var(--accent);
}

.form-group input {
  padding: 14px 16px;
  background: var(--bg-card);
  border: 2px solid var(--border);
  border-radius: 12px;
  font-family: inherit;
  font-size: 1rem;
  color: var(--text-primary);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  outline: none;
}

.form-group input::placeholder {
  color: var(--text-tertiary);
}

.form-group input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-subtle);
}

.disclaimer {
  font-size: 0.82rem;
  color: var(--text-tertiary);
  line-height: 1.5;
}
</style>
