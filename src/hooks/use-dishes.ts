import dishesActions from "@/apis/dishes.api";
import { useQuery } from "@tanstack/react-query";

const useDishes = {
  useGetDishes(
    restaurantId: string,
    categories?: string,
    minPrice?: number,
    maxPrice?: number,
  ) {
    return useQuery({
      queryKey: ["dishes", restaurantId, categories, minPrice, maxPrice],
      queryFn: async () => {
        try {
          const result = await dishesActions.getDishes(
            restaurantId,
            categories,
            minPrice,
            maxPrice,
          );
          return result;
        } catch (error) {
          console.error("Error during session retrieval:", error);
          throw error;
        }
      },
    });
  },
};

export default useDishes;
