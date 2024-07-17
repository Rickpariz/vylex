import { Request } from "express";

export type HttpResponse = {
  statusCode: number;
  body: unknown;
};

export type Handler = (req: Request) => Promise<HttpResponse>;

export interface Controller {
  handle: Handler;
}
