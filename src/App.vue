<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { fetchShows } from './utils/api';
import { showsStore, type Show } from './utils/shows.store';

onMounted(() => {
  fetchShows().then((data: Show[]) => {
    showsStore.shows = data
    showsStore.genres = Array.from(new Set(data.map(show => show.genres).flat()));
  })
});
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/search">Search</RouterLink>
    </nav>
  </header>

  <section class="content">
    <RouterView />
  </section>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  padding: 0 20px;
  border-right: 1px solid var(--color-border);
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 1rem 1rem;
  border-top: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }

  nav {
    text-align: left;
    font-size: 1rem;
  }

  .content {
    padding: 2rem 0;
    height: 100vh;
    overflow-y: scroll
  }
}
</style>
