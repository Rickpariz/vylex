import { connection, connect, STATES } from "mongoose";
import logger from "../logger";

export const connectDatabase = async () => {
  if (!connection || STATES[connection.readyState] === "disconnected") {
    await connect(String(process.env.MONGODB_URL), {
      dbName: "vylex",
    });
    logger.info("Creating a new connection.");
    return;
  }
  logger.info("Using an existing connection");
};
