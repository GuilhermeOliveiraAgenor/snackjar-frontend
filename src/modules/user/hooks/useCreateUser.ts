import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createUser } from "../services/create-user";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";

export function useCreateUser() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: createUser,

    onSuccess: () => {
      toast.success("Usuário criado com sucesso");
      router.push("/login");
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.message);
    },
  });
  return {
    create: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.error,
  };
}
