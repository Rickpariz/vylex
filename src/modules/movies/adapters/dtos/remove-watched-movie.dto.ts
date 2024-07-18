import { z } from "zod";
import { userSchema } from "../../../../shared/adapters/dtos/user-schema";

export const removeWatchedMovieDtoSchema = z.object({
  movieId: z.number(),
  user: userSchema,
});

export type RemoveWatchedMovieDto = z.infer<typeof removeWatchedMovieDtoSchema>;
