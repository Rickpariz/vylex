export type Movie = {
  _id?: string;
  externalId: number;
  title: string;
  genres: number[];
};

export type WatchedMovie = {
  _id?: string;
  movie: {
    id: number;
    title: string;
    genres: number[];
  };
  userId: number;
};
