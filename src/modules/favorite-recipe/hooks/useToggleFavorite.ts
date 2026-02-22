import { useCreateFavoriteRecipe } from "./useCreateFavoriteRecipe";
import { useDeleteFavoriteRecipe } from "./useDeleteFavoriteRecipe";

interface ToggleFavoriteParams {
  recipeId: string;
  favoriteId?: string;
  isFavorite: boolean;
}

export function useToggleFavorite() {
  const createMutation = useCreateFavoriteRecipe();
  const deleteMutation = useDeleteFavoriteRecipe();

  async function toggle({ recipeId, favoriteId, isFavorite }: ToggleFavoriteParams) {
    try {
      if (isFavorite && favoriteId) {
        await deleteMutation.deleteFavoriteRecipe(favoriteId);
      } else {
        await createMutation.createFavoriteRecipe(recipeId);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return {
    toggle,
    isLoading: createMutation.loading || deleteMutation.loading,
  };
}
