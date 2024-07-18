const Locator = {
  WatchedMovieRepository: Symbol.for("WatchedMovieRepository"),
  ListMoviesUseCase: Symbol.for("ListMoviesUseCase"),
  ListMoviesController: Symbol.for("ListMoviesController"),
  GetMoviesExternal: Symbol.for("GetMoviesExternal"),
  SubscriptionRepository: Symbol.for("SubscriptionRepository"),
  GetMovieExternal: Symbol.for("GetMovieExternal"),
  GetAvailableGenresUseCase: Symbol.for("GetAvailableGenresUseCase"),
  SaveWatchedMovieUseCase: Symbol.for("SaveWatchedMovieUseCase"),
  SaveWatchedMovieController: Symbol.for("SaveWatchedMovieController"),
  RemoveWatchedMovieUseCase: Symbol.for("RemoveWatchedMovieUseCase"),
  RemoveWatchedMovieController: Symbol.for("RemoveWatchedMovieController"),
};

export { Locator };
