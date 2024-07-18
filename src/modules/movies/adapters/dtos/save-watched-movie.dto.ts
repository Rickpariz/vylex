import { z } from "zod";
import { userSchema } from "../../../../shared/adapters/dtos/user-schema";

export const watchedMovieDtoSchema = z.object({
  movieId: z.number(),
  user: userSchema,
});

export type WatchedMovieDto = z.infer<typeof watchedMovieDtoSchema>;
