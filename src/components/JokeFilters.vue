<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { type SortOption, SortOption as SortOptionEnum } from '@interfaces';

defineProps<{
    searchQuery: string;
    minRatingFilter: number;
    sortOption: SortOption;
}>();

const SortOptions = SortOptionEnum;

const emit = defineEmits<{
    (_e: 'update:searchQuery', _query: string): void;
    (_e: 'update:minRatingFilter', _rating: number): void;
    (_e: 'update:sortOption', _option: SortOption): void;
    (_e: 'resetAllFilters'): void;
}>();

const handleSearch = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('update:searchQuery', target.value);
};
const handleMinRatingChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('update:minRatingFilter', Number(target.value));
};

const handleSortOptionChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    emit('update:sortOption', target.value as SortOption);
};

const handleResetFilters = () => {
    emit('resetAllFilters');
};

</script>

<template>
    <div class="mb-6 space-y-4">
      <!-- Search -->
      <div>
        <label
          for="search"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center"
        >
          <Icon icon="mdi:magnify" class="mr-1" width="18" height="18" />
          <span>Search</span>
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search jokes..."
          class="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          :value="searchQuery"
          @input="handleSearch"
          />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Rating filter -->
        <div>
          <label
            for="rating-filter"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center"
          >
            <Icon icon="mdi:star" class="mr-1" width="18" height="18" />
            <span>Minimum Rating</span>
          </label>
          <select
            id="rating-filter"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            :value="minRatingFilter"
            @change="handleMinRatingChange"
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
          <label
            for="sort-option"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center"
          >
            <Icon icon="mdi:sort" class="mr-1" width="18" height="18" />
            <span>Sort By</span>
          </label>
          <select
            id="sort-option"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            :value="sortOption"
            @change="handleSortOptionChange"
          >
            <option :value="SortOptions.NEWEST">Newest First</option>
            <option :value="SortOptions.RATING">Highest Rated</option>
            <option :value="SortOptions.ALPHABETICAL">Alphabetical</option>
          </select>
        </div>
      </div>

      <!-- Reset filters -->
      <div class="flex justify-end">
        <button
          class="text-sm px-3 py-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center hover:cursor-pointer"
          @click="handleResetFilters"
        >
          <Icon icon="mdi:refresh" class="mr-1" width="16" height="16" />
          Reset Filters
        </button>
      </div>
    </div>

    
</template>