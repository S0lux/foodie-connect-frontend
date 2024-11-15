import Header from "@/components/header";
import Map from "@/components/map";
import RestaurantGrid, { RestaurantDto } from "@/components/restaurant-grid";
import http from "@/lib/http";
import { MapMarker } from "@/types/map-maker.type";
import { Restaurant } from "@/types/retaurant.type";
import "dotenv/config";

export default async function Home() {
  const restaurants: Restaurant[] = await http
    .get("v1/restaurants", { params: { Origin: "106.61532,10.74964" } })
    .then((res) => res.data);
  const nearByMarkers: MapMarker[] = restaurants.map((restaurant) => {
    return {
      lat: restaurant.latitude,
      lng: restaurant.longitude,
      restaurantId: restaurant.id,
    };
  });
  return (
    <>
      <Header></Header>
      <div className="mt-[--header-height] w-full px-10 xl:px-40">
        <div className="flex-col justify-center space-y-10 py-10">
          <div className="bg-background">
            <Map
              center={{ lat: 10.74964, lng: 106.61532 }}
              markers={nearByMarkers}
            ></Map>
          </div>
          <RestaurantGrid restaurants={restaurants}></RestaurantGrid>
        </div>
      </div>
    </>
  );
}
