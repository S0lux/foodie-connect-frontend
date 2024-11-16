import { z } from "zod";
import { DishReviewSchema } from "./dish-review.type";
import { RestaurantReviewSchema } from "./restaurant-review.type";

export const RestaurantReviewsSchema = z.object({
  myReview: RestaurantReviewSchema.nullable(),
  otherReviews: z.array(RestaurantReviewSchema),
});

export type RestaurantReviews = z.infer<typeof RestaurantReviewsSchema>;
