import { Key } from "react";
import { Card, CardContent, CardTitle } from "./ui/card";
import { DishDto } from "@/app/(main)/restaurant-detail/[id]/page";

const FoodGrid = ({ dishList }: { dishList: DishDto[] }) => {
  return (
    <Card className="border-none px-3 py-2">
      <CardTitle className="border-b border-muted-foreground/30 py-3 text-xl">
        Menu
      </CardTitle>
      <CardContent className="grid grid-flow-row grid-cols-1 gap-3 px-0 py-2 md:grid-cols-2">
        {dishList.map((dish) => {
          return (
            <FoodCard name={dish.name} price={dish.price} key={dish.name} />
          );
        })}
      </CardContent>
    </Card>
  );
};

const FoodCard = ({ name, price }: { name: string; price: number }) => {
  const formatedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
  return (
    <CardContent className="flex w-full border-b border-muted-foreground/30 px-0 py-2">
      <img src="https://placehold.co/50x50" className="size-12 rounded"></img>
      <CardTitle className="flex size-full flex-col items-start justify-between px-3 py-1 md:flex-row md:items-center">
        <span className="">{name}</span>
        <span className="text-primary">{formatedPrice}</span>
      </CardTitle>
    </CardContent>
  );
};

export default FoodGrid;
