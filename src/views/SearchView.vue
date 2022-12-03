<script setup lang="ts">
import SearchScreen from '@/components/SearchScreen.vue';
</script>

<template>
  <main>
    <SearchScreen />
  </main>
</template>

<style scoped>
@media (min-width: 1024px) {
  main {
    padding: 0 calc(var(--section-gap) / 2)
  }
}
</style>