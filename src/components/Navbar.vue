<script setup lang="ts">
import { ref, computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { Icon } from '@iconify/vue';

const route = useRoute();
const isMenuOpen = ref(false);

// Compute active page based on current route meta
const activePage = computed(() => {
  return route.meta.title as string || '';
});
</script>

<template>
  <nav class="bg-white dark:bg-gray-800 shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <RouterLink
              to="/"
              class="text-xl font-bold text-gray-900 dark:text-white flex items-center"
            >
              <Icon icon="mdi:emoticon-cool" class="mr-2" width="28" height="28" />
              Jokes App
            </RouterLink>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <RouterLink
              to="/"
              class="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              :class="[
                activePage === 'Home' ? 
                'border-indigo-500 text-indigo-700 dark:text-indigo-100 font-medium' : 
                'border-transparent'
              ]"
            >
              <Icon icon="mdi:home" class="mr-1" width="18" height="18" />
              Home
            </RouterLink>
            <RouterLink
              to="/collection"
              class="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              :class="[
                activePage === 'Collection' ? 
                'border-indigo-500 text-indigo-700 dark:text-indigo-100 font-medium' : 
                'border-transparent'
              ]"
            >
              <Icon icon="mdi:bookmark-multiple" class="mr-1" width="18" height="18" />
              Collection
            </RouterLink>
            <RouterLink
              to="/about"
              class="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              :class="[
                activePage === 'About' ? 
                'border-indigo-500 text-indigo-700 dark:text-indigo-100 font-medium' : 
                'border-transparent'
              ]"
            >
              <Icon icon="mdi:information" class="mr-1" width="18" height="18" />
              About
            </RouterLink>
          </div>
        </div>
        <div class="sm:hidden flex items-center">
          <button
            type="button"
            class="bg-white dark:bg-gray-800 p-1 rounded-md text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            @click="isMenuOpen = !isMenuOpen"
          >
            <span class="sr-only">Open menu</span>
            <Icon icon="mdi:menu" width="24" height="24" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div
      class="sm:hidden"
      :class="{ block: isMenuOpen, hidden: !isMenuOpen }"
    >
      <div class="pt-2 pb-3 space-y-1">
        <RouterLink
          to="/"
          class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium flex items-center"
          :class="[
            activePage === 'Home' ? 
            'bg-indigo-50 dark:bg-indigo-900 border-indigo-500 text-indigo-700 dark:text-indigo-100' : 
            'border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
          ]"
        >
          <Icon icon="mdi:home" class="mr-2" width="20" height="20" />
          Home
        </RouterLink>
        <RouterLink
          to="/collection"
          class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium flex items-center"
          :class="[
            activePage === 'Collection' ? 
            'bg-indigo-50 dark:bg-indigo-900 border-indigo-500 text-indigo-700 dark:text-indigo-100' : 
            'border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
          ]"
        >
          <Icon icon="mdi:bookmark-multiple" class="mr-2" width="20" height="20" />
          Collection
        </RouterLink>
        <RouterLink
          to="/about"
          class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium flex items-center"
          :class="[
            activePage === 'About' ? 
            'bg-indigo-50 dark:bg-indigo-900 border-indigo-500 text-indigo-700 dark:text-indigo-100' : 
            'border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
          ]"
        >
          <Icon icon="mdi:information" class="mr-2" width="20" height="20" />
          About
        </RouterLink>
      </div>
    </div>
  </nav>
</template> 