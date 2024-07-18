import { inject, injectable } from "inversify";
import { IUseCase } from "../../../shared/usecase";
import { Pagination } from "../../../shared/adapters/repositories/interface";
import { Locator } from "../shared/di.enums";
import {
  ListMoviesDto,
  listMoviesDtoSchema,
} from "../adapters/dtos/list-movies.dto";
import {
  GetMovieExternalParams,
  GetMoviesApiResponse,
  MovieExternal,
} from "../adapters/externals/types/get-movies-external.type";
import { IExternal } from "../../../shared/external";
import { ISubscriptionRepository } from "../../subscriptions/adapters/repositories/interfaces/subscription-repository.interface";
import _ from "lodash";
import { Validate } from "../../../shared/decorators/validation.decorator";

@injectable()
export default class ListMoviesUseCase
  implements IUseCase<ListMoviesDto, Pagination<MovieExternal>>
{
  constructor(
    @inject(Locator.GetMoviesExternal)
    readonly getMoviesExternal: IExternal<
      GetMovieExternalParams,
      GetMoviesApiResponse
    >,
    @inject(Locator.SubscriptionRepository)
    readonly subscriptionRepository: ISubscriptionRepository
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
    const { genres: requestGenres } = data;
    const subscriptions = await this.subscriptionRepository.findMany({
      userId: data.user.id,
    });

    const availableGenres = _.flatten(
      subscriptions.reduce((acc: number[], subscription) => {
        acc.push(
          ...subscription.package.genres.map((genre) => genre.externalId)
        );
        return acc;
      }, [])
    );

    if (!requestGenres?.length) return availableGenres;

    const filteredGenres = requestGenres?.filter((genre) =>
      availableGenres.includes(genre)
    );

    if (!filteredGenres?.length) return availableGenres;

    return filteredGenres;
  }
}
