import { Router } from "express";
import { Controller } from "../../../../shared/adapters/controllers/interface";
import { container } from "../../shared/di.container";
import { Locator } from "../../shared/di.enums";
import main from "../../../../shared/adapters/controllers";
import { authorize } from "../../../../shared/middlewares/auth";

const createPackage = container.get<Controller>(
  Locator.CreatePackageController
);

const packagesRoute = Router();

packagesRoute.post("/", authorize, main(createPackage));

export { packagesRoute };
