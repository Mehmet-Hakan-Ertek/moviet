import { ref, computed, watch } from 'vue';
import { defineStore } from 'pinia';

export const cardStore = defineStore("posters", () => {
    const loadFromLocalStorage = () => {
        const storedItems = localStorage.getItem('movieList');

        return storedItems ? JSON.parse(storedItems) : [];
    };

    const movieList = ref(loadFromLocalStorage());
    const getItems = computed(() => [...movieList.value].sort((a, b) => b.id - a.id));
    const addItems = (item) => !movieList.value.includes(item) && movieList.value.push(item);
    const removeItems = (id) => movieList.value = movieList.value.filter((movie) => movie !== id);

    watch(movieList, (newItems) => {
        localStorage.setItem('movieList', JSON.stringify(newItems));
    }, { deep: true });

    return { movieList, getItems, addItems, removeItems };
});