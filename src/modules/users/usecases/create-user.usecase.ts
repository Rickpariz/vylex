import { inject, injectable } from "inversify";
import { UseCase } from "../../../shared/usecase";
import { Locator } from "../shared/di.enums";
import { User } from "../entities/user.entity";
import {
  createUserDtoSchema,
  CreateUserUseCaseDto,
} from "../adapters/dtos/create-user.dto";
import { Validate } from "../../../shared/decorators/validation.decorator";
import { Conflict, Ok } from "../../../shared/http";
import { HttpResponse } from "../../../shared/adapters/controllers/interface";
import { PrismaClientLocator } from "../../../shared/di/di.enums";
import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../adapters/repositories/interfaces/user-repository.interface";
import { hashSync } from "../../../shared/hash";

@injectable()
export default class CreateUserUseCase
  implements UseCase<CreateUserUseCaseDto, User>
{
  constructor(
    @inject(Locator.UserRepository) readonly repository: IUserRepository
  ) {}

  @Validate(createUserDtoSchema)
  async execute(data: CreateUserUseCaseDto): Promise<User> {
    const { name, email, password } = data;

    const exists = await this.repository.exists({ email });

    if (exists) {
      throw Conflict("User with this email already exists");
    }

    const passwordHash = hashSync(password);

    const user = await this.repository.create({
      name,
      email,
      password: passwordHash,
    });

    return user;
  }
}
