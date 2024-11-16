import http from "@/lib/http";
import {
  CreateRestaurantBodyType,
  UpdateRestaurantBodyType,
} from "@/schema/restaurant.schema";
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

  updateRestaurant: async (
    restaurantId: string,
    restaurant: UpdateRestaurantBodyType,
  ) => {
    try {
      const response = await http.put(
        `v1/restaurants/${restaurantId}`,
        restaurant,
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const updateRestaurantError = error.response.data as ErrorType;
        console.error("Error during update restaurant:", updateRestaurantError);
        throw updateRestaurantError;
      } else {
        console.error("Unexpected error during update restaurant:", error);
        throw error;
      }
    }
  },

  updateRestaurantLogo: async (restaurantId: string, logo: File) => {
    try {
      const formData = new FormData();
      formData.append("file", logo);
      const response = await http.put(
        `v1/restaurants/${restaurantId}/logo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const updateRestaurantLogoError = error.response.data as ErrorType;
        console.error(
          "Error during update restaurant logo:",
          updateRestaurantLogoError,
        );
        throw updateRestaurantLogoError;
      } else {
        console.error("Unexpected error during update restaurant logo:", error);
        throw error;
      }
    }
  },

  updateRestaurantBanner: async (restaurantId: string, banner: File) => {
    try {
      const formData = new FormData();
      formData.append("file", banner);
      const response = await http.put(
        `v1/restaurants/${restaurantId}/banner`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const updateRestaurantBannerError = error.response.data as ErrorType;
        console.error(
          "Error during update restaurant banner:",
          updateRestaurantBannerError,
        );
        throw updateRestaurantBannerError;
      } else {
        console.error(
          "Unexpected error during update restaurant banner:",
          error,
        );
        throw error;
      }
    }
  },

  uploadImage: async (restaurantId: string, images: File[]) => {
    try {
      const formData = new FormData();
      images.forEach((image, index) => {
        formData.append(`files[${index}]`, image);
      });
      const response = await http.post(
        `v1/restaurants/${restaurantId}/images`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const uploadImageError = error.response.data as ErrorType;
        console.error("Error during upload image:", uploadImageError);
        throw uploadImageError;
      } else {
        console.error("Unexpected error during upload image:", error);
        throw error;
      }
    }
  },
};

export default restaurantsActions;
