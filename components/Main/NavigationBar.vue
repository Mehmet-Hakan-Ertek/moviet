<script setup>
import { ref, watch } from 'vue';
import Dropdown from '../Dropdown/Dropdown.vue';

const config = {
  headerIconURL: 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg'
};

const menuItems = ref([
  {
    name: 'Movies',
    url: '#/movies'
  },
  {
    name: 'TV Shows',
    url: '#/tvshows'
  }
]);

const dropdownMenuItems = ref({
  0: ['Popular', 'Now playing', 'Upcoming', 'Top Rated'],
  1: ['Popular', 'Airing Today', 'On TV', 'Top Rated']
})

const dropdownStatus = ref(null);
const dropdownConfig = ref({});
const clickedMenuItem = ref(null);

watch(() => dropdownStatus.value, () => {
  if (dropdownStatus.value !== null) {
    dropdownConfig.value = dropdownMenuItems.value[dropdownStatus.value];
  }
}, {immediate: true});

const redirectHomePage = () => window.location.href = '/';

const {headerIconURL} = config;
</script>

<template>
  <div class="header w-screen m-auto h-16 bg-[#032541] flex">
    <div class="header-left flex gap-5 items-center justify-center w-6/12 h-full">
      <img class="img h-5 cursor-pointer" :src="headerIconURL" @click="redirectHomePage"/>
      <ul class="menu-item-wrapper flex gap-5" v-for="(item, index) in menuItems" :key="index">
        <li>
          <a
              class="menu-item text-base font-bold cursor-pointer relative"
              :href="item.url"
              @click.prevent="dropdownStatus === index ? dropdownStatus = null : dropdownStatus = index"
              @click="clickedMenuItem = $event.target.innerText.trim()"
          >
            {{ item.name }}
          </a>
          <Dropdown v-if="dropdownStatus === index" :config="dropdownConfig" :clickedItem="clickedMenuItem"/>
        </li>

      </ul>
    </div>
    <div class="header-right w-5/12 h-full"></div>
  </div>
</template>