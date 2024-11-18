import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoginBodyType, RegisterBodyType } from "@/schema/auth.schema";
import authAction from "@/apis/auth.api";
import { ErrorType } from "@/types/error.type";
import userAction from "@/apis/user.api";

const useAuth = {
  useLogin() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (loginDetails: LoginBodyType) =>
        authAction.login(loginDetails),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["user-session"],
        });
      },
      onError: (error: ErrorType) => {
        console.error("Error during login:", error);
        throw error;
      },
    });
  },

  useRegisterHead() {
    return useMutation({
      mutationFn: (registerDetails: RegisterBodyType) =>
        authAction.registerHead(registerDetails),
      onError: (error: ErrorType) => {
        console.error("Error during head registration:", error);
        throw error;
      },
    });
  },

  useRegisterUser() {
    return useMutation({
      mutationFn: (registerDetails: RegisterBodyType) =>
        authAction.registerUser(registerDetails),
      onError: (error: ErrorType) => {
        console.error("Error during user registration:", error);
        throw error;
      },
    });
  },

  useLogout() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async () => {
        try {
          const result = await authAction.logout();
          return result;
        } catch (error) {
          console.error("Error during logout:", error);
          throw error;
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["user-session"],
        });
      },
      onError: (error: ErrorType) => {
        console.error("Error during logout:", error);
        throw error;
      },
    });
  },

  useGetSession() {
    return useQuery({
      queryKey: ["user-session"],
      queryFn: async () => {
        try {
          const result = await authAction.getSession();
          return result;
        } catch (error) {
          console.error("Error during session retrieval:", error);
          throw error;
        }
      },
      retry: 0,
    });
  },

  useUpgradeHead() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (userId: string) => {
        try {
          const result = await userAction.upgradeHead(userId);
          return result;
        } catch (error) {
          console.error("Error during head upgrade:", error);
          throw error;
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["user-session"],
        });
      },
      onError: (error: ErrorType) => {
        console.error("Error during head upgrade:", error);
        throw error;
      },
    });
  },
};

export default useAuth;
