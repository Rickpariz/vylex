import { Container } from "inversify";
import { Locator } from "./di.enums";
import ListMoviesController from "../adapters/controllers/list-movies.controller";
import { Controller } from "../../../shared/adapters/controllers/interface";
import ListMoviesUseCase from "../usecases/list-movies.usecase";
import { ListMoviesDto } from "../adapters/dtos/list-movies.dto";
import {
  GetMovieExternalParams,
  GetMoviesApiResponse,
  MovieExternal,
} from "../adapters/externals/types/get-movies-external.type";
import { Pagination } from "../../../shared/adapters/repositories/interface";
import { IUseCase } from "../../../shared/usecase";
import { IExternal } from "../../../shared/external";
import GetMoviesExternal from "../adapters/externals/get-movies.external";
import { SubscriptionMongoRepository } from "../../subscriptions/adapters/repositories/subscription-mongo.repository";
import { ISubscriptionRepository } from "../../subscriptions/adapters/repositories/interfaces/subscription-repository.interface";

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
  .bind<IExternal<GetMovieExternalParams, GetMoviesApiResponse>>(
    Locator.GetMoviesExternal
  )
  .to(GetMoviesExternal);

container
  .bind<ISubscriptionRepository>(Locator.SubscriptionRepository)
  .to(SubscriptionMongoRepository);

export { container };
