import { inject, injectable } from "inversify";
import { IUseCase } from "../../../shared/usecase";
import { Locator } from "../shared/di.enums";
import { listMoviesDtoSchema } from "../adapters/dtos/list-movies.dto";
import { IExternal } from "../../../shared/external";
import { ISubscriptionRepository } from "../../subscriptions/adapters/repositories/interfaces/subscription-repository.interface";
import _ from "lodash";
import { Validate } from "../../../shared/decorators/validation.decorator";
import {
  WatchedMovieDto,
  watchedMovieDtoSchema,
} from "../adapters/dtos/save-watched-movie.dto";
import { WatchedMovie } from "../adapters/entities/movie.entity";
import {
  GetMovieExternalParams,
  MovieDetailsExternal,
} from "../adapters/externals/types/get-movie.external.types";
import { IWatchedMovieRepository } from "../adapters/repositories/interfaces/watched-movie-repository.interface";
import { GetAvailableGenresDto } from "../adapters/dtos/get-available-genres.dto";
import { Unauthorized } from "../../../shared/http";

@injectable()
export default class SaveWatchedMovieUseCase
  implements IUseCase<WatchedMovieDto, WatchedMovie>
{
  constructor(
    @inject(Locator.GetMovieExternal)
    readonly getMovieExternal: IExternal<
      GetMovieExternalParams,
      MovieDetailsExternal
    >,
    @inject(Locator.SubscriptionRepository)
    readonly subscriptionRepository: ISubscriptionRepository,

    @inject(Locator.WatchedMovieRepository)
    readonly repository: IWatchedMovieRepository,

    @inject(Locator.GetAvailableGenresUseCase)
    readonly getAvailableGenresUseCase: IUseCase<
      GetAvailableGenresDto,
      number[]
    >
  ) {}

  @Validate(watchedMovieDtoSchema)
  async execute(data: WatchedMovieDto): Promise<WatchedMovie> {
    const { movieId, user } = data;

    const movie = await this.getMovieExternal.call({ movieId });

    const isMovieGenresValid = await this.validateMovieGenres(movie, data);

    if (!isMovieGenresValid)
      throw Unauthorized("User is not permission to watch movie");

    const watchedMovie = await this.repository.create({
      movie: {
        id: movie.id,
        title: movie.title,
        genres: movie.genres.map((genre) => genre.id),
      },
      userId: user.id,
    });

    return watchedMovie;
  }

  private async validateMovieGenres(
    movie: MovieDetailsExternal,
    data: WatchedMovieDto
  ) {
    const { user } = data;

    const avaialbleGenres = await this.getAvailableGenresUseCase.execute({
      userId: user.id,
    });

    const moviesGenres = movie.genres.map((genre) => genre.id);

    return moviesGenres.some((movieGenre) =>
      avaialbleGenres.includes(movieGenre)
    );
  }
}
