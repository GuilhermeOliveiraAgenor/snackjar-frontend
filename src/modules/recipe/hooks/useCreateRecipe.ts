import { useMutation } from "@tanstack/react-query";
import { createRecipe } from "../services/create-recipe";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ApiError } from "next/dist/server/api-utils";
import { AxiosError } from "axios";

export function useCreateRecipe() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: createRecipe,
    onSuccess: () => {
      toast.success("Receita cadastrada com sucesso");
      router.push("/menu");
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.message);
    },
  });
  return {
    createRecipe: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.error,
  };
}
