"use client";
import useDishes from "@/hooks/use-dishes";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { FoodCard } from "./food-grid";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Autoplay from "embla-carousel-autoplay";
import useRestaurants from "@/hooks/use-restaurants";
import RestaurantCard from "./restaurant-card";

const RestaurantRecommendationCarousel = () => {
  const {
    data: restaurants,
    isLoading,
    isError,
    error,
  } = useRestaurants.useGetRestaurants("ee653b51-74f9-4f69-88f8-1fc6f75ba5a1");

  if (isError) {
    return (
      <Card className="h-fit justify-center border-none">
        <CardHeader className="flex flex-row space-x-5 space-y-0 border-b border-muted-foreground/30 xl:space-x-10">
          <CardTitle className="flex items-center xl:text-lg">
            Restaurants for you!
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
      <Card className="h-fit justify-center border-none">
        <CardHeader className="flex flex-row space-x-5 space-y-0 border-b border-muted-foreground/30 xl:space-x-10">
          <CardTitle className="flex items-center xl:text-lg">
            Restaurants for you!
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-3">
          <CardDescription className="italic">Loading...</CardDescription>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="h-fit justify-center border-none">
      <CardHeader className="flex flex-row space-x-5 space-y-0 border-b border-muted-foreground/30 xl:space-x-10">
        <CardTitle className="flex items-center xl:text-lg">
          Restaurants for you!
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 2000,
              stopOnInteraction: true,
              playOnInit: true,
            }),
          ]}
          className=""
        >
          <CarouselContent className="">
            {restaurants &&
              restaurants.map((restaurant, index) => {
                return (
                  <CarouselItem
                    key={index}
                    className="flex justify-center py-2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 xl:py-5"
                  >
                    <RestaurantCard restaurant={restaurant}></RestaurantCard>
                  </CarouselItem>
                );
              })}
          </CarouselContent>
        </Carousel>
      </CardContent>
    </Card>
  );
};

export default RestaurantRecommendationCarousel;
