import { z } from "zod";

export const CreateSocialBody = z.object({
  platformType: z.enum(["Facebook", "Twitter", "Tiktok"]),
  url: z.string().url().min(1),
});

export const UpdateSocialBody = z.object({
  id: z.string().uuid(),
  platformType: z.enum(["Facebook", "Twitter", "Tiktok"]),
  url: z.string().url().min(1),
});

export type CreateSocialBodyType = z.TypeOf<typeof CreateSocialBody>;

export type UpdateSocialBodyType = z.TypeOf<typeof UpdateSocialBody>;
