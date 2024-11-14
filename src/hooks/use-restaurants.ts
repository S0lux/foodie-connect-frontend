import restaurantsActions from "@/apis/restaurants.api";
import {
  CreateRestaurantBodyType,
  UpdateRestaurantBodyType,
} from "@/schema/restaurant.schema";
import { ErrorType } from "@/types/error.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

  useCreateRestaurant() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (restaurantDetails: CreateRestaurantBodyType) =>
        restaurantsActions.createRestaurant(restaurantDetails),
      onError: (error: ErrorType) => {
        console.error("Error during restaurant creation:", error);
        throw error;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["restaurants"],
        });
      },
    });
  },

  useUpdateRestaurant() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({
        restaurantId,
        restaurantDetails,
      }: {
        restaurantId: string;
        restaurantDetails: UpdateRestaurantBodyType;
      }) =>
        restaurantsActions.updateRestaurant(restaurantId, restaurantDetails),
      onError: (error: ErrorType) => {
        console.error("Error during restaurant creation:", error);
        throw error;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["restaurants"],
        });
      },
    });
  },

  useUpdateRestaurantLogo() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({
        restaurantId,
        logo,
      }: {
        restaurantId: string;
        logo: File;
      }) => restaurantsActions.updateRestaurantLogo(restaurantId, logo),
      onError: (error: ErrorType) => {
        console.error("Error during restaurant logo update:", error);
        throw error;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["restaurants", "restaurant"],
        });
      },
    });
  },

  useUpdateRestaurantBanner() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({
        restaurantId,
        banner,
      }: {
        restaurantId: string;
        banner: File;
      }) => restaurantsActions.updateRestaurantBanner(restaurantId, banner),
      onError: (error: ErrorType) => {
        console.error("Error during restaurant banner update:", error);
        throw error;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["restaurants", "restaurant"],
        });
      },
    });
  },
};

export default useRestaurants;
