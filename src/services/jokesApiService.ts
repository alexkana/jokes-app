import { type ApiJoke } from '@interfaces';
import { API_ENDPOINTS } from '@constants';

/**
 * Fetches a random joke of the specified type
 * @param type The type of joke to fetch ('random' or 'programming')
 * @returns Promise with the joke data
 * @throws Error if the API call fails
 */
export async function fetchJoke(type: 'random' | 'programming'): Promise<ApiJoke> {
  const endpoint = type === 'programming' ? API_ENDPOINTS.PROGRAMMING : API_ENDPOINTS.RANDOM;

  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Failed to fetch joke: ${response.status}`);
  }

  const data = await response.json();
  // The API returns an array for programming jokes and a single object for random jokes
  const jokeData = Array.isArray(data) ? data[0] : data;

  if (!jokeData) {
    throw new Error('No joke data received from API');
  }

  return {
    setup: jokeData.setup,
    punchline: jokeData.punchline,
    type,
  };
}
