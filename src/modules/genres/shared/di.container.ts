import { PrismaClient } from "@prisma/client";
import { Container } from "inversify";
import { PrismaClientLocator } from "../../../shared/di/di.enums";
import { IExternal } from "../../../shared/external";
import { Genre, GenreExternal } from "../entities/genre.entity";
import { Locator } from "./di.enums";
import GetGenresExternal from "../adapters/externals/get-genres.external";
import { IUseCase } from "../../../shared/usecase";
import ExtractGenresUseCase from "../usecases/extract-genres.usecase";
import ExtractGenresController from "../adapters/controllers/extract-genres.controller";
import {
  Controller,
  IController,
} from "../../../shared/adapters/controllers/interface";
import { IGenresRepository } from "../adapters/repositories/interfaces/genres-repository.interface";
import { GenresMongoRepository } from "../adapters/repositories/genres-mongo.repository";
import { IMapper } from "../../../shared/adapters/mappers/interface";
import MapGenresExternalToGenreEntityMapper from "../adapters/mappers/map-genres-external-to-genre-entity.mapper";
import { listGenresDto } from "../adapters/dtos/list-genres.dto";
import { Pagination } from "../../../shared/adapters/repositories/interface";
import ListGenresUseCase from "../usecases/list-genres.usecase";
import ListGenresController from "../adapters/controllers/list-genres.controller";

export const container = new Container();

// Prisma Injecton
const prismaClient = new PrismaClient();
container.bind<PrismaClient>(PrismaClientLocator).toConstantValue(prismaClient);

// Controllers Injection
container
  .bind<IController<void, void>>(Locator.ExtractGenresController)
  .to(ExtractGenresController);

container
  .bind<Controller>(Locator.ListGenresController)
  .to(ListGenresController);

// UseCases Injection
container
  .bind<IUseCase<void, void>>(Locator.ExtractGenresUseCase)
  .to(ExtractGenresUseCase);

container
  .bind<IUseCase<listGenresDto, Pagination<Genre>>>(Locator.ListGenresUseCase)
  .to(ListGenresUseCase);

// Repositories Injection
container
  .bind<IGenresRepository>(Locator.GenresMongoRepository)
  .to(GenresMongoRepository);

// External Injection
container
  .bind<IExternal<void, GenreExternal[]>>(Locator.GetGenresExternal)
  .to(GetGenresExternal);

// Mappers Injection
container
  .bind<IMapper<GenreExternal, Genre>>(
    Locator.MapGenresExternalToGenreEntityMapper
  )
  .to(MapGenresExternalToGenreEntityMapper);
