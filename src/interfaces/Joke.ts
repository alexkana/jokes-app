export interface ApiJoke {
  setup: string;
  punchline: string;
  type: 'random' | 'programming';
}

export interface Joke extends ApiJoke {
  id: string;
  rating: number; // 1-5 stars
  createdAt: number; // timestamp for sorting by date
}
