import { inject, injectable } from "inversify";
import { Locator } from "../../shared/di.enums";
import { IUseCase } from "../../../../shared/usecase";
import { CreateUserUseCaseDto } from "../dtos/create-user.dto";
import { User } from "../../entities/user.entity";
import {
  Controller,
  HttpResponse,
} from "../../../../shared/adapters/controllers/interface";
import { Created } from "../../../../shared/http";
import { Request } from "express";

@injectable()
export default class CreateUserController implements Controller {
  constructor(
    @inject(Locator.CreateUserUseCase)
    readonly usecase: IUseCase<CreateUserUseCaseDto, User>
  ) {}

  async handle(req: Request): Promise<HttpResponse> {
    const user = await this.usecase.execute(req.body);
    return Created(user);
  }
}
