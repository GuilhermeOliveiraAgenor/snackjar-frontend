"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMyRecipes } from "../services/fetch-my-recipes";
import { Recipe } from "../types/recipe";
import { EmptyPagination, PaginatedResponse } from "@/modules/types/pagination";

export function useRecipes(page: number, title?: string) {
  const query = useQuery<PaginatedResponse<Recipe>>({
    queryKey: ["recipes", "me", page, title], // hook id and parameter

    queryFn: () => fetchMyRecipes(page, title),

    staleTime: 1000 * 60 * 5, // cache
  });

  return {
    ...query,
    data: query.data ?? EmptyPagination<Recipe>(),
  };
}
