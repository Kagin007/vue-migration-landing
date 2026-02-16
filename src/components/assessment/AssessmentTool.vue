<script setup>
import { useAssessmentForm } from '../../composables/useAssessmentForm.js'
import { useAssessmentScoring } from '../../composables/useAssessmentScoring.js'
import { useAssessmentSubmit } from '../../composables/useAssessmentSubmit.js'
import ProgressBar from './ProgressBar.vue'
import AssessmentStep from './AssessmentStep.vue'
import QuestionRadio from './QuestionRadio.vue'
import QuestionCheckbox from './QuestionCheckbox.vue'
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

function handleKeydown(e) {
  if (e.key === 'Enter' && canAdvance.value) {
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
        :submit="submit"
        :submitStatus="submitStatus"
        @reset="reset"
      />
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
