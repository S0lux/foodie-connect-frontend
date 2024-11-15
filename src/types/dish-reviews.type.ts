import { z } from "zod";
import { DishReviewSchema } from "./dish-review.type";

export const DishReviewsShema = z.object({
  myReview: DishReviewSchema.nullable(),
  otherReviews: z.array(DishReviewSchema),
});

export type DishReviews = z.infer<typeof DishReviewsShema>;
