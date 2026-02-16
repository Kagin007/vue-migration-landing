<script setup>
import NavBar from './components/NavBar.vue'
import FooterSection from './components/FooterSection.vue'
</script>

<template>
  <NavBar />
  <router-view />
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
