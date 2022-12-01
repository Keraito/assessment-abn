<script setup lang="ts">
const props = defineProps<{
  coverImageSrc: string
  title: string;
}>()
</script>


<template>
  <li class="container">
    <img :src="coverImageSrc" />
    <h3>{{ title }}</h3>
  </li>
</template>

<style>
.container {
  transition: all 0.3s ease-out;
  box-shadow: rgba(242, 248, 249, 0.4) 0px 1px 8px;
  top: 0px;
  position: relative;
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