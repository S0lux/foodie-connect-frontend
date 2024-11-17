import restaurantReviewsAction from "@/apis/restaurantReviews.api";
import { useQuery } from "@tanstack/react-query";

const useRestaurantReview = {
  useGetRestaurantReview: (restaurantId: string) => {
    return useQuery({
      queryKey: ["restaurantReviews", restaurantId],
      queryFn: async () => {
        try {
          const result =
            await restaurantReviewsAction.getRestaurantReviews(restaurantId);
          return result;
        } catch (error) {
          console.error("Error during session retrieval:", error);
          throw error;
        }
      },
    });
  },
};

export default useRestaurantReview;
