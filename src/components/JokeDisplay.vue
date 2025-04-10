<script setup lang="ts">
import { onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import { useJoke } from '@composables/useJoke';

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
  <div
    class="max-w-md mx-auto dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden md:max-w-2xl p-6"
  >
    <div class="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-6">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
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
        @click="toggleJokeType"
      >
        <Icon
          :icon="jokeType === 'programming' ? 'mdi:emoticon' : 'mdi:code-tags'"
          class="mr-1"
          width="20"
          height="20"
        />
        Switch to {{ jokeType === 'programming' ? 'Random' : 'Programming' }}
      </button>
    </div>

    <!-- Save message -->
    <div
      v-if="saveMessage"
      class="mb-4 p-3 rounded-md flex items-center"
      :class="{
        'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100':
          saveMessage.type === 'success',
        'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100':
          saveMessage.type === 'info',
      }"
    >
      <Icon
        :icon="saveMessage.type === 'success' ? 'mdi:check-circle' : 'mdi:information'"
        class="mr-2"
        width="20"
        height="20"
      />
      {{ saveMessage.text }}
    </div>

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
    <div
      v-else-if="error"
      class="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 p-4 rounded-md flex flex-col items-center"
    >
      <div class="flex items-center gap-2">
        <Icon icon="mdi:alert" width="24" height="24" />
        <p class="font-bold">{{ error }}</p>
      </div>
      <button
        class="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
        @click="getJoke"
      >
        <Icon icon="mdi:refresh" class="mr-1" width="16" height="16" />
        <span class="font-bold">Try Again</span>
      </button>
    </div>

    <!-- Joke display -->
    <div v-else-if="joke" class="space-y-6">
      <!-- Setup -->
      <div class="text-lg text-gray-700 dark:text-gray-300">
        <p class="font-medium">{{ joke.setup }}</p>
      </div>

      <!-- Punchline (hidden initially) -->
      <div
        v-if="isPunchlineRevealed"
        class="text-lg text-gray-900 dark:text-white font-bold transition-all duration-500 ease-in-out p-3 rounded-md"
        :class="{
          'opacity-100 bg-yellow-50 dark:bg-gray-700 shadow-sm': isPunchlineRevealed,
          'opacity-0': !isPunchlineRevealed,
        }"
      >
        <p class="relative break-words">
          {{ displayedPunchline
          }}<span
            v-if="isTypingPunchline"
            class="inline-block h-5 w-0.5 bg-indigo-500 dark:bg-indigo-400 ml-0.5 animate-pulse align-middle"
          ></span>
        </p>
      </div>

      <!-- Controls -->
      <div class="flex justify-center pt-4">
        <button
          v-if="!isPunchlineRevealed"
          class="w-full sm:w-auto font-bold cursor-pointer px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-center sm:justify-start"
          @click="revealPunchline"
        >
          <Icon icon="mdi:eye" class="mr-1" width="20" height="20" />
          Reveal Punchline
        </button>
        <div
          v-else-if="!isTypingPunchline"
          class="flex flex-col sm:flex-row sm:space-x-3 sm:space-y-0 space-y-3 transition-opacity duration-500 ease-in-out"
          :class="{ 'opacity-100': !isTypingPunchline, 'opacity-0': isTypingPunchline }"
        >
          <button
            class="font-bold cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
            @click="getJoke"
          >
            <Icon icon="mdi:refresh" class="mr-1" width="20" height="20" />
            Get Another Joke
          </button>
          <button
            class="font-bold cursor-pointer px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 flex items-center justify-center"
            @click="saveJoke"
          >
            <Icon icon="mdi:content-save" class="mr-1" width="20" height="20" />
            Save Joke
          </button>
        </div>
        <div
          v-else
          class="flex justify-center items-center h-10 text-gray-500 dark:text-gray-400 italic transition-opacity duration-300 ease-in-out opacity-70"
        >
          <Icon icon="mdi:loading" class="mr-1 animate-spin" width="20" height="20" />
          <span>Finishing up...</span>
        </div>
      </div>
    </div>
  </div>
</template>
