import { inject, injectable } from "inversify";
import {
  Controller,
  HttpResponse,
} from "../../../../shared/adapters/controllers/interface";
import { Locator } from "../../shared/di.enums";
import { IUseCase } from "../../../../shared/usecase";
import { CreatePackageDto } from "../dtos/create-package.dto";
import { Package } from "../entities/package.entity";
import { Created } from "../../../../shared/http";
import { Request } from "express";

@injectable()
export default class CreatePackageController implements Controller {
  constructor(
    @inject(Locator.CreatePackageUseCase)
    readonly usecase: IUseCase<CreatePackageDto, Package>
  ) {}

  async handle(req: Request): Promise<HttpResponse> {
    const result = await this.usecase.execute(req.body);
    return Created(result);
  }
}
