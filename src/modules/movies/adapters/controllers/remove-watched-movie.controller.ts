import { inject, injectable } from "inversify";
import { Locator } from "../../shared/di.enums";
import { IUseCase } from "../../../../shared/usecase";
import {
  Controller,
  HttpResponse,
} from "../../../../shared/adapters/controllers/interface";
import { Ok } from "../../../../shared/http";
import { Request } from "express";
import { RemoveWatchedMovieDto } from "../dtos/remove-watched-movie.dto";

@injectable()
export default class RemoveWatchedMovieController implements Controller {
  constructor(
    @inject(Locator.RemoveWatchedMovieUseCase)
    readonly usecase: IUseCase<RemoveWatchedMovieDto, void>
  ) {}

  async handle(req: Request): Promise<HttpResponse> {
    const { movieId } = req.params as unknown as RemoveWatchedMovieDto;
    const user = req.user;

    const result = await this.usecase.execute({
      movieId: Number(movieId),
      user: user!,
    });

    return Ok(result);
  }
}
