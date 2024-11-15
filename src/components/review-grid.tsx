"use client";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Star, StarIcon } from "lucide-react";
import { ReviewEnum } from "./dish-review-form";
import { ReviewCard } from "./review-card";
import useRestaurantDetail from "@/hooks/use-restaurant-detail";
import { RestaurantReview } from "@/types/restaurant-review.type";
import RestaurantReviewForm from "./restaurant-review-form";
import { Restaurant } from "@/types/restaurant.type";
import { ScoreOverview } from "@/schema/dish.schema";

const ReviewGrid = ({ restaurantId }: { restaurantId: string }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { data: restaurantReviews, refetch: refetchReviews } =
    useRestaurantDetail.useGetRestaurantReview(restaurantId);

  const { data: restaurantDetail, refetch: refetchDetail } =
    useRestaurantDetail.useGetRestaurantDetail(restaurantId);

  const totalReview = getTotalReviews(restaurantDetail?.scoreOverview);

  return (
    <Card className="space-y-3 border-none px-2 py-2 md:px-7">
      <CardTitle className="flex flex-row items-center justify-between border-b border-muted-foreground/30 py-3 text-xl">
        <span className="px-4 md:px-0">Reviews</span>
      </CardTitle>
      <CardContent className="flex flex-col space-y-5 md:flex-row">
        {/* reviews statistics */}
        <ReviewStatistics restaurant={restaurantDetail}></ReviewStatistics>

        {/* reviews */}
        <div className="relative flex flex-col space-y-5 md:w-1/2">
          {/* leave a review */}
          {restaurantReviews?.myReview ? (
            <ReviewCard
              refetch={[refetchDetail, refetchReviews]}
              id={restaurantId}
              reviewType={ReviewEnum.RESTAURANT}
              review={restaurantReviews.myReview}
            />
          ) : (
            <RestaurantReviewForm
              id={restaurantId}
              refetch={[refetchDetail, refetchReviews]}
            ></RestaurantReviewForm>
          )}

          {restaurantReviews &&
            restaurantReviews?.otherReviews.map(
              (review: RestaurantReview, index: number) => {
                return (
                  <ReviewCard
                    refetch={[refetchDetail, refetchReviews]}
                    id={restaurantId}
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

const ReviewStatistics = ({ restaurant }: { restaurant?: Restaurant }) => {
  return (
    <div className="mt-5 md:sticky md:top-28 md:w-1/2">
      <div className="mt-5 grid grid-rows-2 md:sticky md:top-28 md:grid-cols-3">
        {/* overal rating */}

        <div className="flex flex-col place-self-center">
          <span className="text-center text-5xl font-bold text-primary">
            {restaurant?.scoreOverview.averageRating}
          </span>
          <div className="flex flex-row justify-center text-primary">
            {restaurant &&
              Array.from(
                { length: restaurant.scoreOverview.averageRating },
                (_, i) => <Star fill="#D4AF37" stroke="#D4AF37" size={20} />,
              )}
          </div>
          <span className="mt-2 text-center text-sm text-foreground">
            {getTotalReviews(restaurant?.scoreOverview)} reviews
          </span>
        </div>

        {/* rating statistics */}
        <RatingStats scoreOverView={restaurant?.scoreOverview}></RatingStats>
      </div>
    </div>
  );
};

const RatingStats = ({ scoreOverView }: { scoreOverView?: ScoreOverview }) => {
  const [totalReview, setTotal] = useState(0);

  useEffect(() => {
    setTotal(getTotalReviews(scoreOverView));
  }, [totalReview]);

  return (
    <div className="flex flex-col md:col-span-2">
      {/* 5 stars */}
      <div className="relative flex w-full flex-row items-center space-x-3 md:pr-10">
        <span>5</span>
        <div className="relative h-2 w-full rounded bg-background">
          {scoreOverView && (
            <div
              className="absolute left-0 top-0 h-2 rounded bg-primary"
              style={{
                width: `${(scoreOverView.fiveStars / totalReview) * 100}%`,
              }}
            />
          )}
        </div>
      </div>
      {/* 4 stars */}
      <div className="relative flex w-full flex-row items-center space-x-3 md:pr-10">
        <span>4</span>
        <div className="relative h-2 w-full rounded bg-background">
          {scoreOverView && (
            <div
              className="absolute left-0 top-0 h-2 rounded bg-primary"
              style={{
                width: `${(scoreOverView.fourStars / totalReview) * 100}%`,
              }}
            />
          )}
        </div>
      </div>
      {/* 3 stars */}
      <div className="relative flex w-full flex-row items-center space-x-3 md:pr-10">
        <span>3</span>
        <div className="relative h-2 w-full rounded bg-background">
          {scoreOverView && (
            <div
              className="absolute left-0 top-0 h-2 rounded bg-primary"
              style={{
                width: `${(scoreOverView.threeStars / totalReview) * 100}%`,
              }}
            />
          )}
        </div>
      </div>
      {/* 2 stars */}
      <div className="relative flex w-full flex-row items-center space-x-3 md:pr-10">
        <span>2</span>
        <div className="relative h-2 w-full rounded bg-background">
          {scoreOverView && (
            <div
              className="absolute left-0 top-0 h-2 rounded bg-primary"
              style={{
                width: `${(scoreOverView.twoStars / totalReview) * 100}%`,
              }}
            />
          )}
        </div>
      </div>
      {/* 1 stars */}
      <div className="relative flex w-full flex-row items-center space-x-3 md:pr-10">
        <span>1</span>
        <div className="relative h-2 w-full rounded bg-background">
          {scoreOverView && (
            <div
              className="absolute left-0 top-0 h-2 rounded bg-primary"
              style={{
                width: `${(scoreOverView.oneStar / totalReview) * 100}%`,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

function getTotalReviews(score?: ScoreOverview): number {
  return score
    ? score.fiveStars +
        score.fourStars +
        score.threeStars +
        score.twoStars +
        score.oneStar
    : 1;
}

export default ReviewGrid;