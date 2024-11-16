import http from "@/lib/http";
import axios from "axios";
import { ErrorType } from "@/types/error.type";
import { DishReviews } from "@/types/dish-reviews.type";

const dishReviewsAction = {
  getDishReviews: async (dishId: string) => {
    try {
      const response = await http.get<DishReviews>(
        `v1/dishes/${dishId}/reviews`,
      );
      return response.data as DishReviews;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const reviewError = error.response.data as ErrorType;
        console.error("Error during getDishReviews:", reviewError);
        throw reviewError;
      } else {
        console.error("Unexpected error during getDishReviews:", error);
        throw error;
      }
    }
  },
};

export default dishReviewsAction;
