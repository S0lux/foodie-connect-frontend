import headAction from "@/apis/head.api";
import userAction from "@/apis/user.api";
import { ChangePasswordBodyType } from "@/schema/auth.schema";
import { ErrorType } from "@/types/error.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { use } from "react";

const useSetting = {
  useHeadChangeAvatar() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ headId, avatar }: { headId: string; avatar: File }) =>
        headAction.changeAvatar(headId, avatar),
      onError: (error: ErrorType) => {
        console.error("Error during avatar image upload:", error);
        throw error;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["user-session"],
        });
      },
    });
  },

  useHeadChangePassword() {
    return useMutation({
      mutationFn: ({
        headId,
        body,
      }: {
        headId: string;
        body: ChangePasswordBodyType;
      }) => headAction.changePassword(headId, body),
      onError: (error: ErrorType) => {
        console.error("Error during password change:", error);
        throw error;
      },
    });
  },

  useUserChangeAvatar() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ userId, avatar }: { userId: string; avatar: File }) =>
        userAction.changeAvatar(userId, avatar),
      onError: (error: ErrorType) => {
        console.error("Error during avatar image upload:", error);
        throw error;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["user-session"],
        });
      },
    });
  },

  useUserChangePassword() {
    return useMutation({
      mutationFn: ({
        userId,
        body,
      }: {
        userId: string;
        body: ChangePasswordBodyType;
      }) => userAction.changePassword(userId, body),
      onError: (error: ErrorType) => {
        console.error("Error during password change:", error);
        throw error;
      },
    });
  },
};

export default useSetting;
