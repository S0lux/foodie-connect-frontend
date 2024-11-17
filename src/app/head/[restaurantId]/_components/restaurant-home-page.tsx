"use client";
import PromotionCard from "@/app/head/[restaurantId]/_components/promotion-card";
import ReviewCard from "@/app/head/[restaurantId]/_components/reivew-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Promotion } from "@/types/promotion.type";
import { RestaurantReviews } from "@/types/restaurant-reviews.type";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

const RestaurantHomePage = ({
  promotions,
  reviews,
}: {
  promotions: Promotion[];
  reviews?: RestaurantReviews;
}) => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const [isExpanded, setIsExpanded] = useState(true);
  const [visibleReviews, setVisibleReviews] = useState(4);
  const initialReviewCount = 4;

  const toggleReviews = () => {
    if (isExpanded) {
      setVisibleReviews(initialReviewCount);
    } else {
      setVisibleReviews((prev) => prev + 4);
    }
    setIsExpanded(!isExpanded);
  };

  const totalReviews =
    (reviews?.otherReviews?.length || 0) + (reviews?.myReview ? 1 : 0);

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="mb-4 text-2xl font-bold">Promotions</h2>
          <Link href={`/head/${restaurantId}/promotions`}>
            <Button variant={"link"}>View all</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {promotions.slice(0, 4).map((promotion, i) => (
            <PromotionCard key={i} promotion={promotion} />
          ))}
        </div>
        {promotions.length === 0 && (
          <p className="w-full text-center text-gray-500">
            No promotions available
          </p>
        )}
      </Card>

      <Card className="p-6">
        <h2 className="mb-4 text-2xl font-bold">Reviews</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {reviews?.myReview && <ReviewCard review={reviews.myReview} />}

          {reviews?.otherReviews
            .slice(0, reviews.myReview ? visibleReviews - 1 : visibleReviews)
            .map((review, i) => <ReviewCard key={i} review={review} />)}
        </div>
        {totalReviews === 0 && (
          <p className="w-full text-center text-gray-500">
            No reviews available
          </p>
        )}
        {totalReviews > initialReviewCount && (
          <div className="mt-4 text-center">
            <Button
              variant="outline"
              onClick={toggleReviews}
              className="flex items-center gap-2 px-6"
            >
              {isExpanded && visibleReviews < totalReviews ? (
                <>
                  Show more
                  <ChevronDown className="h-4 w-4" />
                </>
              ) : isExpanded ? (
                <>
                  Show less
                  <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Show more
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default RestaurantHomePage;
