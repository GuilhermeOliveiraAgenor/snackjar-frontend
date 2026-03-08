import { api } from "@/lib/api";

export async function createFavoriteRecipe(recipeId: string) {
  const result = await api("/favorites", {
    method: "POST",
    data: { recipeId },
  });

  return result.data.data;
}
