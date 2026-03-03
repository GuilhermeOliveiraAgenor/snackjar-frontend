import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authenticateUser } from "../services/authenticate-user";
import { toast } from "sonner";
import { ApiError } from "next/dist/server/api-utils";
import { AxiosError } from "axios";

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    // pass service to mutation
    mutationFn: authenticateUser, // service

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      router.push("/menu");
    },

    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.message);
    },
  });
  return {
    login: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
}
