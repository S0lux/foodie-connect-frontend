import dishCategoriesActions from "@/apis/dishCategories.api";
import { CreateDishCategoriesBodyType } from "@/schema/dishCategories.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useDishCategories = {
  useGetDishCategories(restaurantId: string) {
    return useQuery({
      queryKey: ["dishCategories"],
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

  useCreateDishCategory() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({
        restaurantId,
        categoryName,
      }: {
        restaurantId: string;
        categoryName: CreateDishCategoriesBodyType;
      }) => dishCategoriesActions.addDishCategory(restaurantId, categoryName),
      onError: (error) => {
        console.error("Error during category creation:", error);
        throw error;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["dishCategories"],
        });
      },
    });
  },
};

export default useDishCategories;
