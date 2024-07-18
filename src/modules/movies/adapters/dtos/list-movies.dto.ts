import { z } from "zod";
import { paginationSchema } from "../../../../shared/adapters/dtos/pagination-schema";
import { userSchema } from "../../../../shared/adapters/dtos/user-schema";

export const listMoviesDtoSchema = paginationSchema.extend({
  genres: z.array(z.number()).optional(),
  user: userSchema,
});

export type ListMoviesDto = z.infer<typeof listMoviesDtoSchema>;
