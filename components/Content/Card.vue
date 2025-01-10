<script setup>
import { ref, onMounted, watch } from 'vue';
//import { cardStore } from '@/stores/card.js'

const props = defineProps(['poster']);
const cards = {};

const { poster_path, vote_average, release_date, first_air_date, original_title, name, id } = props.poster;

const image = 'https://image.tmdb.org/t/p/w220_and_h330_face';
const url = ref(`${ image }${ poster_path }`);
const vote = parseInt(vote_average * 10);
const voteAverage = vote === 0 ? 'NR' : vote;
const percentage = vote === 0 ? '' : '%';
const date = convertDate(release_date ?? first_air_date);
const title = original_title ?? name;

const canvas = ref();
const context = ref();
const isCurrentPosterInWishlist = ref(false);

/*watch(() => isCurrentPosterInWishlist.value, () => {
  isCurrentPosterInWishlist.value = isInWishlist();
}, { immediate: true });*/


onMounted(() => {
  context.value = canvas.value?.getContext('2d');

  render();
});

function render() {
  const newContext = context.value;

  if (!context) {
    return;
  }

  newContext.beginPath();
  newContext.arc(19, 19, 16, 0, (2 * Math.PI) * (voteAverage / 100), false);
  newContext.lineWidth = 3;
  newContext.strokeStyle = voteAverage >= 70 ? "green" : "yellow";
  newContext.stroke();
}

function convertDate(dateValue) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
    'November', 'December'];

  const date = new Date(dateValue);
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();

  return `${month} ${day}, ${year}`;
}

/*function addToWishlist() {
  if (!isInWishlist()) {
    cards.addItems(id);
  } else {
    cards.removeItems(id);
  }

  isCurrentPosterInWishlist.value = isInWishlist();
}

function isInWishlist() {
  const favoritedMovies = cards.getItems;

  return favoritedMovies.includes(id);
}*/
</script>

<template>
  <div class="poster-wrapper text-black min-w-[150px] font-sans text-left mb-[50px]">
    <div class="poster-content relative w-[150px]">
      <img class="w-[150px] h-[225px] rounded-lg mb-[25px]" :src="url"/>
      <div fillColor="red" class="vote-percentage mt-[-40px] relative w-[38px] h-[38px] bg-[#081c22] rounded-[50%] text-white flex justify-center items-center">
        <span class="text-[13px] font-bold">{{ voteAverage }}</span>
        <span class="text-[6px] mt-[-5px]">{{ percentage }}</span>
        <canvas ref="canvas" class="percentage-canvas absolute rotate-[270deg]" width="38" height="38"></canvas>
      </div>
      <div class="poster-title text-base font-bold">{{ title }}</div>
      <div class="poster-release-date">{{ date }}</div>
      <div @click="addToWishlist" :class="{ 'favorited': isCurrentPosterInWishlist }" class="poster-star text-[24px] absolute top-0 right-[5px] text-white cursor-pointer">&#9733;</div>
    </div>
  </div>
</template>
