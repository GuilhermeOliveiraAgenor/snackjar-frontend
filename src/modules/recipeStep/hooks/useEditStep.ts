import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editStep } from "../services/edit-step";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";

export function useEditStep(recipeId: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: editStep,

    onSuccess: () => {
      toast.success("Etapa editada com sucesso");
      queryClient.invalidateQueries({
        queryKey: ["recipe-details", recipeId],
      });
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.message);
    },
  });
  return {
    editStep: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.isError,
  };
}
