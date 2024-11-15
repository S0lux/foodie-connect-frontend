"use client";
import FoodGrid from "@/components/food-grid";
import ReviewGrid from "@/components/review-grid";
import { Card, CardTitle } from "@/components/ui/card";
import useRestaurantDetail from "@/hooks/use-restaurant-detail";
import { getLogoUrl } from "@/lib/handleImage";
import { AlarmClock, MapPin, PhoneIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

export default function RestauranDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: restaurantDetail } = useRestaurantDetail.useGetRestaurantDetail(
    params.id,
  );
  console.log(params.id);
  return (
    <div className="flex flex-col space-y-5">
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
          <CardTitle className="text-xl">{restaurantDetail?.name}</CardTitle>

          {/* service */}
          {/* <CardDescription className="flex flex-row items-center space-x-1 text-primary">
            <Tag size={15}></Tag>
            <span>{restaurantDetail?.category}</span>
          </CardDescription> */}

          <br></br>

          {/* address */}
          <div className="flex flex-row items-center space-x-2">
            <MapPin className="size-4"></MapPin>
            <span className="max-w-60 md:max-w-none">
              {restaurantDetail?.formattedAddress}
            </span>
          </div>

          {/* time */}
          <div className="flex flex-row items-center space-x-2">
            <AlarmClock className="size-4"></AlarmClock>
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
          </div>

          {/* phone */}
          <div className="flex flex-row items-center space-x-2">
            <PhoneIcon className="size-4"></PhoneIcon>
            <span>{restaurantDetail?.phone}</span>
          </div>
        </div>
      </Card>

      {/* menu */}
      <FoodGrid restaurantId={params.id}></FoodGrid>

      {/* Reviews */}
      <ReviewGrid restaurantId={params.id}></ReviewGrid>
    </div>
  );
}
