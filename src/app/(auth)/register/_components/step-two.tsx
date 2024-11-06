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

export function StepTwo() {
  const { control } = useFormContext();
  return (
    <>
      <h1 className="p-4 text-center text-5xl font-bold text-primary">
        Register
      </h1>
      <FormField
        control={control}
        name="displayName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[16px] font-bold">
              Display Name
            </FormLabel>
            <FormControl>
              <Input
                className="h-[48px] rounded-xl px-4 text-[16px] hover:border-foreground/10 hover:bg-foreground/5"
                placeholder="Enter your full name"
                type="text"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[16px] font-bold">Phone</FormLabel>
            <FormControl>
              <Input
                className="h-[48px] rounded-xl px-4 text-[16px] hover:border-foreground/10 hover:bg-foreground/5"
                placeholder="Enter your phone"
                type="text"
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
