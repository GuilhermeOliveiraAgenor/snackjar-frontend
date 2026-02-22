import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFavoriteRecipe } from "../services/create-favorite-recipe";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";

export function useCreateFavoriteRecipe() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createFavoriteRecipe,
    onSuccess: () => {
      toast.success("Receita adicionada nos favoritos");
      queryClient.invalidateQueries({
        queryKey: ["favorite-recipes"],
      });
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.message);
    },
  });
  return {
    createFavoriteRecipe: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.isError,
  };
}
