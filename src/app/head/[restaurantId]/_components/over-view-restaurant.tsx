"use client";

import RestaurantCarousel from "@/app/head/[restaurantId]/_components/restaurant-carousel";
import RestaurantHomePage from "@/app/head/[restaurantId]/_components/restaurant-home-page";
import SocialOverview from "@/app/head/[restaurantId]/_components/social-overview";
import usePromotion from "@/hooks/use-promotion";
import useRestaurantReview from "@/hooks/use-restaurant-review";
import useRestaurants from "@/hooks/use-restaurants";
import { getBannerUrl, getLogoUrl } from "@/lib/handleImage";
import { Loader } from "lucide-react";
import Image from "next/image";

export default function OverViewRestaurant({
  restaurantId,
}: {
  restaurantId: string;
}) {
  const {
    data: restaurant,
    isLoading,
    isError,
  } = useRestaurants.useGetRestaurant(restaurantId);

  console.log(
    restaurant?.images?.filter(
      (image) => !image.includes("/logo") && !image.includes("/banner"),
    ),
  );

  const { data: reviews } =
    useRestaurantReview.useGetRestaurantReview(restaurantId);

  const { data: promotions } = usePromotion.useGetPromotions(restaurantId);

  console.log(restaurant?.socialLinks);

  if (!isLoading && !isError) {
    const logoUrl = getLogoUrl(restaurant!.images, restaurant!.name);
    const bannerUrl = getBannerUrl(restaurant!.images, restaurant!.name);

    return (
      <>
        <div className="">
          <div className="relative w-full items-center">
            <div className="relative h-20 w-full md:h-32 lg:h-36">
              <Image
                src={bannerUrl}
                alt="Banner"
                layout="fill"
                objectFit="cover"
                className="rounded-[10px]"
              />
            </div>
            <div className="relative top-3/4 pl-4 md:absolute">
              <div className="flex items-center">
                <div className="mt-4 flex h-24 w-24 rounded-full bg-white p-2 md:mt-0 md:h-32 md:w-32">
                  <Image
                    src={logoUrl}
                    alt="Banner"
                    width={128}
                    height={128}
                    layout="responsive"
                    objectFit="cover"
                    className="h-full w-full rounded-full"
                  />
                </div>
                <div className="h-full">
                  <h1 className="p-4 text-2xl font-bold">{restaurant!.name}</h1>
                </div>
              </div>
            </div>
          </div>

          <div className="container mx-auto space-y-4 py-8 md:mt-20">
            <h1 className="mb-8 text-3xl font-bold">
              Welcome to your Restaurant
            </h1>

            <SocialOverview />

            <div className="flex justify-center">
              <RestaurantCarousel
                images={restaurant?.images?.filter(
                  (image) =>
                    !image.includes("/logo") && !image.includes("/banner"),
                )}
              />
            </div>

            {promotions && reviews && (
              <RestaurantHomePage promotions={promotions} reviews={reviews} />
            )}
          </div>
        </div>
      </>
    );
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );
}
