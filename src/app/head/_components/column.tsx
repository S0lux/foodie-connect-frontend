"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Performance = {
  id: string;
  restaurantName: string;
  status: "active" | "inactive";
  growth: number;
  revenue: number;
  orders: number;
};

export const columns: ColumnDef<Performance>[] = [
  {
    accessorKey: "restaurantName",
    header: "Restaurant",
  },
  {
    accessorKey: "revenue",
    header: "Revenue",
  },
  {
    accessorKey: "growth",
    header: "Growth",
  },
  {
    accessorKey: "orders",
    header: "Orders",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
