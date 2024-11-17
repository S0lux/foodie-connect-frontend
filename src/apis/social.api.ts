import http from "@/lib/http";
import axios from "axios";
import { ErrorType } from "@/types/error.type";
import {
  CreateSocialBodyType,
  UpdateSocialBodyType,
} from "@/schema/social.schema";

const socialsActions = {
  getSocials: async (restaurantId: string) => {
    try {
      const response = await http.get(
        `/v1/restaurants/${restaurantId}/socials`,
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const socialError = error.response.data as ErrorType;
        console.error("Error during get socials:", socialError);
        throw socialError;
      } else {
        console.error("Unexpected error during get socials:", error);
        throw error;
      }
    }
  },

  createSocial: async (
    restaurantId: string,
    socialDetails: CreateSocialBodyType,
  ) => {
    try {
      const response = await http.post(
        `/v1/restaurants/${restaurantId}/socials`,
        socialDetails,
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const socialError = error.response.data as ErrorType;
        console.error("Error during create social:", socialError);
        throw socialError;
      } else {
        console.error("Unexpected error during create social:", error);
        throw error;
      }
    }
  },

  updateSocial: async (
    restaurantId: string,
    socialId: string,
    socialDetails: UpdateSocialBodyType,
  ) => {
    try {
      const response = await http.put(
        `/v1/restaurants/${restaurantId}/socials/${socialId}`,
        socialDetails,
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const socialError = error.response.data as ErrorType;
        console.error("Error during update social:", socialError);
        throw socialError;
      } else {
        console.error("Unexpected error during update social:", error);
        throw error;
      }
    }
  },

  deleteSocial: async (restaurantId: string, socialId: string) => {
    try {
      const response = await http.delete(
        `/v1/restaurants/${restaurantId}/socials/${socialId}`,
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const socialError = error.response.data as ErrorType;
        console.error("Error during delete social:", socialError);
        throw socialError;
      } else {
        console.error("Unexpected error during delete social:", error);
        throw error;
      }
    }
  },
};

export default socialsActions;
