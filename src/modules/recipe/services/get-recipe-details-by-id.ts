import { api } from "@/lib/api";
import { RecipeDetails } from "../types/recipe-details";

export async function getRecipeDetailsByRecipeId(recipeId: string): Promise<RecipeDetails> {
  const result = await api(`/recipes/details/${recipeId}`, {
    method: "GET",
  });
  return result.data.data;
}
