import { z } from "zod";

export const CategorySchema = z.object({
  restaurantId: z.string(),
  categoryName: z.string(),
});

export const ScoreOverviewSchema = z.object({
  averageRating: z.number(),
  fiveStars: z.number(),
  fourStars: z.number(),
  threeStars: z.number(),
  twoStars: z.number(),
  oneStar: z.number(),
});

export const DishSchema = z.object({
  dishId: z.string(),
  restaurantId: z.string(),
  name: z.string(),
  description: z.string(),
  imageId: z.string().nullable(),
  price: z.number(),
  categories: z.array(z.string()),
  scoreOverview: ScoreOverviewSchema,
});

export type Category = z.infer<typeof CategorySchema>;
export type ScoreOverview = z.infer<typeof ScoreOverviewSchema>;
export type Dish = z.infer<typeof DishSchema>;

export const DishBody = z.object({
  restaurantId: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.coerce.number().min(0).positive(),
  categories: z.array(z.string()),
});

export type DishBodyType = z.TypeOf<typeof DishBody>;

export const UpdateDishBody = DishBody.omit({ restaurantId: true });

export type UpdateDishBodyType = z.infer<typeof UpdateDishBody>;
