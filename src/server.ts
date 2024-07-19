import "dotenv/config";
import "reflect-metadata";
import express from "express";
import cron from "node-cron";
import cors from "cors";
import { usersRouter } from "./modules/users/adapters/router";
import logger from "./shared/logger";
import { authRouter } from "./modules/auth/adapters/router";
import { container } from "./modules/genres/shared/di.container";
import { Locator } from "./modules/genres/shared/di.enums";
import { IController } from "./shared/adapters/controllers/interface";
import { genresRoute } from "./modules/genres/adapters/router";
import { packagesRoute } from "./modules/packages/adapters/router";
import { subscriptionsRoute } from "./modules/subscriptions/adapters/router";
import { moviesRouter } from "./modules/movies/adapters/router";

const extractGenres = container.get<IController<void, void>>(
  Locator.ExtractGenresController
);

const app = express();
app.use(cors());
app.use(express.json());

async function createRouter() {
  app.use("/", authRouter);
  app.use("/users", usersRouter);
  app.use("/genres", genresRoute);
  app.use("/packages", packagesRoute);
  app.use("/subscriptions", subscriptionsRoute);
  app.use("/movies", moviesRouter);
}

createRouter();

app.listen(process.env.API_PORT, async () => {
  logger.info(`Server Running on port ${process.env.API_PORT}`);
  await extractGenres.execute();
});

cron.schedule(String(process.env.CRON_JOB), async () => {
  await extractGenres.execute();
});
