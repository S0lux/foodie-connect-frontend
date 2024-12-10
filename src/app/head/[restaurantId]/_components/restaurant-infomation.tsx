import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Clock, Star } from "lucide-react";
import { Restaurant } from "@/types/restaurant.type";
import { Badge } from "@/components/ui/badge";

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

const RestaurantInfo = ({ restaurant }: { restaurant: Restaurant }) => {
  // Format time from number to readable string (assuming time is in 24h format)

  const checkStatus = (status: string) => {
    if (status === "Open") {
      return "default";
    } else if (status === "PermanentlyClosed") {
      return "destructive";
    } else {
      return "secondary";
    }
  };

  const formatTime = (time: number) => {
    if (!time) return "N/A";

    // Assuming time is stored as HHMM format
    const timeStr = time.toString().padStart(4, "0");
    const hours = timeStr.slice(0, 2);
    const minutes = timeStr.slice(2, 4);

    // Convert to 12-hour format
    const period = +hours >= 12 ? "PM" : "AM";
    const formattedHours = +hours % 12 || 12;

    return `${formattedHours}:${minutes} ${period}`;
  };

  return (
    <Card className="h-full w-full shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">
            {restaurant.name}
          </CardTitle>
          <Badge variant={checkStatus(restaurant.status)}>
            {restaurant.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="item-center flex space-x-4">
            <MapPin className="mt-1 h-6 w-6 text-gray-600" />
            <div>
              <p className="font-semibold">Address</p>
              <p className="text-gray-700">{restaurant.formattedAddress}</p>
            </div>
          </div>

          <div className="item-center flex space-x-4">
            <Phone className="mt-1 h-6 w-6 text-gray-600" />
            <div>
              <p className="font-semibold">Phone</p>
              <p className="text-gray-700">{restaurant.phone}</p>
            </div>
          </div>

          <div className="item-center flex space-x-4">
            <Clock className="mt-1 h-6 w-6 text-gray-600" />
            <div>
              <p className="font-semibold">Hours</p>
              <p className="text-gray-700">
                {`Open: ${restaurant.openTime} - Close: ${restaurant.closeTime}`}
              </p>
            </div>
          </div>

          <div className="item-center flex space-x-4">
            <Star className="mt-1 h-6 w-6 text-gray-600" />
            <div>
              <p className="font-semibold">Rating</p>
              <div className="flex items-center gap-2">
                <p className="text-gray-700">
                  {restaurant.scoreOverview.averageRating.toFixed(1)}/5
                </p>
                <Rating value={restaurant.scoreOverview.averageRating} />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RestaurantInfo;
