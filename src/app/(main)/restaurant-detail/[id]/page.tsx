import FoodGrid from "@/components/food-grid";
import { ReviewGrid } from "@/components/review-grid";
import { Card, CardTitle } from "@/components/ui/card";
import http from "@/lib/http";
import { Dish } from "@/types/dish.type";
import { Restaurant } from "@/types/retaurant.type";
import { AlarmClock, MapPin, PhoneIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

export type DishDto = {
  name: string;
  price: number;
};

export type ReviewDto = {
  content: string;
  rating: number;
  postedDate: Date;
};

export default async function RestauranDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const restaurantDetail: Restaurant = await http
    .get(`v1/restaurants/${params.id}`)
    .then((res) => res.data);

  const dishes: Dish[] = await http
    .get("v1/dishes", { params: { RestaurantId: params.id } })
    .then((res) => res.data);
  return (
    <div className="flex flex-col space-y-5">
      <Card className="flex flex-col space-x-5 border-none md:flex-row">
        <div className="rounded md:h-52 md:w-96">
          <img
            src="https://placehold.co/230x150"
            className="size-full rounded"
          ></img>
        </div>

        <div className="w-full space-y-1 py-5">
          {/* name */}
          <CardTitle className="text-xl">{restaurantDetail?.name}</CardTitle>

          {/* service */}
          {/* <CardDescription className="flex flex-row items-center space-x-1 text-primary">
            <Tag size={15}></Tag>
            <span>{restaurantDetail?.category}</span>
          </CardDescription> */}

          <br></br>

          {/* address */}
          <div className="flex flex-row items-center space-x-2">
            <MapPin className="size-4"></MapPin>
            <span className="text-wrap">
              {restaurantDetail.formattedAddress}
            </span>
          </div>

          {/* time */}
          <div className="flex flex-row items-center space-x-2">
            <AlarmClock className="size-4"></AlarmClock>
            <span>
              <span
                className={twMerge(
                  "font-semibold",
                  restaurantDetail.status === "Open" && "text-green-500",
                  restaurantDetail.status === "Closed" && "text-orange-500",
                  restaurantDetail.status === "PermanentlyClosed" &&
                    "text-red-500",
                )}
              >
                {restaurantDetail.status === "PermanentlyClosed"
                  ? "Permanently Closed"
                  : restaurantDetail.status}
              </span>{" "}
              {formatTime(restaurantDetail.openTime)} -{" "}
              {formatTime(restaurantDetail.closeTime)}
            </span>
          </div>

          {/* phone */}
          <div className="flex flex-row items-center space-x-2">
            <PhoneIcon className="size-4"></PhoneIcon>
            <span>{restaurantDetail.phone}</span>
          </div>
        </div>
      </Card>

      {/* menu */}
      <FoodGrid dishList={dishes}></FoodGrid>

      {/* Reviews */}
      <ReviewGrid reviews={mockReview}></ReviewGrid>
    </div>
  );
}

export function formatTime(time: string): string {
  const formatedTime = time.split(":");
  return `${formatedTime[0]}:${formatedTime[1]}`;
}

const mockReview: ReviewDto[] = [
  {
    content: "This is exceedingly good",
    rating: 10,
    postedDate: new Date(),
  },
  {
    content: "Tastes good",
    rating: 9,
    postedDate: new Date(),
  },
  {
    content: "Ill give it a 8/10",
    rating: 8,
    postedDate: new Date(),
  },
  {
    content: "Good for its price",
    rating: 7,
    postedDate: new Date(),
  },
  {
    content: "Not what I expected but acceptable",
    rating: 6,
    postedDate: new Date(),
  },
  {
    content: "Eh, its averge",
    rating: 5,
    postedDate: new Date(),
  },
  {
    content: "Averge, a little dissapointed to be honest",
    rating: 4,
    postedDate: new Date(),
  },
  {
    content: "Bad, the service was could use some improvement",
    rating: 3,
    postedDate: new Date(),
  },
  {
    content: "Food was cold, not good at all",
    rating: 2,
    postedDate: new Date(),
  },
  {
    content: "Bad, do not recommend",
    rating: 1,
    postedDate: new Date(),
  },
];

const mockFood: DishDto[] = [
  {
    name: "Dish 1",
    price: 10000,
  },
  {
    name: "Dish 2",
    price: 10000,
  },
  {
    name: "Dish 3",
    price: 10000,
  },
  {
    name: "Dish 4",
    price: 10000,
  },
  {
    name: "Dish 5",
    price: 10000,
  },
  {
    name: "Dish 6",
    price: 10000,
  },
  {
    name: "Dish 7",
    price: 10000,
  },
  {
    name: "Dish 8",
    price: 10000,
  },
  {
    name: "Dish 9",
    price: 10000,
  },
  {
    name: "Dish 10",
    price: 10000,
  },
];
