import http from "@/lib/http";
import { ChangePasswordBodyType } from "@/schema/auth.schema";
import { ErrorType } from "@/types/error.type";
import axios from "axios";

const userAction = {
  changeAvatar: async (userId: string, avatar: File) => {
    try {
      const formData = new FormData();
      formData.append("file", avatar);
      const response = await http.patch(`v1/users/${userId}/avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const userError = error.response.data as ErrorType;
        console.error("Error during update user avatar:", userError);
        throw userError;
      } else {
        console.error("Unexpected error during update user avatar:", error);
        throw error;
      }
    }
  },

  changePassword: async (userId: string, body: ChangePasswordBodyType) => {
    try {
      const response = await http.patch(`v1/users/${userId}/password`, body);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const userError = error.response.data as ErrorType;
        console.error("Error during change user password:", userError);
        throw userError;
      } else {
        console.error("Unexpected error during change user password:", error);
        throw error;
      }
    }
  },

  upgradeHead: async (userId: string) => {
    try {
      const response = await http.patch(`v1/users/${userId}/type`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const userError = error.response.data as ErrorType;
        console.error("Error during upgrade user head:", userError);
        throw userError;
      } else {
        console.error("Unexpected error during upgrade user head:", error);
        throw error;
      }
    }
  },
};

export default userAction;
