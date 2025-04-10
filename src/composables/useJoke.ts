import { ref, watch } from 'vue';
import { type JokeInput } from '@interfaces';
import { fetchJoke } from '@services/jokesService';
import { saveJoke as saveJokeToStorage } from '@services/jokeStorageService';
import { useTextAnimation } from './useTextAnimation';
import { ANIMATION } from '@constants';

export function useJoke() {
  // State variables
  const joke = ref<JokeInput | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const isPunchlineRevealed = ref(false);
  const jokeType = ref<'random' | 'programming'>('random');
  const saveMessage = ref<{ type: 'success' | 'info'; text: string } | null>(null);
  const isCurrentJokeSaved = ref(false);

  // Use the text animation composable
  const {
    displayedText: displayedPunchline,
    isTyping: isTypingPunchline,
    animateTyping,
  } = useTextAnimation();

  // Watch for punchline reveal to animate the punchline text
  watch(
    () => isPunchlineRevealed.value,
    (revealed) => {
      if (revealed && joke.value && joke.value.punchline) {
        animateTyping(joke.value.punchline);
      }
    }
  );

  // Get a new joke using the service
  const getJoke = async () => {
    isLoading.value = true;
    error.value = null;
    isPunchlineRevealed.value = false;
    saveMessage.value = null;
    isCurrentJokeSaved.value = false;

    try {
      joke.value = await fetchJoke(jokeType.value);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch joke';
      joke.value = null;
    } finally {
      isLoading.value = false;
    }
  };

  // Toggle between joke types
  const toggleJokeType = () => {
    jokeType.value = jokeType.value === 'random' ? 'programming' : 'random';
    getJoke();
  };

  // Reveal punchline with animation
  const revealPunchline = () => {
    isPunchlineRevealed.value = true;
  };

  // Save current joke to collection
  const saveJoke = () => {
    if (!joke.value) return;

    const result = saveJokeToStorage(joke.value);
    isCurrentJokeSaved.value = result.success;

    saveMessage.value = {
      type: result.success ? 'success' : 'info',
      text: result.message,
    };

    // Clear message after a delay
    setTimeout(() => {
      saveMessage.value = null;
    }, ANIMATION.FADE_DURATION * 6); // 3 seconds
  };

  return {
    // State
    joke,
    isLoading,
    error,
    isPunchlineRevealed,
    jokeType,
    saveMessage,
    displayedPunchline,
    isTypingPunchline,
    isCurrentJokeSaved,

    // Methods
    getJoke,
    toggleJokeType,
    revealPunchline,
    saveJoke,
  };
}
