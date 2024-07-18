import { z } from "zod";

export const createPackageDtoSchema = z.object({
  name: z.string(),
  genres: z.array(z.string()),
  version: z.number().optional(),
});

export type CreatePackageDto = z.infer<typeof createPackageDtoSchema>;
