import { Container } from "inversify";
import { CreatePackageDto } from "../adapters/dtos/create-package.dto";
import { Package } from "../adapters/entities/package.entity";
import CreatePackageUseCase from "../usecases/create-packages.usecase";
import { PrismaClient } from "@prisma/client";
import { PrismaClientLocator } from "../../../shared/di/di.enums";
import { IUseCase } from "../../../shared/usecase";
import { Locator } from "./di.enums";
import { Controller } from "../../../shared/adapters/controllers/interface";
import CreatePackageController from "../adapters/controllers/create-package-controller";
import { IPackageRepository } from "../adapters/repositories/interfaces/package-repository.interface";
import { PackageRepository } from "../adapters/repositories/package-mongo.repository";

export const container = new Container();

// Prisma Injecton
const prismaClient = new PrismaClient();
container.bind<PrismaClient>(PrismaClientLocator).toConstantValue(prismaClient);

// Controllers Injection
container
  .bind<Controller>(Locator.CreatePackageController)
  .to(CreatePackageController);

// Repositories Injection
container
  .bind<IPackageRepository>(Locator.PackageRepository)
  .to(PackageRepository);

// UseCases Injection
container
  .bind<IUseCase<CreatePackageDto, Package>>(Locator.CreatePackageUseCase)
  .to(CreatePackageUseCase);
