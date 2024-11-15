import { z } from "zod";

export const CreateDishCategoriesBody = z
  .object({
    categoryName: z.string().min(1).max(50),
  })
  .strict();

export const UpdateDishCategoryBody = z.object({
  newName: z.string().min(1).max(50),
});

export type CreateDishCategoriesBodyType = z.TypeOf<
  typeof CreateDishCategoriesBody
>;

export type UpdateDishCategoryBodyType = z.TypeOf<
  typeof UpdateDishCategoryBody
>;
