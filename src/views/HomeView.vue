<script setup lang="ts">
import JokeCard from '@components/JokeCard.vue';
import PageHeader from '@components/PageHeader.vue';
import { Icon } from '@iconify/vue';
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <PageHeader
        title="Welcome to Jokes App"
        description="Discover random and programming jokes with our joke discovery tool. Click 'Reveal Punchline' to see the punchline!"
        icon="mdi:emoticon-cool"
        descriptionIcon="mdi:lightbulb-on"
      />

      <!-- Joke Discovery Component -->
      <JokeCard />

      <div class="mt-8 text-center">
        <p class="text-sm sm:text-base text-gray-400 mb-3 flex items-center justify-center">
          <Icon icon="mdi:heart" class="mr-2" width="20" height="20" />
          Found a joke you love?
        </p>
        <RouterLink
          to="/collection"
          class="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <Icon icon="mdi:bookmark-multiple" class="mr-2" width="20" height="20" />
          View Your Collection
        </RouterLink>
      </div>
    </div>
  </div>
</template>
