<script setup lang="ts">
import { computed, ref } from 'vue';
import { showsStore, type Show } from '../utils/shows.store';
import ShowCard from './ShowCard.vue';
import ShowDetails from './ShowDetails.vue';

const selectedShowId = ref<number | null>(null);

function selectShow(id: number) {
  if (selectedShowId.value !== id) {
    selectedShowId.value = id;
  }
}

function clearShow() {
  selectedShowId.value = null
}

const selectedShow = computed<Show | null>(() => showsStore.shows.find(show => show.id === selectedShowId.value) ?? null);
</script>

<template>
  <div class="home">
    <ShowDetails v-if="selectedShow" v-bind="selectedShow" @close-details="clearShow" />
    <div v-else class="show-list" v-for="genre in showsStore.genres.filter((_, index) => index % 7 === 0)">
      <h2>{{ genre }}</h2>
      <ul>
        <ShowCard v-for="show in showsStore.shows.filter(show => show.genres.includes(genre))"
          :coverImageSrc="show.image.medium" :title="show.name" @click="selectShow(show.id)" />
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
