const Locator = {
  UserRepository: Symbol.for("UserRepository"),
  CreateUserController: Symbol.for("CreateUserController"),
  CreateUserUseCase: Symbol.for("CreateUserUseCase"),
  UpdateUserUseCase: Symbol.for("UpdateUserUseCase"),
  UpdateUserController: Symbol.for("UpdateUserController"),
  WatchedMovieRepository: Symbol.for("WatchedMovieRepository"),
  GenresRepository: Symbol.for("GenresRepository"),
  ReportUseCase: Symbol.for("ReportUseCase"),
  ReportController: Symbol.for("ReportController"),

};

export { Locator };
