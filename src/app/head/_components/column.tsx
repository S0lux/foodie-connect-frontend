"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Performance = {
  id: string;
  restaurantName: string;
  status: "active" | "inactive";
  rating: number;
  open: string;
  closed: string;
};

export const columns: ColumnDef<Performance>[] = [
  {
    accessorKey: "restaurantName",
    header: "Restaurant",
  },
  {
    accessorKey: "rating",
    header: "Rating",
  },
  {
    accessorKey: "open",
    header: "Open",
  },
  {
    accessorKey: "closed",
    header: "Closed",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
