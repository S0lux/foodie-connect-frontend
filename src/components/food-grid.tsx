import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Edit, Percent, Star, StarHalf } from "lucide-react";
import Link from "next/link";
import useRestaurantDetail from "@/hooks/use-restaurant-detail";
import { getDefaultImageUrl } from "@/lib/handleImage";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { truncate } from "./restaurant-card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Category, Dish, Promotion } from "@/types/dishes.type";
import { useState } from "react";
import { ReviewTag } from "./review-card";
import { twMerge } from "tailwind-merge";
import useDishReview from "@/hooks/use-dish-review";

const FoodGrid = ({
  restaurantId,
  dishCategories,
}: {
  restaurantId: string;
  dishCategories?: Category[];
}) => {
  const [selectedCat, setSelectedCat] = useState<string>("All");
  const { data: dishes } =
    useRestaurantDetail.useGetRestaurantDetailMenu(restaurantId);

  const filteredDish = dishes?.filter((dish) => {
    if (selectedCat === "All") return true;
    else return dish.categories.includes(selectedCat);
  });
  return (
    <Card className="border-none px-2 py-2 md:px-7">
      <CardTitle className="flex flex-row items-center space-x-5 border-b border-muted-foreground/30 py-3 text-xl">
        <span className="px-4 md:px-0">Menu</span>
        <Select
          onValueChange={(e) => {
            setSelectedCat(e);
          }}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem key={"All"} value={"All"}>
                All
              </SelectItem>
              {dishCategories &&
                dishCategories.map((category) => {
                  return (
                    <SelectItem
                      key={category.categoryName}
                      value={category.categoryName}
                    >
                      {category.categoryName}
                    </SelectItem>
                  );
                })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardTitle>
      <CardContent className="grid grid-flow-row grid-cols-1 justify-items-center gap-4 bg-inherit py-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredDish && filteredDish?.length > 0 ? (
          filteredDish?.map((item) => {
            return <FoodCard key={item.dishId} dishItem={item}></FoodCard>;
          })
        ) : (
          <CardDescription className="col-span-3 flex w-full justify-center">
            No dishes available
          </CardDescription>
        )}
      </CardContent>
    </Card>
  );
};

const FoodCard = ({ dishItem }: { dishItem: Dish }) => {
  const { data: viewCount } = useDishReview.useGetDishViewCount(
    dishItem.dishId,
  );
  const halfStar =
    dishItem.scoreOverview.averageRating %
      Math.round(dishItem.scoreOverview.averageRating) >
    0.5;
  const promotionalPrices = dishItem.promotions.map(
    (promo) => promo.promotionalPrice,
  );
  const minPrice = Math.min(...promotionalPrices);

  const formatedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(dishItem.price);
  const formatedMinPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(minPrice);
  return (
    <Link href={`/dishes/${dishItem.dishId}`}>
      <Card
        key={dishItem.dishId}
        className="relative flex w-72 flex-col border-none bg-sidebar transition-all ease-in xl:hover:scale-105"
      >
        <div className="relative h-40">
          <Image
            src={
              getDefaultImageUrl(
                dishItem?.imageId ? [dishItem.imageId] : [],
                dishItem.name,
              ) || "https://placehold.co/230x150"
            }
            alt={dishItem.name}
            layout="fill"
            objectFit="cover"
            className="rounded-t"
          />
        </div>
        <CardContent className="flex flex-col space-y-2 py-4">
          <div className="flex flex-col items-start">
            <CardTitle className="">{dishItem.name}</CardTitle>
            <CardDescription className="relative space-x-3 py-1 font-semibold text-primary">
              <span
                className={
                  dishItem.promotions.length > 0
                    ? "text-xs text-muted-foreground line-through"
                    : ""
                }
              >
                {formatedPrice}
              </span>
              {dishItem.promotions.length > 0 && (
                <span className="absolute bottom-0.5 text-base text-accent">
                  {formatedMinPrice}
                </span>
              )}
            </CardDescription>
          </div>
          <CardDescription className="">
            {truncate(dishItem.description, 35)}
          </CardDescription>
          <div className="flex flex-row space-x-2">
            {dishItem.categories.map((category) => (
              <Badge key={category} variant="outline">
                <span>{category}</span>
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="">
          {dishItem &&
            Array.from(
              {
                length:
                  dishItem.scoreOverview.averageRating > 0
                    ? dishItem.scoreOverview.averageRating
                    : 1,
              },
              (_, i) => <Star fill="#D4AF37" stroke="#D4AF37" size={15} />,
            )}
          {halfStar && <StarHalf fill="#D4AF37" stroke="#D4AF37" size={15} />}
          <CardDescription className="ml-2 text-xs">
            <span>{viewCount} watching</span>
          </CardDescription>
        </CardFooter>
        {dishItem.promotions.length > 0 && (
          <ReviewTag className="bottom-0 right-0 rounded-br bg-accent">
            <Percent size={20}></Percent>
          </ReviewTag>
        )}
      </Card>
    </Link>
  );
};

export default FoodGrid;
