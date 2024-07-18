import { inject, injectable } from "inversify";
import { Locator } from "../../shared/di.enums";
import { IUseCase } from "../../../../shared/usecase";
import {
  Controller,
  HttpResponse,
} from "../../../../shared/adapters/controllers/interface";
import { Ok } from "../../../../shared/http";
import { Request } from "express";
import { Report } from "../../entities/report.entity";

@injectable()
export default class ReportController implements Controller {
  constructor(
    @inject(Locator.ReportUseCase)
    readonly usecase: IUseCase<void, Report[]>
  ) {}

  async handle(): Promise<HttpResponse> {
    const report = await this.usecase.execute();
    return Ok(report);
  }
}
