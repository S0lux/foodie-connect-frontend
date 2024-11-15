import { Restaurant } from "@/types/retaurant.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "./http";
import { Dish } from "@/types/dish.type";
import { RestaurantReviews } from "@/types/restaurant-reviews.type";
import { ReviewBody } from "@/schema/review.schema";

const useRestaurantDetail = {
  useGetRestaurantDetail(restaurantId: string) {
    return useQuery({
      queryFn: async () => {
        return await http
          .get<Restaurant>(`v1/restaurants/${restaurantId}`)
          .then((res) => res.data);
      },
      queryKey: ["restaurant-detail", restaurantId],
    });
  },

  useGetRestaurantDetailMenu(restaurantId: string) {
    return useQuery({
      queryFn: async () => {
        return await http
          .get<Dish[]>(`v1/dishes`, { params: { RestaurantId: restaurantId } })
          .then((res) => res.data);
      },
      queryKey: ["restaurant-detail-menu", restaurantId],
    });
  },

  useGetRestaurantReview(restaurantId: string) {
    return useQuery({
      queryFn: async () => {
        return await http
          .get<RestaurantReviews>(`v1/restaurants/${restaurantId}/reviews`)
          .then((res) => res.data);
      },
      queryKey: ["restaurant-detail-review", restaurantId],
    });
  },

  useCreateRestaurantReview() {
    const client = useQueryClient();
    return useMutation({
      mutationFn: async (data: {
        restaurantId: string;
        review: ReviewBody;
      }) => {
        const response = await http.post(
          `v1/restaurants/${data.restaurantId}/reviews`,
          data.review,
        );
        return response;
      },
      onSuccess: (variables) => {
        client.invalidateQueries({
          queryKey: ["restaurant-detail-review", variables.data.restaurantId],
        });
      },
    });
  },
};

export default useRestaurantDetail;
