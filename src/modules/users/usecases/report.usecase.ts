import { inject, injectable } from "inversify";
import { IUseCase } from "../../../shared/usecase";
import { Locator } from "../shared/di.enums";
import { IUserRepository } from "../adapters/repositories/interfaces/user-repository.interface";
import { IWatchedMovieRepository } from "../../movies/adapters/repositories/interfaces/watched-movie-repository.interface";
import { IGenresRepository } from "../../genres/adapters/repositories/interfaces/genres-repository.interface";
import { Report } from "../entities/report.entity";
import _ from "lodash";

@injectable()
export default class ReportUsecase implements IUseCase<void, Report[]> {
  constructor(
    @inject(Locator.UserRepository) readonly repository: IUserRepository,
    @inject(Locator.WatchedMovieRepository)
    readonly watchedMovieRepository: IWatchedMovieRepository,
    @inject(Locator.GenresRepository)
    readonly genresRepository: IGenresRepository
  ) {}

  async execute(): Promise<Report[]> {
    const report = await this.watchedMovieRepository.report();
    return report;
  }
}
