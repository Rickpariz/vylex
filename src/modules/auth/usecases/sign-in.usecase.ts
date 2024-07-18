import { inject, injectable } from "inversify";
import { IUseCase } from "../../../shared/usecase";
import { Validate } from "../../../shared/decorators/validation.decorator";
import { SignInDto, signInDtoSchema } from "../adapters/dtos/sign-in.dto";
import { Locator } from "../shared/di.enums";
import { IUserRepository } from "../../users/adapters/repositories/interfaces/user-repository.interface";
import { Unauthorized } from "../../../shared/http";
import { hashCompareSync } from "../../../shared/hash";
import * as jwt from "jsonwebtoken";
import { AccessToken } from "../entities/access-token.entity";

@injectable()
export default class SignInUseCase implements IUseCase<SignInDto, AccessToken> {
  constructor(
    @inject(Locator.UserRepository) readonly repository: IUserRepository
  ) {}

  @Validate(signInDtoSchema)
  async execute(data: SignInDto): Promise<AccessToken> {
    const { email, password } = data;

    const user = await this.repository.findByEmail(email);

    if (!user) throw Unauthorized();

    const isValidPassword = hashCompareSync(password, user.password);

    if (!isValidPassword) throw Unauthorized();

    const accessToken = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      String(process.env.JWT_SECRET),
      {
        expiresIn: String(process.env.JWT_EXPIRES_IN),
      }
    );

    return {
      token: accessToken,
    };
  }
}
