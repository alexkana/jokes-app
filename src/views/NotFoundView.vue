<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <div class="mb-8">
          <Icon
            icon="mdi:emoticon-confused"
            class="mx-auto text-indigo-500"
            width="120"
            height="120"
          />
        </div>
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">404 - Page Not Found</h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <router-link
          to="/"
          class="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <Icon icon="mdi:home" class="mr-2" width="20" height="20" />
          Return to Home
        </router-link>
      </div>
    </div>
  </div>
</template>
