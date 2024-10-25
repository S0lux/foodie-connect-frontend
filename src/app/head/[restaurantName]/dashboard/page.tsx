import CardDataStats from "@/components/card-data-stats";
import { ColumnChart } from "@/components/column-chart";
import { PieCharts } from "@/components/pie-chart";
import { BookA, Eye, ShoppingCart } from "lucide-react";
import { Line_Chart } from "@/components/line-chart";
import { Payment, columns } from "./_components/column";
import { DataTable } from "./_components/data-table";

import React from "react";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}

export default async function Dashboard() {
  const data = await getData();
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
        <CardDataStats
          title="Total Reviews"
          total="$3.456K"
          rate="0.43%"
          levelUp
          icon={<Eye />}
        />
        <CardDataStats
          title="Total Profit"
          total="$45,2K"
          rate="4.35%"
          levelUp
          icon={<ShoppingCart />}
        />
        <CardDataStats
          title="Total Orders"
          total="2.450"
          rate="2.59%"
          levelUp
          icon={<BookA />}
        />
        <CardDataStats
          title="Total Users"
          total="3.456"
          rate="0.95%"
          levelDown
          icon={<Eye />}
        />
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6">
        <div className="col-span-12 md:col-span-12 xl:col-span-7">
          <Line_Chart />
        </div>
        <div className="col-span-12 md:col-span-6 xl:col-span-5">
          <PieCharts />
        </div>
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
