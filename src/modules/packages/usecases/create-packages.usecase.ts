import {
  CreatePackageDto,
  createPackageDtoSchema,
} from "../adapters/dtos/create-package.dto";
import {
  Package,
  PackageWithGenres,
} from "../adapters/entities/package.entity";
import { IPackageRepository } from "../adapters/repositories/interfaces/package-repository.interface";
import { Validate } from "../../../shared/decorators/validation.decorator";
import { inject, injectable } from "inversify";
import { IUseCase } from "../../../shared/usecase";
import { Locator } from "../shared/di.enums";

@injectable()
export default class CreatePackageUseCase
  implements IUseCase<CreatePackageDto, Package>
{
  constructor(
    @inject(Locator.PackageRepository)
    readonly repository: IPackageRepository
  ) {}

  @Validate(createPackageDtoSchema)
  async execute(data: CreatePackageDto): Promise<Package> {
    const _package = await this.repository.create(data);
    return _package;
  }
}
