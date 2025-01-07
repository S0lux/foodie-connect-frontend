import { z } from "zod";

export const CreateServiceBody = z
    .object({
        name: z.string().min(1).max(100),
    })
    .strict();

export const UpdateServiceBody = z.object({
    newName: z.string().min(1).max(100).optional(),
});

export type CreateServiceBodyType = z.TypeOf<typeof CreateServiceBody>;

export type UpdateServiceBodyType = z.TypeOf<typeof UpdateServiceBody>;