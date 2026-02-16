<script setup>
import { useHead } from '@unhead/vue'
import HeroSection from '../components/HeroSection.vue'
import ProblemSection from '../components/ProblemSection.vue'
import ApproachSection from '../components/ApproachSection.vue'
import AssessmentSection from '../components/AssessmentSection.vue'
import PricingSection from '../components/PricingSection.vue'
import CredibilitySection from '../components/CredibilitySection.vue'
import FaqSection from '../components/FaqSection.vue'
import ContactSection from '../components/ContactSection.vue'
import { useScrollReveal } from '../composables/useScrollReveal'

useScrollReveal()

useHead({
  title: 'Vue 2 to Vue 3 Migration Services | Hire a Migration Expert',
  meta: [
    { name: 'description', content: 'Hire an experienced Vue migration developer for your Vue 2 to Vue 3 migration. Migration Audit or Full Migration — proven on a 300+ file enterprise application.' },
    { name: 'author', content: 'Adam Schulte' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://www.vuemigration.dev/' },
    { property: 'og:title', content: 'Vue 2 to Vue 3 Migration Services | Hire a Migration Expert' },
    { property: 'og:description', content: 'Hire an experienced Vue migration developer for your Vue 2 to Vue 3 migration. Migration Audit or Full Migration — proven on a 300+ file enterprise application.' },
    { property: 'og:image', content: 'https://www.vuemigration.dev/og-image.png' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:type', content: 'image/png' },
    { property: 'og:site_name', content: 'Vue Migration Consulting' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Vue 2 to Vue 3 Migration Services | Hire a Migration Expert' },
    { name: 'twitter:description', content: 'Hire an experienced Vue migration developer for your Vue 2 to Vue 3 migration. Migration Audit or Full Migration — proven on a 300+ file enterprise application.' },
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
        "description": "Expert Vue 2 to Vue 3 migration services. Structured methodology proven on production enterprise applications.",
        "areaServed": "Worldwide",
        "serviceType": "Vue.js Migration Consulting",
        "knowsAbout": ["Vue.js", "Vue 2 to Vue 3 Migration", "JavaScript", "TypeScript", "Vuetify", "Pinia", "Vite"],
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
              "price": "1000-1500"
            },
            {
              "@type": "Offer",
              "name": "Vue Full Migration",
              "description": "End-to-end migration execution from audit through production deployment.",
              "priceCurrency": "CAD",
              "price": "5000-50000"
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
              "text": "Vue 2 reached end of life on December 31, 2023, which means it no longer receives security patches, bug fixes, or ecosystem updates. Your application is exposed to unpatched vulnerabilities and increasingly incompatible dependencies. Migrating to Vue 3 restores active support, unlocks modern tooling like Vite and Pinia, and future-proofs your codebase."
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
    <ProblemSection />
    <ApproachSection />
    <AssessmentSection />
    <PricingSection />
    <CredibilitySection />
    <FaqSection />
    <ContactSection />
  </main>
</template>
