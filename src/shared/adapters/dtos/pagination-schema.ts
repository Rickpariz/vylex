import { z } from "zod";

export const paginationSchema = z.object({
  pageSize: z.number(),
  pageNumber: z.number(),
});
