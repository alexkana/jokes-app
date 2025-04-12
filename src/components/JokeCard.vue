<script setup lang="ts">
import { onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import { useJoke } from '@composables/useJoke';
import InfoMessage from '@components/InfoMessage.vue';
import type { Message } from '@interfaces';

// Use the joke composable
const {
  joke,
  isLoading,
  error,
  isPunchlineRevealed,
  jokeType,
  saveMessage,
  displayedPunchline,
  isTypingPunchline,
  isCurrentJokeSaved,
  getJoke,
  toggleJokeType,
  revealPunchline,
  saveJoke,
} = useJoke();

// Initial joke fetch
onMounted(() => {
  getJoke();
});
</script>

<template>
  <div class="max-w-md mx-auto bg-gray-800 rounded-xl shadow-xl overflow-hidden md:max-w-2xl p-0">
    <!-- Header with lighter background -->
    <div class="bg-gray-700 p-4 sm:p-6 rounded-t-xl">
      <div class="flex flex-col-reverse sm:flex-row justify-between items-center gap-2 sm:gap-4">
        <h2 class="text-lg sm:text-xl font-semibold text-white flex items-center mt-2 sm:mt-0">
          <Icon
            :icon="jokeType === 'programming' ? 'mdi:code-tags' : 'mdi:emoticon'"
            class="mr-2"
            width="24"
            height="24"
          />
          {{ jokeType === 'programming' ? 'Programming' : 'Random' }} Joke
        </h2>

        <button
          class="w-auto text-sm sm:text-base font-bold cursor-pointer px-3 py-1.5 sm:px-4 sm:py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center justify-center"
          aria-label="Switch joke type"
          :disabled="isLoading"
          :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
          @click="toggleJokeType"
        >
          <Icon
            :icon="jokeType === 'programming' ? 'mdi:emoticon' : 'mdi:code-tags'"
            class="mr-1"
            width="20"
            height="20"
          />
          Switch type
        </button>
      </div>
    </div>

    <!-- Content area -->
    <div class="p-6">
      <!-- Save message -->
      <InfoMessage v-if="saveMessage" :message="saveMessage" />

      <!-- Loading state -->
      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <Icon
          icon="mdi:loading"
          class="animate-spin h-12 w-12 text-indigo-500"
          width="48"
          height="48"
        />
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="flex flex-col items-center">
        <InfoMessage :message="{ text: error, type: 'error' } as Message" />
        <button
          class="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
          aria-label="Try again"
          @click="getJoke"
        >
          <Icon icon="mdi:refresh" class="mr-1" width="16" height="16" />
          <span class="font-bold">Try Again</span>
        </button>
      </div>

      <!-- Joke display -->
      <div v-else-if="joke" class="space-y-6">
        <!-- Setup -->
        <div class="text-base sm:text-lg text-gray-300">
          <p class="font-medium text-center sm:text-left">
            {{ joke.setup }}
          </p>
        </div>

        <!-- Punchline (hidden initially) -->
        <div
          v-if="isPunchlineRevealed"
          class="text-base sm:text-lg text-white font-bold transition-all duration-500 ease-in-out p-3 rounded-md"
          :class="{
            'opacity-100 bg-gray-700 shadow-sm': isPunchlineRevealed,
            'opacity-0': !isPunchlineRevealed,
          }"
        >
          <p class="relative break-words text-center sm:text-left">
            {{ displayedPunchline
            }}<span
              v-if="isTypingPunchline"
              class="inline-block h-5 w-0.5 bg-indigo-400 ml-0.5 animate-pulse align-middle"
            ></span>
          </p>
        </div>

        <!-- Controls -->
        <div class="flex justify-center sm:pt-4 pt-2">
          <button
            v-if="!isPunchlineRevealed"
            class="w-auto text-sm sm:text-base font-bold cursor-pointer px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 flex items-center justify-center gap-2"
            aria-label="Reveal punchline"
            @click="revealPunchline"
          >
            <Icon icon="mdi:emoticon-excited" width="20" height="20" />
            Show Me!
          </button>
          <div
            v-else-if="!isTypingPunchline"
            class="flex flex-col sm:flex-row sm:space-x-3 sm:space-y-0 space-y-3 transition-opacity duration-500 ease-in-out"
            :class="{ 'opacity-100': !isTypingPunchline, 'opacity-0': isTypingPunchline }"
          >
            <button
              class="text-sm sm:text-base font-bold cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
              aria-label="Get another joke"
              @click="getJoke"
            >
              <Icon icon="mdi:refresh" class="mr-1" width="20" height="20" />
              Get Another Joke
            </button>
            <button
              class="text-sm sm:text-base font-bold px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 flex items-center justify-center"
              :class="{
                'cursor-pointer': !isCurrentJokeSaved,
                'cursor-not-allowed': isCurrentJokeSaved,
              }"
              aria-label="Save joke to collection"
              :disabled="isCurrentJokeSaved"
              @click="!isCurrentJokeSaved && saveJoke()"
            >
              <Icon
                :icon="isCurrentJokeSaved ? 'mdi:check-circle' : 'mdi:bookmark'"
                class="mr-1"
                width="20"
                height="20"
              />
              {{ isCurrentJokeSaved ? 'Joke Saved' : 'Save Joke' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
