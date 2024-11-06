"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { LoginBody, LoginBodyType } from "@/schema/auth.schema";
import { useState } from "react";
import authAction from "@/apis/auth.api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const loginAction = authAction.useLogin();
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      loginType: "Head",
      userName: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginBodyType) {
    // if (loading) return;
    // setLoading(true);
    // try {

    //   await loginAction.mutateAsync(values);
    //   toast({
    //     title: "Success",
    //     description: "Logged in successfully",
    //   });
    //   router.push("/");
    // } catch (error: any) {
    //   console.error({ error });
    //   switch (error.status) {
    //     case 400:
    //       toast({
    //         title: "Error",
    //         description: "Request body is malformed",
    //         variant: "destructive",
    //       });
    //       break;
    //     case 401:
    //       toast({
    //         title: "Error",
    //         description: "Invalid credentials",
    //         variant: "destructive",
    //       });
    //       break;
    //     default:
    //       toast({
    //         title: "Error",
    //         description: "An error occurred",
    //         variant: "destructive",
    //       });
    //       break;
    //   }
    // } finally {
    //   setLoading(false);
    // }
    const result = await loginAction.mutateAsync(values);
    console.log(result);
  }

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
            name="loginType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-bold">Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="flex h-[48px] items-center">
                      {" "}
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem className="hover:cursor-pointer" value="Head">
                        Head
                      </SelectItem>
                      <SelectItem className="hover:cursor-pointer" value="User">
                        User
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Select the type of user you are logging in as (Head or User)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-bold">
                  User Name
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-[48px] rounded-xl px-4 text-[16px] hover:border-foreground/10 hover:bg-foreground/5"
                    placeholder="Enter your user name"
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

          {
            <Button
              className="h-[48px] w-full rounded-xl bg-primary text-[16px] font-bold text-white hover:bg-primary/90"
              disabled={loading}
              type="submit"
            >
              Log in
            </Button>
          }
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
