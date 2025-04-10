import { type Joke, type JokeInput } from '@interfaces';

const STORAGE_KEY = 'savedJokes';

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
  const collection = localStorage.getItem(STORAGE_KEY);
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

  const jokes = getJokes();

  // Check if joke already exists
  if (jokeExists(joke)) {
    return {
      success: false,
      message: 'This joke is already in your collection!',
    };
  }

  // Add the joke
  const newJoke: Joke = {
    id: `joke_${Date.now()}`,
    setup: joke.setup,
    punchline: joke.punchline,
    type: joke.type,
    rating: 0, // Default rating (unrated)
    createdAt: Date.now(), // Timestamp for sorting
  };

  jokes.push(newJoke);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jokes));

  return {
    success: true,
    message: 'Joke saved to your collection!',
  };
}
