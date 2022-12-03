<script setup lang="ts">
import HomeScreen from '../components/HomeScreen.vue'
</script>

<template>
  <main>
    <HomeScreen />
  </main>
</template>

<style scoped>
@media (min-width: 1024px) {
  main {
    padding-left: calc(var(--section-gap) / 2)
  }
}
</style>