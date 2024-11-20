"use client";
import useDishes from "@/hooks/use-dishes";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { FoodCard } from "./food-grid";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Autoplay from "embla-carousel-autoplay";

const RecommendationCarousel = () => {
  const { data: dishes } = useDishes.useGetDishes(
    "61c02e3c-5332-4cda-b2c4-6e21bfa3cb53",
  );

  return (
    <Card className="h-fit justify-center border-none">
      <CardHeader className="flex flex-row space-x-5 space-y-0 border-b border-muted-foreground/30 xl:space-x-10">
        <CardTitle className="flex items-center xl:text-lg">For you!</CardTitle>
      </CardHeader>
      <CardContent className="">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: true,
              playOnInit: true,
            }),
          ]}
          className=""
        >
          <CarouselContent className="">
            {dishes &&
              dishes.map((dish, index) => {
                return (
                  <CarouselItem
                    key={index}
                    className="flex justify-center py-2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 xl:py-5"
                  >
                    <FoodCard
                      dishItem={dish}
                      className="transition-none xl:hover:scale-100"
                    ></FoodCard>
                  </CarouselItem>
                );
              })}
          </CarouselContent>
        </Carousel>
      </CardContent>
    </Card>
  );
};

export default RecommendationCarousel;
