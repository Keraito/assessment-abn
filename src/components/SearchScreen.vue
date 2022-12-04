<script setup lang="ts">
import { ref, watch } from 'vue';
import debounce from 'lodash/debounce';
import type { Show } from '../utils/shows.store';
import { searchShow } from '../utils/api';
import ShowCard from './ShowCard.vue';
import IconSearch from './icons/IconSearch.vue';

const query = ref(undefined);
const shows = ref<Show[]>([]);

watch(query, debounce(async (newQuery, oldQuery) => {
  if (oldQuery !== newQuery) {
    shows.value = (await searchShow(newQuery)).map(searchResult => searchResult.show);
  }
}, 300))
</script>

<template>
  <section>
    <div class="search-wrapper">
      <input type="text" placeholder="Search..." v-model="query" />
      <IconSearch class="search-icon" />
    </div>
    <ul>
      <ShowCard v-for="show in shows" :coverImageSrc="show.image?.medium" :title="show.name" :show="show" />
    </ul>
  </section>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 8px 0;
  gap: 24px;

  margin-top: 24px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 150px);

  justify-content: center;
}

.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
}

.search-wrapper {
  border: var(--main-color) 1px solid;
  height: 50px;
  padding: 5px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.search-wrapper>input[type=text] {
  border: none;
  font-size: 18px;
  padding: 5px 0 5px 10px;
  width: 100%;
}

.search-wrapper>input[type=text],
.search-wrapper>input[type=text]::placeholder {
  color: var(--main-color)
}

.search-wrapper {
  border-radius: 40px;
}

.search-icon {
  height: 100%;
  color: var(--main-color);
}
</style>