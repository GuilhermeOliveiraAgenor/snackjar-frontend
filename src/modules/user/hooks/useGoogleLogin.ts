import { useMutation } from "@tanstack/react-query";
import { authenticateGoogleUser } from "../services/authenticate-google-user";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

export function useGoogleLogin() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: authenticateGoogleUser,
    onSuccess: () => {
      router.push("/menu");
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.message);
    },
  });
  return {
    loginWithGoogle: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
}
