import { injectable } from "inversify";
import { Model, model } from "mongoose";
import { ISubscriptionRepository } from "./interfaces/subscription-repository.interface";
import { Subscription } from "../entities/subscription.entity";
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
}
