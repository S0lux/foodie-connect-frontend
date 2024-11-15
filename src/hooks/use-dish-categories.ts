import dishCategoriesActions from "@/apis/dishCategories.api";
import {
  CreateDishCategoriesBodyType,
  UpdateDishCategoryBodyType,
} from "@/schema/dishCategories.schema";
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
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["dishCategories"],
        });
      },
      onError: (error) => {
        console.error("Error during category creation:", error);
        throw error;
      },
    });
  },

  useDeleteDishCategory() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({
        restaurantId,
        categoryName,
      }: {
        restaurantId: string;
        categoryName: string;
      }) =>
        dishCategoriesActions.deleteDishCategory(restaurantId, categoryName),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["dishCategories"],
        });
      },
      onError: (error) => {
        console.error("Error during category deletion:", error);
        throw error;
      },
    });
  },

  useUpdateDishCategory() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({
        restaurantId,
        categoryName,
        newName,
      }: {
        restaurantId: string;
        categoryName: string;
        newName: UpdateDishCategoryBodyType;
      }) =>
        dishCategoriesActions.updateDishCategory(
          restaurantId,
          categoryName,
          newName,
        ),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["dishCategories"],
        });
      },
      onError: (error) => {
        console.error("Error during category update:", error);
        throw error;
      },
    });
  },
};

export default useDishCategories;
