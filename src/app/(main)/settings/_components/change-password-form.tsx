"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChangePasswordBodyType } from "@/schema/auth.schema";
import useSetting from "@/hooks/use-setting";
import { toast } from "@/hooks/use-toast";
import { ErrorType } from "@/types/error.type";

const formSchema = z
  .object({
    oldPassword: z.string().min(8),
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
    confirmPassword: z
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
  .superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });
type formSchemaType = z.infer<typeof formSchema>;

export default function ChangePasswordForm({
  type,
  id,
}: {
  type: string;
  id: string;
}) {
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const headChangePassword = useSetting.useHeadChangePassword();
  const userChangePassword = useSetting.useUserChangePassword();

  async function changePassword(values: ChangePasswordBodyType) {
    if (loading) return;
    setLoading(true);
    if (type === "Head") {
      try {
        await headChangePassword.mutateAsync({ headId: id, body: values });
        toast({
          title: "Success",
          description: "Password changed successfully",
        });
        form.reset();
      } catch (error) {
        toast({
          title: "Error",
          description: (error as ErrorType).message,
          variant: "destructive",
        });
      }
    } else {
      try {
        await userChangePassword.mutateAsync({ userId: id, body: values });
        toast({
          title: "Success",
          description: "Password changed successfully",
        });
        form.reset();
      } catch (error) {
        toast({
          title: "Error",
          description: (error as ErrorType).message,
          variant: "destructive",
        });
      }
    }
    setLoading(false);
  }

  async function submitForm(data: formSchemaType) {
    const changePasswordData: ChangePasswordBodyType = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };
    changePassword(changePasswordData);
  }

  const onSubmit = form.handleSubmit((values) => {
    submitForm(values);
  });
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={onSubmit}
          className="w-full flex-shrink-0 space-y-4"
          noValidate
        >
          <h1 className="text-center text-2xl font-bold">Change password</h1>
          <p className="text-gray-600">
            Please enter your current password and a new password that meets the
            criteria.
          </p>
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-bold">
                  Old Password
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-[48px]"
                    placeholder="Enter your password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-bold">
                  New Password
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-[48px]"
                    placeholder="Enter your new password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-bold">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-[48px]"
                    placeholder="Confirm your new password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="button"
            className="!mt-8 h-[48px] w-full text-xl"
            disabled={loading}
            onClick={onSubmit}
          >
            {loading ? "Loading..." : "Change Password"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
