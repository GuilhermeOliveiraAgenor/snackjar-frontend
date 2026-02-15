import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { toast } from "sonner";
import { deleteIngredient } from "../services/delete-ingredient";

export function useDeleteIngredient(recipeId: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteIngredient,

    onSuccess: () => {
      toast.success("Ingrediente deletado com sucesso");
      queryClient.invalidateQueries({
        queryKey: ["recipe-details", recipeId],
      });
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.message);
    },
  });
  return {
    deleteIngredient: mutation.mutateAsync,
  };
}
