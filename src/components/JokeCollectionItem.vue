<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { Joke } from '@/interfaces/Joke';

// Props
defineProps<{
  joke: Joke;
}>();

// Emits
const emit = defineEmits<{
  (_e: 'remove', id: string): void;
  (_e: 'rate', id: string, rating: number): void;
}>();

// Event handlers
const handleRemove = (id: string) => {
  emit('remove', id);
};

const handleRate = (id: string, rating: number) => {
  emit('rate', id, rating);
};
</script>

<template>
  <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
    <div class="flex sm:flex-row flex-col justify-between">
      <p class="text-gray-700 dark:text-gray-300 font-medium mb-2">
        {{ joke.setup }}
      </p>
      <div class="flex gap-4 mb-2">
        <span class="text-xs font-medium text-indigo-600 dark:text-indigo-300 flex items-center">
          <Icon
            :icon="joke.type === 'programming' ? 'mdi:code-tags' : 'mdi:format-quote-close'"
            class="mr-1"
            width="14"
            height="14"
          />
          {{ joke.type === 'programming' ? 'Programming' : 'Random' }}
        </span>
        <button
          class="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 hover:cursor-pointer"
          aria-label="Remove joke"
          @click="handleRemove(joke.id)"
        >
          <Icon icon="mdi:trash-can-outline" width="16" height="16" />
        </button>
      </div>
    </div>
    <p class="text-gray-900 dark:text-white font-bold mb-4">
      {{ joke.punchline }}
    </p>

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
          class="focus:outline-none mr-1 hover:cursor-pointer"
          :class="{
            'text-yellow-400': star <= (joke.rating || 0),
            'text-gray-300 dark:text-gray-600': star > (joke.rating || 0),
          }"
          :aria-label="`Rate ${star} stars`"
          @click="handleRate(joke.id, star)"
        >
          <Icon icon="mdi:star" width="20" height="20" />
        </button>
      </div>
    </div>
  </div>
</template>
