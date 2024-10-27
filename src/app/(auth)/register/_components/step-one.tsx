"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export function StepOne() {
  const { control } = useFormContext();
  return (
    <>
      <h1 className="p-4 text-center text-5xl font-bold text-primary">
        Register
      </h1>

      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[16px] font-bold">Email</FormLabel>
            <FormControl>
              <Input
                className="h-[48px] rounded-xl px-4 text-[16px] hover:border-foreground/10 hover:bg-foreground/5"
                placeholder="Enter your email"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
