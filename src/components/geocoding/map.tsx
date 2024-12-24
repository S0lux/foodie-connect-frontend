import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Places from "@/components/geocoding/places";
import { useUserLocation } from "@/hooks/use-location";
import { set } from "date-fns";

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
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
    libraries: ["places"],
  });
  const { latitude, longitude } = useUserLocation();
  const [currentCentering, setCentering] = useState<LatLngLiteral>(
    office || { lat: latitude, lng: longitude },
  );
  const [currentZoom, setCurrentZoom] = useState(17);

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
      office && setCentering(office);
      setCurrentZoom(30);
    }
  }, [office]);

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
              mapRef.current?.panTo({ lat: 0, lng: 0 });
            }}
          />
        </div>
        <div className="size-full">
          <GoogleMap
            zoom={currentZoom}
            mapContainerClassName="map-container"
            center={currentCentering}
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
