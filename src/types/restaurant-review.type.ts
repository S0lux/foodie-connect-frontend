import { z } from "zod";

export const RestaurantReviewSchema = z.object({
  reviewId: z.string(),
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

export type RestaurantReview = z.infer<typeof RestaurantReviewSchema>;
