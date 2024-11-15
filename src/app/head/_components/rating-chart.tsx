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
const chartData = [
  { month: "January", rating: 186 },
  { month: "February", rating: 305 },
  { month: "March", rating: 237 },
  { month: "April", rating: 73 },
  { month: "May", rating: 209 },
  { month: "June", rating: 214 },
];

const chartConfig = {
  rating: {
    label: "Rating",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function RatingChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rating Overview</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-96 w-full" config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={6}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Line
              dataKey="rating"
              type="linear"
              stroke="var(--color-rating)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-rating)",
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
