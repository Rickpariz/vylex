import { inject, injectable } from "inversify";
import { Locator } from "../../shared/di.enums";
import { IUseCase } from "../../../../shared/usecase";
import { CreateUserUseCaseDto } from "../dtos/create-user.dto";
import { User } from "../../entities/user.entity";
import {
  Controller,
  HttpResponse,
} from "../../../../shared/adapters/controllers/interface";
import { Ok } from "../../../../shared/http";
import { Request } from "express";
import { UpdateUserUseCaseDto } from "../dtos/update-user.dto";

@injectable()
export default class UpdateUserController implements Controller {
  constructor(
    @inject(Locator.UpdateUserUseCase)
    readonly usecase: IUseCase<UpdateUserUseCaseDto, User>
  ) {}

  async handle(req: Request): Promise<HttpResponse> {
    const { name, email } = req.body;
    const { id } = req.params;
    const tokenUser = req.user;

    const user = await this.usecase.execute({
      id: Number(id),
      name,
      email,
      tokenUser: tokenUser!,
    });

    return Ok(user);
  }
}
