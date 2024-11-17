"use client";
import CardDataStats from "@/components/card-data-stats";
import { PieCharts } from "@/app/head/[restaurantId]/reports/_components/pie-chart";
import { Eye, Soup, Star } from "lucide-react";
import useRestaurants from "@/hooks/use-restaurants";
import { useParams } from "next/navigation";
import useDishes from "@/hooks/use-dishes";
import ReportChart from "@/app/head/[restaurantId]/reports/_components/report-chart";
import Loader from "@/components/loader";

export default function Reports() {
  const { restaurantId } = useParams<{ restaurantId: string }>();

  const { data: restaurant, isError } =
    useRestaurants.useGetRestaurant(restaurantId);

  const { data: dishes, isError: dishError } =
    useDishes.useGetDishes(restaurantId);

  if (!restaurant || !dishes) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isError || dishError) {
    return <div>Something went wrong</div>;
  }

  const { scoreOverview, name } = restaurant;

  return (
    <>
      <h1 className="mb-4 text-xl font-bold">Reports for {name}</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
        <CardDataStats
          title="Total Dishes"
          total={dishes?.length?.toString() || "0"}
          icon={<Soup className="text-blue-500" />}
        />
        <CardDataStats
          title="Average Rating"
          total={scoreOverview.averageRating.toFixed(1)}
          icon={<Eye className="text-green-500" />}
        />
        <CardDataStats
          title="5 Star Reviews"
          total={scoreOverview.fiveStars.toString()}
          icon={<Star className="text-yellow-500" />}
        />
        <CardDataStats
          title="1 Star Reviews"
          total={scoreOverview.oneStar.toString()}
          icon={<Star className="text-red-500" />}
        />
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6">
        <div className="col-span-12 md:col-span-12 xl:col-span-7">
          <ReportChart {...(restaurant.scoreOverview || {})} />
        </div>
        <div className="col-span-12 md:col-span-6 xl:col-span-5">
          <PieCharts {...(restaurant.scoreOverview || {})} />
        </div>
      </div>
    </>
  );
}
