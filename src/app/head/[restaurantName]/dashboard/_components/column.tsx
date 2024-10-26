"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Order = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  phone: string;
  customerName: string;
  orderDate: string;
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "orderDate",
    header: "Order Date",
  },
];
