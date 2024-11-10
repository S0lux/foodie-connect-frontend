import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, DollarSign, Users, Utensils } from "lucide-react";
import { HeadStatCard } from "@/app/head/_components/head-stat-card";
import { RevenueChart } from "@/app/head/_components/revenue-chart";
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
      growth: 12.5,
      revenue: 150000,
      orders: 1200,
    },
    {
      id: "2",
      restaurantName: "Restaurant B",
      status: "active",
      growth: -2.3,
      revenue: 120000,
      orders: 980,
    },
    {
      id: "3",
      restaurantName: "Restaurant C",
      status: "active",
      growth: 15.7,
      revenue: 180000,
      orders: 1500,
    },
    {
      id: "4",
      restaurantName: "Restaurant D",
      status: "active",
      growth: 5.2,
      revenue: 90000,
      orders: 850,
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
          title="Total Revenue"
          value={totalRevenue}
          icon={DollarSign}
          prefix="$"
          change={{ value: Number(averageGrowth), timespan: "month" }}
        />
        <HeadStatCard
          title="Total Orders"
          value={totalOrders}
          icon={Utensils}
          change={{ value: 12.3, timespan: "month" }}
        />
        <HeadStatCard
          title="Active Restaurants"
          value={restaurantPerformance.length}
          icon={Building2}
          change={{ value: 1, timespan: "month" }}
        />
        <HeadStatCard
          title="Total Staff"
          value={124}
          icon={Users}
          change={{ value: 6, timespan: "month" }}
        />
      </div>

      <RevenueChart />

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
