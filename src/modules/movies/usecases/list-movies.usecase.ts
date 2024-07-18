import { inject, injectable } from "inversify";
import { IUseCase } from "../../../shared/usecase";
import { Pagination } from "../../../shared/adapters/repositories/interface";
import { Locator } from "../shared/di.enums";
import {
  ListMoviesDto,
  listMoviesDtoSchema,
} from "../adapters/dtos/list-movies.dto";
import {
  GetMoviesExternalParams,
  GetMoviesApiResponse,
  MovieExternal,
} from "../adapters/externals/types/get-movies-external.type";
import { IExternal } from "../../../shared/external";
import { ISubscriptionRepository } from "../../subscriptions/adapters/repositories/interfaces/subscription-repository.interface";
import _ from "lodash";
import { Validate } from "../../../shared/decorators/validation.decorator";
import { GetAvailableGenresDto } from "../adapters/dtos/get-available-genres.dto";

@injectable()
export default class ListMoviesUseCase
  implements IUseCase<ListMoviesDto, Pagination<MovieExternal>>
{
  constructor(
    @inject(Locator.GetMoviesExternal)
    readonly getMoviesExternal: IExternal<
      GetMoviesExternalParams,
      GetMoviesApiResponse
    >,
    @inject(Locator.SubscriptionRepository)
    readonly subscriptionRepository: ISubscriptionRepository,
    @inject(Locator.GetAvailableGenresUseCase)
    readonly getAvailableGenresUseCase: IUseCase<
      GetAvailableGenresDto,
      number[]
    >
  ) {}

  @Validate(listMoviesDtoSchema)
  async execute(data: ListMoviesDto): Promise<Pagination<MovieExternal>> {
    const { pageNumber } = data;

    const avaialbleGenres = await this.getGenres(data);

    const response = await this.getMoviesExternal.call({
      page: pageNumber,
      genres: avaialbleGenres,
    });

    return {
      data: response.results,
      pagination: {
        firstPage: pageNumber === 1,
        lastPage: pageNumber === response.total_pages,
        pageNumber,
        pageSize: response.results.length,
        totalPages: response.total_pages,
      },
    };
  }

  private async getGenres(data: ListMoviesDto): Promise<number[]> {
    const { genres: requestGenres, user } = data;

    const availableGenres = await this.getAvailableGenresUseCase.execute({
      userId: user.id,
    });

    if (!requestGenres?.length) return availableGenres;

    const filteredGenres = requestGenres?.filter((genre) =>
      availableGenres.includes(genre)
    );

    if (!filteredGenres?.length) return availableGenres;

    return filteredGenres;
  }
}
