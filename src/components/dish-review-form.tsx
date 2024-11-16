"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Star, Utensils } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ReviewTag } from "./review-card";
import { useState } from "react";
import { Controller, Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReviewBody, ReviewSchema } from "@/schema/review.schema";
import { FormField } from "./ui/form";

import { toast } from "@/hooks/use-toast";
import useDishReview from "@/hooks/use-dish-review";
import useAuth from "@/hooks/use-auth";
import { Textarea } from "./ui/textarea";
import { DishReview } from "@/types/dish-review.type";

export enum ReviewEnum {
  RESTAURANT,
  DISH,
}

const DishReviewForm = ({
  id,
  className,
  isEditting,
  review,
  refetch,
  onCancelReview,
}: {
  id?: string;
  className?: string;
  isEditting: boolean;
  review: DishReview | null | undefined;
  refetch?: Array<() => void>;
  onCancelReview: () => void;
}) => {
  //handle rating animation
  const [rating, setRating] = useState(1);
  const [loading, setLoading] = useState(false);
  const createDishReviewAction = useDishReview.useCreateDishReview();
  const updateDishReviewAction = useDishReview.useUpdateDishReview();
  const { data: user } = useAuth.useGetSession();

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
      if (isEditting && id && review) {
        console.log("update hit");
        await updateDishReviewAction.mutateAsync({
          dishId: id,
          reviewId: review?.reviewId,
          review: value,
        });
      }
      if (!isEditting && id) {
        console.log("create hit");
        await createDishReviewAction.mutateAsync({
          dishId: id,
          review: value,
        });
      }
      toast({
        title: "Success",
        description: "Review submitted",
      });
    } catch (err) {
      console.error(err);
    }
    refetch && refetch.forEach((func) => func());
    onCancelReview();
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
              <Textarea
                placeholder="Leave your review here!"
                {...form.register("content")}
              >
                {review && review.content}
              </Textarea>
            )}
          />
        </CardContent>

        <CardFooter className="flex flex-row space-x-3">
          <Button type="submit" disabled={!form.formState.isValid || loading}>
            {loading ? "Loading..." : "Submit"}
          </Button>
          {isEditting && (
            <Button onClick={onCancelReview} variant={"ghost"}>
              Cancel
            </Button>
          )}
        </CardFooter>

        <ReviewTag className="bottom-0 right-7">
          <Utensils size={20}></Utensils>
        </ReviewTag>
      </Card>
    </form>
  );
};

export default DishReviewForm;
