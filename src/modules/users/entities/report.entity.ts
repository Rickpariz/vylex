export type Report = {
  userId: number;
  totalFilmsWatched: number;
  mostWatchedTheme: MostWatchedTheme;
  lastFilmeWatched: {
    movieId: number;
    movieName: string;
  };
};

export type MostWatchedTheme = {
  themeId: number;
  themeName: string;
  totalFilmsWatched: number;
};
