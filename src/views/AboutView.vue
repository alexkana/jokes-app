<script setup lang="ts">
import MainLayout from '../layouts/MainLayout.vue';

const title = 'About Us'
</script>

<template>
  <MainLayout>
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">{{ title }}</h1>
      <p class="text-gray-600 dark:text-gray-300">
        This is the about page content that will be rendered inside the main layout.
      </p>
    </div>
  </MainLayout>
</template> 