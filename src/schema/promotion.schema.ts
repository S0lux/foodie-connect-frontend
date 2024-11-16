import { z } from "zod";

export const CreatePromotionDetails = z
  .object({
    dishId: z.string(),
    promotionalPrice: z.number(),
  })
  .strict();

export const CreatePromotionBody = z
  .object({
    name: z.string().max(128).nullable(),
    description: z.string().max(2048).nullable(),
    targets: z.array(z.string()).nullable(),
    promotionDetails: z.array(CreatePromotionDetails).nullable(),
    beginsAt: z.coerce.date(),
    endsAt: z.coerce.date(),
  })
  .strict();

export type CreatePromotionBodyType = z.TypeOf<typeof CreatePromotionBody>;
