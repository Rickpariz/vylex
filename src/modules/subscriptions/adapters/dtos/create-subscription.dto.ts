import { z } from "zod";

export const createSubscriptionDtoSchema = z.object({
  package: z.string(),
  users: z.array(z.number()).min(1),
});

export type CreateSubscriptionDto = z.infer<typeof createSubscriptionDtoSchema>;
