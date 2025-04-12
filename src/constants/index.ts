/**
 * Application-wide constants
 */

// API endpoints
export const API_ENDPOINTS = {
  RANDOM: 'https://official-joke-api.appspot.com/jokes/random',
  PROGRAMMING: 'https://official-joke-api.appspot.com/jokes/programming/random',
};

// Local storage keys
export const STORAGE_KEYS = {
  SAVED_JOKES: 'savedJokes',
};

// Default values
export const DEFAULTS = {
  JOKE_RATING: 0,
};

// Animation timings (in ms)
export const ANIMATION = {
  TYPING_SPEED: 25,
  FADE_DURATION: 500,
};

// Delay timings (in ms)
export const DELAY = {
  CLEAR_MESSAGE: 3000,
};

// Pagination constants
export const PAGINATION = {
  DEFAULT_ITEMS_PER_PAGE: 5,
  DEFAULT_VISIBLE_PAGES: 5,
  DEFAULT_INITIAL_PAGE: 1,
};
