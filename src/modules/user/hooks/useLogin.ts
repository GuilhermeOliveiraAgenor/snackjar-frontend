import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { authenticateUser } from "../services/authenticate-user";
import { toast } from "sonner";
import { ApiError } from "next/dist/server/api-utils";
import { AxiosError } from "axios";

export function useLogin() {
  const router = useRouter();

  const mutation = useMutation({
    // pass service to mutation
    mutationFn: authenticateUser, // service

    onSuccess: () => {
      router.push("/menu");
    },

    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.message);
    },
  });
  return {
    login: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.error,
  };
}
