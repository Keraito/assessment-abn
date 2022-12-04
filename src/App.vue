<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { fetchShows } from './utils/api';
import { showsStore, type Show } from './utils/shows.store';

onMounted(() => {
  fetchShows().then((data: Show[]) => {
    showsStore.shows = data
    showsStore.genres = Array.from(new Set<string>(data.map(show => show.genres).flat())).sort();
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
  border-top: 1px solid var(--color-border);

  grid-area: nav;

  display: flex;
  flex-direction: column;
  justify-content: center;
}

nav {
  width: 100%;
  font-size: 1rem;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
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
}

nav a:first-of-type {
  border: 0;
}

.content {
  grid-area: content;
  max-width: 100vw;
  height: calc(100vh - 57px);
  padding: 2rem;
  overflow: scroll;
}

@media (min-width: 1024px) {
  header {
    place-items: center;
    border-top: none;
    border-right: 1px solid var(--color-border);
  }

  nav {
    text-align: left;
    flex-direction: column;
  }

  nav a {
    border-top: 1px solid var(--color-border);
  }

  .content {
    max-width: none;
    overflow: auto;
    padding: 2rem 0;
    height: 100vh;
    overflow-y: scroll
  }
}
</style>
