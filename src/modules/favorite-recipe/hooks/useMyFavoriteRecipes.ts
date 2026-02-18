import { useQuery } from "@tanstack/react-query";
import { fetchMyFavoriteRecipes } from "../services/fetch-my-favorite-recipe";
import { PaginatedResponse } from "@/modules/types/pagination";

export function useMyFavoriteRecipes(page: number) {
  return useQuery<PaginatedResponse<FavoriteRecipe>>({
    queryKey: ["favorite-recipes"],
    queryFn: () => fetchMyFavoriteRecipes(page),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
