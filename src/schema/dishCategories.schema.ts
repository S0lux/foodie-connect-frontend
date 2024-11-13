import { z } from "zod";

export const CreateDishCategoriesBody = z
  .object({
    categoryName: z.string().min(1).max(50),
  })
  .strict();

export type CreateDishCategoriesBodyType = z.TypeOf<
  typeof CreateDishCategoriesBody
>;
