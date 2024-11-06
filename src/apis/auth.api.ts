import { LoginBodyType } from "@/schema/auth.schema";
import http from "@/lib/http";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

  GetSession() {
    return useQuery({
      queryKey: ["user-session"],
      queryFn: () => http.get("v1/session"),
    });
  },
};

export default authAction;
