import http from "@/lib/http";
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
};

export default dishCategoriesActions;
