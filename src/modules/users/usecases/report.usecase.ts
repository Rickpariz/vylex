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

      if (!watchedMovies.length) return null;

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

    const reports = await Promise.all(promises);

    return reports.filter((r) => r !== null) as Report[];
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

    return {
      themeId,
      totalFilmsWatched: genresFrequences[themeId],
      themeName: genre?.name || "Unknown",
    };
  }
}
