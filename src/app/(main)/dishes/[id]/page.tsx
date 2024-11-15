"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Star, StarIcon } from "lucide-react";

import ReviewForm, { ReviewEnum } from "@/components/dish-review-form";
import { ReviewCard } from "@/components/review-card";
import http from "@/lib/http";
import { Dish } from "@/types/dish.type";
import { DishReview } from "@/types/dish-review.type";
import useDishReview from "@/lib/use-dish-review";
import DishReviewForm from "@/components/dish-review-form";

export default function DishDetailPage({ params }: { params: { id: string } }) {
  // helper functions
  const { data: dishReviewsData } = useDishReview.useGetDishReview(params.id);
  const { data: dishInfo } = useDishReview.useGetDishInfo(params.id);

  const formatedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(dishInfo?.price ? dishInfo.price : 0);

  return (
    <div className="relative flex flex-col gap-5 md:grid md:grid-cols-2">
      {/* dish info */}
      <Card className="top-20 flex h-fit flex-col space-x-5 border-none md:sticky md:flex-row">
        <div className="rounded md:h-52 md:w-96">
          <img
            src="https://placehold.co/230x200"
            className="size-full rounded"
          ></img>
        </div>

        <div className="w-full space-y-1 py-5">
          {/* name */}
          <CardTitle className="text-xl">{dishInfo?.name}</CardTitle>

          <CardDescription className="max-w-64 md:max-w-none">
            {dishInfo?.description}
          </CardDescription>

          {/* price */}
          <span className="font-bold text-primary">{formatedPrice}</span>

          <br></br>

          <div className="flex flex-row text-primary">
            {dishInfo &&
              Array.from(
                {
                  length:
                    dishInfo.scoreOverview.averageRating > 0
                      ? dishInfo.scoreOverview.averageRating
                      : 1,
                },
                (_, i) => <Star fill="#D4AF37" stroke="#D4AF37" size={20} />,
              )}
          </div>
        </div>
      </Card>
      {/* dish reviews */}
      <Card className="space-y-3 border-none px-2 py-2 md:px-7">
        <CardTitle className="flex flex-row items-center justify-between border-b border-muted-foreground/30 py-3 text-xl">
          <span className="px-4 md:px-0">Reviews</span>
        </CardTitle>
        <CardContent className="flex flex-col space-y-5 md:flex-row">
          {/* reviews */}
          <div className="relative flex w-full flex-col space-y-5">
            {/* leave a review */}
            {dishReviewsData?.myReview ? (
              <ReviewCard
                review={dishReviewsData.myReview}
                reviewType={ReviewEnum.DISH}
              />
            ) : (
              <DishReviewForm id={dishInfo?.dishId}></DishReviewForm>
            )}

            {dishReviewsData?.otherReviews.map(
              (review: DishReview, index: number) => {
                return (
                  <ReviewCard
                    reviewType={ReviewEnum.DISH}
                    key={index}
                    review={review}
                  >
                    {review.content}
                  </ReviewCard>
                );
              },
            )}
          </div>
        </CardContent>
        {/* <CardFooter>
          <div
            className="flex w-full cursor-pointer flex-row justify-center space-x-1 rounded py-2 text-primary md:hover:bg-muted/10"
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          >
            <span>{menuOpen ? "Less" : "More"} comments</span>
            {menuOpen ? <ArrowUp /> : <ArrowDown />}
          </div>
        </CardFooter> */}
      </Card>
    </div>
  );
}
