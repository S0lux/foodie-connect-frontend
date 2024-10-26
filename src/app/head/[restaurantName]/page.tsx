import React from "react";

export default function Restaurant({
  params,
}: {
  params: { restaurantName: string };
}) {
  console.log(params);
  return <div>{params.restaurantName}</div>;
}
