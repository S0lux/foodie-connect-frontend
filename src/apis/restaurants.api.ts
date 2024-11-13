import http from "@/lib/http";
import { CreateRestaurantBodyType } from "@/schema/restaurant.schema";
import { ErrorType } from "@/types/error.type";
import { Restaurant } from "@/types/restaurant.type";
import axios from "axios";

const restaurantsActions = {
  getRestaurants: async (
    ownerId?: string,
    radius?: number,
    origin?: string,
  ) => {
    try {
      const params = {
        ownerId,
        radius,
        origin,
      };
      const response = await http.get<Restaurant[]>("v1/restaurants", {
        params,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const restaurantsError = error.response.data as ErrorType;
        console.error("Error during get restaurants:", restaurantsError);
        throw restaurantsError;
      } else {
        console.error("Unexpected error during get restaurants:", error);
        throw error;
      }
    }
  },

  getRestaurant: async (restaurantId: string) => {
    try {
      const response = await http.get<Restaurant>(
        `v1/restaurants/${restaurantId}`,
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const restaurantError = error.response.data as ErrorType;
        console.error("Error during get restaurant:", restaurantError);
        throw restaurantError;
      } else {
        console.error("Unexpected error during get restaurant:", error);
        throw error;
      }
    }
  },

  createRestaurant: async (restaurant: CreateRestaurantBodyType) => {
    try {
      const response = await http.post("v1/restaurants", restaurant);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const createRestaurantError = error.response.data as ErrorType;
        console.error("Error during create restaurant:", createRestaurantError);
        throw createRestaurantError;
      } else {
        console.error("Unexpected error during create restaurant:", error);
        throw error;
      }
    }
  },
};

export default restaurantsActions;
