import { inject, injectable } from "inversify";
import { Locator } from "../../shared/di.enums";
import { IUseCase } from "../../../../shared/usecase";
import {
  Controller,
  HttpResponse,
} from "../../../../shared/adapters/controllers/interface";
import { Ok } from "../../../../shared/http";
import { Request } from "express";
import { Pagination } from "../../../../shared/adapters/repositories/interface";
import { ListMoviesDto } from "../dtos/list-movies.dto";
import { MovieExternal } from "../externals/types/get-movies-external.type";
import { DEFAULT_PAGE_SIZE } from "../../../../shared/adapters/repositories/pagination";

@injectable()
export default class ListMoviesController implements Controller {
  constructor(
    @inject(Locator.ListMoviesUseCase)
    readonly usecase: IUseCase<ListMoviesDto, Pagination<MovieExternal>>
  ) {}

  async handle(req: Request): Promise<HttpResponse> {
    const { pageNumber, genres } = req.query as unknown as ListMoviesDto;
    const tokenUser = req.user;

    const result = await this.usecase.execute({
      pageNumber: pageNumber ? Number(pageNumber) : 1,
      genres: genres ? genres.map((genreId) => Number(genreId)) : [],
      user: tokenUser!,
    });

    return Ok(result);
  }
}
