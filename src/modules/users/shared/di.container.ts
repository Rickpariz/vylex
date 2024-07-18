import { Container } from "inversify";
import { Controller } from "../../../shared/adapters/controllers/interface";
import { Locator } from "./di.enums";
import CreateUserController from "../adapters/controllers/create-user.controller";
import { IUseCase } from "../../../shared/usecase";
import { CreateUserUseCaseDto } from "../adapters/dtos/create-user.dto";
import { User } from "../entities/user.entity";
import CreateUserUseCase from "../usecases/create-user.usecase";
import { PrismaClientLocator } from "../../../shared/di/di.enums";
import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../adapters/repositories/interfaces/user-repository.interface";
import UserRepository from "../adapters/repositories/user.repository";
import { UpdateUserUseCaseDto } from "../adapters/dtos/update-user.dto";
import UpdateUserUseCase from "../usecases/update-user.usecase";
import UpdateUserController from "../adapters/controllers/update-user.controller";
import { IWatchedMovieRepository } from "../../movies/adapters/repositories/interfaces/watched-movie-repository.interface";
import { WatchedMovieRepository } from "../../movies/adapters/repositories/watched-movie.repository";
import { IGenresRepository } from "../../genres/adapters/repositories/interfaces/genres-repository.interface";
import { GenresMongoRepository } from "../../genres/adapters/repositories/genres-mongo.repository";
import { Report } from "../entities/report.entity";
import ReportUsecase from "../usecases/report.usecase";
import ReportController from "../adapters/controllers/report.controller";

export const container = new Container();

// Prisma Injecton
const prismaClient = new PrismaClient();
container.bind<PrismaClient>(PrismaClientLocator).toConstantValue(prismaClient);

// Controllers Injection
container
  .bind<Controller>(Locator.CreateUserController)
  .to(CreateUserController);

container
  .bind<Controller>(Locator.UpdateUserController)
  .to(UpdateUserController);

container.bind<Controller>(Locator.ReportController).to(ReportController);

// UseCases Injection
container
  .bind<IUseCase<CreateUserUseCaseDto, User>>(Locator.CreateUserUseCase)
  .to(CreateUserUseCase);

container
  .bind<IUseCase<UpdateUserUseCaseDto, User>>(Locator.UpdateUserUseCase)
  .to(UpdateUserUseCase);

container
  .bind<IUseCase<void, Report[]>>(Locator.ReportUseCase)
  .to(ReportUsecase);

// Repositories Injection
container.bind<IUserRepository>(Locator.UserRepository).to(UserRepository);
container
  .bind<IWatchedMovieRepository>(Locator.WatchedMovieRepository)
  .to(WatchedMovieRepository);
container
  .bind<IGenresRepository>(Locator.GenresRepository)
  .to(GenresMongoRepository);
