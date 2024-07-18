import { inject, injectable } from "inversify";
import { IUseCase } from "../../../shared/usecase";
import { Locator } from "../shared/di.enums";
import { IExternal } from "../../../shared/external";
import logger from "../../../shared/logger";
import { IGenresRepository } from "../adapters/repositories/interfaces/genres-repository.interface";
import { IMapper } from "../../../shared/adapters/mappers/interface";
import { Genre, GenreExternal } from "../entities/genre.entity";

@injectable()
export default class ExtractGenresUseCase implements IUseCase<void, void> {
  constructor(
    @inject(Locator.GenresMongoRepository)
    readonly repository: IGenresRepository,
    @inject(Locator.GetGenresExternal)
    readonly getGenresExternal: IExternal<void, GenreExternal[]>,
    @inject(Locator.MapGenresExternalToGenreEntityMapper)
    readonly mapper: IMapper<GenreExternal, Genre>
  ) {}

  async execute(): Promise<void> {
    logger.info("Checking if genres already exists...");
    const exists = await this.repository.exists();

    if (exists) {
      logger.info("Genres already loaded!");
      return;
    }

    logger.info("Integration with TheMovieApi to get genres...");
    const genres = await this.getGenresExternal.call();
    const genresMapped = this.mapper.mapMany(genres);
    await this.repository.createMany(genresMapped);
    logger.info("Genres loaded!");
  }
}
