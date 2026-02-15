import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { deleteStep } from "../services/delete-step";

export function useDeleteStep(recipeId: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteStep,

    onSuccess: () => {
      toast.success("Etap deletada com sucesso");
      queryClient.invalidateQueries({
        queryKey: ["recipe-details", recipeId],
      });
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.message);
    },
  });
  return {
    deleteStep: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.isError,
  };
}
