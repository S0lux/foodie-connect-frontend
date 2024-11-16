import OverViewRestaurant from "@/app/head/[restaurantId]/_components/over-view-restaurant";
import React from "react";

export default function OverViewPage({
  params,
}: {
  params: { restaurantId: string };
}) {
  return <OverViewRestaurant restaurantId={params.restaurantId} />;
}
