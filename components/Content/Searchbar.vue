<script setup>
import SearchResult from "@/components/Content/SearchResult.vue";
import { onBeforeUnmount, ref, watch } from "vue";
import { search } from "@/mixins/MovieData.js";
import debounce from "lodash.debounce";

const searchBarInputPlaceholder = 'Search for a movie, tv show, person...';

const inputValue = ref('');
const searchResults = ref([]);

const debouncedCallback = debounce(async () => {
  if (inputValue.value.length > 3) {
    const response = await search(inputValue.value);

    searchResults.value = response.results;
  } else if (inputValue.value.length === 0) {
    searchResults.value = [];
  }
}, 500);

watch(inputValue, debouncedCallback);

onBeforeUnmount(() => {
  debouncedCallback.cancel();
})
</script>

<template>
  <div class="w-full">
    <input v-model="inputValue" class="shadow appearance-none rounded-3xl w-full h-[46px] bg-white py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" :placeholder="searchBarInputPlaceholder">
    <div class="search-results-wrapper w-full bg-[#fff] absolute z-10 rounded-3xl mt-[10px] shadow-xl overflow-hidden">
      <SearchResult v-if="searchResults.length > 0" v-for="searchedItem in searchResults" :key="searchedItem.id" :searchedItem="searchedItem"/>
    </div>
  </div>
</template>
