import { inject, injectable } from "inversify";
import { IUseCase } from "../../../shared/usecase";
import { Locator } from "../shared/di.enums";
import { User } from "../entities/user.entity";
import {
  createUserDtoSchema,
  CreateUserUseCaseDto,
} from "../adapters/dtos/create-user.dto";
import { Validate } from "../../../shared/decorators/validation.decorator";
import { Conflict, NotFound, Ok, Unauthorized } from "../../../shared/http";
import { HttpResponse } from "../../../shared/adapters/controllers/interface";
import { PrismaClientLocator } from "../../../shared/di/di.enums";
import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../adapters/repositories/interfaces/user-repository.interface";
import { hashSync } from "../../../shared/hash";
import {
  updateUserDtoSchema,
  UpdateUserUseCaseDto,
} from "../adapters/dtos/update-user.dto";

@injectable()
export default class UpdateUserUseCase
  implements IUseCase<UpdateUserUseCaseDto, User>
{
  constructor(
    @inject(Locator.UserRepository) readonly repository: IUserRepository
  ) {}

  @Validate(updateUserDtoSchema)
  async execute(data: UpdateUserUseCaseDto): Promise<User> {
    const { id, tokenUser, ...dto } = data;

    if (id !== tokenUser.id) throw Unauthorized();

    const exists = await this.repository.exists({ id });

    if (!exists) throw NotFound("user not found");

    if (dto.email) {
      await this.validateDuplicatedEmail(data);
    }

    const user = await this.repository.update({
      id,
      ...dto,
    });

    return user;
  }

  async validateDuplicatedEmail(data: UpdateUserUseCaseDto) {
    const { id, email } = data;

    const isDuplicated = await this.repository.isDuplicateEmail({
      email: email!,
      id,
    });

    if (isDuplicated) {
      throw Conflict("User with this email already exists");
    }
  }
}
