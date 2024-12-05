"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Percent, Star, StarHalf, StarIcon, Tags } from "lucide-react";

import ReviewForm, { ReviewEnum } from "@/components/dish-review-form";
import { ReviewCard, ReviewTag } from "@/components/review-card";
import http from "@/lib/http";
import { Dish } from "@/types/dish.type";
import { DishReview } from "@/types/dish-review.type";
import useDishReview from "@/hooks/use-dish-review";
import DishReviewForm from "@/components/dish-review-form";
import { useState } from "react";
import Image from "next/image";
import { getDefaultImageUrl } from "@/lib/handleImage";
import { Badge } from "@/components/ui/badge";
import PromotionItem from "@/components/promotion-item";
import { truncate } from "@/components/restaurant-card";
import usePromotion from "@/hooks/use-promotion";
import Link from "next/link";

export default function DishDetailPage({ params }: { params: { id: string } }) {
  const [isEditting, setEditting] = useState(false);

  // helper functions
  const { data: dishReviewsData, refetch: refetchDishReview } =
    useDishReview.useGetDishReview(params.id);
  const {
    data: dishInfo,
    refetch: refetchDishInfo,
    isError: dishInfoHasErr,
    error: dishInfoErr,
    isLoading: dishInfoLoading,
  } = useDishReview.useGetDishInfo(params.id);
  const promotionalPrices = dishInfo?.promotions
    ? dishInfo.promotions
        .filter((promo) => new Date(promo.endsAt) > new Date())
        .map((promo) => promo.promotionalPrice)
    : [0];
  const minPrice = Math.min(...promotionalPrices);

  const formatedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(dishInfo?.price ?? 0);
  const formatedMinPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(minPrice);

  const halfStar =
    dishInfo &&
    dishInfo?.scoreOverview.averageRating %
      Math.round(dishInfo?.scoreOverview.averageRating) >
      0.5;
  console.log(dishInfo?.promotions);
  return (
    <div className="relative flex flex-col gap-5 md:grid md:grid-cols-2">
      <div className="relative flex flex-col space-y-5 md:sticky md:top-28">
        {/* dish info */}
        <Card
          key={dishInfo?.dishId}
          className="flex h-fit w-full flex-col border-none md:sticky md:top-20 md:grid md:grid-flow-row md:grid-cols-3"
        >
          <div className="relative h-44 md:h-auto">
            <Image
              src={
                getDefaultImageUrl(
                  dishInfo?.imageId ? [dishInfo.imageId] : [],
                  dishInfo?.name ? dishInfo.name : "",
                ) || "https://placehold.co/230x150"
              }
              alt={dishInfo?.name ? dishInfo.name : ""}
              layout="fill"
              objectFit="cover"
              className="rounded-t"
            />
          </div>
          <div className="relative col-span-2">
            <CardContent className="flex flex-col space-y-2 py-4">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col items-start">
                  <CardTitle className="">
                    {dishInfoLoading
                      ? "Loading..."
                      : dishInfoErr
                        ? dishInfoErr.message
                        : dishInfo?.name}
                  </CardTitle>
                  {!dishInfoHasErr && !dishInfoLoading && (
                    <CardDescription className="text-primarys flex flex-col font-semibold">
                      <span
                        className={
                          dishInfo?.promotions && dishInfo.promotions.length > 0
                            ? "text-xs text-muted-foreground line-through"
                            : ""
                        }
                      >
                        {formatedPrice}
                      </span>
                      {dishInfo && dishInfo.promotions.length > 0 && (
                        <span className="text-base text-accent">
                          {formatedMinPrice}
                        </span>
                      )}
                    </CardDescription>
                  )}
                </div>
                <CardDescription className="text-sm">
                  <span>5k watching</span>
                </CardDescription>
              </div>

              <CardDescription className="">
                {dishInfo?.description}
              </CardDescription>
              <div className="flex flex-row space-x-2">
                {dishInfo?.categories.map((category) => (
                  <Badge key={category} variant="outline">
                    <span>{category}</span>
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start justify-start space-y-2">
              <div className="flex">
                {dishInfo &&
                  Array.from(
                    {
                      length:
                        dishInfo?.scoreOverview.averageRating > 0
                          ? dishInfo?.scoreOverview.averageRating
                          : 1,
                    },
                    (_, i) => (
                      <Star fill="#D4AF37" stroke="#D4AF37" size={15} />
                    ),
                  )}
                {halfStar && (
                  <StarHalf fill="#D4AF37" stroke="#D4AF37" size={15} />
                )}
              </div>
              <Link
                href={`/restaurant-detail/${dishInfo?.restaurantId}`}
                className="text-primary underline-offset-2 hover:underline"
              >
                View restaurant
              </Link>
            </CardFooter>

            {dishInfo?.promotions && dishInfo.promotions.length > 0 && (
              <ReviewTag className="bottom-0 right-0 rounded-br bg-accent">
                <Percent size={20}></Percent>
              </ReviewTag>
            )}
          </div>
        </Card>

        {/* promotions */}
        <Card className="border-none px-2 py-2 md:sticky md:top-[16.5rem] md:px-7">
          <CardTitle className="flex flex-row items-center border-b border-muted-foreground/30 py-3 text-xl">
            <span className="px-4 md:px-0">Promotions</span>
          </CardTitle>
          <CardContent className="flex flex-col space-y-5 py-5">
            {/* {smaller promotion info} */}

            {dishInfo?.promotions && dishInfo.promotions.length > 0 ? (
              dishInfo.promotions.map((promotion) => {
                return (
                  <PromotionItem
                    promotion={promotion}
                    shortenContent={false}
                  ></PromotionItem>
                );
              })
            ) : (
              <CardDescription className="text-center">
                {dishInfoLoading
                  ? "Loading..."
                  : dishInfoErr
                    ? dishInfoErr.message
                    : "No dish available"}
              </CardDescription>
            )}
          </CardContent>
        </Card>
      </div>

      {/* dish reviews */}
      <Card className="h-fit space-y-3 border-none px-2 py-2 md:px-7">
        <CardTitle className="flex flex-row items-center justify-between border-b border-muted-foreground/30 py-3 text-xl">
          <span className="px-4 md:px-0">Reviews</span>
        </CardTitle>
        <CardContent className="flex flex-col space-y-5 md:flex-row">
          {/* reviews */}
          <div className="relative flex w-full flex-col">
            {/* leave a review */}
            {!dishReviewsData?.myReview || isEditting ? (
              <DishReviewForm
                refetch={[refetchDishInfo, refetchDishReview]}
                id={dishInfo?.dishId}
                review={dishReviewsData?.myReview}
                isEditting={isEditting}
                onCancelReview={() => {
                  setEditting(false);
                }}
              ></DishReviewForm>
            ) : (
              <ReviewCard
                refetch={[refetchDishInfo, refetchDishReview]}
                id={params.id}
                review={dishReviewsData.myReview}
                reviewType={ReviewEnum.DISH}
                onEdit={() => {
                  setEditting(true);
                }}
              />
            )}

            {dishReviewsData?.otherReviews.map(
              (review: DishReview, index: number) => {
                return (
                  <ReviewCard
                    refetch={[refetchDishInfo, refetchDishReview]}
                    id={params.id}
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
