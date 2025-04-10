<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { type Joke } from '@interfaces';
import { Icon } from '@iconify/vue';
import JokeCollectionItem from '@components/JokeCollectionItem.vue';
import JokeFilters from '@components/JokeFilters.vue';
import { useJokeFilters } from '@composables/useJokeFilters';
import { STORAGE_KEYS } from '@/constants';
import { saveToLocalStorage } from '@services/jokeStorageService';

// State for saved jokes collection
const savedJokes = ref<Joke[]>([]);
const isEmpty = computed(() => savedJokes.value.length === 0);

// Use the filters composable
const { searchQuery, minRatingFilter, sortOption, filteredJokes, resetFilters } =
  useJokeFilters(savedJokes);

// Statistics
const totalJokes = computed(() => savedJokes.value.length);
const averageRating = computed(() => {
  const ratedJokes = savedJokes.value.filter((joke) => {
    return joke.rating && joke.rating > 0;
  });
  if (ratedJokes.length === 0) return 0;

  const sum = ratedJokes.reduce((total, joke) => total + (joke.rating || 0), 0);
  return (sum / ratedJokes.length).toFixed(1);
});

// Rate a joke
const rateJoke = (jokeId: string, rating: number) => {
  const jokeIndex = savedJokes.value.findIndex((joke) => joke.id === jokeId);
  if (jokeIndex !== -1) {
    savedJokes.value[jokeIndex] = {
      ...savedJokes.value[jokeIndex],
      rating,
    };
    saveToLocalStorage(savedJokes.value);
  }
};

// Remove a joke
const removeJoke = (jokeId: string) => {
  savedJokes.value = savedJokes.value.filter((joke) => joke.id !== jokeId);
  saveToLocalStorage(savedJokes.value);
};

// Load saved jokes from localStorage on component mount
onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEYS.SAVED_JOKES);
  if (saved) {
    try {
      savedJokes.value = JSON.parse(saved);
    } catch (err) {
      console.error('Failed to parse saved jokes:', err);
    }
  }
});
</script>

<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mt-8 max-w-full mx-auto"
  >
    <div class="flex sm:flex-row flex-col space-y-3 sm:space-y-0 justify-between items-center mb-6">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
        <Icon icon="mdi:emoticon" class="mr-2" width="24" height="24" />
        Your Saved Jokes
      </h2>

      <!-- Collection statistics -->
      <div class="text-right text-sm text-gray-500 dark:text-gray-400">
        <p class="flex items-center justify-center sm:justify-end">
          <Icon icon="mdi:format-list-numbered" class="mr-1" width="16" height="16" />
          Total jokes: <span class="font-medium ml-1">{{ totalJokes }}</span>
        </p>
        <p v-if="averageRating > 0" class="flex items-center justify-center sm:justify-end">
          <Icon icon="mdi:star-half-full" class="mr-1" width="16" height="16" />
          Average rating:
          <span class="font-medium ml-1">{{ averageRating }} ★</span>
        </p>
      </div>
    </div>

    <!-- Search and filters -->
    <JokeFilters
      v-if="!isEmpty"
      v-model:searchQuery="searchQuery"
      v-model:minRatingFilter="minRatingFilter"
      v-model:sortOption="sortOption"
      @resetAllFilters="resetFilters"
    />

    <!-- Empty state -->
    <div v-if="isEmpty" class="py-4 text-center text-gray-500 dark:text-gray-400">
      <Icon icon="mdi:emoticon-sad-outline" class="mx-auto mb-2" width="48" height="48" />
      <p>
        You haven't saved any jokes yet. Use the "Save Joke" button when viewing jokes you like.
      </p>
    </div>

    <!-- No results after filtering -->
    <div
      v-else-if="filteredJokes.length === 0"
      class="py-4 text-center text-gray-500 dark:text-gray-400"
    >
      <Icon icon="mdi:magnify-empty" class="mx-auto mb-2" width="48" height="48" />
      <p>No jokes match your search criteria. Try adjusting your filters.</p>
      <button
        class="mt-2 px-4 py-2 text-indigo-600 font-medium dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center justify-center mx-auto"
        @click="resetFilters"
      >
        <Icon icon="mdi:refresh" class="mr-1" width="16" height="16" />
        Reset Filters
      </button>
    </div>

    <!-- Jokes list -->
    <div v-else class="space-y-4">
      <JokeCollectionItem
        v-for="joke in filteredJokes"
        :key="joke.id"
        :joke="joke"
        @remove="removeJoke(joke.id)"
        @rate="rateJoke"
      />
    </div>
  </div>
</template>
