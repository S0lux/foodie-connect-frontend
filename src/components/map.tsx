"use client";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Loader from "./loader";
import { MapMarker } from "@/types/map-maker.type";
import { useRouter } from "next/navigation";

const Map = ({
  center,
  markers,
}: {
  center: MapMarker;
  markers?: MapMarker[];
}) => {
  const router = useRouter();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
    libraries: ["places"],
  });

  if (!isLoaded) return <Loader className="h-40 justify-center"></Loader>;

  const markerIcon = {
    url: "/images/logo-marker.png",
    scaledSize: new google.maps.Size(30, 30),
    fillColor: "#FFF",
    strokeWeight: 1,
    strokeColor: "#FFF",
  };

  return (
    <GoogleMap center={center} zoom={16} mapContainerClassName="map">
      {markers &&
        markers.map((marker, index) => {
          return (
            <Marker
              key={index}
              position={marker}
              icon={markerIcon}
              onClick={() => {
                router.push(`/restaurant-detail/${marker.restaurantId}`);
              }}
            ></Marker>
          );
        })}
    </GoogleMap>
  );
};

export default Map;
