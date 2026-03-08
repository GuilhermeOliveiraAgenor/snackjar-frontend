import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { deleteFavoriteRecipe } from "../services/delete-favorite-recipe";

export function useDeleteFavoriteRecipe() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteFavoriteRecipe,
    onSuccess: () => {
      toast.success("Receita excluída dos favoritos");
      queryClient.invalidateQueries({
        queryKey: ["favorite-recipes"],
      });
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.message);
    },
  });
  return {
    deleteFavoriteRecipe: mutation.mutateAsync,
    isDeleting: mutation.isPending,
    error: mutation.isError,
  };
}
