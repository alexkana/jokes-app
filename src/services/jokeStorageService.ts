import { type Joke, type JokeInput } from '@interfaces';
import { STORAGE_KEYS, DEFAULTS } from '@constants';

/**
 * Checks if a joke already exists in storage
 * @param joke The joke to check
 * @returns Whether the joke exists
 */
export function jokeExists(joke: JokeInput): boolean {
  const jokes = getJokes();
  return jokes.some((j) => j.setup === joke.setup && j.punchline === joke.punchline);
}

/**
 * Gets all saved jokes from localStorage
 * @returns Array of saved jokes
 */
export function getJokes(): Joke[] {
  const collection = localStorage.getItem(STORAGE_KEYS.SAVED_JOKES);
  return collection ? JSON.parse(collection) : [];
}

/**
 * Saves a joke to the collection
 * @param joke The joke to save
 * @returns An object with success status and message
 */
export function saveJoke(joke: JokeInput): { success: boolean; message: string } {
  if (!joke) {
    return {
      success: false,
      message: 'No joke to save',
    };
  }

  // Check if joke already exists
  if (jokeExists(joke)) {
    return {
      success: false,
      message: 'This joke is already in your collection!',
    };
  }

  const jokes = getJokes();

  // Add the joke
  const newJoke: Joke = {
    id: `joke_${Date.now()}`,
    setup: joke.setup,
    punchline: joke.punchline,
    type: joke.type,
    rating: DEFAULTS.JOKE_RATING,
    createdAt: Date.now(), // Timestamp for sorting
  };

  jokes.push(newJoke);
  localStorage.setItem(STORAGE_KEYS.SAVED_JOKES, JSON.stringify(jokes));

  return {
    success: true,
    message: 'Joke saved to your collection!',
  };
}

/**
 * Saves the collection of saved jokes to localStorage
 * @param savedJokes The collection of saved jokes
 */
export const saveToLocalStorage = (savedJokes: Joke[]) => {
  localStorage.setItem(STORAGE_KEYS.SAVED_JOKES, JSON.stringify(savedJokes));
};
