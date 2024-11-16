"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DateTimePicker from "@/components/date-time-picker";
import {
  CreatePromotionBody,
  CreatePromotionBodyType,
} from "@/schema/promotion.schema";
import useDishes from "@/hooks/use-dishes";
import { useParams, useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Chip from "@/components/ui/chip";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import usePromotion from "@/hooks/use-promotion";
import { toast } from "@/hooks/use-toast";
import { ErrorType } from "@/types/error.type";

const CreatePromotionForm: React.FC = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { data: dishes } = useDishes.useGetDishes(restaurantId);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const createPromotion = usePromotion.useCreatePromotion();

  const form = useForm<CreatePromotionBodyType>({
    resolver: zodResolver(CreatePromotionBody),
    defaultValues: {
      name: "",
      description: "",
      targets: [],
      promotionDetails: [],
      beginsAt: new Date(),
      endsAt: new Date(),
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    if (loading) return;
    setLoading(true);
    try {
      await createPromotion.mutateAsync({
        restaurantId,
        promotionDetails: values,
      });
      toast({
        title: "Success",
        description: "Promotion added successfully",
      });
      router.push(`/head/${restaurantId}/promotions`);
    } catch (error) {
      console.error({ error });
      switch ((error as ErrorType).code) {
        case "NOT_AUTHENTICATED":
          toast({
            title: "Error",
            description: "You are not authenticated",
            variant: "destructive",
          });
          break;
        case "NOT_OWNER":
          toast({
            title: "Error",
            description: "You are not the owner",
            variant: "destructive",
          });
          break;
        case "PROMOTION_DISH_NOT_FOUND":
          toast({
            title: "Error",
            description: "Promotion dish not found",
            variant: "destructive",
          });
          break;
        default:
          toast({
            title: "Error",
            description: "An error occurred",
            variant: "destructive",
          });
          break;
      }
    } finally {
      setLoading(false);
    }
  });

  return (
    <div className="container mx-auto px-4">
      <div className="mb-4">
        <h1 className="text-center text-3xl font-bold">Add Promotion</h1>
      </div>
      <div className="flex justify-center">
        <Card className="w-full lg:w-2/3 xl:w-1/2">
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={onSubmit} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-[16px] font-bold">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter promotion name"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-[16px] font-bold">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Enter promotion description"
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="targets"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-[16px] font-bold">
                        Targets
                      </FormLabel>
                      <FormControl>
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-wrap gap-2">
                            {field.value?.map((target, index) => (
                              <Chip
                                key={index}
                                label={target}
                                onDelete={() => {
                                  const updatedTargets = field.value?.filter(
                                    (_, i) => i !== index,
                                  );
                                  field.onChange(updatedTargets);
                                }}
                              />
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <Input
                              id="target-input"
                              placeholder="Enter target name and press Enter"
                              onKeyDown={(e) => {
                                if (
                                  e.key === "Enter" &&
                                  e.currentTarget.value.trim() !== ""
                                ) {
                                  e.preventDefault();
                                  field.onChange([
                                    ...(field.value ?? []),
                                    e.currentTarget.value.trim(),
                                  ]);
                                  e.currentTarget.value = "";
                                }
                              }}
                            />
                            <Button
                              type="button"
                              onClick={() => {
                                const inputElement =
                                  document.querySelector<HTMLInputElement>(
                                    "#target-input",
                                  );
                                if (
                                  inputElement &&
                                  inputElement.value.trim() !== ""
                                ) {
                                  field.onChange([
                                    ...(field.value ?? []),
                                    inputElement.value.trim(),
                                  ]);
                                  inputElement.value = "";
                                }
                              }}
                            >
                              Add
                            </Button>
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Enter the target names, separated by commas.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="promotionDetails"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-[16px] font-bold">
                        Promotion Details
                      </FormLabel>
                      <FormControl>
                        <div className="flex flex-col gap-4">
                          {dishes?.map((dish) => (
                            <div
                              key={dish.dishId}
                              className="flex items-center gap-2"
                            >
                              <Checkbox
                                id={dish.dishId}
                                checked={field.value?.some(
                                  (detail) => detail.dishId === dish.dishId,
                                )}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    field.onChange([
                                      ...(field.value ?? []),
                                      {
                                        dishId: dish.dishId,
                                        promotionalPrice: 0,
                                      },
                                    ]);
                                  } else {
                                    field.onChange(
                                      field.value?.filter(
                                        (detail) =>
                                          detail.dishId !== dish.dishId,
                                      ),
                                    );
                                  }
                                }}
                              />
                              <Label htmlFor={dish.dishId}>{dish.name}</Label>
                              {field.value?.some(
                                (detail) => detail.dishId === dish.dishId,
                              ) && (
                                <Input
                                  className="w-32"
                                  type="number"
                                  placeholder="Promotional Price"
                                  value={
                                    field.value.find(
                                      (detail) => detail.dishId === dish.dishId,
                                    )?.promotionalPrice || 0
                                  }
                                  onChange={(e) => {
                                    const updatedDetails = (
                                      field.value ?? []
                                    ).map((detail) =>
                                      detail.dishId === dish.dishId
                                        ? {
                                            dishId: detail.dishId,
                                            promotionalPrice: parseFloat(
                                              e.target.value,
                                            ),
                                          }
                                        : detail,
                                    );
                                    field.onChange(updatedDetails);
                                  }}
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </FormControl>
                      <FormDescription>
                        Select the dishes you want to include in the promotion
                        and enter their promotional prices.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="beginsAt"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-[16px] font-bold">
                        Begins At
                      </FormLabel>
                      <FormControl>
                        <DateTimePicker {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endsAt"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-[16px] font-bold">
                        Ends At
                      </FormLabel>
                      <FormControl>
                        <DateTimePicker {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="mt-6 flex justify-center gap-3">
                  <Button
                    type="button"
                    size={"lg"}
                    variant="outline"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" size={"lg"} disabled={loading}>
                    {loading ? "Adding..." : "Add Promotion"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreatePromotionForm;
