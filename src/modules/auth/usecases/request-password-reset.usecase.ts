import { inject, injectable } from "inversify";
import { UseCase } from "../../../shared/usecase";
import { Validate } from "../../../shared/decorators/validation.decorator";
import { Locator } from "../shared/di.enums";
import { IUserRepository } from "../../users/adapters/repositories/interfaces/user-repository.interface";
import { NotFound } from "../../../shared/http";
import * as jwt from "jsonwebtoken";
import { AccessToken } from "../entities/access-token.entity";
import {
  RequestPasswordResetDto,
  requestPasswordResetDtoSchema,
} from "../adapters/dtos/request-password-reset.dto";
import { JWT_ROLES } from "../../../shared/enums/jwt-roles";

@injectable()
export default class RequestPasswordResetUseCase
  implements UseCase<RequestPasswordResetDto, AccessToken>
{
  constructor(
    @inject(Locator.UserRepository) readonly repository: IUserRepository
  ) {}

  @Validate(requestPasswordResetDtoSchema)
  async execute(data: RequestPasswordResetDto): Promise<AccessToken> {
    const { email } = data;

    const user = await this.repository.findByEmail(email);

    if (!user) throw NotFound("user not found");

    const accessToken = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        roles: [JWT_ROLES.RESET_PASSWORD],
      },
      String(process.env.JWT_SECRET),
      {
        expiresIn: String(process.env.JWT_RESET_PASSWORD_EXPIRES_IN),
      }
    );

    return {
      token: accessToken,
    };
  }
}
