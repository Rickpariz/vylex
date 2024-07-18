import { connectDatabase } from "../../../../shared/database/mongodb";
import { IPackageRepository } from "./interfaces/package-repository.interface";
import { PackageSchema } from "../entities/package.schema";
import { Package } from "../entities/package.entity";
import { CreatePackageDto } from "../dtos/create-package.dto";
import { injectable } from "inversify";
import { Model, model } from "mongoose";

@injectable()
export class PackageRepository implements IPackageRepository {
  constructor() {
    this.collection = model<Package>("packages", PackageSchema);
  }
  private collection: Model<Package>;

  private async connect() {
    await connectDatabase();
  }

  async create(data: CreatePackageDto): Promise<Package> {
    await this.connect();
    const _package = await this.collection.create(data);
    return _package;
  }

  async exists(_id: string): Promise<boolean> {
    await this.connect();
    const _package = await this.collection.countDocuments({ _id });
    return _package > 0;
  }
}
