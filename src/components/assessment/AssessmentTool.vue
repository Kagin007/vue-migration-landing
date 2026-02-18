<script setup>
import { ref } from 'vue'
import { useAssessmentForm } from '../../composables/useAssessmentForm.js'
import { useAssessmentScoring } from '../../composables/useAssessmentScoring.js'
import { useAssessmentSubmit } from '../../composables/useAssessmentSubmit.js'
import ProgressBar from './ProgressBar.vue'
import AssessmentStep from './AssessmentStep.vue'
import QuestionRadio from './QuestionRadio.vue'
import QuestionCheckbox from './QuestionCheckbox.vue'
import ContactForm from './ContactForm.vue'
import AssessmentResults from './AssessmentResults.vue'

const {
  currentStep,
  answers,
  formStatus,
  totalSteps,
  currentQuestion,
  canAdvance,
  progress,
  setAnswer,
  toggleCheckbox,
  nextStep,
  prevStep,
  reset,
  completeAssessment,
  goBackToQuestions,
} = useAssessmentForm()

const {
  totalScore,
  maxPossibleScore,
  tier,
  tierLabel,
  tierColor,
  categoryScores,
  riskAreas,
  timelineEstimate,
  recommendedApproach,
} = useAssessmentScoring(answers)

const { submit, submitStatus } = useAssessmentSubmit()

const contactInfo = ref({ email: '', name: '', company: '' })
const emailError = ref(false)
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function handleEmailSubmit() {
  const trimmed = contactInfo.value.email.trim()
  if (!EMAIL_RE.test(trimmed)) {
    emailError.value = true
    return
  }
  emailError.value = false

  // Fire-and-forget submission
  submit({
    answers: answers,
    contactInfo: contactInfo.value,
    scores: {
      totalScore: totalScore.value,
      tier: tier.value,
      tierLabel: tierLabel.value,
      timelineEstimate: timelineEstimate.value,
      categoryScores: categoryScores.value,
    },
  })

  completeAssessment()
}

function handleKeydown(e) {
  if (e.key === 'Enter' && canAdvance.value && formStatus.value === 'in-progress') {
    nextStep()
  }
}
</script>

<template>
  <div class="assessment-tool" @keydown="handleKeydown">
    <!-- Results screen -->
    <template v-if="formStatus === 'completed'">
      <AssessmentResults
        :totalScore="totalScore"
        :maxPossibleScore="maxPossibleScore"
        :tier="tier"
        :tierLabel="tierLabel"
        :tierColor="tierColor"
        :categoryScores="categoryScores"
        :riskAreas="riskAreas"
        :timelineEstimate="timelineEstimate"
        :recommendedApproach="recommendedApproach"
        :answers="answers"
        @reset="reset"
      />
    </template>

    <!-- Email capture step -->
    <template v-else-if="formStatus === 'email-capture'">
      <div class="email-capture-step">
        <div class="email-capture-header">
          <div class="email-capture-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
          </div>
          <h3>Get Your Personalized Migration Report</h3>
          <p>Enter your email to receive your detailed results and recommended next steps.</p>
        </div>

        <ContactForm v-model="contactInfo" />

        <p v-if="emailError" class="email-error-msg">Please enter a valid email address.</p>

        <div class="email-capture-nav">
          <button class="btn btn-secondary" @click="goBackToQuestions">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Back
          </button>
          <button class="btn btn-primary" @click="handleEmailSubmit">
            Get My Results
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </div>
      </div>
    </template>

    <!-- Question steps -->
    <template v-else>
      <ProgressBar :current="currentStep" :total="totalSteps" />

      <Transition name="step" mode="out-in">
        <AssessmentStep
          :key="currentStep"
          :question="currentQuestion.question"
          :stepNumber="currentStep"
        >
          <!-- Radio question -->
          <QuestionRadio
            v-if="currentQuestion.type === 'radio'"
            :options="currentQuestion.options"
            :modelValue="answers[currentQuestion.id]"
            @update:modelValue="setAnswer(currentQuestion.id, $event)"
          />

          <!-- Checkbox question -->
          <QuestionCheckbox
            v-if="currentQuestion.type === 'checkbox'"
            :options="currentQuestion.options"
            :modelValue="answers[currentQuestion.id] || []"
            @toggle="toggleCheckbox(currentQuestion.id, $event)"
          />
        </AssessmentStep>
      </Transition>

      <!-- Navigation -->
      <div class="assessment-nav">
        <button
          v-if="currentStep > 0"
          class="btn btn-secondary"
          @click="prevStep"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
          Back
        </button>
        <div v-else></div>

        <button
          class="btn btn-primary"
          :disabled="!canAdvance"
          @click="nextStep"
        >
          {{ currentStep === totalSteps - 1 ? 'See My Results' : 'Next' }}
          <svg v-if="currentStep < totalSteps - 1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.assessment-tool {
  max-width: 600px;
  margin: 0 auto;
  padding: 32px;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 20px;
}

.assessment-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
}

.assessment-nav .btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Email capture step */
.email-capture-step {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.email-capture-header {
  text-align: center;
}

.email-capture-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: var(--accent-subtle);
  color: var(--accent);
  margin-bottom: 16px;
}

.email-capture-header h3 {
  font-size: 1.25rem;
  margin-bottom: 8px;
}

.email-capture-header p {
  font-size: 0.93rem;
}

.email-error-msg {
  font-size: 0.82rem;
  color: #ef4444;
  text-align: center;
}

.email-capture-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Step transition */
.step-enter-active,
.step-leave-active {
  transition: all 0.25s ease;
}

.step-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.step-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

@media (max-width: 640px) {
  .assessment-tool {
    padding: 20px;
    border-radius: 16px;
  }
}

@media (max-width: 375px) {
  .assessment-tool {
    padding: 16px;
  }
}
</style>
