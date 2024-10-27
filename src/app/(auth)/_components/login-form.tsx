"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const LoginBody = z.object({
  username: z.string().max(16),
  password: z.string().min(6),
});

type LoginBodyType = z.infer<typeof LoginBody>;

const LoginForm = () => {
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    console.log(values);
  });

  return (
    <div className="rounded-md pb-12 pl-6 pr-6 pt-4 shadow-2xl md:mt-auto md:pl-12 md:pr-12">
      <h1 className="p-4 text-center text-5xl font-bold text-primary">
        Log in
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex-shrink-0 space-y-4"
          noValidate
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-bold">
                  User Name
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-[48px] rounded-xl px-4 text-[16px] hover:border-foreground/10 hover:bg-foreground/5"
                    placeholder="Enter your email"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-bold">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-[48px] rounded-xl px-4 text-[16px] hover:border-foreground/10 hover:bg-foreground/5"
                    placeholder="Enter your password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center space-x-2">
              <Checkbox className="h-4 w-4 text-2xl" id="remember" />
              <Label
                className="text-sm font-normal opacity-60 hover:cursor-pointer hover:text-primary md:text-[16px]"
                htmlFor="remember"
              >
                Remember me
              </Label>
            </div>
            <Link
              href="#"
              className="text-sm font-normal opacity-60 hover:text-primary hover:underline md:text-[16px]"
            >
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" className="!mt-6 h-[48px] w-full text-2xl">
            Log in
          </Button>
        </form>
      </Form>

      <div className="mt-8 text-center">
        New to Foodie?
        <Link
          href="/register"
          className="ml-2 text-sm font-normal opacity-60 hover:text-primary hover:underline md:text-[16px]"
        >
          Create an account
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
