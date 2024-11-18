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
import { on } from "events";

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
  onSuccess,
  type,
  id,
}: {
  onSuccess: () => void;
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
        onSuccess();
      } catch (error) {
        switch ((error as ErrorType).code) {
          case "PASSWORD_NOT_VALID":
            toast({
              title: "Error",
              description: "Password not valid",
              variant: "destructive",
            });
            break;
          case "NOT_AUTHENTICATED":
            toast({
              title: "Error",
              description: "You are not authenticated",
              variant: "destructive",
            });
            break;
          case "NOT_AUTHORIZED":
            toast({
              title: "Error",
              description: "You are not authorized",
              variant: "destructive",
            });
            break;
          case "PASSWORD_MISMATCH":
            toast({
              title: "Error",
              description: "Old password is incorrect",
              variant: "destructive",
            });
          default:
            toast({
              title: "Error",
              description: "Something went wrong",
              variant: "destructive",
            });
            break;
        }
      }
    } else {
      try {
        await userChangePassword.mutateAsync({ userId: id, body: values });
        toast({
          title: "Success",
          description: "Password changed successfully",
        });
        onSuccess();
      } catch (error) {
        switch ((error as ErrorType).code) {
          case "PASSWORD_NOT_VALID":
            toast({
              title: "Error",
              description: "Password not valid",
              variant: "destructive",
            });
            break;
          case "NOT_AUTHENTICATED":
            toast({
              title: "Error",
              description: "You are not authenticated",
              variant: "destructive",
            });
            break;
          case "NOT_AUTHORIZED":
            toast({
              title: "Error",
              description: "You are not authorized",
              variant: "destructive",
            });
            break;
          case "PASSWORD_MISMATCH":
            toast({
              title: "Error",
              description: "Old password is incorrect",
              variant: "destructive",
            });
          default:
            toast({
              title: "Error",
              description: "Something went wrong",
              variant: "destructive",
            });
            break;
        }
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
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="w-full flex-shrink-0 space-y-4"
        noValidate
      >
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
                  className="h-[60px]"
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
                  className="h-[60px]"
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
                  className="h-[60px]"
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
          type="submit"
          className="!mt-8 h-[60px] w-full text-xl"
          disabled={loading}
        >
          {loading ? "Loading..." : "Change Password"}
        </Button>
      </form>
    </Form>
  );
}
