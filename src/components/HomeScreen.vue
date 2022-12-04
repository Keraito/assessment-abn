<script setup lang="ts">
import { ref, watch } from 'vue';
import { showsStore } from '../utils/shows.store';
import ShowCard from './ShowCard.vue';

const activeGenres = ref<string[]>(showsStore.genres.filter((_, index) => index % 4 === 0));

function toggleActiveGenre(genre: string) {
  activeGenres.value = activeGenres.value.includes(genre) ? activeGenres.value.filter(activeGenre => activeGenre !== genre) : [...activeGenres.value, genre].sort();
}

watch(() => showsStore.genres, (newGenres, oldGenres) => {
  if (newGenres.length !== oldGenres.length) {
    activeGenres.value = newGenres.filter((_, index) => index % 4 === 0)
  }
})
</script>

<template>
  <div class="home">
    <div class="genres-list">
      <span v-for="genre in showsStore.genres" class="genres-list-entry"
        :class="{ 'checked': activeGenres.includes(genre) }" @click="toggleActiveGenre(genre)">{{ genre }}</span>
    </div>
    <div class="show-list" v-for="genre in activeGenres">
      <h2>{{ genre }}</h2>
      <ul>
        <ShowCard
          v-for="show in showsStore.shows.filter(show => show.genres.includes(genre)).sort((a, b) => b.rating.average - a.rating.average)"
          :coverImageSrc="show.image?.medium" :title="show.name" :show="show" />
      </ul>
    </div>
  </div>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 8px 0;
  display: flex;
  gap: 24px;
  overflow-x: auto;
  padding-right: 0px;
}

.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
}

.genres-list {
  overflow: scroll;
  display: flex;
  gap: 12px;
  /* flex-wrap: wrap; */
  align-items: center;
}

.genres-list-entry {
  border: 1px solid var(--secondary-color);
  padding: 0.2rem 0.75rem;
  border-radius: 40px;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease-out;
}

.genres-list-entry.checked {
  border-color: var(--main-color);
  background-color: var(--main-color);
  color: white;
}

@media (min-width: 1024px) {
  .show-list {
    margin-top: 12px;
  }

  ul {
    padding-right: calc(24px + 20px);
  }

  .genres-list {
    gap: 16px;
    padding-right: calc(24px + 20px);
    flex-wrap: wrap;
  }

  .genres-list-entry {
    border: 1px solid var(--secondary-color);
    padding: 0.2rem 0.75rem;
    border-radius: 40px;
    cursor: pointer;
    transition: all 0.2s ease-out;
  }

  .genres-list-entry.checked {
    border-color: var(--main-color);
    background-color: var(--main-color);
    color: white;
  }

  .genres-list-entry:hover {
    border-color: var(--main-color);
    color: var(--main-color);
    background-color: white;
  }
}
</style>
