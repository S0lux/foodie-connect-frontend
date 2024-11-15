import { Clock, Tag } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import { RestaurantDto } from "./restaurant-grid";
import { Restaurant } from "@/types/retaurant.type";

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  return (
    <Link href={`/restaurant-detail/${restaurant.id}`}>
      <Card className="size-fit border-none bg-sidebar transition-all ease-in xl:hover:scale-105">
        <CardContent className="p-0">
          <img
            src="https://placehold.co/230x150"
            className="h-40 w-60 rounded-t"
          ></img>
        </CardContent>
        <CardFooter className="flex flex-col items-start justify-start space-y-1 py-3">
          <section className="space-y-1 text-ellipsis">
            <CardTitle>{restaurant.name}</CardTitle>
            <CardDescription className="max-w-min text-nowrap">
              {truncate(restaurant.formattedAddress)}
            </CardDescription>
          </section>
          <section className="flex flex-row items-center">
            <Clock className="py-1.5 pr-1 text-primary"></Clock>
            <CardDescription className="text-primary">
              <span>
                {restaurant.openTime} - {restaurant.closeTime}
              </span>
            </CardDescription>
          </section>
        </CardFooter>
      </Card>
    </Link>
  );
};

function truncate(text: string) {
  return text.length > 25 ? text.substring(0, 25) + "..." : text;
}

export default RestaurantCard;
