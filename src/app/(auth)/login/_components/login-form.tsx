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
import useAuth from "@/hooks/use-auth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { ErrorType } from "@/types/error.type";
import { Info, Store, Utensils } from "lucide-react";
import { Card, CardContent, CardDescription } from "@/components/ui/card";

const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [infoHover, setInfoHover] = useState(false);
  const loginAction = useAuth.useLogin();
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      loginType: "Head",
      userName: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginBodyType) {
    if (loading) return;
    setLoading(true);
    try {
      await loginAction.mutateAsync(values);
      toast({
        title: "Success",
        description: "Logged in successfully",
      });
      router.push("/");
    } catch (error) {
      toast({
        title: "Error",
        description: (error as ErrorType).message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
                    <SelectTrigger className="relative flex h-[48px] items-center">
                      <div className="flex items-center gap-2">
                        {field.value === "Head" && (
                          <Store
                            size={20}
                            className="opacity-70"
                            onMouseEnter={() => setInfoHover(true)}
                            onMouseLeave={() => setInfoHover(false)}
                          ></Store>
                        )}
                        {field.value === "User" && (
                          <Utensils
                            size={20}
                            className="opacity-70"
                            onMouseEnter={() => setInfoHover(true)}
                            onMouseLeave={() => setInfoHover(false)}
                          ></Utensils>
                        )}
                        {infoHover && (
                          <Card className="absolute -bottom-[6.5rem] -left-2 h-auto min-h-[5rem] w-60 border-none p-3">
                            <CardDescription className="whitespace-normal break-words text-start text-sm">
                              {field.value === "Head" && (
                                <div className="flex flex-col space-y-2">
                                  <Store size={20}></Store>
                                  <span>
                                    HEAD can manage the restaurant and its menu.
                                    Recommended for restaurant owners.
                                  </span>
                                </div>
                              )}
                              {field.value === "User" && (
                                <div className="flex flex-col space-y-2">
                                  <Utensils size={20}></Utensils>
                                  <span>
                                    USER can browse menus and leave reviews in
                                    restaurants. Recommended for regular users.
                                  </span>
                                </div>
                              )}
                            </CardDescription>
                          </Card>
                        )}

                        <SelectValue placeholder="Select type" />
                      </div>
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
