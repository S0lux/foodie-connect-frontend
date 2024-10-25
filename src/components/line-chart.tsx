"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A line chart";

const chartData = [
  { day: "Monday", profit: 186, orders: 80, users: 20 },
  { day: "Tuesday", profit: 305, orders: 200, users: 40 },
  { day: "Wednesday", profit: 237, orders: 120, users: 30 },
  { day: "Thursday", profit: 73, orders: 190, users: 50 },
  { day: "Friday", profit: 209, orders: 130, users: 10 },
  { day: "Saturday", profit: 214, orders: 140, users: 60 },
  { day: "Sunday", profit: 215, orders: 150, users: 70 },
];

const chartConfig = {
  profit: {
    label: "Profit",
    color: "var(--chart-1)",
  },
  orders: {
    label: "Orders",
    color: "var(--chart-2)",
  },
  users: {
    label: "Users",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

const LegendCard: React.FC = () => {
  return (
    <div className="flex w-full items-center justify-end space-x-3 pr-8 text-end">
      {Object.values(chartConfig).map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <div
            className="h-4 w-4 rounded-full shadow-md"
            style={{ backgroundColor: item.color }}
          ></div>
          <span className="text-sm font-medium text-gray-700">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export function Line_Chart() {
  return (
    <Card className="rounded-sm border-none shadow-md">
      <CardHeader className="flex">
        <div>
          <CardTitle>Statistical</CardTitle>
          <CardDescription>In the past week</CardDescription>
        </div>
        <LegendCard />
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            className="pr-4"
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={6}
            />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="profit"
              type="natural"
              stroke="var(--color-profit)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="orders"
              type="natural"
              stroke="var(--color-orders)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="users"
              type="natural"
              stroke="var(--color-users)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
