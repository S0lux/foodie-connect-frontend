import { Key } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { DishDto } from "@/app/(main)/restaurant-detail/[id]/page";
import { Dish } from "@/types/dish.type";
import { Star } from "lucide-react";
import { StarFilledIcon } from "@radix-ui/react-icons";

const FoodGrid = ({ dishList }: { dishList: Dish[] }) => {
  return (
    <Card className="border-none px-3 py-2">
      <CardTitle className="border-b border-muted-foreground/30 py-3 text-xl">
        Menu
      </CardTitle>
      <CardContent className="grid grid-flow-row grid-cols-1 gap-3 px-0 py-2 md:grid-cols-2">
        {dishList.length > 0 ? (
          dishList.map((dish) => {
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
  return (
    <CardContent className="flex w-full border-b border-muted-foreground/30 px-0 py-2">
      <img src="https://placehold.co/50x50" className="size-12 rounded"></img>
      <CardTitle className="flex size-full flex-col items-start justify-between px-3 py-1 md:flex-row md:items-center">
        <div className="flex h-full flex-col justify-between">
          <span className="">{dishItem.name}</span>
          <div className="flex flex-row">
            <StarFilledIcon className="text-primary" />
            <StarFilledIcon className="text-primary" />
            <StarFilledIcon className="text-primary" />
            <StarFilledIcon className="text-primary" />
            <StarFilledIcon className="text-primary" />
          </div>
        </div>
        <span className="text-primary">{formatedPrice}</span>
      </CardTitle>
    </CardContent>
  );
};

export default FoodGrid;
