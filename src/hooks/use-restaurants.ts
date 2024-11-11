import restaurantsActions from "@/apis/restaurants.api";
import { useQuery } from "@tanstack/react-query";

const useRestaurants = {
  useGetRestaurants(ownerId?: string, radius?: number, origin?: string) {
    return useQuery({
      queryKey: ["restaurants", ownerId, radius, origin],
      queryFn: async () => {
        try {
          const result = await restaurantsActions.getRestaurants(
            ownerId,
            radius,
            origin,
          );
          return result;
        } catch (error) {
          console.error("Error during session retrieval:", error);
          throw error;
        }
      },
    });
  },

  useGetRestaurant(restaurantId: string) {
    return useQuery({
      queryKey: ["restaurant", restaurantId],
      queryFn: async () => {
        try {
          const result = await restaurantsActions.getRestaurant(restaurantId);
          return result;
        } catch (error) {
          console.error("Error during session retrieval:", error);
          throw error;
        }
      },
    });
  },
};

export default useRestaurants;
