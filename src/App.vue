<script setup>
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import ProblemSection from './components/ProblemSection.vue'
import ApproachSection from './components/ApproachSection.vue'
import PricingSection from './components/PricingSection.vue'
import CredibilitySection from './components/CredibilitySection.vue'
import FaqSection from './components/FaqSection.vue'
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
    <PricingSection />
    <CredibilitySection />
    <FaqSection />
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
