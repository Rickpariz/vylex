import { Router } from "express";
import { Controller } from "../../../../shared/adapters/controllers/interface";
import { container } from "../../shared/di.container";
import { Locator } from "../../shared/di.enums";
import main from "../../../../shared/adapters/controllers";
import { authorize } from "../../../../shared/middlewares/auth";

const listGenres = container.get<Controller>(Locator.ListGenresController);

const genresRoute = Router();

genresRoute.get("/", authorize, main(listGenres));

export { genresRoute };
