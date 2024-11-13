import { z } from "zod";

export const CreateRestaurantBody = z.object({
  name: z.string(),
  openTime: z.string().regex(/^\d{2}:\d{2}:\d{2}$/),
  closeTime: z.string().regex(/^\d{2}:\d{2}:\d{2}$/),
  longitudeLatitude: z.string().refine(
    (value) => {
      const [longitude, latitude] = value.split(",");

      if (!longitude || !latitude) return false;

      const lon = parseFloat(longitude);
      const lat = parseFloat(latitude);

      return (
        !isNaN(lon) &&
        !isNaN(lat) &&
        lon >= -180 &&
        lon <= 180 &&
        lat >= -90 &&
        lat <= 90
      );
    },
    {
      message:
        "Invalid format. Please enter as 'longitude,latitude' (e.g. 103.8198,1.3521)",
    },
  ),
  status: z.enum(["Open", "Closed"]),
  phone: z.string().regex(/^\d{10}$/),
});

export type CreateRestaurantBodyType = z.TypeOf<typeof CreateRestaurantBody>;
