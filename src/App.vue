<script setup>
import NavBar from './components/NavBar.vue'
import FooterSection from './components/FooterSection.vue'
import ScrollToTop from './components/ScrollToTop.vue'
</script>

<template>
  <NavBar />
  <router-view />
  <FooterSection />
  <ScrollToTop />
</template>

<style>
#app {
  max-width: unset;
  margin: 0;
  padding: 0;
  text-align: left;
}
</style>
