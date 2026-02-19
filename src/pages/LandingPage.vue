<script setup>
import { useHead } from '@unhead/vue'
import HeroSection from '../components/HeroSection.vue'
import VideoEmbed from '../components/VideoEmbed.vue'
import CaseStudyStats from '../components/CaseStudyStats.vue'
import ProblemSection from '../components/ProblemSection.vue'
import ApproachSection from '../components/ApproachSection.vue'
import AssessmentSection from '../components/AssessmentSection.vue'
import PricingSection from '../components/PricingSection.vue'
import CredibilitySection from '../components/CredibilitySection.vue'
import TestimonialSection from '../components/TestimonialSection.vue'
import BlogSection from '../components/BlogSection.vue'
import FaqSection from '../components/FaqSection.vue'
import ContactSection from '../components/ContactSection.vue'
import { useScrollReveal } from '../composables/useScrollReveal'

useScrollReveal()

useHead({
  title: 'Vue 2 to Vue 3 Migration Services | Expert Consultant — vuemigration.dev',
  meta: [
    { name: 'description', content: 'Expert Vue 2 to Vue 3 migration consulting. Vuex to Pinia, Vue CLI to Vite, Vuetify 2 to Vuetify 3. Structured methodology, proven on 300+ file enterprise applications. Based in Canada.' },
    { name: 'author', content: 'Adam Schulte' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://www.vuemigration.dev/' },
    { property: 'og:title', content: 'Vue 2 to Vue 3 Migration Services | Expert Consultant — vuemigration.dev' },
    { property: 'og:description', content: 'Expert Vue 2 to Vue 3 migration consulting. Vuex to Pinia, Vue CLI to Vite, Vuetify 2 to Vuetify 3. Structured methodology, proven on 300+ file enterprise applications. Based in Canada.' },
    { property: 'og:image', content: 'https://www.vuemigration.dev/og-image.png' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:type', content: 'image/png' },
    { property: 'og:site_name', content: 'Vue Migration Consulting' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Vue 2 to Vue 3 Migration Services | Expert Consultant — vuemigration.dev' },
    { name: 'twitter:description', content: 'Expert Vue 2 to Vue 3 migration consulting. Vuex to Pinia, Vue CLI to Vite, Vuetify 2 to Vuetify 3. Structured methodology, proven on 300+ file enterprise applications. Based in Canada.' },
    { name: 'twitter:image', content: 'https://www.vuemigration.dev/og-image.png' },
  ],
  link: [
    { rel: 'canonical', href: 'https://www.vuemigration.dev/' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Vue Migration Consulting",
        "url": "https://www.vuemigration.dev",
        "image": "https://www.vuemigration.dev/og-image.png",
        "description": "Expert Vue 2 to Vue 3 migration consulting. Vuex to Pinia, Vue CLI to Vite, Vuetify 2 to Vuetify 3. Structured methodology, proven on 300+ file enterprise applications. Based in Canada.",
        "areaServed": "Worldwide",
        "serviceType": "Vue.js Migration Consulting",
        "knowsAbout": ["Vue.js", "Vue 2 to Vue 3 Migration", "JavaScript", "TypeScript", "Vuetify", "Pinia", "Vite", "Nuxt 3", "Nuxt 2 to Nuxt 3 Migration"],
        "provider": {
          "@type": "Person",
          "name": "Adam Schulte",
          "jobTitle": "Vue Migration Developer",
          "url": "https://www.linkedin.com/in/adam-schulte-a279ab10/"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Vue Migration Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "name": "Vue Migration Audit",
              "description": "Full codebase assessment with detailed migration plan and ticket breakdown.",
              "priceCurrency": "CAD",
              "price": "1500-2500"
            },
            {
              "@type": "Offer",
              "name": "Vue Guided Migration",
              "description": "Expert guidance while your team executes — roadmap, PR reviews, architecture advice, and async support.",
              "priceCurrency": "CAD",
              "price": "175-225"
            },
            {
              "@type": "Offer",
              "name": "Vue Full Migration",
              "description": "End-to-end migration execution from audit through production deployment.",
              "priceCurrency": "CAD",
              "price": "7500-60000"
            }
          ]
        }
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How long does a typical Vue 2 to Vue 3 migration take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It depends on the size and complexity of your codebase. A small-to-medium application (30–80 components) typically takes 2–4 weeks for a full migration. Larger applications may take 6–10 weeks. The codebase audit gives you an accurate timeline before any execution begins."
            }
          },
          {
            "@type": "Question",
            "name": "Will there be downtime during the Vue migration?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No — your users are never affected. If your app uses Vuetify, there's no bridge between Vuetify 2 and 3, so the migration lands as one release rather than shipping incrementally. That means a dedicated validation sprint before merging, but zero downtime for your end users."
            }
          },
          {
            "@type": "Question",
            "name": "Do you work with our existing development team?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely. I integrate with your existing PR workflow so your team has full visibility and can review every change. I handle the migration execution while your developers stay focused on shipping features."
            }
          },
          {
            "@type": "Question",
            "name": "What if we only need a partial Vue migration?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "That's completely fine. Maybe you only need the Vuex-to-Pinia migration, or just the build tooling upgrade to Vite. The codebase audit will identify which pieces make sense to tackle and in what order. You can stop at any phase — each increment delivers standalone value."
            }
          },
          {
            "@type": "Question",
            "name": "How is hiring a Vue migration consultant different from a consultancy?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Traditional consultancies assign a rotating team of developers who need ramp-up time on your codebase, charge agency rates, and often follow generic playbooks. I'm a single developer with direct, recent experience completing this exact migration. Lower overhead, faster execution, and you get the same person from audit through handoff."
            }
          },
          {
            "@type": "Question",
            "name": "What does Vue 2 end of life mean for my application?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Vue 2 has been end-of-life since December 31, 2023 — no more security patches, bug fixes, or ecosystem updates. The longer you wait, the harder it gets. A migration audit gives you a clear picture of the effort involved so you can plan with confidence."
            }
          },
          {
            "@type": "Question",
            "name": "Do you handle Nuxt 2 to Nuxt 3 migrations?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Nuxt 2 reached end of life in June 2024 and presents additional migration complexity on top of the core Vue 2 to Vue 3 upgrade. I handle the full Nuxt migration including server middleware, layouts, plugins, and the shift to Nitro. The same structured methodology applies — audit first, then incremental execution with zero downtime."
            }
          }
        ]
      }),
    },
  ],
})
</script>

<template>
  <main>
    <HeroSection />
    <VideoEmbed />
    <CaseStudyStats />
    <ProblemSection />
    <ApproachSection />
    <AssessmentSection />
    <PricingSection />
    <CredibilitySection />
    <TestimonialSection />
    <BlogSection />
    <FaqSection />
    <ContactSection />
  </main>
</template>
