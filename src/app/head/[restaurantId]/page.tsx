"use client";

import RestaurantHomePage from "@/app/head/[restaurantId]/_components/restaurant-home-page";
import useRestaurants from "@/hooks/use-restaurants";
import cld from "@/lib/cld";
import { getBannerUrl, getLogoUrl } from "@/lib/handleImage";
import { Loader } from "lucide-react";
import Image from "next/image";

const promotions = [
  {
    name: "Free Dessert",
    description: "Get a free dessert with any meal purchase",
    targets: ["New customers", "Existing customers"],
    promotionDetails: [
      {
        dishId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        promotionalPrice: 0,
      },
    ],
    beginsAt: "2024-11-11T13:41:03.763Z",
    endsAt: "2024-11-11T13:41:03.763Z",
  },
  {
    name: "Happy Hour",
    description: "20% off all drinks from 5pm to 7pm",
    targets: ["Existing customers"],
    promotionDetails: [
      {
        dishId: "3fa85f64-5717-4562-b3fc-2c963f66afa7",
        promotionalPrice: 0.8,
      },
      {
        dishId: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
        promotionalPrice: 0.8,
      },
    ],
    beginsAt: "2024-11-11T17:00:00.000Z",
    endsAt: "2024-11-11T19:00:00.000Z",
  },
];

const reviews = {
  myReview: {
    reviewId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    dishId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    author: {
      id: "123",
      userName: "johndoe",
      displayName: "John Doe",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Felix",
    },
    rating: 4,
    content: "Great food and service!",
    createdAt: "2024-11-11T13:41:27.923Z",
    updatedAt: "2024-11-11T13:41:27.923Z",
  },
  otherReviews: [
    {
      reviewId: "3fa85f64-5717-4562-b3fc-2c963f66afa7",
      dishId: "3fa85f64-5717-4562-b3fc-2c963f66afa7",
      author: {
        id: "456",
        userName: "janesmith",
        displayName: "Jane Smith",
        avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Felix",
      },
      rating: 5,
      content: "Absolutely delicious!",
      createdAt: "2024-11-11T13:41:27.923Z",
      updatedAt: "2024-11-11T13:41:27.923Z",
    },
    {
      reviewId: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
      dishId: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
      author: {
        id: "789",
        userName: "bobsmith",
        displayName: "Bob Smith",
        avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Felix",
      },
      rating: 3,
      content: "The food was okay, but the service was slow.",
      createdAt: "2024-11-11T13:41:27.923Z",
      updatedAt: "2024-11-11T13:41:27.923Z",
    },
  ],
};

export default function Restaurant({
  params,
}: {
  params: { restaurantId: string };
}) {
  const {
    data: restaurant,
    isLoading,
    isError,
    error,
  } = useRestaurants.useGetRestaurant(params.restaurantId);

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
                <div className="mt-4 h-24 w-24 rounded-full bg-white p-2 md:mt-0 md:h-32 md:w-32">
                  <Image
                    src={logoUrl}
                    alt="Banner"
                    width={150}
                    height={150}
                    layout="responsive"
                    className="rounded-full"
                  />
                </div>
                <div className="h-full">
                  <h1 className="p-4 text-2xl font-bold">{restaurant!.name}</h1>
                </div>
              </div>
            </div>
          </div>

          <RestaurantHomePage promotions={promotions} reviews={reviews} />
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
