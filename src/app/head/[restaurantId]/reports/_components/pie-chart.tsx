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
import { ScoreOverview } from "@/types/restaurant.type";

export const description = "A pie chart showing good vs bad ratings";

export function PieCharts(data: ScoreOverview) {
  const goodRatings = data.fiveStars + data.fourStars;
  const badRatings = data.threeStars + data.twoStars + data.oneStar;

  const chartData = [
    {
      review: "Good (4-5 stars)",
      rating: goodRatings,
      fill: "#47b847",
    },
    {
      review: "Bad (1-3 stars)",
      rating: badRatings,
      fill: "#ff4d4d",
    },
  ];

  const chartConfig = {
    rating: {
      label: "Rating",
    },
    "Good (4-5 stars)": {
      label: "Good (4-5 stars)",
      color: "#47b847",
    },
    "Bad (1-3 stars)": {
      label: "Bad (1-3 stars)",
      color: "#ff4d4d",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex h-full flex-col rounded-sm border-none shadow-md">
      <CardHeader className="items-center pb-0">
        <CardTitle>Rating </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square">
          <PieChart>
            <Pie data={chartData} dataKey="rating" nameKey="review" label />
            <ChartLegend
              content={<ChartLegendContent nameKey="review" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/2 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
