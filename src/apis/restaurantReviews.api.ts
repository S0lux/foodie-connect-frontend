import http from "@/lib/http";
import axios from "axios";
import { ErrorType } from "@/types/error.type";
import { RestaurantReviews } from "@/types/restaurant-reviews.type";

const restaurantReviewsAction = {
  getRestaurantReviews: async (restaurantId: string) => {
    try {
      const response = await http.get<RestaurantReviews>(
        `v1/restaurants/${restaurantId}/reviews`,
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const reviewError = error.response.data as ErrorType;
        console.error("Error during getRestaurantReviews:", reviewError);
        throw reviewError;
      } else {
        console.error("Unexpected error during getRestaurantReviews:", error);
        throw error;
      }
    }
  },
};

export default restaurantReviewsAction;
