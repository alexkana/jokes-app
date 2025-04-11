<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { type Joke } from '@interfaces';

// Props
defineProps<{
  joke: Joke;
}>();

// Emits
const emit = defineEmits<{
  (_e: 'remove', _jokeId: string): void;
  (_e: 'rate', _id: string, _rating: number): void;
}>();

// Event handlers
const handleRemove = (jokeId: string) => {
  emit('remove', jokeId);
};

const handleRate = (id: string, rating: number) => {
  emit('rate', id, rating);
};
</script>

<template>
  <div class="bg-gray-700 p-4 rounded-lg h-[180px] sm:h-auto flex flex-col justify-between">
    <div class="flex flex-col-reverse sm:flex-row justify-between">
      <!-- Joke setup -->
      <p class="text-sm sm:text-base text-gray-300 font-medium mb-2 line-clamp-2 sm:line-clamp-none">
        {{ joke.setup }}
      </p>
      <div class="flex gap-4 mb-2">
        <span class="text-xs font-medium text-indigo-300 flex items-center">
          <Icon
            :icon="joke.type === 'programming' ? 'mdi:code-tags' : 'mdi:emoticon-outline'"
            class="mr-1"
            width="14"
            height="14"
          />
          {{ joke.type === 'programming' ? 'Programming' : 'Random' }}
        </span>
        <button
          class="text-gray-500 hover:text-red-400 hover:cursor-pointer"
          aria-label="Remove joke"
          @click="handleRemove(joke.id)"
        >
          <Icon icon="mdi:trash-can-outline" width="16" height="16" />
        </button>
      </div>
    </div>
    <p class="text-sm sm:text-base text-white font-bold mb-4">
      {{ joke.punchline }}
    </p>

    <!-- Rating stars -->
    <div class="flex items-center mt-1">
      <span class="text-sm text-gray-400 mr-2 flex items-center">
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
            'text-gray-600': star > (joke.rating || 0),
          }"
          :aria-label="`Rate ${star} stars`"
          @click="handleRate(joke.id, star)"
        >
          <Icon icon="mdi:star" class="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  </div>
</template>
