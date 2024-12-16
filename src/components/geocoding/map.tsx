import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Places from "@/components/geocoding/places";
import { useUserLocation } from "@/hooks/use-location";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

interface PlacesProps {
  children: React.ReactNode;
  setFormatAddress: (address: string) => void;
  office: LatLngLiteral | null;
  setOffice: (position: google.maps.LatLngLiteral) => void;
}

export default function Map({
  children,
  setFormatAddress,
  office,
  setOffice,
}: PlacesProps) {
  const [currentZoom, setCurrentZoom] = useState(15);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
    libraries: ["places"],
  });

  const mapRef = useRef<google.maps.Map>();
  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    [],
  );

  useEffect(() => {
    if (office && mapRef.current) {
      mapRef.current.panTo(office);
      setCurrentZoom(30);
    }
  }, [office]);

  // const center = useMemo<LatLngLiteral>(
  //   () => ({ lat: 10.762622, lng: 106.660172 }),
  //   [],
  // );

  const { latitude, longitude } = useUserLocation();

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <div className="flex h-screen flex-col">
        <div className="mb-4 flex gap-2">
          <Places
            children={children}
            setFormatAddress={setFormatAddress}
            setOffice={(position: LatLngLiteral) => {
              setOffice(position);
              mapRef.current?.panTo(position);
            }}
          />
        </div>
        <div className="size-full">
          <GoogleMap
            zoom={currentZoom}
            center={{ lat: latitude, lng: longitude }}
            mapContainerClassName="map-container"
            options={options}
            onLoad={onLoad}
          >
            {office && <Marker position={office} />}
          </GoogleMap>
        </div>
      </div>
    </>
  );
}
