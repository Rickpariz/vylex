import "dotenv/config";
import "reflect-metadata";
import express from "express";
import cors from "cors";
import { usersRouter } from "./modules/users/adapters/router";
import logger from "./shared/logger";
import { authRouter } from "./modules/auth/adapters/router";

const app = express();
app.use(cors());
app.use(express.json());

async function createRouter() {
  app.use("/", authRouter);
  app.use("/users", usersRouter);
}

createRouter();

app.listen(process.env.API_PORT, () =>
  logger.info(`Server Running on port ${process.env.API_PORT}`)
);
