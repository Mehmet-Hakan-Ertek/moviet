<script setup>
import { ref, onMounted, watch } from 'vue'
import { getMovieByTypeAndAlgorithm } from '../mixins/MovieData'
import MoviePoster from '../components/Content/Card'
import Header from '../components/Main/NavigationBar'
import throttle from "lodash/throttle";

const options = [
  'rating descending',
  'rating ascending',
  'popularity ascending',
  'popularity descending',
  'title (a-z)'
]
const genres = {
  'action': 28,
  'adventure': 12,
  'animation': 16,
  'comedy': 35,
  'crime': 80,
  'documentary': 99,
  'drama': 18,
  'family': 10751,
  'fantasy': 14,
  'history': 36,
  'horror': 27,
  'music': 10402,
  'mystery': 9648,
  'romance': 10749,
  'science fiction': 878,
  'tv movie': 10770,
  'thriller': 53,
  'war': 10752,
  'western': 37,
}

const selectedGenres = ref([]);
const selectedOption = ref(null);
const loading = ref(false);
const movies = ref(null);
const error = ref(null);
const userVoteCountFilter = ref(0)

window.addEventListener('hashchange', () => fetchData())

onMounted(() => fetchData());

watch(selectedOption, sortMovies);
watch(userVoteCountFilter, throttle(() => filterByVotes(), 400));

async function fetchData() {
  const url = window.location.href;
  const params = url.split('/').slice(4);
  const movieType = params[0];
  const algorithm = params[1];

  error.value = movies.value = null;
  loading.value = true;

  try {
    movies.value = await getMovieByTypeAndAlgorithm(movieType, algorithm);
  } catch (err) {
    error.value = err.toString();
  } finally {
    loading.value = false;
  }
}

function sortMovies() {
  switch (selectedOption.value) {
    case 'popularity ascending':
      movies.value.results = [...movies.value.results].sort((a, b) => a.popularity - b.popularity);
      break;
    case 'popularity descending':
      movies.value.results = [...movies.value.results].sort((a, b) => b.popularity - a.popularity);
      break;
    case 'rating ascending':
      movies.value.results = [...movies.value.results].sort((a, b) => a.vote_average - b.vote_average);
      break;
    case 'rating descending':
      movies.value.results = [...movies.value.results].sort((a, b) => b.vote_average - a.vote_average);
      break;
    case 'title (a-z)':
      movies.value.results = [...movies.value.results].sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      break;
  }
}

function toggleGenre(genre) {
  if (selectedGenres.value.includes(genre)) {
    selectedGenres.value = selectedGenres.value.filter(movie => movie !== genre);
  } else {
    selectedGenres.value.push(genre);
  }

  filterByGenre();
}

function filterByGenre() {
  if (selectedGenres.value.length === 0) {
    fetchData();
  }

  const selectedGenreIds = selectedGenres.value.map(genre => genres[genre]);

  if (movies.value) {
    movies.value.results = movies.value?.results.filter(movie => {
          return movie.genre_ids.some(id => selectedGenreIds.includes(id))
        }
    );
  }
}

function filterByVotes() {
  if (movies.value) {
    movies.value.results = movies.value?.results.filter(movie => movie.vote_count >= userVoteCountFilter.value);
  }
}
</script>

<template>
  <div class="bg-white w-screen min-h-screen">
    <Header />
    <div class="flex w-full h-full">
      <div class="w-[400px] bg-slate-100 min-h-screen flex flex-col gap-[10px] items-center pt-[20px]">
        <div class="sort-wrapper w-[90%] rounded border-black border-2 text-black bg-white p-[10px]">
          <label for="options">Sort Results By</label>
          <select class="bg-white border-black border-[1px] rounded" v-model="selectedOption" id="options">
            <option v-for="option in options" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
        <div class="filter-wrapper w-[90%] rounded border-black border-2 text-black bg-white p-[10px]">
          <div class="genres-title">Genres</div>
          <div class="genres-wrapper flex flex-wrap gap-[7px]">
            <div
                v-for="(id, genre) in genres"
                :key="id"
                @click="toggleGenre(genre)"
                :class="['genre-badge', selectedGenres.includes(genre) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black']"
                class="cursor-pointer rounded-full px-[5px]"
            >
              {{ genre }}
            </div>
          </div>
        </div>
        <div class="range-inputs-wrapper w-[90%] rounded border-black border-2 text-black bg-white p-[10px]">
          <label for="user-votes">Minimum User Votes</label>
          <input
              type="range"
              id="user-votes"
              name="user-votes"
              min="0"
              max="500"
              v-model="userVoteCountFilter"
          >
          <div class="vote-count">{{ userVoteCountFilter }}</div>
        </div>
      </div>
      <div class="w-[100%] h-full flex flex-wrap gap-[25px] p-[30px]">
        <MoviePoster v-for="poster in movies?.results" :key="poster.id" :poster="poster"/>
      </div>
    </div>
  </div>
</template>