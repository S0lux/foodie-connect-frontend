import { LoginBodyType, RegisterBodyType } from "@/schema/auth.schema";
import http from "@/lib/http";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/user.type";

const authAction = {
  useLogin() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (loginDetails: LoginBodyType) =>
        http.post("v1/session", loginDetails),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["user-session"],
        });
      },
    });
  },

  useRegisterHead() {
    return useMutation({
      mutationFn: (registerDetails: RegisterBodyType) =>
        http.post("v1/heads", registerDetails),
    });
  },

  useRegisterUser() {
    return useMutation({
      mutationFn: (registerDetails: RegisterBodyType) =>
        http.post("v1/users", registerDetails),
    });
  },

  useLogout() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: () => http.delete("v1/session"),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["user-session"],
        });
      },
    });
  },

  useGetSession() {
    return useQuery({
      queryKey: ["user-session"],
      queryFn: async () => {
        const response = await http.get<User>("v1/session");
        return response.data;
      },
      retry: 1,
    });
  },
};

export default authAction;
