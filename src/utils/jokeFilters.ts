import { type Joke, SortOption } from '@interfaces';

// Sorting functions
export const sortByRating = (a: Joke, b: Joke) => (b.rating || 0) - (a.rating || 0);
export const sortByAlphabetical = (a: Joke, b: Joke) => a.setup.localeCompare(b.setup);
export const sortByNewest = (a: Joke, b: Joke) => (b.createdAt || 0) - (a.createdAt || 0);

// Apply sort based on current sort option
export const applySorting = (jokes: Joke[], option: SortOption) => {
  const jokesCopy = [...jokes];

  switch (option) {
    case SortOption.RATING:
      jokesCopy.sort(sortByRating);
      break;
    case SortOption.ALPHABETICAL:
      jokesCopy.sort(sortByAlphabetical);
      break;
    case SortOption.NEWEST:
    default:
      jokesCopy.sort(sortByNewest);
      break;
  }

  return jokesCopy;
};

// Filter functions
export const filterBySearch = (jokes: Joke[], searchTerm: string) => {
  if (!searchTerm.trim()) return jokes;

  const query = searchTerm.toLowerCase();
  return jokes.filter(
    (joke) =>
      joke.setup.toLowerCase().includes(query) || joke.punchline.toLowerCase().includes(query)
  );
};

export const filterByRating = (jokes: Joke[], minRating: number) => {
  if (minRating <= 0) return jokes;

  return jokes.filter((joke) => (joke.rating || 0) >= minRating);
};
