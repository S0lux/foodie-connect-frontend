import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Star, Users, Utensils } from "lucide-react";
import { HeadStatCard } from "@/app/head/_components/head-stat-card";
import { RatingChart } from "@/app/head/_components/rating-chart";
import { Performance, columns } from "@/app/head/_components/column";
import { DataTable } from "@/app/head/_components/data-table";

const restaurantPerformance = [
  { name: "Nhà hàng A", revenue: 150000, growth: 12.5, orders: 1200 },
  { name: "Nhà hàng B", revenue: 120000, growth: -2.3, orders: 980 },
  { name: "Nhà hàng C", revenue: 180000, growth: 15.7, orders: 1500 },
  { name: "Nhà hàng D", revenue: 90000, growth: 5.2, orders: 850 },
];

async function getData(): Promise<Performance[]> {
  return [
    {
      id: "1",
      restaurantName: "Restaurant A",
      status: "active",
      rating: 4.5,
      open: "9:00 AM",
      closed: "10:00 PM",
    },
    {
      id: "2",
      restaurantName: "Restaurant B",
      status: "active",
      rating: 4.2,
      open: "9:00 AM",
      closed: "10:00 PM",
    },
    {
      id: "3",
      restaurantName: "Restaurant C",
      status: "inactive",
      rating: 3.9,
      open: "9:00 AM",
      closed: "10:00 PM",
    },
    {
      id: "4",
      restaurantName: "Restaurant D",
      status: "active",
      rating: 4.0,
      open: "9:00 AM",
      closed: "10:00 PM",
    },
  ];
}

export default async function HeadDashboard() {
  const data = await getData();

  const totalRevenue = restaurantPerformance.reduce(
    (sum, restaurant) => sum + restaurant.revenue,
    0,
  );
  const totalOrders = restaurantPerformance.reduce(
    (sum, restaurant) => sum + restaurant.orders,
    0,
  );
  const averageGrowth = (
    restaurantPerformance.reduce(
      (sum, restaurant) => sum + restaurant.growth,
      0,
    ) / restaurantPerformance.length
  ).toFixed(1);

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <HeadStatCard
          title="Total Dish"
          value={totalRevenue}
          icon={Utensils}
          prefix="$"
          change={{ value: Number(averageGrowth), timespan: "month" }}
        />
        <HeadStatCard
          title="Total Ratings"
          value={totalOrders}
          icon={Star}
          change={{ value: 12.3, timespan: "month" }}
        />
        <HeadStatCard
          title="Active Restaurants"
          value={restaurantPerformance.length}
          icon={Building2}
          change={{ value: 1, timespan: "month" }}
        />
        <HeadStatCard
          title="Total Users"
          value={124}
          icon={Users}
          change={{ value: 6, timespan: "month" }}
        />
      </div>

      <RatingChart />

      <Card>
        <CardHeader>
          <CardTitle>Restaurant Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
}
