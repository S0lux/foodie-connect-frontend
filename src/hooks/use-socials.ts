import socialsActions from "@/apis/social.api";
import {
  CreateSocialBodyType,
  UpdateSocialBodyType,
} from "@/schema/social.schema";
import { ErrorType } from "@/types/error.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { use } from "react";

const useSocials = {
  useGetSocials: (restaurantId: string) => {
    return useQuery({
      queryKey: ["socials", restaurantId],
      queryFn: async () => {
        try {
          const result = await socialsActions.getSocials(restaurantId);
          return result;
        } catch (error) {
          console.error("Error during session retrieval:", error);
          throw error;
        }
      },
    });
  },

  useCreateSocial() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({
        restaurantId,
        socialDetails,
      }: {
        restaurantId: string;
        socialDetails: CreateSocialBodyType;
      }) => socialsActions.createSocial(restaurantId, socialDetails),
      onError: (error: ErrorType) => {
        console.error("Error during social creation:", error);
        throw error;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["socials"],
        });
      },
    });
  },

  useUpdateSocial() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({
        restaurantId,
        socialId,
        socialDetails,
      }: {
        restaurantId: string;
        socialId: string;
        socialDetails: UpdateSocialBodyType;
      }) => socialsActions.updateSocial(restaurantId, socialId, socialDetails),
      onError: (error: ErrorType) => {
        console.error("Error during social update:", error);
        throw error;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["socials"],
        });
      },
    });
  },

  useDeleteSocial() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({
        restaurantId,
        socialId,
      }: {
        restaurantId: string;
        socialId: string;
      }) => socialsActions.deleteSocial(restaurantId, socialId),
      onError: (error: ErrorType) => {
        console.error("Error during social deletion:", error);
        throw error;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["socials"],
        });
      },
    });
  },
};

export default useSocials;
