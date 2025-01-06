"use client";
import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { getImageById } from '@/lib/handleImage';

type Props = {
    images: string[] | undefined;

};

const RestaurantImageCarousel: React.FC<Props> = ({ images }) => {
    if (!images || !images.length) {
        return (
            <Card className="h-fit justify-center border-none">
                <CardHeader className="border-b border-muted-foreground/30">
                    <CardTitle className="flex items-center xl:text-lg">
                        No Images
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center py-3">
                    <p className="italic">No images to display</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="h-fit justify-center border-none">
            <CardHeader className="border-b border-muted-foreground/30">
                <CardTitle className="flex items-center xl:text-lg">
                    Image Carousel
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Carousel
                    opts={{
                        align: "center",
                        loop: true,
                    }}
                    plugins={[
                        Autoplay({
                            delay: 3000,
                            stopOnInteraction: true,
                            playOnInit: true,
                        }),
                    ]}
                >
                    <CarouselContent>
                        {images.map((image, index) => (
                            <CarouselItem
                                key={index}
                                className="flex justify-center py-2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 xl:py-5"
                            >
                                <div className="relative h-48 w-full overflow-hidden rounded-lg">
                                    <img
                                        src={getImageById(image)}
                                        alt={`Slide ${index + 1}`}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </CardContent>
        </Card>
    );
};

export default RestaurantImageCarousel;