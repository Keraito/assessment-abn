<script setup lang="ts">
import { showsStore } from '../utils/shows.store';
import ShowCard from './ShowCard.vue';
</script>

<template>
  <div class="home">
    <div class="show-list" v-for="genre in showsStore.genres.filter((_, index) => index % 4 === 0)">
      <h2>{{ genre }}</h2>
      <ul>
        <ShowCard v-for="show in showsStore.shows.filter(show => show.genres.includes(genre))"
          :coverImageSrc="show.image?.medium" />
      </ul>
    </div>
    <!-- <ul>

      <li v-for="item in showsStore.shows">
        {{ JSON.stringify(item) }}
      </li>
    </ul> -->
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .home {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  ul {
    list-style: none;
    padding: 8px 0;
    display: flex;
    gap: 24px;
    max-width: calc(1280px - 50px - var(--section-gap) / 2);
    overflow-x: auto;
  }

  .show-list {
    margin-top: 12px;
  }
}
</style>
