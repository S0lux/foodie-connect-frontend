import dishesActions from "@/apis/dishes.api";
import http from "@/lib/http";
import { DishBodyType, UpdateDishBodyType } from "@/schema/dish.schema";
import { ErrorType } from "@/types/error.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useDishes = {
  useGetDishes(
    restaurantId?: string,
    categories?: string,
    minPrice?: number,
    maxPrice?: number,
    name?: string,
  ) {
    return useQuery({
      queryKey: ["dishes"],
      queryFn: async () => {
        try {
          const result = await dishesActions.getDishes(
            restaurantId,
            categories,
            minPrice,
            maxPrice,
            name,
          );
          return result;
        } catch (error) {
          console.error("Error during session retrieval:", error);
          throw error;
        }
      },
    });
  },

  useGetDish(dishId: string) {
    return useQuery({
      queryKey: ["dish"],
      queryFn: async () => {
        try {
          const result = await dishesActions.getDish(dishId);
          return result;
        } catch (error) {
          console.error("Error during session retrieval:", error);
          throw error;
        }
      },
    });
  },

  useCreateDish() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (dishDetails: DishBodyType) =>
        dishesActions.createDish(dishDetails),
      onError: (error: ErrorType) => {
        console.error("Error during dish creation:", error);
        throw error;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["dishes"],
        });
      },
    });
  },

  useUploadDishImage() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ dishId, image }: { dishId: string; image: File }) =>
        dishesActions.updateDishImage(dishId, image),
      onError: (error: ErrorType) => {
        console.error("Error during dish image upload:", error);
        throw error;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["dishes"],
        });
      },
    });
  },

  useUpdateDish() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({
        dishId,
        dishDetails,
      }: {
        dishId: string;
        dishDetails: UpdateDishBodyType;
      }) => dishesActions.updateDish(dishId, dishDetails),
      onError: (error: ErrorType) => {
        console.error("Error during dish update:", error);
        throw error;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["dishes"],
        });
      },
    });
  },

  useDeleteDish() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (dishId: string) => dishesActions.deleteDish(dishId),
      onError: (error: ErrorType) => {
        console.error("Error during dish deletion:", error);
        throw error;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["dishes"],
        });
      },
    });
  },
};

export default useDishes;
