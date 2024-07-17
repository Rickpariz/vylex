import { Container } from "inversify";
import { Controller } from "../../../shared/adapters/controllers/interface";
import { Locator } from "./di.enums";
import CreateUserController from "../adapters/controllers/create-user.controller";
import { UseCase } from "../../../shared/usecase";
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

// UseCases Injection
container
  .bind<UseCase<CreateUserUseCaseDto, User>>(Locator.CreateUserUseCase)
  .to(CreateUserUseCase);

container
  .bind<UseCase<UpdateUserUseCaseDto, User>>(Locator.UpdateUserUseCase)
  .to(UpdateUserUseCase);

// Repositories Injection
container.bind<IUserRepository>(Locator.UserRepository).to(UserRepository);
