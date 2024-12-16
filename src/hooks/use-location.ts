import { useState, useEffect } from "react";
import { toast } from "./use-toast";

interface LocationState {
  latitude: number;
  longitude: number;
  locationString: string | undefined;
  error: string | null;
  isLoading: boolean;
}

export function useUserLocation() {
  const [location, setLocation] = useState<LocationState>({
    latitude: 10.74964,
    longitude: 106.61532,
    locationString: "106.61532,10.74964",
    error: null,
    isLoading: true,
  });

  useEffect(() => {
    // Only run on client-side
    if (typeof window === "undefined" || !navigator.geolocation) {
      setLocation((prev) => ({
        ...prev,
        error: "Geolocation is not supported",
        isLoading: false,
      }));
      return;
    }

    // Success callback
    const onSuccess = (position: GeolocationPosition) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        locationString: `${position.coords.longitude},${position.coords.latitude}`,
        error: null,
        isLoading: false,
      });
    };

    // Error callback
    const onError = (error: GeolocationPositionError) => {
      setLocation((prev) => ({
        ...prev,
        error: error.message,
        isLoading: false,
      }));
      toast({
        title: "Permission denied",
        description:
          "Allow location permission to help us better find your needs!",
      });
    };

    // Request current position
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
}
