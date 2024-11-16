import promotionActions from "@/apis/promotion.api";
import { CreatePromotionBodyType } from "@/schema/promotion.schema";
import { ErrorType } from "@/types/error.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const usePromotion = {
  useCreatePromotion: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({
        restaurantId,
        promotionDetails,
      }: {
        restaurantId: string;
        promotionDetails: CreatePromotionBodyType;
      }) => promotionActions.createPromotion(restaurantId, promotionDetails),
      onError: (error: ErrorType) => {
        console.error("Error during promotion creation:", error);
        throw error;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["promotions"],
        });
      },
    });
  },
  useGetPromotions: (restaurantId: string) => {
    return useQuery({
      queryKey: ["promotions"],
      queryFn: async () => {
        try {
          const result = await promotionActions.getPromotions(restaurantId);
          return result;
        } catch (error) {
          console.error("Error during session retrieval:", error);
          throw error;
        }
      },
    });
  },

  useGetPromotion: (restaurantId: string, promotionId: string) => {
    return useQuery({
      queryKey: ["promotion"],
      queryFn: async () => {
        try {
          const result = await promotionActions.getPromotion(
            restaurantId,
            promotionId,
          );
          return result;
        } catch (error) {
          console.error("Error during session retrieval:", error);
          throw error;
        }
      },
    });
  },

  useDeletePromotion: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({
        restaurantId,
        promotionId,
      }: {
        restaurantId: string;
        promotionId: string;
      }) => promotionActions.deletePromotion(restaurantId, promotionId),
      onError: (error: ErrorType) => {
        console.error("Error during promotion deletion:", error);
        throw error;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["promotions"],
        });
      },
    });
  },
};

export default usePromotion;
