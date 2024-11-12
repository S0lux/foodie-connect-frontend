import http from "@/lib/http";
import { ErrorType } from "@/types/error.type";
import { Dish } from "@/types/dishes.type";
import axios from "axios";
import { DishBodyType, UpdateDishBodyType } from "@/schema/dish.schema";

const dishesActions = {
  getDishes: async (
    restaurantId: string,
    categories?: string,
    minPrice?: number,
    maxPrice?: number,
  ) => {
    try {
      const params = {
        restaurantId,
        categories,
        minPrice,
        maxPrice,
      };
      const response = await http.get<Dish[]>("v1/dishes", {
        params,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const dishesError = error.response.data as ErrorType;
        console.error("Error during get restaurants:", dishesError);
        throw dishesError;
      } else {
        console.error("Unexpected error during get restaurants:", error);
        throw error;
      }
    }
  },

  getDish: async (dishId: string) => {
    try {
      const response = await http.get<Dish>(`v1/dishes/${dishId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const dishError = error.response.data as ErrorType;
        console.error("Error during get restaurant:", dishError);
        throw dishError;
      } else {
        console.error("Unexpected error during get restaurant:", error);
        throw error;
      }
    }
  },

  createDish: async (dish: DishBodyType) => {
    try {
      const response = await http.post("v1/dishes", dish);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const dishError = error.response.data as ErrorType;
        console.error("Error during create restaurant:", dishError);
        throw dishError;
      } else {
        console.error("Unexpected error during create restaurant:", error);
        throw error;
      }
    }
  },

  updateDishImage: async (dishId: string, image: File) => {
    try {
      const formData = new FormData();
      formData.append("file", image);
      const response = await http.put(`v1/dishes/${dishId}/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const dishError = error.response.data as ErrorType;
        console.error("Error during update dish image:", dishError);
        throw dishError;
      } else {
        console.error("Unexpected error during update dish image:", error);
        throw error;
      }
    }
  },

  updateDish: async (dishId: string, dish: UpdateDishBodyType) => {
    try {
      const response = await http.put(`v1/dishes/${dishId}`, dish);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const dishError = error.response.data as ErrorType;
        console.error("Error during update dish:", dishError);
        throw dishError;
      } else {
        console.error("Unexpected error during update dish:", error);
        throw error;
      }
    }
  },
};

export default dishesActions;
