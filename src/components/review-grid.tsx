"use client";
import { ReviewDto } from "@/app/(main)/restaurant-detail/[id]/page";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ArrowDown, ArrowUp, StarIcon, Store, Utensils } from "lucide-react";
import ReviewForm, { ReviewEnum } from "./dish-review-form";
import { ReviewCard } from "./review-card";
import { DishReview } from "@/types/dish-review.type";
import useRestaurantDetail from "@/lib/use-restaurant-detail";
import { RestaurantReview } from "@/types/restaurant-review.type";
import RestaurantReviewForm from "./restaurant-review-form";

const ReviewGrid = ({ restaurantId }: { restaurantId: string }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { data: restaurantReviews, refetch } =
    useRestaurantDetail.useGetRestaurantReview(restaurantId);

  console.log(restaurantId);

  return (
    <Card className="space-y-3 border-none px-2 py-2 md:px-7">
      <CardTitle className="flex flex-row items-center justify-between border-b border-muted-foreground/30 py-3 text-xl">
        <span className="px-4 md:px-0">Reviews</span>
      </CardTitle>
      <CardContent className="flex flex-col space-y-5 md:flex-row">
        {/* reviews statistics */}
        <ReviewStatistics></ReviewStatistics>

        {/* reviews */}
        <div className="relative flex flex-col space-y-5 md:w-1/2">
          {/* leave a review */}
          {restaurantReviews?.myReview ? (
            <ReviewCard
              reviewType={ReviewEnum.RESTAURANT}
              review={restaurantReviews.myReview}
            />
          ) : (
            <RestaurantReviewForm
              id={restaurantId}
              refetch={refetch}
            ></RestaurantReviewForm>
          )}

          {restaurantReviews &&
            restaurantReviews?.otherReviews.map(
              (review: RestaurantReview, index: number) => {
                return (
                  <ReviewCard
                    reviewType={ReviewEnum.RESTAURANT}
                    key={index}
                    review={review}
                  ></ReviewCard>
                );
              },
            )}
        </div>
      </CardContent>
      <CardFooter>
        <div
          className="flex w-full cursor-pointer flex-row justify-center space-x-1 rounded py-2 text-primary md:hover:bg-muted/10"
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
        >
          <span>{menuOpen ? "Less" : "More"} comments</span>
          {menuOpen ? <ArrowUp /> : <ArrowDown />}
        </div>
      </CardFooter>
    </Card>
  );
};

const ReviewStatistics = () => {
  return (
    <div className="mt-5 md:sticky md:top-28 md:w-1/2">
      <div className="mt-5 grid grid-rows-2 md:sticky md:top-28 md:grid-cols-3">
        {/* overal rating */}
        <div className="flex flex-col place-self-center">
          <span className="text-center text-5xl font-bold text-primary">
            4.3
          </span>
          <div className="flex flex-row justify-center text-primary">
            <StarIcon size={15}></StarIcon>
            <StarIcon size={15}></StarIcon>
            <StarIcon size={15}></StarIcon>
            <StarIcon size={15}></StarIcon>
            <StarIcon size={15}></StarIcon>
          </div>
          <span className="mt-2 text-center text-sm text-foreground">
            10 reviews
          </span>
        </div>

        {/* rating statistics */}
        <div className="flex flex-col md:col-span-2">
          <RatingStats label="5" percentage={"60"}></RatingStats>
          <RatingStats label="4" percentage={"20"}></RatingStats>
          <RatingStats label="3" percentage={"10"}></RatingStats>
          <RatingStats label="2" percentage={"5"}></RatingStats>
          <RatingStats label="1" percentage={"5"}></RatingStats>
        </div>
      </div>
    </div>
  );
};

const RatingStats = ({
  label,
  percentage,
}: {
  label: string;
  percentage: string;
}) => {
  return (
    <div className="relative flex w-full flex-row items-center space-x-3 md:pr-10">
      <span>{label}</span>
      <div className="relative h-2 w-full rounded bg-background">
        <div
          className="absolute left-0 top-0 h-2 rounded bg-primary"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ReviewGrid;
