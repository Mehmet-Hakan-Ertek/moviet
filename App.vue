<script setup>
import { ref, computed } from 'vue';
import Main from './views/Main.vue';
import Movies from './views/Movies.vue';
import Details from './views/Details.vue';

const routes = {
  '/': Main,
  '/movies': Main,
  '/movies/tv-shows/:algorithm': Movies,
  '/movies/movies/:algorithm': Movies,
  '/movies/movie-details/:movie': Details
}

const currentPath = ref(window.location.hash);

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash;
});

const currentView = computed(() => {
  if (currentPath.value.includes('/movies/')) {
    return routes['/movies/movies/:algorithm']
  } else if (currentPath.value.includes('/tv-shows/')) {
    return routes['/movies/tv-shows/:algorithm']
  } else if (currentPath.value.includes('/movie-details/')) {
    return routes['/movies/movie-details/:movie']
  }

  return routes[currentPath.value.slice(1) || '/']
})
</script>

<template>
  <component :is="currentView" />
</template>