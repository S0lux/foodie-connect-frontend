import http from "@/lib/http";
import { CreateDishCategoriesBodyType } from "@/schema/dishCategories.schema";
import { Category } from "@/types/dishes.type";
import { ErrorType } from "@/types/error.type";
import axios from "axios";

const dishCategoriesActions = {
  getDishCategories: async (restaurantId: string) => {
    try {
      const response = await http.get<Category[]>(
        `v1/restaurants/${restaurantId}/categories`,
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const dishCategoriesError = error.response.data as ErrorType;
        console.error("Error during get restaurants:", dishCategoriesError);
        throw dishCategoriesError;
      } else {
        console.error("Unexpected error during get restaurants:", error);
        throw error;
      }
    }
  },

  addDishCategory: async (
    restaurantId: string,
    categoryName: CreateDishCategoriesBodyType,
  ) => {
    try {
      const response = await http.post(
        `v1/restaurants/${restaurantId}/categories`,
        categoryName,
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const dishCategoriesError = error.response.data as ErrorType;
        console.error("Error during add restaurant:", dishCategoriesError);
        throw dishCategoriesError;
      } else {
        console.error("Unexpected error during add restaurant:", error);
        throw error;
      }
    }
  },
};

export default dishCategoriesActions;
