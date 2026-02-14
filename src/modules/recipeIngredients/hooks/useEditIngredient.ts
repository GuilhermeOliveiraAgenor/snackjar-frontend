import { useMutation } from "@tanstack/react-query";
import { editIngredient } from "../services/edit-ingredient";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";

export function useEditIngredient() {
  const mutation = useMutation({
    mutationFn: editIngredient,
    onSuccess: () => {
      toast.success("Ingrediente editado com sucesso");
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.message);
    },
  });
  return {
    editIngredient: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.isError,
  };
}
