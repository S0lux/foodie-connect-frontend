import http from "@/lib/http";
import { ChangePasswordBodyType } from "@/schema/auth.schema";
import { ErrorType } from "@/types/error.type";
import axios from "axios";

const headAction = {
  changeAvatar: async (headId: string, avatar: File) => {
    try {
      const formData = new FormData();
      formData.append("file", avatar);
      const response = await http.patch(`v1/heads/${headId}/avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const headError = error.response.data as ErrorType;
        console.error("Error during update head avatar:", headError);
        throw headError;
      } else {
        console.error("Unexpected error during update head avatar:", error);
        throw error;
      }
    }
  },

  changePassword: async (headId: string, body: ChangePasswordBodyType) => {
    try {
      const response = await http.patch(`v1/heads/${headId}/password`, body);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const headError = error.response.data as ErrorType;
        console.error("Error during change head password:", headError);
        throw headError;
      } else {
        console.error("Unexpected error during change head password:", error);
        throw error;
      }
    }
  },
};

export default headAction;
