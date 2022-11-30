<script setup lang="ts">
const props = defineProps<{
  coverImageSrc: string
  genres: string[]
}>()
</script>


<template>
  <li class="container">
    <img :src="coverImageSrc" />
  </li>
</template>

<style>
.container {
  transition: all 0.3s ease-out;
  box-shadow: rgba(242, 248, 249, 0.4) 0px 1px 8px;
  top: 0px;
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
</style>