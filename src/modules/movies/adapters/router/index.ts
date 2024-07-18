import { Router } from "express";
import { Controller } from "../../../../shared/adapters/controllers/interface";
import { container } from "../../shared/di.container";
import { Locator } from "../../shared/di.enums";
import main from "../../../../shared/adapters/controllers";
import { authorize } from "../../../../shared/middlewares/auth";

const listMovies = container.get<Controller>(Locator.ListMoviesController);
const saveWatchedMovie = container.get<Controller>(
  Locator.SaveWatchedMovieController
);

const moviesRouter = Router();

moviesRouter.get("/", authorize, main(listMovies));
moviesRouter.post("/watch/:movieId", authorize, main(saveWatchedMovie));

export { moviesRouter };
