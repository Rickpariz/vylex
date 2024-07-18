import { inject, injectable } from "inversify";
import { Locator } from "../../shared/di.enums";
import { IUseCase } from "../../../../shared/usecase";
import logger from "../../../../shared/logger";
import { IController } from "../../../../shared/adapters/controllers/interface";

@injectable()
export default class ExtractGenresController
  implements IController<void, void>
{
  constructor(
    @inject(Locator.ExtractGenresUseCase) readonly usecase: IUseCase<void, void>
  ) {}

  async execute() {
    try {
      await this.usecase.execute();
    } catch (error) {
      logger.error(`ExtractGenresController: ${error}`);
    }
  }
}
