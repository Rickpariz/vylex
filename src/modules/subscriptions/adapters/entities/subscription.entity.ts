import { ObjectId } from "mongoose";

export type Subscription = {
  _id: string;
  package: ObjectId | string;
  users: number[];
  createdAt: Date;
  updatedAt: Date;
};

export type SubscriptionWithPackageAndGenres = {
  _id: string;
  users: number[];
  package: {
    genres: {
      name: string;
      externalId: number;
    }[];
  };
};
