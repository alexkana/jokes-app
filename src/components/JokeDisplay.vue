<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Joke, JokeInput } from '../interfaces/Joke';
import { Icon } from '@iconify/vue';

// State variables
const joke = ref<JokeInput | null>(null);
const isLoading = ref(false);
const error = ref<string | null>(null);
const isPunchlineRevealed = ref(false);
const jokeType = ref<'random' | 'programming'>('random');
const saveMessage = ref<{ type: 'success' | 'info'; text: string } | null>(null);

// Animation state for punchline only
const displayedPunchline = ref('');
const isTypingPunchline = ref(false);
const typingSpeed = 30; // ms per character

// Type animation for punchline
const typePunchline = (text: string) => {
  if (!text) return;
  
  isTypingPunchline.value = true;
  displayedPunchline.value = '';
  
  // Add a small delay before starting the typing animation
  setTimeout(() => {
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < text.length) {
        displayedPunchline.value += text.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
        // Add a slight delay before showing the action buttons
        setTimeout(() => {
          isTypingPunchline.value = false;
        }, 300);
      }
    }, typingSpeed);
  }, 500); // 500ms delay before typing starts
};

// Watch for punchline reveal to animate the punchline text
watch(() => isPunchlineRevealed.value, (revealed) => {
  if (revealed && joke.value && joke.value.punchline) {
    typePunchline(joke.value.punchline);
  }
});

// Fetch a joke based on the selected type
const fetchJoke = async () => {
  isLoading.value = true;
  error.value = null;
  isPunchlineRevealed.value = false;
  saveMessage.value = null;
  displayedPunchline.value = '';
  
  try {
    const endpoint = jokeType.value === 'programming'
      ? 'https://official-joke-api.appspot.com/jokes/programming/random'
      : 'https://official-joke-api.appspot.com/jokes/random';
    
    const response = await fetch(endpoint);
    
    if (!response.ok) {
      error.value = `Failed to fetch joke: ${response.status}`;
      return;
    }
    
    const data = await response.json();
    // The API returns an array for programming jokes and a single object for random jokes
    const jokeData = Array.isArray(data) ? data[0] : data;
    joke.value = {
      setup: jokeData.setup,
      punchline: jokeData.punchline,
      type: jokeType.value
    };
  } catch (err) {
    console.error('Error fetching joke:', err);
    error.value = err instanceof Error ? err.message : 'Failed to fetch joke';
    joke.value = null;
  } finally {
    isLoading.value = false;
  }
};

// Toggle between joke types
const toggleJokeType = () => {
  jokeType.value = jokeType.value === 'random' ? 'programming' : 'random';
  fetchJoke();
};

// Reveal punchline with animation
const revealPunchline = () => {
  isPunchlineRevealed.value = true;
};

// Fetch a new joke
const getNewJoke = () => {
  fetchJoke();
};

// Save current joke to collection
const saveJoke = () => {
  if (!joke.value) return;
  
  // Check if we have a joke collection component defined by parent
  const collection = localStorage.getItem('savedJokes');
  let saved = collection ? JSON.parse(collection) : [];
  
  // Check if joke already exists
  const exists = saved.some((j: Joke) => 
    j.setup === joke.value?.setup && 
    j.punchline === joke.value?.punchline
  );
  
  if (exists) {
    saveMessage.value = { 
      type: 'info', 
      text: 'This joke is already in your collection!' 
    };
    return;
  }
  
  // Add the joke
  const newJoke: Joke = {
    id: `joke_${Date.now()}`,
    setup: joke.value.setup,
    punchline: joke.value.punchline,
    type: jokeType.value,
    rating: 0, // Default rating (unrated)
    createdAt: Date.now() // Timestamp for sorting
  };
  
  saved.push(newJoke);
  localStorage.setItem('savedJokes', JSON.stringify(saved));
  
  saveMessage.value = { 
    type: 'success', 
    text: 'Joke saved to your collection!' 
  };
  
  // Clear message after 3 seconds
  setTimeout(() => {
    saveMessage.value = null;
  }, 3000);
};

// Initial joke fetch
onMounted(() => {
  fetchJoke();
});
</script>

<template>
  <div class="max-w-md mx-auto dark:bg-gray-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
    <div class="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-6">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
        <Icon :icon="jokeType === 'programming' ? 'mdi:code-tags' : 'mdi:emoticon'" class="mr-2" width="24" height="24" />
        {{ jokeType === 'programming' ? 'Programming' : 'Random' }} Joke
      </h2>
      <button 
        @click="toggleJokeType" 
        class="w-full sm:w-auto font-bold cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center justify-center"
      >
        <Icon :icon="jokeType === 'programming' ? 'mdi:emoticon' : 'mdi:code-tags'" class="mr-1" width="20" height="20" />
        Switch to {{ jokeType === 'programming' ? 'Random' : 'Programming' }} Jokes
      </button>
    </div>

    <!-- Save message -->
    <div v-if="saveMessage" 
      class="mb-4 p-3 rounded-md flex items-center"
      :class="{
        'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100': saveMessage.type === 'success',
        'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100': saveMessage.type === 'info'
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
      <Icon icon="mdi:loading" class="animate-spin h-12 w-12 text-indigo-500" width="48" height="48" />
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 p-4 rounded-md flex flex-col items-center">
      <Icon icon="mdi:alert-circle" class="mb-2" width="32" height="32" />
      <p>{{ error }}</p>
      <button 
        @click="fetchJoke" 
        class="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
      >
        <Icon icon="mdi:refresh" class="mr-1" width="16" height="16" />
        Try Again
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
          'opacity-0': !isPunchlineRevealed 
        }"
      >
        <p class="relative flex items-center">
          <span>{{ displayedPunchline }}</span>
          <span 
            v-if="isTypingPunchline" 
            class="inline-block h-5 w-0.5 bg-indigo-500 dark:bg-indigo-400 ml-0.5 animate-pulse"
          ></span>
        </p>
      </div>

      <!-- Controls -->
      <div class="flex justify-center pt-4">
        <button 
          v-if="!isPunchlineRevealed" 
          @click="revealPunchline" 
          class="w-full sm:w-auto font-bold cursor-pointer px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-center sm:justify-start"
        >
          <Icon icon="mdi:eye" class="mr-1" width="20" height="20" />
          Reveal Punchline
        </button>
        <div v-else-if="!isTypingPunchline" class="flex flex-col sm:flex-row sm:space-x-3 sm:space-y-0 space-y-3 transition-opacity duration-500 ease-in-out" :class="{'opacity-100': !isTypingPunchline, 'opacity-0': isTypingPunchline}">
          <button 
            @click="getNewJoke" 
            class="font-bold cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
          >
            <Icon icon="mdi:refresh" class="mr-1" width="20" height="20" />
            Get Another Joke
          </button>
          <button 
            @click="saveJoke" 
            class="font-bold cursor-pointer px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 flex items-center justify-center"
          >
            <Icon icon="mdi:content-save" class="mr-1" width="20" height="20" />
            Save Joke
          </button>
        </div>
        <div v-else class="flex justify-center items-center h-10 text-gray-500 dark:text-gray-400 italic transition-opacity duration-300 ease-in-out opacity-70">
          <Icon icon="mdi:loading" class="mr-1 animate-spin" width="20" height="20" />
          <span>Finishing up...</span>
        </div>
      </div>
    </div>
  </div>
</template> 