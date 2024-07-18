import { inject, injectable } from "inversify";
import { IUseCase } from "../../../shared/usecase";
import { listGenresDto } from "../adapters/dtos/list-genres.dto";
import { Pagination } from "../../../shared/adapters/repositories/interface";
import { Genre } from "../entities/genre.entity";
import { Locator } from "../shared/di.enums";
import { IGenresRepository } from "../adapters/repositories/interfaces/genres-repository.interface";

@injectable()
export default class ListGenresUseCase
  implements IUseCase<listGenresDto, Pagination<Genre>>
{
  constructor(
    @inject(Locator.GenresMongoRepository)
    readonly repository: IGenresRepository
  ) {}

  async execute(data: listGenresDto): Promise<Pagination<Genre>> {
    const { search, pageSize, pageNumber } = data;
    const genres = await this.repository.find({
      search,
      pagination: {
        pageNumber,
        pageSize,
      },
    });
    return genres;
  }
}
