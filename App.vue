<script setup>
import { ref, computed } from 'vue';
import Main from './views/Main.vue';


const routes = {
  '': Main,
  '/movies': Main,
}

const currentPath = ref(window.location.hash);

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash;
});

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || ''];
});
</script>

<template>
  <component :is="currentView" />
</template>