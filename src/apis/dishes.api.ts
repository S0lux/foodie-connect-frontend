import http from "@/lib/http";
import { ErrorType } from "@/types/error.type";
import { Dish } from "@/types/dishes.type";
import axios from "axios";

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
};

export default dishesActions;
