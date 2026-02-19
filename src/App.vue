<script setup>
import NavBar from './components/NavBar.vue'
import FooterSection from './components/FooterSection.vue'
import ScrollToTop from './components/ScrollToTop.vue'
import StickyMobileCTA from './components/StickyMobileCTA.vue'
</script>

<template>
  <NavBar />
  <router-view />
  <FooterSection />
  <ScrollToTop />
  <StickyMobileCTA />
</template>

<style>
#app {
  max-width: unset;
  margin: 0;
  padding: 0;
  text-align: left;
}

@media (max-width: 900px) {
  #app {
    padding-bottom: 56px;
  }
}
</style>
