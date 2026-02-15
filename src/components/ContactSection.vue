<script setup>
import { ref, computed } from 'vue'

const form = ref({
  name: '',
  email: '',
  company: '',
  codebase_size: '',
  message: '',
})

const status = ref('idle') // idle | submitting | success | error

const isValid = computed(() => {
  return form.value.name.trim() && form.value.email.trim() && form.value.message.trim()
})

async function handleSubmit() {
  if (!isValid.value || status.value === 'submitting') return

  status.value = 'submitting'

  try {
    const res = await fetch('https://formspree.io/f/mgolkkvg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(form.value),
    })

    if (res.ok) {
      status.value = 'success'
      form.value = { name: '', email: '', company: '', codebase_size: '', message: '' }
    } else {
      status.value = 'error'
    }
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <section id="contact" class="section contact-section section-divider">
    <div class="container">
      <div class="reveal" style="text-align: center;">
        <span class="section-label">// Get in Touch</span>
        <h2 class="section-title" style="margin-left: auto; margin-right: auto;">
          Tell me about your<br><span class="text-gradient">project.</span>
        </h2>
        <p class="section-subtitle" style="margin-left: auto; margin-right: auto;">
          Drop me a message and I'll get back to you within one business day.
        </p>
      </div>

      <div class="form-wrapper reveal">
        <div v-if="status === 'success'" class="form-success">
          <div class="success-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <h3>Message sent!</h3>
          <p>Thanks for reaching out. I'll get back to you shortly.</p>
          <button class="btn btn-secondary" @click="status = 'idle'">Send another message</button>
        </div>

        <form v-else @submit.prevent="handleSubmit" class="contact-form">
          <div class="form-row">
            <div class="form-group">
              <label for="name">Name <span class="required">*</span></label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                placeholder="Your name"
                required
              />
            </div>
            <div class="form-group">
              <label for="email">Email <span class="required">*</span></label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="you@company.com"
                required
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="company">Company</label>
              <input
                id="company"
                v-model="form.company"
                type="text"
                placeholder="Your company name"
              />
            </div>
            <div class="form-group">
              <label for="codebase_size">Approximate codebase size</label>
              <select id="codebase_size" v-model="form.codebase_size">
                <option value="" disabled>Select an option</option>
                <option value="small">Small (under 50 components)</option>
                <option value="medium">Medium (50–150 components)</option>
                <option value="large">Large (150–300 components)</option>
                <option value="enterprise">Enterprise (300+ components)</option>
                <option value="unsure">Not sure yet</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="message">Message <span class="required">*</span></label>
            <textarea
              id="message"
              v-model="form.message"
              rows="5"
              placeholder="Tell me about your application and what you're looking for — migration audit, guided migration, full migration, or just have questions?"
              required
            ></textarea>
          </div>

          <div class="form-footer">
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="!isValid || status === 'submitting'"
            >
              <svg v-if="status !== 'submitting'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
              <span v-if="status === 'submitting'" class="spinner"></span>
              {{ status === 'submitting' ? 'Sending...' : 'Send Message' }}
            </button>

            <p v-if="status === 'error'" class="form-error">
              Something went wrong. Please try again or email me directly.
            </p>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  background: var(--bg-secondary);
}

.form-wrapper {
  max-width: 640px;
  margin: 0 auto;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
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

.form-group input,
.form-group select,
.form-group textarea {
  padding: 12px 16px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 10px;
  font-family: inherit;
  font-size: 0.93rem;
  color: var(--text-primary);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  outline: none;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: var(--text-tertiary);
}

.form-group select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%2364748b' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  padding-right: 40px;
}

.form-group select option {
  background: var(--bg-card);
  color: var(--text-primary);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-subtle);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.form-footer {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-footer .btn {
  align-self: flex-start;
}

.form-footer .btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.form-error {
  font-size: 0.87rem;
  color: #ef4444;
}

.form-success {
  text-align: center;
  padding: 48px 24px;
  background: var(--bg-card);
  border: 1px solid var(--accent-border);
  border-radius: 20px;
}

.success-icon {
  color: var(--accent);
  margin-bottom: 16px;
}

.form-success h3 {
  margin-bottom: 8px;
}

.form-success p {
  margin-bottom: 24px;
  font-size: 0.95rem;
}

@media (max-width: 640px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .form-footer .btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 375px) {
  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 10px 12px;
    font-size: 16px;
  }

  .form-success {
    padding: 32px 16px;
  }
}
</style>
