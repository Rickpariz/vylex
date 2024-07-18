const Locator = {
  GetGenresExternal: Symbol.for("GetGenresExternal"),
  ExtractGenresUseCase: Symbol.for("ExtractGenresUseCase"),
  ExtractGenresController: Symbol.for("ExtractGenresController"),
  GenresMongoRepository: Symbol.for("GenresMongoRepository"),
  MapGenresExternalToGenreEntityMapper: Symbol.for(
    "MapGenresExternalToGenreEntityMapper"
  ),
  ListGenresUseCase: Symbol.for("ListGenresUseCase"),
  ListGenresController: Symbol.for("ListGenresController"),
};

export { Locator };
