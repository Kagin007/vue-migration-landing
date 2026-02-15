/**
 * Assessment question definitions.
 *
 * Each question has:
 *   id        — unique key used to store the answer
 *   question  — display text
 *   type      — 'radio' | 'checkbox' | 'contact'
 *   options   — array of { label, value, score } (omitted for contact)
 *   category  — which sub-score this contributes to
 *   riskText  — map of answer value → risk description shown in results
 *
 * Scoring weights are intentionally simple integers so they're easy to tweak.
 */

export const questions = [
  {
    id: 'component_count',
    question: 'How many Vue components does your app have?',
    type: 'radio',
    category: 'overall',
    options: [
      { label: 'Under 20', value: 'under_20', score: 1 },
      { label: '20–50', value: '20_50', score: 2 },
      { label: '50–150', value: '50_150', score: 3 },
      { label: '150+', value: '150_plus', score: 4 },
    ],
    riskText: {
      '150_plus':
        'With 150+ components, a phased migration approach is critical to avoid destabilizing the app.',
    },
  },
  {
    id: 'vue_version',
    question: 'Which version of Vue 2 are you on?',
    type: 'radio',
    category: 'overall',
    options: [
      { label: '2.7', value: '2.7', score: 1 },
      { label: '2.6', value: '2.6', score: 2 },
      { label: '2.5 or older', value: '2.5_older', score: 3 },
      { label: 'Not sure', value: 'not_sure', score: 3 },
    ],
    riskText: {
      '2.5_older':
        'Vue 2.5 and older lack the Composition API backport available in 2.7, which means more code needs to change during migration.',
      not_sure:
        'Not knowing your exact Vue version suggests limited visibility into your dependency stack — a codebase audit will surface this quickly.',
    },
  },
  {
    id: 'vuex',
    question: 'Are you using Vuex for state management?',
    type: 'radio',
    category: 'state_management',
    options: [
      { label: 'Yes, with namespaced modules', value: 'namespaced', score: 4 },
      { label: 'Yes, simple store', value: 'simple', score: 2 },
      { label: 'No', value: 'no', score: 0 },
      { label: 'Not sure', value: 'not_sure', score: 2 },
    ],
    riskText: {
      namespaced:
        'Namespaced Vuex modules require careful planning to migrate to Pinia — each module becomes its own store with different patterns.',
    },
  },
  {
    id: 'build_tooling',
    question: "What's your build tooling?",
    type: 'radio',
    category: 'build_tooling',
    options: [
      { label: 'Vue CLI', value: 'vue_cli', score: 2 },
      { label: 'Webpack (manual config)', value: 'webpack', score: 3 },
      { label: 'Nuxt 2', value: 'nuxt2', score: 4 },
      { label: 'Other', value: 'other', score: 2 },
    ],
    riskText: {
      webpack:
        'Custom Webpack configs often have project-specific plugins and loaders that need to be individually mapped to Vite equivalents.',
      nuxt2:
        'Nuxt 2 to Nuxt 3 is a significant migration on its own — the framework, server engine, and file conventions all change.',
    },
  },
  {
    id: 'legacy_patterns',
    question: 'Which of these Vue 2 patterns does your app use?',
    type: 'checkbox',
    category: 'template_patterns',
    options: [
      { label: 'Mixins', value: 'mixins', score: 2 },
      { label: 'Filters', value: 'filters', score: 2 },
      { label: 'Event bus', value: 'event_bus', score: 2 },
      { label: 'Vue.set / Vue.delete', value: 'vue_set', score: 1 },
      { label: 'Render functions', value: 'render_functions', score: 2 },
      { label: 'None of these', value: 'none', score: 0 },
      { label: 'Not sure', value: 'not_sure', score: 1 },
    ],
    riskText: {
      mixins:
        'Mixins are the single biggest source of migration complexity — they need to be refactored into composables with careful attention to naming conflicts.',
      filters:
        'Vue 3 removed filters entirely. Each one needs to be converted to a computed property or helper function.',
      event_bus:
        'The event bus pattern ($on / $emit on a shared instance) is removed in Vue 3 and needs to be replaced with provide/inject, a state store, or emits.',
      render_functions:
        'Render function signatures changed significantly in Vue 3 — h() is now imported and the createElement API is different.',
    },
  },
  {
    id: 'typescript',
    question: 'Are you using TypeScript?',
    type: 'radio',
    category: 'overall',
    options: [
      { label: 'Yes, fully typed', value: 'full', score: 0 },
      { label: 'Partially', value: 'partial', score: 1 },
      { label: 'No', value: 'no', score: 2 },
    ],
    riskText: {
      no: 'Adding TypeScript during migration increases scope but dramatically improves long-term maintainability and catches bugs early.',
    },
  },
  {
    id: 'testing',
    question: 'Do you have automated tests?',
    type: 'radio',
    category: 'testing',
    options: [
      { label: 'Good coverage', value: 'good', score: 0 },
      { label: 'Some tests', value: 'some', score: 1 },
      { label: 'No tests', value: 'none', score: 3 },
    ],
    riskText: {
      none:
        'Without automated tests, every migration change carries higher risk. Building at least smoke tests before migrating is strongly recommended.',
    },
  },
  {
    id: 'team_size',
    question: 'How many developers work on this codebase?',
    type: 'radio',
    category: 'overall',
    options: [
      { label: 'Just me', value: '1', score: 0 },
      { label: '2–5', value: '2_5', score: 1 },
      { label: '6–15', value: '6_15', score: 2 },
      { label: '15+', value: '15_plus', score: 3 },
    ],
    riskText: {
      '15_plus':
        'With 15+ developers, migration coordination becomes a project management challenge — clear ticket breakdown and branch strategy are essential.',
    },
  },
  {
    id: 'timeline',
    question: "What's your timeline for migration?",
    type: 'radio',
    category: 'none', // Not scored — lead qualification only
    options: [
      { label: 'ASAP', value: 'asap', score: 0 },
      { label: 'Next quarter', value: 'next_quarter', score: 0 },
      { label: 'Next 6 months', value: '6_months', score: 0 },
      { label: 'Just exploring', value: 'exploring', score: 0 },
    ],
    riskText: {},
  },
  {
    id: 'contact',
    question: 'Where should we send your results?',
    type: 'contact',
    category: 'none',
    options: [],
    riskText: {},
  },
]

/** Categories used for sub-score breakdown in results */
export const categories = [
  { id: 'state_management', label: 'State Management', icon: '🗄' },
  { id: 'template_patterns', label: 'Template & Component Patterns', icon: '🧩' },
  { id: 'build_tooling', label: 'Build Tooling', icon: '⚙' },
  { id: 'testing', label: 'Testing & Safety Net', icon: '🧪' },
]

/** Max possible scores per category for progress bar scaling */
export const categoryMaxScores = {
  state_management: 4,
  template_patterns: 9, // 2+2+2+1+2 if all legacy patterns selected
  build_tooling: 4,
  testing: 3,
}
