<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { getMovieById } from '../../mixins/MovieData';

const imagePrefix = 'https://image.tmdb.org/t/p/w220_and_h330_face';

const canvasElement = ref();
const context = ref();
const movie = ref([]);
const loading = ref(false);
const posterURL = ref('');
const voteAverage = ref('');
const votePercentage = ref('');

onMounted(() => {
  context.value = canvasElement.value?.getContext('2d');

  fetchData()
});

function render() {
  const ctx = context.value;
  const vote = parseInt(movie?.value?.vote_average * 10);
  const voteAverage = vote === 0 ? 'NR' : vote;

  voteAverage.value = voteAverage;
  votePercentage.value = '%';

  if (!ctx) return;

  ctx.beginPath();
  ctx.arc(19, 19, 16, 0, (2 * Math.PI) * (voteAverage / 100), false);
  ctx.lineWidth = 3;
  ctx.strokeStyle = voteAverage >= 70 ? "green" : "yellow";
  ctx.stroke();
}

async function fetchData() {
  const url = window.location.href;
  const movieId = url.split('-').slice(-1)[0];

  loading.value = true;

  try {
    movie.value = await getMovieById(movieId);
    posterURL.value = `${ imagePrefix }${ movie.value.poster_path }`;

    render()
  } catch (error) {
    error.value = error.toString();
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="w-full border-b pl-[30px] pt-[3px] pb-[3px] text-left">
    <div class="movie-detail-container font-black text-black flex flex-row" v-if="movie">
      <div class="movie-poster min-w-[200px] mr-[40px] flex flex-col items-center relative">
        <img :src="posterURL" alt="Movie Poster" />
        <div fillColor="red" class="vote-percentage absolute mt-[-40px] bottom-0 right-0 w-[38px] h-[38px] bg-[#081c22] rounded-[50%] text-white flex justify-center items-center">
          <span class="text-[13px] font-bold">{{ voteAverage }}</span>
          <span class="text-[6px] mt-[-5px]">{{ votePercentage }}</span>
          <canvas ref="canvasElement" class="percentage-canvas absolute rotate-[270deg]" width="38" height="38"></canvas>
        </div>
      </div>
      <div class="movie-info">
        <h1>{{ movie.title }}</h1>
        <p class="tagline">{{ movie.tagline }}</p>
        <p class="overview mb-4 mt-4">{{ movie.overview }}</p>
        <ul class="details-list font-[600]">
          <li><strong>Genres:</strong> {{ movie?.genres?.map(genre => genre.name).join(', ') }}</li>
          <li><strong>Release Date:</strong> {{ movie.release_date }}</li>
          <li><strong>Runtime:</strong> {{ movie.runtime }}</li>
          <li><strong>Vote Average:</strong> {{ movie.vote_average }}</li>
          <li><strong>Budget:</strong> {{ movie.budget }}</li>
          <li><strong>Revenue:</strong> {{ movie.revenue }}</li>
          <li><strong>Homepage:</strong> <a class="underline" :href="movie.homepage" target="_blank">{{ movie.homepage }}</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>