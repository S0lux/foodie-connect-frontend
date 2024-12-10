import { MapPin, Phone, MoreHorizontal, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Restaurant } from "@/types/restaurant.type";
import Link from "next/link";
import { getLogoUrl } from "@/lib/handleImage";

const Rating = ({ value }: { value: number }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < value) {
      stars.push(<span key={i}>&#9733;</span>);
    } else {
      stars.push(<span key={i}>&#9734;</span>);
    }
  }
  return <div className="flex">{stars}</div>;
};

export default function RestaurantCard({
  restaurant,
}: {
  restaurant: Restaurant;
}) {
  const checkStatus = (status: string) => {
    if (status === "Open") {
      return "default";
    } else if (status === "PermanentlyClosed") {
      return "destructive";
    } else {
      return "secondary";
    }
  };
  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={getLogoUrl(restaurant.images, restaurant.name)}
              alt={restaurant.name}
            />
            <AvatarFallback>{restaurant.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{restaurant.name}</CardTitle>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/head/${restaurant.id}`}>
              <DropdownMenuItem className="hover:cursor-pointer">
                View Details
              </DropdownMenuItem>
            </Link>
            <Link href={`/head/${restaurant.id}/update`}>
              <DropdownMenuItem className="hover:cursor-pointer">
                Edit Restaurant
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="mt-2">
        <div className="flex flex-col justify-between">
          <div className="grid h-full gap-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-2 h-4 w-4" />
              <p className="flex h-10 w-10/12 items-center">
                {restaurant.formattedAddress}
              </p>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Phone className="mr-2 h-4 w-4" />
              {restaurant.phone}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-2 h-4 w-4" />
              {`Open: ${restaurant.openTime} - Close: ${restaurant.closeTime}`}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex w-full items-center justify-between space-x-2">
              <Badge variant={checkStatus(restaurant.status)}>
                {restaurant.status}
              </Badge>
              <div className="flex items-center">
                {" "}
                <Rating value={restaurant.scoreOverview.averageRating} />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
