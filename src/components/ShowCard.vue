<script setup lang="ts">
import { ref } from 'vue';
import Modal from './Modal.vue';
import ShowDetails from './ShowDetails.vue';
import type { Show } from '../utils/shows.store';

const props = defineProps<{
  coverImageSrc: string
  title: string;
  show: Show;
}>()

const shouldShowDetails = ref(false);

function openShowDetails() {
  shouldShowDetails.value = true;
}

function closeShowDetails() {
  shouldShowDetails.value = false;
}
</script>


<template>
  <li class="container" @click="openShowDetails">
    <img :src="coverImageSrc" />
    <h3>{{ title }}</h3>
  </li>
  <Modal :isOpen="shouldShowDetails">
    <template #content>
      <ShowDetails v-if="shouldShowDetails" v-bind="show" @close-details="closeShowDetails" />
    </template>
  </Modal>
</template>

<style scoped>
.container {
  transition: all 0.3s ease-out;
  box-shadow: rgba(242, 248, 249, 0.4) 0px 1px 8px;
  top: 0px;
  position: relative;
  cursor: pointer;
}

.container:hover {
  box-shadow: rgba(0, 0, 0, 0.6) 1px 1px 6px;
  top: -5px;
}

li,
img {
  width: 150px;
  height: 225px;
  border-radius: 5px;
}

img {
  object-fit: cover;
}

h3 {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

  color: white;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
  padding: 0.25rem 0.5rem;

  background: linear-gradient(0deg, rgba(2, 0, 36, 1) 30%, rgba(255, 255, 255, 0) 100%);
}
</style>