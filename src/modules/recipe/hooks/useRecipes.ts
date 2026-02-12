"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMyRecipes } from "../services/fetch-my-recipes";
import { Recipe } from "../types/recipe";
import { PaginatedResponse } from "@/modules/types/pagination";

export function useRecipes(page: number, title?: string, categoryId?: string) {
  return useQuery<PaginatedResponse<Recipe>>({
    queryKey: ["recipes", "me", page, title, categoryId], // hook id and parameter

    queryFn: () => fetchMyRecipes(page, title, categoryId),

    staleTime: 1000 * 60 * 5, // cache
  });
}
