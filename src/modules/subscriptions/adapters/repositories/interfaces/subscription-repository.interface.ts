import { CreateSubscriptionDto } from "../../dtos/create-subscription.dto";
import { Subscription } from "../../entities/subscription.entity";

export interface ISubscriptionRepository {
  create(subscription: CreateSubscriptionDto): Promise<Subscription>;
}
