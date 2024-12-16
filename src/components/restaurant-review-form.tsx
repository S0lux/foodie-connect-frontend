"use client";
import { twMerge } from "tailwind-merge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Star, Store } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ReviewTag } from "./review-card";
import { useEffect, useState } from "react";
import { Controller, Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReviewBody, ReviewSchema } from "@/schema/review.schema";
import { FormField } from "./ui/form";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import useAuth from "@/hooks/use-auth";
import useRestaurantDetail from "@/hooks/use-restaurant-detail";
import { Textarea } from "./ui/textarea";
import { RestaurantReview } from "@/types/restaurant-review.type";
import { ErrorType } from "@/types/error.type";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getAvatarUrl, getInitials } from "@/lib/handleImage";
import { set } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export enum ReviewEnum {
  RESTAURANT,
  DISH,
}

const RestaurantReviewForm = ({
  id,
  className,
  refetch,
  isEditting,
  review,
  onCancelReview,
}: {
  id: string;
  className?: string;
  refetch: Array<() => void>;
  isEditting: boolean;
  review: RestaurantReview | null | undefined;
  onCancelReview: () => void;
}) => {
  //handle rating animation
  const { data: user } = useAuth.useGetSession();
  const [loading, setLoading] = useState(false);

  const createRestaurantReviewAction =
    useRestaurantDetail.useCreateRestaurantReview();
  const updateRestaurantReviewAction =
    useRestaurantDetail.useUpdateRestauantReview();

  const StarRating = ({
    value,
    onChange,
  }: {
    value: number;
    onChange: (value: number) => void;
  }) => {
    const [hover, setHover] = useState<number | null>(1);
    const client = useQueryClient();
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
      if (isEditting && review) {
        await updateRestaurantReviewAction.mutateAsync({
          restaurantId: id,
          reviewId: review?.reviewId,
          review: value,
        });
      } else {
        await createRestaurantReviewAction.mutateAsync({
          restaurantId: id,
          review: value,
        });
      }
      toast({
        title: "Success",
        description: "Review submitted",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: (error as ErrorType).message,
        variant: "destructive",
      });
    } finally {
      refetch.forEach((func) => {
        func();
      });
      onCancelReview();
      setLoading(false);
    }
  };

  if (!user)
    return (
      <Link href={"/login"}>
        <Card className="mb-2 flex items-center border-none py-2 dark:bg-muted/20 md:px-6">
          <Image
            src="/images/logo-dark.png"
            width={50}
            height={50}
            alt="logo-light.png"
            className="absolute size-0 md:relative md:size-auto"
          ></Image>
          <CardContent className="flex w-full items-center p-0">
            <CardTitle className="w-full text-center text-sm text-primary xl:text-lg">
              Login now to leave a review!
            </CardTitle>
          </CardContent>
        </Card>
      </Link>
    );

  if (!user.emailConfirmed)
    return (
      <Link href={"/settings"}>
        <Card className="mb-2 flex items-center border-none py-2 dark:bg-muted/20 md:px-6">
          <Image
            src="/images/logo-dark.png"
            width={50}
            height={50}
            alt="logo-light.png"
            className="absolute size-0 md:relative md:size-auto"
          ></Image>
          <CardContent className="flex w-full items-center p-0">
            <CardTitle className="w-full text-center text-sm text-primary xl:text-lg">
              Verify your email to leave a review!
            </CardTitle>
          </CardContent>
        </Card>
      </Link>
    );

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Card className="relative mb-2 border-none dark:bg-muted/20">
        <CardHeader className="border-b border-muted-foreground/30 py-2">
          <CardTitle className="flex flex-row items-center justify-between">
            {/* reviewer info */}
            <div className="flex flex-row md:space-x-2">
              <Avatar>
                <AvatarImage
                  src={getAvatarUrl(user?.avatar, user?.displayName)}
                  alt={user?.displayName}
                />
                <AvatarFallback>
                  {getInitials(user?.displayName)}
                </AvatarFallback>
              </Avatar>

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
                {isEditting && review?.content}
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

        <ReviewTag className="bottom-0 right-7 rounded-t">
          <Store size={20}></Store>
        </ReviewTag>
      </Card>
    </form>
  );
};

export default RestaurantReviewForm;
