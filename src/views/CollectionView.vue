<script setup lang="ts">
import JokeCollection from '@components/JokeCollection.vue';
import { Icon } from '@iconify/vue';
</script>

<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <Icon icon="mdi:bookmark-multiple" class="mr-2" width="32" height="32" />
        Your Joke Collection
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-300 mb-8 flex items-center">
        <Icon icon="mdi:information-outline" class="mr-2 flex-shrink-0" width="24" height="24" />
        View and manage all your saved jokes in one place. Remove jokes you no longer want in your
        collection.
      </p>

      <!-- Joke Collection Component -->
      <JokeCollection />
    </div>
  </div>
</template>
