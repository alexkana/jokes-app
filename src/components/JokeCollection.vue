<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { Joke, SortOption } from '../interfaces';
import { Icon } from '@iconify/vue';

// State for saved jokes collection
const savedJokes = ref<Joke[]>([]);
const isEmpty = computed(() => savedJokes.value.length === 0);

// Search and filter state
const searchQuery = ref('');
const minRatingFilter = ref(0);
const sortOption = ref<SortOption>(SortOption.NEWEST);

// Statistics
const totalJokes = computed(() => savedJokes.value.length);
const averageRating = computed(() => {
  const ratedJokes = savedJokes.value.filter(joke => joke.rating && joke.rating > 0);
  if (ratedJokes.length === 0) return 0;
  
  const sum = ratedJokes.reduce((total, joke) => total + (joke.rating || 0), 0);
  return (sum / ratedJokes.length).toFixed(1);
});

// Sorting functions
const sortByRating = (a: Joke, b: Joke) => (b.rating || 0) - (a.rating || 0);
const sortByAlphabetical = (a: Joke, b: Joke) => a.setup.localeCompare(b.setup);
const sortByNewest = (a: Joke, b: Joke) => (b.createdAt || 0) - (a.createdAt || 0);

// Apply sort based on current sort option
const applySorting = (jokes: Joke[], option: SortOption) => {
  const jokesCopy = [...jokes];
  
  switch (option) {
    case SortOption.RATING:
      jokesCopy.sort(sortByRating);
      break;
    case SortOption.ALPHABETICAL:
      jokesCopy.sort(sortByAlphabetical);
      break;
    case SortOption.NEWEST:
    default:
      jokesCopy.sort(sortByNewest);
      break;
  }
  
  return jokesCopy;
};

// Filter functions
const filterBySearch = (jokes: Joke[], searchTerm: string) => {
  if (!searchTerm.trim()) return jokes;
  
  const query = searchTerm.toLowerCase();
  return jokes.filter(joke => 
    joke.setup.toLowerCase().includes(query) || 
    joke.punchline.toLowerCase().includes(query)
  );
};

const filterByRating = (jokes: Joke[], minRating: number) => {
  if (minRating <= 0) return jokes;
  
  return jokes.filter(joke => (joke.rating || 0) >= minRating);
};

// Filtered and sorted jokes
const filteredJokes = computed(() => {
  let result = [...savedJokes.value];
  
  // Apply filters
  result = filterBySearch(result, searchQuery.value);
  result = filterByRating(result, minRatingFilter.value);
  
  // Apply sorting
  result = applySorting(result, sortOption.value);
  
  return result;
});

// Load saved jokes from localStorage on component mount
onMounted(() => {
  const saved = localStorage.getItem('savedJokes');
  if (saved) {
    try {
      savedJokes.value = JSON.parse(saved);
      // Ensure all jokes have a rating property
      savedJokes.value = savedJokes.value.map(joke => ({
        ...joke,
        rating: joke.rating || 0,
        createdAt: joke.createdAt || Date.now()
      }));
      saveToLocalStorage();
    } catch (err) {
      console.error('Failed to parse saved jokes:', err);
    }
  }
});

// Save jokes to localStorage whenever collection changes
const saveToLocalStorage = () => {
  localStorage.setItem('savedJokes', JSON.stringify(savedJokes.value));
};

// Remove a joke from the collection
const removeJoke = (jokeId: string) => {
  savedJokes.value = savedJokes.value.filter(joke => joke.id !== jokeId);
  saveToLocalStorage();
};

// Rate a joke
const rateJoke = (jokeId: string, rating: number) => {
  const jokeIndex = savedJokes.value.findIndex(joke => joke.id === jokeId);
  if (jokeIndex !== -1) {
    savedJokes.value[jokeIndex] = {
      ...savedJokes.value[jokeIndex],
      rating
    };
    saveToLocalStorage();
  }
};

// Reset all filters
const resetFilters = () => {
  searchQuery.value = '';
  minRatingFilter.value = 0;
  sortOption.value = SortOption.NEWEST;
};

// Method to be exposed to parent components
const addJoke = (joke: Omit<Joke, 'id'>) => {
  // Generate a unique ID using timestamp
  const id = `joke_${Date.now()}`;
  const newJoke: Joke = { 
    ...joke, 
    id,
    rating: 0,
    createdAt: Date.now()
  };
  
  // Check if joke already exists (based on setup and punchline)
  const exists = savedJokes.value.some(
    existingJoke => 
      existingJoke.setup === joke.setup && 
      existingJoke.punchline === joke.punchline
  );
  
  if (!exists) {
    savedJokes.value.push(newJoke);
    saveToLocalStorage();
    return true;
  }
  
  return false;
};

// Expose methods to parent components
defineExpose({
  addJoke
});
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mt-8">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
        <Icon icon="mdi:emoticon" class="mr-2" width="24" height="24" />
        Your Saved Jokes
      </h2>
      
      <!-- Collection statistics -->
      <div class="text-right text-sm text-gray-500 dark:text-gray-400">
        <p class="flex items-center justify-end">
          <Icon icon="mdi:counter" class="mr-1" width="16" height="16" />
          Total jokes: <span class="font-medium ml-1">{{ totalJokes }}</span>
        </p>
        <p v-if="averageRating > 0" class="flex items-center justify-end">
          <Icon icon="mdi:star-half-full" class="mr-1" width="16" height="16" />
          Average rating: <span class="font-medium ml-1">{{ averageRating }} ★</span>
        </p>
      </div>
    </div>
    
    <!-- Search and filters -->
    <div class="mb-6 space-y-4" v-if="!isEmpty">
      <!-- Search -->
      <div>
        <label for="search" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
          <Icon icon="mdi:magnify" class="mr-1" width="18" height="18" />
          <span>Search</span>
        </label>
        <input
          type="text"
          id="search"
          v-model="searchQuery"
          placeholder="Search jokes..."
          class="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Rating filter -->
        <div>
          <label for="rating-filter" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
            <Icon icon="mdi:star" class="mr-1" width="18" height="18" />
            <span>Minimum Rating</span>
          </label>
          <select
            id="rating-filter"
            v-model="minRatingFilter"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="0">All Ratings</option>
            <option value="1">★ and above</option>
            <option value="2">★★ and above</option>
            <option value="3">★★★ and above</option>
            <option value="4">★★★★ and above</option>
            <option value="5">★★★★★ only</option>
          </select>
        </div>
        
        <!-- Sort options -->
        <div>
          <label for="sort-option" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
            <Icon icon="mdi:sort" class="mr-1" width="18" height="18" />
            <span>Sort By</span>
          </label>
          <select
            id="sort-option"
            v-model="sortOption"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option :value="SortOption.NEWEST">Newest First</option>
            <option :value="SortOption.RATING">Highest Rated</option>
            <option :value="SortOption.ALPHABETICAL">Alphabetical</option>
          </select>
        </div>
      </div>
      
      <!-- Reset filters -->
      <div class="flex justify-end">
        <button
          @click="resetFilters"
          class="text-sm px-3 py-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center"
        >
          <Icon icon="mdi:refresh" class="mr-1" width="16" height="16" />
          Reset Filters
        </button>
      </div>
    </div>
    
    <!-- Empty state -->
    <div v-if="isEmpty" class="py-4 text-center text-gray-500 dark:text-gray-400">
      <Icon icon="mdi:emoticon-sad-outline" class="mx-auto mb-2" width="48" height="48" />
      <p>You haven't saved any jokes yet. Use the "Save Joke" button when viewing jokes you like.</p>
    </div>
    
    <!-- No results after filtering -->
    <div v-else-if="filteredJokes.length === 0" class="py-4 text-center text-gray-500 dark:text-gray-400">
      <Icon icon="mdi:magnify-empty" class="mx-auto mb-2" width="48" height="48" />
      <p>No jokes match your search criteria. Try adjusting your filters.</p>
      <button
        @click="resetFilters"
        class="mt-2 px-4 py-2 text-indigo-600 font-medium dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center justify-center mx-auto"
      >
        <Icon icon="mdi:refresh" class="mr-1" width="16" height="16" />
        Reset Filters
      </button>
    </div>
    
    <!-- Jokes list -->
    <div v-else class="space-y-4">
      <div v-for="joke in filteredJokes" :key="joke.id" class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg relative">
        <span class="text-xs font-medium text-indigo-600 dark:text-indigo-300 absolute top-2 right-10 flex items-center">
          <Icon :icon="joke.type === 'programming' ? 'mdi:code-tags' : 'mdi:format-quote-close'" class="mr-1" width="14" height="14" />
          {{ joke.type === 'programming' ? 'Programming' : 'Random' }}
        </span>
        <button 
          @click="removeJoke(joke.id)" 
          class="absolute top-2 right-2 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
          aria-label="Remove joke"
        >
          <Icon icon="mdi:trash-can-outline" width="16" height="16" />
        </button>
        
        <p class="text-gray-700 dark:text-gray-300 font-medium mb-2">{{ joke.setup }}</p>
        <p class="text-gray-900 dark:text-white font-bold mb-4">{{ joke.punchline }}</p>
        
        <!-- Rating stars -->
        <div class="flex items-center mt-2">
          <span class="text-sm text-gray-600 dark:text-gray-400 mr-2 flex items-center">
            <Icon icon="mdi:star" class="mr-1" width="16" height="16" />
            Rating:
          </span>
          <div class="flex">
            <button 
              v-for="star in 5" 
              :key="star" 
              @click="rateJoke(joke.id, star)"
              class="focus:outline-none mr-1"
              :class="{
                'text-yellow-400': star <= (joke.rating || 0),
                'text-gray-300 dark:text-gray-600': star > (joke.rating || 0)
              }"
              :aria-label="`Rate ${star} stars`"
            >
              <Icon icon="mdi:star" width="20" height="20" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 