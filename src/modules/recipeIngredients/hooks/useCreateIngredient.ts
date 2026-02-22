import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createIngredient } from "../services/create-ingredient";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";

export function useCreateIngredient(recipeId: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createIngredient,

    onSuccess: () => {
      toast.success("Ingrediente cadastrado com sucesso");
      queryClient.invalidateQueries({
        queryKey: ["recipe-details", recipeId],
      });
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.message);
    },
  });
  return {
    createIngredient: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.isError,
  };
}
