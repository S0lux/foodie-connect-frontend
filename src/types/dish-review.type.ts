import { z } from "zod";

export const DishReviewSchema = z.object({
  reviewId: z.string(),
  dishId: z.string(),
  author: z.object({
    id: z.string(),
    userName: z.string(),
    displayName: z.string(),
    avatar: z.string().nullable(),
  }),
  rating: z.number(),
  content: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type DishReview = z.infer<typeof DishReviewSchema>;
