import { inject, injectable } from "inversify";
import { Locator } from "../../shared/di.enums";
import { IUseCase } from "../../../../shared/usecase";
import {
  Controller,
  HttpResponse,
} from "../../../../shared/adapters/controllers/interface";
import { Ok } from "../../../../shared/http";
import { Request } from "express";
import { WatchedMovieDto } from "../dtos/save-watched-movie.dto";
import { WatchedMovie } from "../entities/movie.entity";

@injectable()
export default class SaveWatchedMovieController implements Controller {
  constructor(
    @inject(Locator.SaveWatchedMovieUseCase)
    readonly usecase: IUseCase<WatchedMovieDto, WatchedMovie>
  ) {}

  async handle(req: Request): Promise<HttpResponse> {
    const { movieId } = req.params as unknown as WatchedMovieDto;
    const user = req.user;

    const result = await this.usecase.execute({
      movieId: Number(movieId),
      user: user!,
    });

    return Ok(result);
  }
}
