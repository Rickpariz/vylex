import { injectable } from "inversify";
import { Model, model } from "mongoose";
import {
  FindParams,
  ISubscriptionRepository,
} from "./interfaces/subscription-repository.interface";
import {
  Subscription,
  SubscriptionWithPackageAndGenres,
} from "../entities/subscription.entity";
import { connectDatabase } from "../../../../shared/database/mongodb";
import { CreateSubscriptionDto } from "../dtos/create-subscription.dto";
import { SubscriptionSchema } from "../entities/subscription.schema";

@injectable()
export class SubscriptionMongoRepository implements ISubscriptionRepository {
  constructor() {
    this.collection = model<Subscription>("subscriptions", SubscriptionSchema);
  }
  private collection: Model<Subscription>;

  private async connect() {
    await connectDatabase();
  }

  async create(data: CreateSubscriptionDto): Promise<Subscription> {
    await this.connect();
    const subscription = await this.collection.create(data);
    return subscription;
  }

  async findMany(
    data: FindParams
  ): Promise<SubscriptionWithPackageAndGenres[]> {
    await this.connect();
    const subscriptions = (await this.collection
      .find({
        users: data.userId,
      })
      .populate({
        path: "package",
        select: "genres",
        populate: { path: "genres", select: "name externalId" },
      })
      .lean()) as SubscriptionWithPackageAndGenres[];

    return subscriptions;
  }
}
