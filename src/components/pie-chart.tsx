"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

export const description = "A pie chart with a legend";

const chartData = [
  { review: "star1", rating: 275, fill: "var(--color-star1)" },
  { review: "star2", rating: 200, fill: "var(--color-star2)" },
  { review: "star3", rating: 187, fill: "var(--color-star3)" },
  { review: "star4", rating: 128, fill: "var(--color-star4)" },
  { review: "star5", rating: 77, fill: "var(--color-star5)" },
];

const chartConfig = {
  rating: {
    label: "Rating",
  },
  star1: {
    label: "1 Star",
    color: "#ff4d4d", // Red for worst rating
  },
  star2: {
    label: "2 Star",
    color: "#ff9933", // Orange for below average
  },
  star3: {
    label: "3 Star",
    color: "#ffcc00", // Yellow for average
  },
  star4: {
    label: "4 Star",
    color: "#99cc33", // Light green for good
  },
  star5: {
    label: "5 Star",
    color: "#47b847", // Green for excellent
  },
} satisfies ChartConfig;

export function PieCharts() {
  return (
    <Card className="flex h-full flex-col rounded-sm border-none shadow-md">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total Rating</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square">
          <PieChart>
            <Pie data={chartData} dataKey="rating" />
            <ChartLegend
              content={<ChartLegendContent nameKey="review" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
