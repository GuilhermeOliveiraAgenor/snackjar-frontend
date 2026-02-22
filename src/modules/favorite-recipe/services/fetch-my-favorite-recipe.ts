import { api } from "@/lib/api";
import { PaginatedResponse } from "@/modules/types/pagination";

export async function fetchMyFavoriteRecipes(
  page = 1
): Promise<PaginatedResponse<FavoriteRecipeDetails>> {
  const result = await api("/me/favorites", {
    params: { page },
    method: "GET",
  });

  return result.data;
}
