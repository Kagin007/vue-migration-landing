import { computed } from 'vue'
import { questions, categories, categoryMaxScores } from '../data/assessmentQuestions.js'

/**
 * Computes migration complexity scores and recommendations from assessment answers.
 *
 * Scoring tiers:
 *   0–10  → Straightforward (green)  — 2–4 weeks
 *   11–20 → Moderate (orange)        — 4–8 weeks
 *   21+   → Complex (red)            — 8–16 weeks
 */

// Upper bounds for each tier (inclusive)
const STRAIGHTFORWARD_MAX = 10
const MODERATE_MAX = 20

export function useAssessmentScoring(answers) {
  /** Total score across all scored questions */
  const totalScore = computed(() => {
    let score = 0
    for (const q of questions) {
      if (q.category === 'none') continue
      const answer = answers.value[q.id]
      if (answer == null) continue

      if (q.type === 'radio') {
        const opt = q.options.find((o) => o.value === answer)
        if (opt) score += opt.score
      }

      if (q.type === 'checkbox' && Array.isArray(answer)) {
        for (const val of answer) {
          const opt = q.options.find((o) => o.value === val)
          if (opt) score += opt.score
        }
      }
    }
    return score
  })

  /** Complexity tier derived from total score */
  const tier = computed(() => {
    if (totalScore.value <= STRAIGHTFORWARD_MAX) return 'straightforward'
    if (totalScore.value <= MODERATE_MAX) return 'moderate'
    return 'complex'
  })

  const tierLabel = computed(() => ({
    straightforward: 'Straightforward',
    moderate: 'Moderate',
    complex: 'Complex',
  }[tier.value]))

  const tierColor = computed(() => ({
    straightforward: '#42b883', // green
    moderate: '#f59e0b',        // amber/orange
    complex: '#ef4444',         // red
  }[tier.value]))

  /** Sub-scores for each category */
  const categoryScores = computed(() => {
    return categories.map((cat) => {
      let score = 0
      for (const q of questions) {
        if (q.category !== cat.id) continue
        const answer = answers.value[q.id]
        if (answer == null) continue

        if (q.type === 'radio') {
          const opt = q.options.find((o) => o.value === answer)
          if (opt) score += opt.score
        }
        if (q.type === 'checkbox' && Array.isArray(answer)) {
          for (const val of answer) {
            const opt = q.options.find((o) => o.value === val)
            if (opt) score += opt.score
          }
        }
      }
      const max = categoryMaxScores[cat.id] || 1
      return {
        ...cat,
        score,
        maxScore: max,
        percentage: Math.min(Math.round((score / max) * 100), 100),
      }
    })
  })

  /** Dynamic risk areas based on specific answer selections */
  const riskAreas = computed(() => {
    const risks = []
    for (const q of questions) {
      if (!q.riskText || Object.keys(q.riskText).length === 0) continue
      const answer = answers.value[q.id]
      if (answer == null) continue

      if (q.type === 'radio' && q.riskText[answer]) {
        risks.push({ question: q.question, text: q.riskText[answer], score: q.options.find((o) => o.value === answer)?.score || 0 })
      }

      if (q.type === 'checkbox' && Array.isArray(answer)) {
        for (const val of answer) {
          if (q.riskText[val]) {
            risks.push({ question: q.question, text: q.riskText[val], score: q.options.find((o) => o.value === val)?.score || 0 })
          }
        }
      }
    }
    // Sort by score descending so highest-impact risks appear first
    return risks.sort((a, b) => b.score - a.score)
  })

  /** Estimated timeline range based on tier */
  const timelineEstimate = computed(() => ({
    straightforward: '2–4 weeks',
    moderate: '4–8 weeks',
    complex: '8–16 weeks',
  }[tier.value]))

  /** Recommended approach text based on tier */
  const recommendedApproach = computed(() => ({
    straightforward:
      'Your codebase is well-positioned for a smooth migration. A guided migration with consulting support should be sufficient — your team can handle the execution with expert code reviews and architecture guidance along the way.',
    moderate:
      'Your migration has some moving parts that need careful planning. Starting with a codebase audit will give you a clear picture of the work involved, then you can decide whether to run the migration in-house with guidance or bring in hands-on help for the trickier pieces.',
    complex:
      'This is a significant migration that will benefit from professional execution. A phased, managed migration approach will minimize risk and keep your application stable throughout the process. Starting with a detailed audit is essential to build the right execution plan.',
  }[tier.value]))

  // Max possible score for the gauge visualization (sum of all max option scores)
  const maxPossibleScore = computed(() => {
    let max = 0
    for (const q of questions) {
      if (q.category === 'none') continue
      if (q.type === 'radio') {
        max += Math.max(...q.options.map((o) => o.score))
      }
      if (q.type === 'checkbox') {
        // Sum all non-none/not-sure options as max
        max += q.options
          .filter((o) => o.value !== 'none')
          .reduce((sum, o) => sum + o.score, 0)
      }
    }
    return max
  })

  return {
    totalScore,
    maxPossibleScore,
    tier,
    tierLabel,
    tierColor,
    categoryScores,
    riskAreas,
    timelineEstimate,
    recommendedApproach,
  }
}
