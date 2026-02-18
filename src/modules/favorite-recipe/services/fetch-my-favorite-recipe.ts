import { api } from "@/lib/api";
import { PaginatedResponse } from "@/modules/types/pagination";

export async function fetchMyFavoriteRecipes(page = 1): Promise<PaginatedResponse<FavoriteRecipe>> {
  const result = await api("/me/favorites", {
    method: "GET",
  });

  return result.data.data;
}
