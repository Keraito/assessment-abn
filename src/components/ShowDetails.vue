<script lang="ts" setup>
import { fetchShowCover } from '../utils/api';
import { onMounted, ref } from 'vue';

const props = defineProps<{
  id: number;
  name: string;
  language: string;
  genres: string[];
  rating: { average: number };
  premiered: string;
  image: {
    medium: string;
    orginal: string;
  };
  summary: string;
  onClose: () => void;
}>();
const imageCoverSrc = ref<string | undefined>(undefined);

onMounted(() => {
  fetchShowCover(props.id).then(url => imageCoverSrc.value = url)
})
</script>

<template>
  <section class="container">
    <button class="back-button" @click="$emit('closeDetails')">⬅ Back</button>
    <div class="cover-image">
      <img :src="imageCoverSrc" />
    </div>
    <h2>
      {{ name }}
    </h2>
    <div v-html="summary" />
    <div class="info-section">
      <div>
        <span>⭐️</span>
        <span class="info-value">{{ rating.average }} / 10</span>
      </div>
      <div>
        <span>🌍</span>
        <span class="info-value">{{ language }}</span>
      </div>
      <div>
        <span>📆</span>
        <span class="info-value">{{ premiered }}</span>
      </div>
      <div>
        <span>📖</span>
        <span class="info-value">{{ genres.join(", ") }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.container {
  margin: 0 auto;
  width: 600px;
}

.cover-image {
  width: 100%;
  height: 250px;
  margin-top: 24px;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
  border: black solid 1px;
}

h2 {
  font-weight: 600;
  font-size: 36px;
  margin-top: 24px;
}

.info-section {
  margin-top: 24px;
  display: flex;
  gap: 24px;
}

.info-value {
  margin-left: 8px;
}

.back-button {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
}
</style>