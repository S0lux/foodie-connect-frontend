import { z } from "zod";

export const ReviewSchema = z.object({
  rating: z.number().min(1).max(5).default(1),
  content: z.string().min(1).max(500),
});

export type ReviewBody = z.TypeOf<typeof ReviewSchema>;
