import { api } from "@/lib/api";

export async function fetchIngredientsByRecipeId(recipeId: string) {
  const result = await api(`/recipes/ingredients/${recipeId}`, {
    method: "GET",
  });

  console.log(result.data.data);
  return result.data.data;
}
