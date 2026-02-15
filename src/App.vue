<script setup>
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import ProblemSection from './components/ProblemSection.vue'
import ApproachSection from './components/ApproachSection.vue'
import AssessmentSection from './components/AssessmentSection.vue'
import PricingSection from './components/PricingSection.vue'
import CredibilitySection from './components/CredibilitySection.vue'
import FaqSection from './components/FaqSection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterSection from './components/FooterSection.vue'
import { useScrollReveal } from './composables/useScrollReveal'

useScrollReveal()
</script>

<template>
  <NavBar />
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
  <FooterSection />
</template>

<style>
#app {
  max-width: unset;
  margin: 0;
  padding: 0;
  text-align: left;
}
</style>
