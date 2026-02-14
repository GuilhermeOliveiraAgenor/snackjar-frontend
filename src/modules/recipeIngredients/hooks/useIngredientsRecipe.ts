import { useQuery } from "@tanstack/react-query";
import { fetchIngredientsByRecipeId } from "../services/fetch-ingredients-by-recipe-id";
import { RecipeIngredient } from "../types/recipeIngredients";

export function useIngredientsRecipe(recipeId: string) {
  return useQuery<RecipeIngredient>({
    queryKey: ["recipe-ingredient", recipeId],
    queryFn: () => fetchIngredientsByRecipeId(recipeId),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
