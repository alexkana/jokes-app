import { ref, computed, type Ref } from 'vue';
import { type Joke, SortOption } from '@interfaces';
import { filterBySearch, filterByRating, applySorting } from '@utils/jokeFilters';

export function useJokeFilters(jokes: Ref<Joke[]>) {
  // Filter state
  const searchQuery = ref('');
  const minRatingFilter = ref(0);
  const sortOption = ref<SortOption>(SortOption.NEWEST);

  // Filtered and sorted jokes
  const filteredJokes = computed(() => {
    let result = [...jokes.value];

    // Apply filters using utility functions
    result = filterBySearch(result, searchQuery.value);
    result = filterByRating(result, minRatingFilter.value);
    result = applySorting(result, sortOption.value);

    return result;
  });

  // Reset all filters
  const resetFilters = () => {
    searchQuery.value = '';
    minRatingFilter.value = 0;
    sortOption.value = SortOption.NEWEST;
  };

  return {
    // State
    searchQuery,
    minRatingFilter,
    sortOption,

    // Computed
    filteredJokes,

    // Methods
    resetFilters,
  };
}
