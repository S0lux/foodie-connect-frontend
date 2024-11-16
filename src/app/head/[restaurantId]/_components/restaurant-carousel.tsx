import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getImageById } from "@/lib/handleImage";
import { Button } from "@/components/ui/button";

interface RestaurantCarouselProps {
  images?: string[];
}

const RestaurantCarousel: React.FC<RestaurantCarouselProps> = ({
  images = [],
}) => {
  if (!images || images.length === 0)
    return (
      <>
        <div className="w-full">
          <div className="flex justify-between">
            <h2 className="mb-4 text-left text-2xl font-bold">Images</h2>
            <Button variant={"secondary"}>Add Image</Button>
          </div>
          <div className="flex items-center justify-center">
            <p>No images available</p>
          </div>
        </div>
      </>
    );

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-4xl"
    >
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={getImageById(image)}
                      alt="restaurant"
                      className="h-48 w-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="bg-black bg-opacity-50 text-white hover:bg-opacity-70" />
      <CarouselNext className="bg-black bg-opacity-50 text-white hover:bg-opacity-70" />
    </Carousel>
  );
};

export default RestaurantCarousel;
