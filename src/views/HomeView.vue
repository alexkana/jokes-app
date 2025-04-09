<script setup lang="ts">
import JokeDisplay from '../components/JokeDisplay.vue'
import { Icon } from '@iconify/vue'
</script>

<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <Icon icon="mdi:emoticon-happy" class="mr-2" width="32" height="32" />
        Welcome to Jokes App
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-300 mb-8 flex items-center">
        <Icon icon="mdi:lightbulb-on" class="mr-2 flex-shrink-0" width="24" height="24" />
        Discover random and programming jokes with our joke discovery tool. Click "Reveal Punchline"
        to see the punchline!
      </p>

      <!-- Joke Discovery Component -->
      <JokeDisplay />

      <div class="mt-8 text-center">
        <p class="text-gray-600 dark:text-gray-400 mb-3 flex items-center justify-center">
          <Icon icon="mdi:heart" class="mr-2" width="20" height="20" />
          Found a joke you love?
        </p>
        <router-link
          to="/collection"
          class="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <Icon icon="mdi:bookmark-multiple" class="mr-2" width="20" height="20" />
          View Your Collection
        </router-link>
      </div>
    </div>
  </div>
</template>
