import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStep } from "../services/create-step";
import { toast } from "sonner";
import { AxiosError } from "axios";

export function useCreateStep(recipeId: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createStep,
    onSuccess: () => {
      toast.success("Etapa cadastrada com sucesso");
      queryClient.invalidateQueries({
        queryKey: ["recipe-details", recipeId],
      });
    },
    onError: (error: AxiosError<AxiosError>) => {
      toast.error(error.message);
    },
  });
  return {
    createStep: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.isError,
  };
}
