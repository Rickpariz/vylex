import { AxiosError } from "axios";
import logger from "../logger";
import { BadRequest } from "../http";

export function axiosError(error: unknown) {
  if (error instanceof AxiosError) {
    logger.error("Axios error: ", error.response?.data);
    throw BadRequest(error.response?.data);
  }
}
