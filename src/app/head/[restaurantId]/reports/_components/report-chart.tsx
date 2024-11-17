"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";

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
import { ScoreOverview } from "@/types/restaurant.type";

export default function ReportChart(data: ScoreOverview) {
  const chartData = [
    {
      review: "5 Stars",
      rating: data.fiveStars,
      fill: "#47b847",
    },
    {
      review: "4 Stars",
      rating: data.fourStars,
      fill: "#99cc33",
    },
    {
      review: "3 Stars",
      rating: data.threeStars,
      fill: "#ffcc00",
    },
    {
      review: "2 Stars",
      rating: data.twoStars,
      fill: "#ff9933",
    },
    {
      review: "1 Star",
      rating: data.oneStar,
      fill: "#ff4d4d",
    },
  ];

  const chartConfig = {
    rating: {
      label: "Rating",
    },
    "5 Stars": {
      label: "5 Star",
      color: "#47b847",
    },
    "4 Stars": {
      label: "4 Star",
      color: "#99cc33",
    },
    "3 Stars": {
      label: "3 Star",
      color: "#ffcc00",
    },
    "2 Stars": {
      label: "2 Star",
      color: "#ff9933",
    },
    "1 Star": {
      label: "1 Star",
      color: "#ff4d4d",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rating Overview</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-96 w-full" config={chartConfig}>
          <BarChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="review"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={4}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="rating" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  );
}
