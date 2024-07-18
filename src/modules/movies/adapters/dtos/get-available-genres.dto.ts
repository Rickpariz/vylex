import { z } from "zod";

export const getAvailableGenresDtoSchema = z.object({
  userId: z.number(),
});

export type GetAvailableGenresDto = z.infer<typeof getAvailableGenresDtoSchema>;
