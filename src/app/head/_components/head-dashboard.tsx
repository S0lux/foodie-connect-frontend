"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Star, Users, Utensils } from "lucide-react";
import { HeadStatCard } from "@/app/head/_components/head-stat-card";
import { RatingChart } from "@/app/head/_components/rating-chart";
import useRestaurants from "@/hooks/use-restaurants";
import useAuth from "@/hooks/use-auth";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeadDashboard = () => {
  const {
    data: user,
    isLoading: loadingUser,
    isError: authError,
  } = useAuth.useGetSession();
  const {
    data: restaurants,
    isLoading: loadingRestaurants,
    isError: restaurantError,
  } = useRestaurants.useGetRestaurants(user?.id);

  const calculateStats = () => {
    if (!restaurants)
      return {
        totalActiveRestaurants: 0,
        totalRatings: 0,
        averageRating: 0,
        monthlyGrowth: 0,
      };

    // Get restaurants from last month by createdAt date
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const lastMonthRestaurants = restaurants.filter(
      (r) => new Date(r.createdAt) >= lastMonth,
    ).length;

    const monthlyGrowth = restaurants.length
      ? (lastMonthRestaurants / restaurants.length) * 100 - 100
      : 0;

    // Calculate active restaurants and rating stats
    const activeRestaurants = restaurants.filter(
      (r) => r.status === "Open",
    ).length;
    const totalRatings = restaurants.reduce((acc, restaurant) => {
      const { scoreOverview } = restaurant;
      return (
        acc +
        (scoreOverview.fiveStars +
          scoreOverview.fourStars +
          scoreOverview.threeStars +
          scoreOverview.twoStars +
          scoreOverview.oneStar)
      );
    }, 0);

    const previousRatings = totalRatings * 0.8; // Simulated previous month ratings
    const ratingsGrowth =
      ((totalRatings - previousRatings) / previousRatings) * 100;

    return {
      totalActiveRestaurants: activeRestaurants,
      activeGrowth: (activeRestaurants / restaurants.length) * 100 - 100,
      totalRatings,
      ratingsGrowth,
      monthlyGrowth,
    };
  };

  const stats = calculateStats();

  if (loadingUser || loadingRestaurants)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );

  if (authError || restaurantError) return <div>Error...</div>;

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <HeadStatCard
          title="Total Restaurants"
          value={restaurants?.length || 0}
          icon={Building2}
        />
        <HeadStatCard
          title="Total Reviews"
          value={stats.totalRatings}
          icon={Star}
        />
        <HeadStatCard
          title="Active Restaurants"
          value={stats.totalActiveRestaurants}
          icon={Utensils}
        />
        <HeadStatCard
          title="Avg Reviews/Restaurant"
          value={
            restaurants?.length
              ? (stats.totalRatings / restaurants.length).toFixed(1)
              : 0
          }
          icon={Users}
        />
      </div>

      <Card className="h-full">
        <CardHeader>
          <CardTitle>Restaurant Ratings Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="">
            <RatingChart data={restaurants || []} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Status Overview</CardTitle>
            <Link href="/head/restaurants">
              <Button variant={"link"}>View all restaurants</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {["Open", "Closed", "PermanentlyClosed"].map((status) => {
              const count =
                restaurants?.filter((r) => r.status === status).length || 0;
              const percentage = restaurants?.length
                ? ((count / restaurants.length) * 100).toFixed(1)
                : "0";

              return (
                <div key={status} className="rounded-md border p-4">
                  <h3 className="font-medium">{status}</h3>
                  <p className="text-2xl font-bold">{count}</p>
                  <p className="text-xs text-muted-foreground">
                    {percentage}% of total
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HeadDashboard;
