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
import { NotFound, Unauthorized } from "../../../shared/http";
import {
  RemoveWatchedMovieDto,
  removeWatchedMovieDtoSchema,
} from "../adapters/dtos/remove-watched-movie.dto";

@injectable()
export default class RemoveWatchedMovieUseCase
  implements IUseCase<RemoveWatchedMovieDto, void>
{
  constructor(
    @inject(Locator.WatchedMovieRepository)
    readonly repository: IWatchedMovieRepository
  ) {}

  @Validate(removeWatchedMovieDtoSchema)
  async execute(data: RemoveWatchedMovieDto): Promise<void> {
    const { movieId } = data;

    const exists = await this.repository.exists({
      movieId,
      userId: data.user.id,
    });

    if (!exists) throw NotFound("Watched Movie not found");

    await this.repository.remove({ movieId, userId: data.user.id });

    return;
  }
}
