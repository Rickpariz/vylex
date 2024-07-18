import { PrismaClient } from "@prisma/client";
import { Container } from "inversify";
import { PrismaClientLocator } from "../../../shared/di/di.enums";
import { IUserRepository } from "../../users/adapters/repositories/interfaces/user-repository.interface";
import { Locator } from "./di.enums";
import UserRepository from "../../users/adapters/repositories/user.repository";
import { IUseCase } from "../../../shared/usecase";
import { SignInDto } from "../adapters/dtos/sign-in.dto";
import { AccessToken } from "../entities/access-token.entity";
import SignInUseCase from "../usecases/sign-in.usecase";
import { Controller } from "../../../shared/adapters/controllers/interface";
import SignInController from "../adapters/controllers/sign-in.controller";
import { RequestPasswordResetDto } from "../adapters/dtos/request-password-reset.dto";
import RequestPasswordResetUseCase from "../usecases/request-password-reset.usecase";
import { ResetPasswordDto } from "../adapters/dtos/reset-password.dto";
import { User } from "../../users/entities/user.entity";
import ResetPasswordUsecase from "../usecases/reset-password.usecase";
import RequestPasswordResetController from "../adapters/controllers/request-password-reset.controller";
import ResetPasswordController from "../adapters/controllers/reset-password.controller";

export const container = new Container();

// Prisma Injecton
const prismaClient = new PrismaClient();
container.bind<PrismaClient>(PrismaClientLocator).toConstantValue(prismaClient);

// Controllers Injection
container.bind<Controller>(Locator.SignInController).to(SignInController);
container
  .bind<Controller>(Locator.RequestPasswordResetController)
  .to(RequestPasswordResetController);
container
  .bind<Controller>(Locator.ResetPasswordController)
  .to(ResetPasswordController);

// UseCases Injection
container
  .bind<IUseCase<SignInDto, AccessToken>>(Locator.SignInUseCase)
  .to(SignInUseCase);

container
  .bind<IUseCase<RequestPasswordResetDto, AccessToken>>(
    Locator.RequestPasswordResetUseCase
  )
  .to(RequestPasswordResetUseCase);

container
  .bind<IUseCase<ResetPasswordDto, User>>(Locator.ResetPasswordUseCase)
  .to(ResetPasswordUsecase);

// Repositories Injection
container.bind<IUserRepository>(Locator.UserRepository).to(UserRepository);
