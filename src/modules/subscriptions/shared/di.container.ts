import { Container } from "inversify";
import { Locator } from "./di.enum";
import { IUseCase } from "../../../shared/usecase";
import { CreateSubscriptionDto } from "../adapters/dtos/create-subscription.dto";
import { Subscription } from "../adapters/entities/subscription.entity";
import CreateSubscriptionUseCase from "../usecases/create-subscription.usecase";
import { IPackageRepository } from "../../packages/adapters/repositories/interfaces/package-repository.interface";
import { PackageRepository } from "../../packages/adapters/repositories/package-mongo.repository";
import { IUserRepository } from "../../users/adapters/repositories/interfaces/user-repository.interface";
import UserRepository from "../../users/adapters/repositories/user.repository";
import { ISubscriptionRepository } from "../adapters/repositories/interfaces/subscription-repository.interface";
import { SubscriptionMongoRepository } from "../adapters/repositories/subscription-mongo.repository";
import { Controller } from "../../../shared/adapters/controllers/interface";
import CreateSubscriptionController from "../adapters/controllers/create-subscription.controller";
import { PrismaClient } from "@prisma/client";
import { PrismaClientLocator } from "../../../shared/di/di.enums";

const container = new Container();

// Prisma Injecton
const prismaClient = new PrismaClient();
container.bind<PrismaClient>(PrismaClientLocator).toConstantValue(prismaClient);

// Controllers Injection
container
  .bind<Controller>(Locator.CreateSubscriptionController)
  .to(CreateSubscriptionController);

// Repositories Injection
container
  .bind<IPackageRepository>(Locator.PackageRepository)
  .to(PackageRepository);

container.bind<IUserRepository>(Locator.UserRepository).to(UserRepository);

container
  .bind<ISubscriptionRepository>(Locator.SubscriptionRepository)
  .to(SubscriptionMongoRepository);

// UseCases Injection
container
  .bind<IUseCase<CreateSubscriptionDto, Subscription>>(
    Locator.CreateSubscriptionUseCase
  )
  .to(CreateSubscriptionUseCase);

export { container };
