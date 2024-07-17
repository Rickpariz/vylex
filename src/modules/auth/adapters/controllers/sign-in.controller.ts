import { inject, injectable } from "inversify";
import { Locator } from "../../shared/di.enums";
import { UseCase } from "../../../../shared/usecase";
import {
  Controller,
  HttpResponse,
} from "../../../../shared/adapters/controllers/interface";
import { Ok } from "../../../../shared/http";
import { Request } from "express";
import { SignInDto } from "../dtos/sign-in.dto";
import { AccessToken } from "../../entities/access-token.entity";

@injectable()
export default class SignInController implements Controller {
  constructor(
    @inject(Locator.SignInUseCase)
    readonly usecase: UseCase<SignInDto, AccessToken>
  ) {}

  async handle(req: Request): Promise<HttpResponse> {
    const user = await this.usecase.execute(req.body);
    return Ok(user);
  }
}
