import { CreatePackageDto } from "../../dtos/create-package.dto";
import { Package } from "../../entities/package.entity";

export interface IPackageRepository {
  create(_package: CreatePackageDto): Promise<Package>;
  exists: (id: string) => Promise<boolean>;
}
