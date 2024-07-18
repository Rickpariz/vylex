import { inject, injectable } from "inversify";
import { Locator } from "../../shared/di.enums";
import { IUseCase } from "../../../../shared/usecase";
import {
  Controller,
  HttpResponse,
} from "../../../../shared/adapters/controllers/interface";
import { Ok } from "../../../../shared/http";
import { Request } from "express";
import { AccessToken } from "../../entities/access-token.entity";
import { RequestPasswordResetDto } from "../dtos/request-password-reset.dto";

@injectable()
export default class RequestPasswordResetController implements Controller {
  constructor(
    @inject(Locator.RequestPasswordResetUseCase)
    readonly usecase: IUseCase<RequestPasswordResetDto, AccessToken>
  ) {}

  async handle(req: Request): Promise<HttpResponse> {
    const user = await this.usecase.execute(req.body);
    return Ok(user);
  }
}
