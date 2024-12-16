import http from "@/lib/http";
import { Dish } from "@/types/dishes.type";
import { Restaurant } from "@/types/restaurant.type";
import { useQuery } from "@tanstack/react-query";

const useRecommendation = {
  useGetRestaurantRecommendation(userId: string, n?: number) {
    return useQuery({
      queryFn: async () => {
        return await http
          .get<
            Restaurant[]
          >(`/restaurants`, { params: { userId: userId, n: n } })
          .then((res) => res.data);
      },
      queryKey: ["restaurant-recommend", userId],
    });
  },

  useGetDishRecommendation(userId: string, n?: number) {
    return useQuery({
      queryFn: async () => {
        return await http
          .get<Dish[]>(`/dishes`, { params: { userId: userId, n: n } })
          .then((res) => res.data);
      },
      queryKey: ["dish-recommend", userId],
    });
  },
};

export default useRecommendation;
