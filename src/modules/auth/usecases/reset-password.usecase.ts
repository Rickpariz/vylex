import { inject, injectable } from "inversify";
import { IUseCase } from "../../../shared/usecase";
import { Validate } from "../../../shared/decorators/validation.decorator";
import { Locator } from "../shared/di.enums";
import { IUserRepository } from "../../users/adapters/repositories/interfaces/user-repository.interface";
import { NotFound, Unauthorized } from "../../../shared/http";
import { hashSync } from "../../../shared/hash";
import * as jwt from "jsonwebtoken";
import {
  ResetPasswordDto,
  resetPasswordDtoSchema,
} from "../adapters/dtos/reset-password.dto";
import { User } from "../../users/entities/user.entity";
import { JWT_ROLES } from "../../../shared/enums/jwt-roles";

@injectable()
export default class ResetPasswordUsecase
  implements IUseCase<ResetPasswordDto, User>
{
  constructor(
    @inject(Locator.UserRepository) readonly repository: IUserRepository
  ) {}

  @Validate(resetPasswordDtoSchema)
  async execute(data: ResetPasswordDto): Promise<User> {
    const { password, token } = data;

    let decoded;

    try {
      decoded = jwt.verify(
        token,
        String(process.env.JWT_SECRET)
      ) as jwt.JwtPayload;
    } catch (err) {
      throw Unauthorized();
    }

    const { id, roles } = decoded;

    if (!roles || !roles.includes(JWT_ROLES.RESET_PASSWORD)) throw Unauthorized();

    const user = await this.repository.exists({ id });

    if (!user) throw NotFound("user not found");

    const passwordHash = hashSync(password);

    const userUpdated = await this.repository.update({
      id,
      password: passwordHash,
    });

    return userUpdated;
  }
}
