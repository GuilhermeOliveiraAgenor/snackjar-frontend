import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editRecipe } from "../services/edit-recipe";
import { toast } from "sonner";
import { ApiError } from "next/dist/server/api-utils";
import { AxiosError } from "axios";

export function useEditRecipe(recipeId: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: editRecipe,

    onSuccess: () => {
      toast.success("Receita editada com sucesso");
      queryClient.invalidateQueries({
        queryKey: ["recipe-details", recipeId],
      });
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.message);
    },
  });
  return {
    editRecipe: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.isError,
  };
}
