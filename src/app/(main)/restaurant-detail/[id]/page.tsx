"use client";
import PromotionCard from "@/app/head/[restaurantId]/_components/promotion-card";
import FoodGrid from "@/components/food-grid";
import PromotionItem from "@/components/promotion-item";
import ReviewGrid from "@/components/review-grid";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useDishCategories from "@/hooks/use-dish-categories";
import usePromotion from "@/hooks/use-promotion";
import useRestaurantDetail from "@/hooks/use-restaurant-detail";
import { getLogoUrl } from "@/lib/handleImage";
import { AlarmClock, MapPin, PhoneIcon, Star, StarHalf } from "lucide-react";
import { twMerge } from "tailwind-merge";

export default function RestauranDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const {
    data: restaurantDetail,
    error: restaurantDetailErr,
    isError: restaurantDetailHasErr,
    isLoading: restaurantDetailLoading,
  } = useRestaurantDetail.useGetRestaurantDetail(params.id);

  const { data: restaurantCategories } = useDishCategories.useGetDishCategories(
    params.id,
  );

  const { data: promotions } = usePromotion.useGetPromotions(params.id);

  const halfStar =
    restaurantDetail &&
    restaurantDetail.scoreOverview.averageRating %
      Math.round(restaurantDetail.scoreOverview.averageRating) >
      0.5;
  return (
    <div className="flex flex-col space-y-5">
      {/* {restaurant details} */}
      <Card className="flex flex-col space-x-5 border-none md:flex-row">
        <div className="rounded md:h-52 md:w-96">
          <img
            src={
              restaurantDetail &&
              getLogoUrl(restaurantDetail?.images, restaurantDetail?.name)
            }
            className="size-full rounded"
          ></img>
        </div>

        <div className="w-full space-y-1 py-5">
          {/* name */}
          <CardTitle className="text-xl">
            {restaurantDetailLoading && "Loading..."}
            {!restaurantDetailHasErr
              ? restaurantDetail?.name
              : restaurantDetailErr.message}
          </CardTitle>

          {/* {restaurant's rating} */}
          <div className="flex flex-row">
            {restaurantDetail &&
              Array.from(
                {
                  length:
                    restaurantDetail.scoreOverview.averageRating > 0
                      ? restaurantDetail.scoreOverview.averageRating
                      : 1,
                },
                (_, i) => <Star fill="#D4AF37" stroke="#D4AF37" size={15} />,
              )}
            {halfStar && <StarHalf fill="#D4AF37" stroke="#D4AF37" size={15} />}
          </div>

          <br></br>

          {/* address */}
          <div className="flex flex-row items-center space-x-2">
            <MapPin className="size-4"></MapPin>
            <span className="max-w-60 md:max-w-none">
              {!restaurantDetailHasErr
                ? restaurantDetail?.formattedAddress
                : "N/A"}
            </span>
          </div>

          {/* time */}
          <div className="flex flex-row items-center space-x-2">
            <AlarmClock className="size-4"></AlarmClock>
            {!restaurantDetailHasErr ? (
              <span>
                <span
                  className={twMerge(
                    "font-semibold",
                    restaurantDetail?.status === "Open" && "text-green-500",
                    restaurantDetail?.status === "Closed" && "text-orange-500",
                    restaurantDetail?.status === "PermanentlyClosed" &&
                      "text-red-500",
                  )}
                >
                  {restaurantDetail?.status === "PermanentlyClosed"
                    ? "Permanently Closed"
                    : restaurantDetail?.status}
                </span>{" "}
                {restaurantDetail?.openTime} - {restaurantDetail?.closeTime}
              </span>
            ) : (
              <span>N/A</span>
            )}
          </div>

          {/* phone */}
          <div className="flex flex-row items-center space-x-2">
            <PhoneIcon className="size-4"></PhoneIcon>
            <span>
              {!restaurantDetailHasErr ? restaurantDetail?.phone : "N/A"}
            </span>
          </div>

          <br></br>
          {/* Categories */}
          <div className="grid max-w-64 grid-cols-2 gap-2 md:flex md:max-w-none md:flex-row">
            {restaurantCategories &&
              restaurantCategories.map((category) => {
                return (
                  <Badge
                    key={category.categoryName}
                    variant={"outline"}
                    className=""
                  >
                    {category.categoryName}
                  </Badge>
                );
              })}
          </div>
        </div>
      </Card>

      {/* promotions */}
      {promotions && promotions?.length > 0 && (
        <Card className="border-none px-2 py-2 md:px-7">
          <CardTitle className="flex flex-row items-center border-b border-muted-foreground/30 py-3 text-xl">
            <span className="px-4 md:px-0">Promotions</span>
          </CardTitle>
          <CardContent className="flex flex-col space-y-5 py-5 md:grid md:grid-flow-row md:grid-cols-3 md:gap-5 md:space-y-0 lg:grid-cols-4">
            {promotions.map((promotion) => (
              <PromotionItem
                promotion={promotion}
                shortenContent={true}
              ></PromotionItem>
            ))}
          </CardContent>
        </Card>
      )}

      {/* menu */}
      <FoodGrid
        restaurantId={params.id}
        dishCategories={restaurantCategories}
      ></FoodGrid>

      {/* Reviews */}
      <ReviewGrid restaurantId={params.id}></ReviewGrid>
    </div>
  );
}
