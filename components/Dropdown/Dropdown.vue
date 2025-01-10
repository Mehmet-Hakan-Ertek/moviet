<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  config: {
    type: Array,
    required: true
  },
  clickedItem: {
    type: String,
    required: true
  }
});

function navigateUser(event) {
  const urlDefinitions = {
    'TV Shows': 'tv-shows',
    'Movies': 'movies'
  }

  document.location.href = `#movies/${ urlDefinitions[props.clickedItem] }/${ event.target.innerText.trim() }`;
}
</script>

<template>
  <div class="p-[20px] bg-white rounded-xl drop-shadow-xl absolute flex flex-col gap-[10px] z-50">
    <div v-for="(item, index) in config" :key="index" class="dropdown-item text-black cursor-pointer" @click="navigateUser($event)">
      {{ item }}
    </div>
  </div>
</template>