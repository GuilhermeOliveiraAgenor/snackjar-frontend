import { api } from "@/lib/api";
import { PaginatedResponse } from "@/modules/types/pagination";

export async function fetchMyFavoriteRecipes(page = 1): Promise<PaginatedResponse<FavoriteRecipe>> {
  const result = await api("/me/favorites", {
    params: { page },
    method: "GET",
  });
  console.log(result.data.data);
  return result.data;
}
