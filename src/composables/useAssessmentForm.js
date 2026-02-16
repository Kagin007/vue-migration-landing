import { ref, computed } from 'vue'
import { questions } from '../data/assessmentQuestions.js'

/**
 * Manages assessment form state: current step, answers, navigation, and validation.
 * Designed to be shared across assessment components via provide/inject or direct import.
 */
export function useAssessmentForm() {
  const currentStep = ref(0)
  const answers = ref({})
  const formStatus = ref('in-progress') // 'in-progress' | 'completed'

  const totalSteps = questions.length
  const currentQuestion = computed(() => questions[currentStep.value])

  const canAdvance = computed(() => {
    const q = currentQuestion.value
    if (!q) return false

    if (q.type === 'radio') {
      return answers.value[q.id] != null
    }

    if (q.type === 'checkbox') {
      const selected = answers.value[q.id]
      return Array.isArray(selected) && selected.length > 0
    }

    return false
  })

  const isComplete = computed(() => {
    return questions.every((q) => {
      if (q.type === 'checkbox') {
        const val = answers.value[q.id]
        return Array.isArray(val) && val.length > 0
      }
      return answers.value[q.id] != null
    })
  })

  const progress = computed(() => (currentStep.value + 1) / totalSteps)

  function setAnswer(questionId, value) {
    answers.value[questionId] = value
  }

  function toggleCheckbox(questionId, value) {
    const current = answers.value[questionId] || []

    // "None of these" clears all others
    if (value === 'none') {
      answers.value[questionId] = current.includes('none') ? [] : ['none']
      return
    }

    // Selecting anything else removes "none"
    const withoutNone = current.filter((v) => v !== 'none')

    if (withoutNone.includes(value)) {
      answers.value[questionId] = withoutNone.filter((v) => v !== value)
    } else {
      answers.value[questionId] = [...withoutNone, value]
    }
  }

  function nextStep() {
    if (canAdvance.value && currentStep.value < totalSteps - 1) {
      currentStep.value++
    } else if (canAdvance.value && currentStep.value === totalSteps - 1) {
      formStatus.value = 'completed'
    }
  }

  function prevStep() {
    if (currentStep.value > 0) {
      currentStep.value--
    }
  }

  function reset() {
    currentStep.value = 0
    answers.value = {}
    formStatus.value = 'in-progress'
  }

  return {
    currentStep,
    answers,
    formStatus,
    totalSteps,
    currentQuestion,
    canAdvance,
    isComplete,
    progress,
    setAnswer,
    toggleCheckbox,
    nextStep,
    prevStep,
    reset,
  }
}
