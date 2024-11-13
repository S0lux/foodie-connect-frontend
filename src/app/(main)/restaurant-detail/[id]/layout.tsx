import { mockData } from "@/app/page";
import { RestaurantDto } from "@/components/restaurant-grid";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { AlarmClock, MapPin, PhoneIcon, Tag } from "lucide-react";

export default function RestaurantDetailLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { id: string };
}>) {
  const restaurant: RestaurantDto | undefined = mockData.find(
    (restaurant: RestaurantDto) => {
      return restaurant.id === params.id;
    },
  );
  return (
    <div className="flex flex-col space-y-5">
      {/* restaurant details */}
      <Card className="flex flex-col space-x-5 border-none md:flex-row">
        <div className="rounded md:h-52 md:w-96">
          <img
            src="https://placehold.co/230x150"
            className="size-full rounded"
          ></img>
        </div>

        <div className="w-full space-y-1 py-5">
          {/* name */}
          <CardTitle className="text-xl">{restaurant?.name}</CardTitle>

          {/* service */}
          <CardDescription className="flex flex-row items-center space-x-1 text-primary">
            <Tag size={15}></Tag>
            <span>{restaurant?.category}</span>
          </CardDescription>

          <br></br>

          {/* address */}
          <div className="flex flex-row items-center space-x-2">
            <MapPin className="size-4"></MapPin>
            <span className="text-wrap">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </span>
          </div>

          {/* time */}
          <div className="flex flex-row items-center space-x-2">
            <AlarmClock className="size-4"></AlarmClock>
            <span>
              <span className="font-semibold text-green-500">Open</span> 10:00 -
              22:00
            </span>
          </div>

          {/* phone */}
          <div className="flex flex-row items-center space-x-2">
            <PhoneIcon className="size-4"></PhoneIcon>
            <span>+123456789</span>
          </div>
        </div>
      </Card>
      {children}
    </div>
  );
}
