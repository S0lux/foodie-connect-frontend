import { z } from "zod";

export const LoginBody = z
  .object({
    loginType: z.enum(["Head", "User"]),
    userName: z.string().min(1),
    password: z
      .string()
      .min(6, "Password must have at least 6 characters.")
      .regex(/[A-Z]/, "Password must contain at least 1 capital letter.")
      .regex(/[a-z]/, "Password must contain at least 1 lower case letter.")
      .regex(/[0-9]/, "Password must contain at least 1 number.")
      .regex(
        /[#?!@$%^&*-]/,
        "Password must contain at least 1 special character.",
      ),
  })
  .strict();

export const RegisterBody = z
  .object({
    displayName: z.string().min(1).max(50),
    userName: z.string().min(1).max(16),
    phoneNumber: z
      .string()
      .min(10)
      .max(10)
      .regex(/^[0-9]+$/, "Invalid phone number"),
    email: z.string().email(),
    password: z
      .string()
      .min(6, "Password must have at least 6 characters.")
      .regex(/[A-Z]/, "Password must contain at least 1 capital letter.")
      .regex(/[a-z]/, "Password must contain at least 1 lower case letter.")
      .regex(/[0-9]/, "Password must contain at least 1 number.")
      .regex(
        /[#?!@$%^&*-]/,
        "Password must contain at least 1 special character.",
      ),
  })
  .strict();

export const ChangePasswordBody = z.object({
  oldPassword: z
    .string()
    .min(6, "Password must have at least 6 characters.")
    .regex(/[A-Z]/, "Password must contain at least 1 capital letter.")
    .regex(/[a-z]/, "Password must contain at least 1 lower case letter.")
    .regex(/[0-9]/, "Password must contain at least 1 number.")
    .regex(
      /[#?!@$%^&*-]/,
      "Password must contain at least 1 special character.",
    ),
  newPassword: z
    .string()
    .min(6, "Password must have at least 6 characters.")
    .regex(/[A-Z]/, "Password must contain at least 1 capital letter.")
    .regex(/[a-z]/, "Password must contain at least 1 lower case letter.")
    .regex(/[0-9]/, "Password must contain at least 1 number.")
    .regex(
      /[#?!@$%^&*-]/,
      "Password must contain at least 1 special character.",
    ),
});

export const VerifyEmailBody = z.object({
  emailToken: z.string(),
});

export type LoginBodyType = z.TypeOf<typeof LoginBody>;
export type RegisterBodyType = z.TypeOf<typeof RegisterBody>;
export type ChangePasswordBodyType = z.TypeOf<typeof ChangePasswordBody>;
export type VerifyEmailBodyType = z.TypeOf<typeof VerifyEmailBody>;
