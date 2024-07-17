import { z } from "zod";

export const updateUserDtoSchema = z.object({
  id: z.number().int(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  tokenUser: z.object({
    id: z.number().int(),
    email: z.string().email(),
    name: z.string(),
  }),
});

export type UpdateUserUseCaseDto = z.infer<typeof updateUserDtoSchema>;
