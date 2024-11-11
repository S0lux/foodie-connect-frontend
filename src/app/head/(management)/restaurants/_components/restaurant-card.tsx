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
            <AvatarImage src={restaurant.images[0]} alt={restaurant.name} />
            <AvatarFallback>{restaurant.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{restaurant.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{restaurant.type}</p>
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
            <DropdownMenuItem className="hover:cursor-pointer">
              Edit Restaurant
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600 hover:cursor-pointer">
              Deactivate
            </DropdownMenuItem>
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
              {`Open: ${restaurant.openTime}h - Close: ${restaurant.closeTime}h`}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant={checkStatus(restaurant.status)}>
                {restaurant.status}
              </Badge>
              {/* <Badge variant="outline">⭐ {restaurant.rating}</Badge> */}
            </div>
            {/* <div className="text-sm font-medium">
              ${restaurant.revenue.toLocaleString()}
            </div> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
