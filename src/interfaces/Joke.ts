export interface Joke extends JokeInput {
  id: string;
  rating: number; // 1-5 stars
  createdAt: number; // timestamp for sorting by date
}

export interface JokeInput {
  setup: string;
  punchline: string;
  type: 'random' | 'programming';
}
