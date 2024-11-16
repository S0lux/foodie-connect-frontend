import http from "@/lib/http";
import { CreatePromotionBodyType } from "@/schema/promotion.schema";
import { ErrorType } from "@/types/error.type";
import { Promotion, Promotions } from "@/types/promotion.type";
import axios from "axios";
import { get } from "http";

const promotionActions = {
  createPromotion: async (
    restaurantId: string,
    promotion: CreatePromotionBodyType,
  ) => {
    try {
      const response = await http.post(
        `v1/restaurants/${restaurantId}/promotions`,
        promotion,
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const promotionError = error.response.data as ErrorType;
        console.error("Error during create promotion:", promotionError);
        throw promotionError;
      } else {
        console.error("Unexpected error during create promotion:", error);
        throw error;
      }
    }
  },

  getPromotions: async (restaurantId: string) => {
    try {
      const response = await http.get<Promotions>(
        `v1/restaurants/${restaurantId}/promotions`,
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const promotionError = error.response.data as ErrorType;
        console.error("Error during get promotions:", promotionError);
        throw promotionError;
      } else {
        console.error("Unexpected error during get promotions:", error);
        throw error;
      }
    }
  },

  getPromotion: async (restaurantId: string, promotionId: string) => {
    try {
      const response = await http.get<Promotion>(
        `v1/restaurants/${restaurantId}/promotions/${promotionId}`,
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const promotionError = error.response.data as ErrorType;
        console.error("Error during get promotion:", promotionError);
        throw promotionError;
      } else {
        console.error("Unexpected error during get promotion:", error);
        throw error;
      }
    }
  },

  deletePromotion: async (restaurantId: string, promotionId: string) => {
    try {
      const response = await http.delete(
        `v1/restaurants/${restaurantId}/promotions/${promotionId}`,
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const promotionError = error.response.data as ErrorType;
        console.error("Error during delete promotion:", promotionError);
        throw promotionError;
      } else {
        console.error("Unexpected error during delete promotion:", error);
        throw error;
      }
    }
  },
};

export default promotionActions;
