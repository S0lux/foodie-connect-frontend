"use client";
import { twMerge } from "tailwind-merge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Star, Store, Utensils } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ReviewTag } from "./review-card";
import { Select, SelectContent } from "@radix-ui/react-select";
import { useState } from "react";
import { Controller, Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReviewBody, ReviewSchema } from "@/schema/review.schema";
import { FormField } from "./ui/form";
import { register } from "module";
import { FORMERR } from "dns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import http from "@/lib/http";
import { set } from "date-fns";
import { toast } from "@/hooks/use-toast";
import useDishReview from "@/lib/use-dish-review";
import useAuth from "@/hooks/use-auth";
import useRestaurantDetail from "@/lib/use-restaurant-detail";

export enum ReviewEnum {
  RESTAURANT,
  DISH,
}

const DishReviewForm = ({
  id,
  className,
}: {
  id: string;
  className?: string;
}) => {
  //handle rating animation
  const [rating, setRating] = useState(1);
  const [loading, setLoading] = useState(false);
  const submitDishReviewAction = useDishReview.useCreateDishReview();
  const { data: user } = useAuth.useGetSession();

  // const emptyStars = Array.from({ length: 5 - rating }, (_, i) => (
  //   <Star
  //     onMouseEnter={() => {
  //       if (rating != i + rating + 1) setRating(i + rating + 1);
  //     }}
  //     className="hover:cursor-pointer"
  //   />
  // ));
  // const goldenStars = Array.from({ length: rating }, (_, i) => (
  //   <Star
  //     fill="#000000"
  //     onMouseEnter={() => {
  //       if (rating != i + 1) setRating(i + 1);
  //     }}
  //     className="hover:cursor-pointer"
  //   />
  // ));

  const StarRating = ({
    value,
    onChange,
  }: {
    value: number;
    onChange: (value: number) => void;
  }) => {
    const [hover, setHover] = useState<number | null>(1);
    const rating = value;

    const renderStar = (index: number) => {
      const filled = (hover ?? rating) >= index + 1;
      return (
        <Star
          key={index}
          fill={filled ? "#D4AF37" : "none"}
          size={20}
          stroke="#D4AF37"
          className="transition-colors hover:cursor-pointer"
          onMouseEnter={() => setHover(index + 1)}
          onMouseLeave={() => setHover(null)}
          onClick={() => onChange(index + 1)}
        />
      );
    };

    return (
      <div className="flex flex-row">
        {[...Array(5)].map((_, index) => renderStar(index))}
      </div>
    );
  };

  const form = useForm<ReviewBody>({
    resolver: zodResolver(ReviewSchema),
  });

  const onSubmit = async (value: ReviewBody) => {
    setLoading(true);
    try {
      await submitDishReviewAction.mutateAsync({ dishId: id, review: value });
      toast({
        title: "Success",
        description: "Review submitted",
      });
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Card className="relative border-none dark:bg-muted/20">
        <CardHeader className="border-b border-muted-foreground/30 py-2">
          <CardTitle className="flex flex-row items-center justify-between">
            {/* reviewer info */}
            <div className="flex flex-row md:space-x-2">
              <img
                src="https://placehold.co/50x50"
                className="absolute aspect-square size-0 rounded-full md:relative md:size-10"
              ></img>
              <div className="flex flex-col">
                <span className="text-sm">{user?.displayName}</span>
                <span className="text-xs text-muted-foreground">
                  @{user?.userName}
                </span>
              </div>
            </div>

            <Controller
              name="rating"
              control={form.control}
              render={({ field }) => (
                <StarRating
                  value={field.value ? field.value : 1}
                  onChange={field.onChange}
                />
              )}
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-5 flex flex-row">
          {/* review content */}
          <FormField
            control={form.control}
            name="content"
            render={(field) => (
              <Input
                type="text"
                placeholder="Leave your review here!"
                {...form.register("content")}
              ></Input>
            )}
          />
        </CardContent>

        <CardFooter>
          <Button type="submit" disabled={!form.formState.isValid || loading}>
            {loading ? "Loading..." : "Submit"}
          </Button>
        </CardFooter>

        <ReviewTag className="bottom-0 right-7">
          <Utensils size={20}></Utensils>
        </ReviewTag>
      </Card>
    </form>
  );
};

export default DishReviewForm;
