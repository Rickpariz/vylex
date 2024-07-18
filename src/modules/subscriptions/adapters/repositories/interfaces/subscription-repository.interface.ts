import { CreateSubscriptionDto } from "../../dtos/create-subscription.dto";
import {
  Subscription,
  SubscriptionWithPackageAndGenres,
} from "../../entities/subscription.entity";

export type FindParams = {
  userId: number;
};

export interface ISubscriptionRepository {
  create(subscription: CreateSubscriptionDto): Promise<Subscription>;
  findMany(params: FindParams): Promise<SubscriptionWithPackageAndGenres[]>;
}
