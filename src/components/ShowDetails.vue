<script lang="ts" setup>
import { fetchShowCover } from '../utils/api';
import { onMounted, onUnmounted, ref } from 'vue';

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
}>();
const emit = defineEmits<{ (e: 'closeDetails'): void }>();

const imageCoverSrc = ref<string | undefined>(undefined);
const detailsRef = ref<HTMLElement | null>(null);

function clickHandler(ev: MouseEvent) {
  if (detailsRef.value && !detailsRef.value.contains(ev.target as HTMLElement)) {
    emit('closeDetails')
  }
}

onMounted(() => {
  window.addEventListener('mousedown', clickHandler);
  fetchShowCover(props.id).then(url => imageCoverSrc.value = url)
})

onUnmounted(() => {
  window.removeEventListener('mousedown', clickHandler);
})
</script>

<template>
  <section class="show-details-container" ref="detailsRef">
    <button class="back-button" @click="$emit('closeDetails')">⬅ Back</button>
    <div class="cover-image">
      <img v-if='imageCoverSrc' :src="imageCoverSrc" />
      <div v-else class="image-placeholder" />
    </div>
    <h2>
      {{ name }}
    </h2>
    <div v-html="summary" />
    <div class="info-section">
      <div>
        <span>⭐️</span>
        <span class="info-value">{{ rating.average ?? '??' }} / 10</span>
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
        <span class="info-value">{{ genres.length > 0 ? genres.join(", ") : "Unspecified" }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.show-details-container {
  margin: 0 auto;
  width: 660px;
  padding: 30px;
}

.cover-image {
  width: 100%;
  height: 250px;
  margin-top: 24px;
}

img,
.image-placeholder {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
  border: black solid 1px;
}

.image-placeholder {
  background-color: lightgray;
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