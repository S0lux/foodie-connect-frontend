import dishCategoriesActions from "@/apis/dishCategories.api";
import { useQuery } from "@tanstack/react-query";

const useDishCategories = {
  useGetDishCategories(restaurantId: string) {
    return useQuery({
      queryKey: ["dishCategories", restaurantId],
      queryFn: async () => {
        try {
          const result =
            await dishCategoriesActions.getDishCategories(restaurantId);
          return result;
        } catch (error) {
          console.error("Error during session retrieval:", error);
          throw error;
        }
      },
    });
  },
};

export default useDishCategories;
