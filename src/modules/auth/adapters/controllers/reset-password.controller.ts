import { inject, injectable } from "inversify";
import { Locator } from "../../shared/di.enums";
import { IUseCase } from "../../../../shared/usecase";
import {
  Controller,
  HttpResponse,
} from "../../../../shared/adapters/controllers/interface";
import { Ok } from "../../../../shared/http";
import { Request } from "express";
import { ResetPasswordDto } from "../dtos/reset-password.dto";
import { User } from "../../../users/entities/user.entity";
import { extractTokenFromHeaders } from "../../../../shared/middlewares/auth";

@injectable()
export default class ResetPasswordController implements Controller {
  constructor(
    @inject(Locator.ResetPasswordUseCase)
    readonly usecase: IUseCase<ResetPasswordDto, User>
  ) {}

  async handle(req: Request): Promise<HttpResponse> {
    const token = extractTokenFromHeaders(req);
    const user = await this.usecase.execute({ token, ...req.body });
    return Ok(user);
  }
}
