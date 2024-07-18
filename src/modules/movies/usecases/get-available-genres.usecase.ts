import { ISubscriptionRepository } from "../../subscriptions/adapters/repositories/interfaces/subscription-repository.interface";
import _ from "lodash";
import { Validate } from "../../../shared/decorators/validation.decorator";
import {
  GetAvailableGenresDto,
  getAvailableGenresDtoSchema,
} from "../adapters/dtos/get-available-genres.dto";
import { inject, injectable } from "inversify";
import { IUseCase } from "../../../shared/usecase";
import { Locator } from "../shared/di.enums";

@injectable()
export default class GetAvailableGenresUseCase
  implements IUseCase<GetAvailableGenresDto, number[]>
{
  constructor(
    @inject(Locator.SubscriptionRepository)
    readonly subscriptionRepository: ISubscriptionRepository
  ) {}

  @Validate(getAvailableGenresDtoSchema)
  async execute({ userId }: GetAvailableGenresDto): Promise<number[]> {
    const subscriptions = await this.subscriptionRepository.findMany({
      userId,
    });

    const availableGenres = _.flatten(
      subscriptions.reduce((acc: number[], subscription) => {
        acc.push(
          ...subscription.package.genres.map((genre) => genre.externalId)
        );
        return acc;
      }, [])
    );

    return availableGenres;
  }
}
