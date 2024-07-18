import { Container } from "inversify";
import { Locator } from "./di.enums";
import ListMoviesController from "../adapters/controllers/list-movies.controller";
import { Controller } from "../../../shared/adapters/controllers/interface";
import ListMoviesUseCase from "../usecases/list-movies.usecase";
import { ListMoviesDto } from "../adapters/dtos/list-movies.dto";
import {
  GetMoviesExternalParams,
  GetMoviesApiResponse,
  MovieExternal,
} from "../adapters/externals/types/get-movies-external.type";
import { Pagination } from "../../../shared/adapters/repositories/interface";
import { IUseCase } from "../../../shared/usecase";
import { IExternal } from "../../../shared/external";
import GetMoviesExternal from "../adapters/externals/get-movies.external";
import { SubscriptionMongoRepository } from "../../subscriptions/adapters/repositories/subscription-mongo.repository";
import { ISubscriptionRepository } from "../../subscriptions/adapters/repositories/interfaces/subscription-repository.interface";
import { IWatchedMovieRepository } from "../adapters/repositories/interfaces/watched-movie-repository.interface";
import { WatchedMovieRepository } from "../adapters/repositories/watched-movie.repository";
import GetMovieExternal from "../adapters/externals/get-movie.external";
import {
  GetMovieExternalParams,
  MovieDetailsExternal,
} from "../adapters/externals/types/get-movie.external.types";
import { GetAvailableGenresDto } from "../adapters/dtos/get-available-genres.dto";
import GetAvailableGenresUseCase from "../usecases/get-available-genres.usecase";
import SaveWatchedMovieUseCase from "../usecases/save-watched-movie.usecase";
import { WatchedMovieDto } from "../adapters/dtos/save-watched-movie.dto";
import { WatchedMovie } from "../adapters/entities/movie.entity";
import SaveWatchedMovieController from "../adapters/controllers/save-watched-movie.controller";
import RemoveWatchedMovieController from "../adapters/controllers/remove-watched-movie.controller";
import RemoveWatchedMovieUseCase from "../usecases/remove-watched-movie.usecase";
import { RemoveWatchedMovieDto } from "../adapters/dtos/remove-watched-movie.dto";

const container = new Container();

container
  .bind<Controller>(Locator.ListMoviesController)
  .to(ListMoviesController);

container
  .bind<IUseCase<ListMoviesDto, Pagination<MovieExternal>>>(
    Locator.ListMoviesUseCase
  )
  .to(ListMoviesUseCase);

container
  .bind<IExternal<GetMoviesExternalParams, GetMoviesApiResponse>>(
    Locator.GetMoviesExternal
  )
  .to(GetMoviesExternal);

container
  .bind<ISubscriptionRepository>(Locator.SubscriptionRepository)
  .to(SubscriptionMongoRepository);

container
  .bind<IWatchedMovieRepository>(Locator.WatchedMovieRepository)
  .to(WatchedMovieRepository);

container
  .bind<IExternal<GetMovieExternalParams, MovieDetailsExternal>>(
    Locator.GetMovieExternal
  )
  .to(GetMovieExternal);

container
  .bind<IUseCase<GetAvailableGenresDto, number[]>>(
    Locator.GetAvailableGenresUseCase
  )
  .to(GetAvailableGenresUseCase);

container
  .bind<IUseCase<WatchedMovieDto, WatchedMovie>>(
    Locator.SaveWatchedMovieUseCase
  )
  .to(SaveWatchedMovieUseCase);

container
  .bind<Controller>(Locator.SaveWatchedMovieController)
  .to(SaveWatchedMovieController);

container
  .bind<Controller>(Locator.RemoveWatchedMovieController)
  .to(RemoveWatchedMovieController);

container
  .bind<IUseCase<RemoveWatchedMovieDto, void>>(
    Locator.RemoveWatchedMovieUseCase
  )
  .to(RemoveWatchedMovieUseCase);

export { container };
