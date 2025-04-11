<script setup lang="ts">
import JokeCollection from '@components/JokeCollection.vue';
import PageHeader from '@/components/PageHeader.vue';
</script>

<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <PageHeader
        title="Your Joke Collection"
        description="View and manage all your saved jokes in one place. Remove jokes you no longer want in your collection."
        icon="mdi:bookmark-multiple"
      />

      <!-- Joke Collection Component -->
      <JokeCollection />
    </div>
  </div>
</template>
