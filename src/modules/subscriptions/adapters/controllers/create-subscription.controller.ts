import { inject, injectable } from "inversify";
import {
  Controller,
  HttpResponse,
} from "../../../../shared/adapters/controllers/interface";
import { Request } from "express";
import { Locator } from "../../shared/di.enum";
import { CreateSubscriptionDto } from "../dtos/create-subscription.dto";
import { Subscription } from "../entities/subscription.entity";
import { IUseCase } from "../../../../shared/usecase";
import { Created } from "../../../../shared/http";

@injectable()
export default class CreateSubscriptionController implements Controller {
  constructor(
    @inject(Locator.CreateSubscriptionUseCase)
    readonly usecase: IUseCase<CreateSubscriptionDto, Subscription>
  ) {}

  async handle(req: Request): Promise<HttpResponse> {
    const result = await this.usecase.execute(req.body);
    return Created(result);
  }
}
