"use client";
import { useEffect, useState } from "react";
import RestaurantCard from "./restaurant-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { twMerge } from "tailwind-merge";

import useRestaurants from "@/hooks/use-restaurants";
import { useUserLocation } from "@/hooks/use-location";
import { Car } from "lucide-react";

export type RestaurantDto = {
  id: string;
  name: string;
  category: string;
};

const RestaurantGrid = ({ className }: { className?: string }) => {
  const { locationString } = useUserLocation();

  //data fetching
  const {
    data: restaurants,
    isLoading,
    isError,
    error,
  } = useRestaurants.useGetRestaurants("", 10000, locationString);

  // Handle responsive design
  const [windowWidth, setWidth] = useState(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    setWidth(window.innerWidth);

    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isError) {
    return (
      <Card className={twMerge("h-fit border-none", className)}>
        <CardHeader className="flex flex-row space-x-5 space-y-0 border-b border-muted-foreground/30 xl:space-x-10">
          <CardTitle className="flex items-center xl:text-lg">
            Restaurants near you
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-3">
          <CardDescription className="italic">{error.message}</CardDescription>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className={twMerge("h-fit border-none", className)}>
        <CardHeader className="flex flex-row space-x-5 space-y-0 border-b border-muted-foreground/30 xl:space-x-10">
          <CardTitle className="flex items-center xl:text-lg">
            Restaurants near you
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-3">
          <CardDescription className="italic">Loading...</CardDescription>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={twMerge("h-fit border-none", className)}>
      <CardHeader className="flex flex-row space-x-5 space-y-0 border-b border-muted-foreground/30 xl:space-x-10">
        <CardTitle className="flex items-center xl:text-lg">
          Restaurants near you
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        {restaurants && restaurants.length > 0 ? (
          <div className="grid grid-flow-row grid-cols-1 justify-items-center gap-4 bg-inherit py-5 md:grid-cols-3 xl:grid-cols-4">
            {restaurants &&
              restaurants.map((restaurant) => {
                return (
                  <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                  ></RestaurantCard>
                );
              })}
          </div>
        ) : (
          <CardDescription className="size-full py-3 text-center italic">
            No restaurants around
          </CardDescription>
        )}
      </CardContent>
    </Card>
  );
};
export default RestaurantGrid;
