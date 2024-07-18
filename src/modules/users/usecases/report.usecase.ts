import { inject, injectable } from "inversify";
import { IUseCase } from "../../../shared/usecase";
import { Locator } from "../shared/di.enums";
import { IUserRepository } from "../adapters/repositories/interfaces/user-repository.interface";
import { IWatchedMovieRepository } from "../../movies/adapters/repositories/interfaces/watched-movie-repository.interface";
import { IGenresRepository } from "../../genres/adapters/repositories/interfaces/genres-repository.interface";
import { MostWatchedTheme, Report } from "../entities/report.entity";
import { WatchedMovie } from "../../movies/adapters/entities/movie.entity";
import _ from "lodash";

@injectable()
export default class ReportUsecase implements IUseCase<void, Report[]> {
  constructor(
    @inject(Locator.UserRepository) readonly repository: IUserRepository,
    @inject(Locator.WatchedMovieRepository)
    readonly watchedMovieRepository: IWatchedMovieRepository,
    @inject(Locator.GenresRepository)
    readonly genresRepository: IGenresRepository
  ) {}

  async execute(): Promise<Report[]> {
    const users = await this.repository.findAll();

    const promises = users.map(async (user) => {
      const watchedMovies = await this.watchedMovieRepository.findByUserId(
        user.id
      );

      const lastFilmeWatched = watchedMovies[watchedMovies.length - 1];
      const mostWatchedTheme = await this.getMostWatchedTheme(watchedMovies);

      return {
        mostWatchedTheme,
        totalFilmsWatched: watchedMovies.length,
        lastFilmeWatched: {
          movieId: lastFilmeWatched.movie.id,
          movieName: lastFilmeWatched.movie.title,
        },
        userId: user.id,
      } as Report;
    });

    return await Promise.all(promises);
  }

  private async getMostWatchedTheme(
    watchedMovies: WatchedMovie[]
  ): Promise<MostWatchedTheme> {
    const genres = _.flatMap(watchedMovies, (wm) => wm.movie.genres);

    const genresFrequences = _.countBy(genres);
    const genresFrequencesKeys = _.keys(genresFrequences);
    const maxFrequencyKey = _.maxBy(
      genresFrequencesKeys,
      (key) => genresFrequences[key]
    );
    const themeId = Number(maxFrequencyKey);

    const genre = await this.genresRepository.findOne({ externalId: themeId });

    console.log(genresFrequences);
    console.log(genresFrequencesKeys);
    console.log(maxFrequencyKey);

    return {
      themeId,
      totalFilmsWatched: genresFrequences[themeId],
      themeName: genre?.name || "Unknown",
    };
  }
}
