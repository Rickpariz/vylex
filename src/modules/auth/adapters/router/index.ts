import { Router } from "express";
import { Controller } from "../../../../shared/adapters/controllers/interface";
import { container } from "../../shared/di.container";
import { Locator } from "../../shared/di.enums";
import main from "../../../../shared/adapters/controllers";

const signIn = container.get<Controller>(Locator.SignInController);
const requestPasswordReset = container.get<Controller>(
  Locator.RequestPasswordResetController
);
const resetPassword = container.get<Controller>(
  Locator.ResetPasswordController
);

const authRouter = Router();
authRouter.post("/login", main(signIn));
authRouter.post("/request-password-reset", main(requestPasswordReset));
authRouter.post("/reset-password", main(resetPassword));

export { authRouter };
