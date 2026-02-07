import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { authenticateUser } from "../services/authenticate-user";

export function useLogin() {
  const router = useRouter();

  const mutation = useMutation({
    // pass service to mutation
    mutationFn: authenticateUser, // service

    onSuccess: () => {
      router.push("/menu");
    },

    onError: () => {
      alert("Erro ao fazer login");
    },
  });
  return {
    login: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.error,
  };
}
