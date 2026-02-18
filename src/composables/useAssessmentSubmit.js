import { ref } from 'vue'

const WEBHOOK_URL = 'https://formspree.io/f/mgolkkvg'

/**
 * Fire-and-forget submission of assessment data to a webhook.
 * Does not block the results page — the user sees results immediately.
 */
export function useAssessmentSubmit() {
  const submitStatus = ref('idle') // 'idle' | 'sending' | 'sent' | 'error'

  async function submit({ answers, contactInfo, scores }) {
    submitStatus.value = 'sending'

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          answers,
          contact: contactInfo,
          scores: {
            total: scores.totalScore,
            tier: scores.tier,
            tierLabel: scores.tierLabel,
            timelineEstimate: scores.timelineEstimate,
            categoryScores: scores.categoryScores,
          },
          submittedAt: new Date().toISOString(),
        }),
      })
      submitStatus.value = 'sent'
    } catch {
      submitStatus.value = 'error'
    }
  }

  return { submitStatus, submit }
}
