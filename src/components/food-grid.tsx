import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { Dish } from "@/types/dish.type";
import { Star, StarHalf } from "lucide-react";
import Link from "next/link";
import useRestaurantDetail from "@/hooks/use-restaurant-detail";

const FoodGrid = ({ restaurantId }: { restaurantId: string }) => {
  const { data: dishes } =
    useRestaurantDetail.useGetRestaurantDetailMenu(restaurantId);
  return (
    <Card className="border-none px-2 py-2 md:px-7">
      <CardTitle className="border-b border-muted-foreground/30 py-3 text-xl">
        <span className="px-4 md:px-0">Menu</span>
      </CardTitle>
      <CardContent className="grid grid-flow-row grid-cols-1 gap-3 px-0 py-2 md:grid-cols-2">
        {dishes && dishes.length > 0 ? (
          dishes.map((dish) => {
            return <FoodCard dishItem={dish} key={dish.dishId} />;
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
  const formatedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(dishItem.price);
  const halfStar =
    dishItem.scoreOverview.averageRating %
      Math.round(dishItem.scoreOverview.averageRating) >
    0.5;
  return (
    <CardContent className="flex w-full border-b border-muted-foreground/30 px-0 py-2">
      <img src="https://placehold.co/50x50" className="size-12 rounded"></img>
      <Link href={`/dishes/${dishItem.dishId}`} className="size-full">
        <CardTitle className="group flex size-full items-start justify-between px-3 py-1 text-primary hover:bg-background md:flex-row md:items-center">
          <div className="flex h-full flex-col justify-between">
            <span className="group-hover:underline group-hover:underline-offset-2">
              {dishItem.name}
            </span>
            <div className="flex flex-row">
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
              {halfStar && (
                <StarHalf fill="#D4AF37" stroke="#D4AF37" size={15} />
              )}
            </div>
          </div>
          <span className="">{formatedPrice}</span>
        </CardTitle>
      </Link>
    </CardContent>
  );
};

export default FoodGrid;
