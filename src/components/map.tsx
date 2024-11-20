"use client";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  OverlayView,
  useJsApiLoader,
} from "@react-google-maps/api";
import Loader from "./loader";
import { useRouter } from "next/navigation";
import useRestaurants from "@/hooks/use-restaurants";
import { useState } from "react";
import { Restaurant } from "@/types/restaurant.type";
import { ArrowRight, Info } from "lucide-react";
import { Card, CardDescription, CardFooter, CardTitle } from "./ui/card";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

const Map = ({}: {}) => {
  const { data: restaurants } = useRestaurants.useGetRestaurants(
    "",
    5000,
    "106.61532,10.74964",
  );
  const center = { lat: 10.74964, lng: 106.61532 };
  const [selectedMaker, setSelectedMaker] = useState<Restaurant | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
    libraries: ["places"],
  });

  if (!isLoaded) return <Loader className="h-20 justify-center"></Loader>;

  const markerIcon = {
    url: "/images/logo-marker.png",
    scaledSize: new google.maps.Size(30, 30),
    fillColor: "#FFF",
    strokeWeight: 1,
    strokeColor: "#FFF",
  };

  return (
    <GoogleMap
      center={center ?? { lat: 10.831510970909536, lng: 106.62511084046088 }}
      zoom={16}
      mapContainerClassName="map"
    >
      {restaurants &&
        restaurants.map((restaurant, index) => {
          return (
            <Marker
              key={index}
              position={{ lat: restaurant.latitude, lng: restaurant.longitude }}
              icon={markerIcon}
              onClick={() => {
                setSelectedMaker(restaurant);
              }}
            ></Marker>
          );
        })}
      {selectedMaker && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedMaker(null);
          }}
          position={{
            lat: selectedMaker.latitude + 0.0005,
            lng: selectedMaker.longitude,
          }}
          options={{
            headerContent: (() => {
              const div = document.createElement("div");
              div.style.cssText = "padding: 0px; font-family: inherit;";
              div.innerHTML = `<span style="font-weight: 600; font-size: 14px; color: black">${selectedMaker.name}</span>`;
              return div;
            })(),
          }}
        >
          <Card className="w-40 border-none bg-white shadow-none">
            <CardDescription className="flex flex-col text-xs">
              <span className="break-words">
                {selectedMaker.formattedAddress}
              </span>
              <span
                className={twMerge(
                  "",
                  selectedMaker.status === "Open" && "text-green-500",
                  selectedMaker.status === "Closed" && "text-orange-500",
                  selectedMaker.status === "PermanentlyClosed" &&
                    "text-red-500",
                )}
              >
                {selectedMaker.status}
              </span>
            </CardDescription>
            <CardFooter className="px-0 py-2">
              <Link
                href={`/restaurant-detail/${selectedMaker.id}`}
                className="flex items-center space-x-1 text-primary"
              >
                <span>View restaurant</span>
                <ArrowRight size={10}></ArrowRight>
              </Link>
            </CardFooter>
          </Card>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default Map;
