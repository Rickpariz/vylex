import { inject, injectable } from "inversify";
import { Locator } from "../../shared/di.enums";
import { IUseCase } from "../../../../shared/usecase";
import {
  Controller,
  HttpResponse,
} from "../../../../shared/adapters/controllers/interface";
import { Ok } from "../../../../shared/http";
import { Request } from "express";
import { listGenresDto } from "../dtos/list-genres.dto";
import { Pagination } from "../../../../shared/adapters/repositories/interface";
import { Genre } from "../../entities/genre.entity";

@injectable()
export default class ListGenresController implements Controller {
  constructor(
    @inject(Locator.ListGenresUseCase)
    readonly usecase: IUseCase<listGenresDto, Pagination<Genre>>
  ) {}

  async handle(req: Request): Promise<HttpResponse> {
    const query = req.query as unknown as listGenresDto;
    const result = await this.usecase.execute(query);
    return Ok(result);
  }
}
