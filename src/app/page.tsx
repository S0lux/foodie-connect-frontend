import Header from "@/components/header";
import Map from "@/components/map";
import RestaurantGrid, { RestaurantDto } from "@/components/restaurant-grid";
import http from "@/lib/http";
import { MapMarker } from "@/types/map-maker.type";
import { Restaurant } from "@/types/retaurant.type";
import "dotenv/config";

export default async function Home() {
  return (
    <>
      <Header></Header>
      <div className="mt-[--header-height] w-full px-10 xl:px-40">
        <div className="flex-col justify-center space-y-10 py-10">
          <div className="bg-background">
            <Map></Map>
          </div>
          <RestaurantGrid></RestaurantGrid>
        </div>
      </div>
    </>
  );
}
