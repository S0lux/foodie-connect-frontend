import {
  LoginBodyType,
  RegisterBodyType,
  VerifyEmailBodyType,
} from "@/schema/auth.schema";
import { User } from "@/types/user.type";
import http from "@/lib/http";
import axios from "axios";
import { ErrorType } from "@/types/error.type";

const authAction = {
  login: async (loginDetails: LoginBodyType) => {
    try {
      const response = await http.post("v1/session", loginDetails);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const authError = error.response.data as ErrorType;
        console.error("Error during login:", authError);
        throw authError;
      } else {
        console.error("Unexpected error during login:", error);
        throw error;
      }
    }
  },
  registerHead: async (registerDetails: RegisterBodyType) => {
    try {
      const response = await http.post("v1/heads", registerDetails);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const authError = error.response.data as ErrorType;
        console.error("Error during register:", authError);
        throw authError;
      } else {
        console.error("Unexpected error during register:", error);
        throw error;
      }
    }
  },
  registerUser: async (registerDetails: RegisterBodyType) => {
    try {
      const response = await http.post("v1/users", registerDetails);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const authError = error.response.data as ErrorType;
        console.error("Error during register:", authError);
        throw authError;
      } else {
        console.error("Unexpected error during register:", error);
        throw error;
      }
    }
  },
  logout: async () => {
    try {
      const response = await http.delete("v1/session");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const authError = error.response.data as ErrorType;
        console.error("Error during logout:", authError);
        throw authError;
      } else {
        console.error("Unexpected error during logout:", error);
        throw error;
      }
    }
  },
  getSession: async () => {
    try {
      const response = await http.get<User>("v1/session");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const authError = error.response.data as ErrorType;
        console.error("Error during get session:", authError);
        throw authError;
      } else {
        console.error("Unexpected error during get session:", error);
        throw error;
      }
    }
  },

  sendEmailVerification: async () => {
    try {
      const response = await http.get("v1/verification/email");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const authError = error.response.data as ErrorType;
        console.error("Error during send email verification:", authError);
        throw authError;
      } else {
        console.error(
          "Unexpected error during send email verification:",
          error,
        );
        throw error;
      }
    }
  },

  verifyEmail: async (emailToken: VerifyEmailBodyType) => {
    try {
      const response = await http.post("v1/verification/email", emailToken);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const authError = error.response.data as ErrorType;
        console.error("Error during verify email:", authError);
        throw authError;
      } else {
        console.error("Unexpected error during verify email:", error);
        throw error;
      }
    }
  },
};

export default authAction;
