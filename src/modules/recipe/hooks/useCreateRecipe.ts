import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRecipe } from "../services/create-recipe";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ApiError } from "next/dist/server/api-utils";
import { AxiosError } from "axios";

export function useCreateRecipe() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createRecipe,
    onSuccess: (data) => {
      toast.success("Receita cadastrada com sucesso");
      queryClient.invalidateQueries({
        queryKey: ["recipes", "me"],
      });
      router.push(`/recipe/${data.id}`);
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.message);
    },
  });
  return {
    createRecipe: mutation.mutateAsync,
    isCreating: mutation.isPending,
    error: mutation.isError,
  };
}
