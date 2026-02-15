import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiError } from "next/dist/server/api-utils";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { deleteRecipe } from "../services/delete-recipe";

export function useDeleteRecipe() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: deleteRecipe,

    onSuccess: () => {
      router.push("/menu");
      toast.success("Receita deletada com sucesso");
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.message);
    },
  });
  return {
    deleteRecipe: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.isError,
  };
}
