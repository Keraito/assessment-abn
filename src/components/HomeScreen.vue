<script setup lang="ts">
import { showsStore } from '../utils/shows.store';
import ShowCard from './ShowCard.vue';
</script>

<template>
  <div class="home">
    <div class="show-list" v-for="genre in showsStore.genres.filter((_, index) => index % 4 === 0)">
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

@media (min-width: 1024px) {
  .show-list {
    margin-top: 12px;
  }

  ul {
    padding-right: calc(24px + 20px);
  }
}
</style>
