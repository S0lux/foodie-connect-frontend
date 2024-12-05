"use client";
import { ReactNode, useEffect, useState } from "react";
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

export type RestaurantDto = {
  id: string;
  name: string;
  category: string;
};

const CategorySelector = ({
  onClick,
  isSelected,
  children,
}: {
  onClick?: () => void;
  isSelected?: boolean;
  children?: ReactNode;
}) => {
  return (
    <CardTitle
      className={twMerge(
        "relative flex cursor-pointer select-none justify-center px-1 after:absolute after:inset-y-5 after:block after:h-0.5 after:w-0 after:rounded after:bg-primary after:duration-100 after:ease-in",
        isSelected ? "text-primary after:w-full" : "",
      )}
      onClick={onClick}
    >
      {children}
    </CardTitle>
  );
};

const RestaurantGrid = ({ className }: { className?: string }) => {
  //data fetching
  const {
    data: restaurants,
    isLoading,
    isError,
    error,
  } = useRestaurants.useGetRestaurants("", 5000, "106.61532,10.74964");

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

  console.log(restaurants);

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
      </CardContent>
    </Card>
  );
};
export default RestaurantGrid;
