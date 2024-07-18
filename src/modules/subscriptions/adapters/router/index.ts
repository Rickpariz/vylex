import { Router } from "express";
import { Controller } from "../../../../shared/adapters/controllers/interface";
import { container } from "../../shared/di.container";
import main from "../../../../shared/adapters/controllers";
import { authorize } from "../../../../shared/middlewares/auth";
import { Locator } from "../../shared/di.enum";

const createSubscription = container.get<Controller>(
  Locator.CreateSubscriptionController
);

const subscriptionsRoute = Router();

subscriptionsRoute.post("/", authorize, main(createSubscription));

export { subscriptionsRoute };
